import { DeepPartial, FindConditions, FindOneOptions } from 'typeorm';
import { User } from '../model/user';
import { Vsix } from '../model/vsix';
import { VsixVersion } from '../model/vsixversion';

export interface Database {
    user: UserDAO;
    vsix: VsixDAO;
    vsixVersion: VsixVersionDAO;

    init(): Promise<void>;
}

export interface BasicDAO<T> {
    getAll(): Promise<T[]>;
    get(id: string, options?: FindOneOptions<T>): Promise<T | undefined>;
    exists(id: string): Promise<boolean>;
    update(id: string, partialValue: DeepPartial<T>): Promise<T | undefined>;
    delete(id: string): Promise<void>;
    create(value: DeepPartial<T>): Promise<string>;
    save(value: DeepPartial<T>): Promise<T>;
    find(search: FindConditions<T>): Promise<T[]>;
}

export interface UserDAO extends BasicDAO<User> {
}

export interface VsixDAO extends BasicDAO<Vsix> {
}

export interface VsixVersionDAO extends BasicDAO<VsixVersion> {
}