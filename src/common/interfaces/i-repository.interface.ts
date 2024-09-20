/**
 * @todo Prisma setup 시에 작성
 */
export interface IRepository<T extends Record<string, any>> {
  create(data: T): Promise<T>;
  findOneById(id: number): Promise<T | null>;
  findAll<K extends keyof T>(
    where: Record<K, T[K]>,
    include?: Record<keyof Pick<T, keyof T>, boolean>
  ): Promise<T[]>;
  update(data: any): Promise<T>;
}
