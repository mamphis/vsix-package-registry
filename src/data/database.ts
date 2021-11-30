import { DeepPartial, FindConditions } from 'typeorm';
import { User } from '../model/user';

export interface Database {
    user: UserDAO;

    init(): Promise<void>;
}

export interface BasicDAO<T> {
    getAll(): Promise<T[]>;
    get(id: string): Promise<T | undefined>;
    exists(id: string): Promise<boolean>;
    update(id: string, partialValue: DeepPartial<T>): Promise<T | undefined>;
    delete(id: string): Promise<void>;
    create(value: DeepPartial<T>): Promise<T>;
    find(search: FindConditions<T>): Promise<T[]>;
}

export interface UserDAO extends BasicDAO<User> {

}