import { Response } from "express";

/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 */

function respond(res: Response, data: any, httpCode: number): void {
  const response = {
    error: data.error,
    code: httpCode,
    data: data.response,
    message: data.message,
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Method', '*');

  res.writeHead(httpCode);
  res.end(JSON.stringify(response));
}

export function success(res: Response, response: any, status: number = 200): void {
  const data = response;
  data.error = false;
  respond(res, data, status);
};

export function failure(res: Response, response: any, httpCode: number = 503): void {
  const data = response;
  data.error = true;
  respond(res, data, httpCode);
};
