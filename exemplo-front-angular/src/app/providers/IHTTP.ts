export interface IHTTP {
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  body?: any;
  responseType?: any;
}
