import * as e from 'express';



// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
  };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
