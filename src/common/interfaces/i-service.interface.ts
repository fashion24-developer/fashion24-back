export interface IService<T extends Record<string, any>> {
  create(data: any): Promise<any>;
  findAll: (data: any) => Promise<any>;
  findOneById: (id: number) => Promise<T>;
  update: (data: any) => Promise<any>;
  delete: (data: any) => void;
}
