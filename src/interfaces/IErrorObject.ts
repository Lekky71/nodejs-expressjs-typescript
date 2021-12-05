type errorData = string | object;

export interface IErrorObject extends Error {
  code?: string;
  data?: errorData;
}
