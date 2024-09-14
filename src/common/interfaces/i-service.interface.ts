export interface IService {
  create(data: any): Promise<any>;
  findAll: (data: any) => Promise<any>;
  findOne: (data: any) => Promise<any>;
  update: (data: any) => Promise<any>;
  delete: (data: any) => void;
}
