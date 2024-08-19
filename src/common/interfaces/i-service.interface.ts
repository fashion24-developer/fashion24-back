export interface IService {
  create(data: any): Promise<any>;
  findAll: () => void;
  findOne: (data: any) => Promise<any>;
  update: (data: any) => Promise<any>;
  delete: () => void;
}
