import { DeepPartial, EntityManager, EntityTarget, FindConditions, FindOneOptions, getConnection, Repository } from "typeorm";
import { BasicDAO as InterfaceDAO } from "./database";

export class BasicDAO<T> implements InterfaceDAO<T> {
    private manager: EntityManager | undefined;

    protected get repo(): Repository<T> {
        if (this.manager) {
            const repository = this.manager.getRepository<T>(this.repoType);
            this.manager = undefined;
            return repository;
        }

        return getConnection().getRepository<T>(this.repoType);
    }

    setEntityManager(manager: EntityManager): this {
        this.manager = manager;
        return this;
    }

    constructor(private repoType: EntityTarget<T>) {
    }

    async exists(id: string): Promise<boolean> {
        return !!await this.get(id);
    }

    async create(entity: T): Promise<string> {
        await this.repo.insert(entity);
        return this.repo.getId(entity);
    }

    async save(entity: T): Promise<T> {
        return this.repo.save(entity);
    }

    async getAll(): Promise<T[]> {
        return this.repo.find();
    }

    async get(id: string, options?: FindOneOptions<T>): Promise<T | undefined> {
        return this.repo.findOne(id, options);
    }

    async update(id: string, entity: DeepPartial<T>): Promise<T | undefined> {
        await this.repo.update(id, entity);

        return this.get(id);
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    async find(value: FindConditions<T>): Promise<T[]> {
        return this.repo.find(value)
    }
}