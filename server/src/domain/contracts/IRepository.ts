export interface IRepository<T, U> {
    create(data: T): Promise<U>;
    findById(id: string): Promise<U | null>;
    findAll(): Promise<U[]>;
    update(id: string, data: T): Promise<U>;
    remove(id: string): Promise<U>;
}