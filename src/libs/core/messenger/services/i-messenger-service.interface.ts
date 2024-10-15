export interface IMessengerService {
  sendInternalServerError: (error) => Promise<void>;
}
