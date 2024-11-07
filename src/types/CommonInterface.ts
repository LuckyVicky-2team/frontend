export interface IErrorProps {
  response: {
    data: { errorCode: number; messages: string };
  };
}
