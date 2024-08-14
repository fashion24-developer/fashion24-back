export interface IService {
  create(data: any): Promise<any>;
  findAll: () => void;
  findOne: () => void;
  update: () => void;
  delete: () => void;
}
