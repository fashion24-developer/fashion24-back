/**
 * @todo Prisma setup 시에 작성
 */
export interface IRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
  findAll(data: any): Promise<any>;
  update(data: any): Promise<any>;
}
