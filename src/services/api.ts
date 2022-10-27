import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
// import * as axios from 'axios';
import axios  from 'axios';
import { baseApi} from '../settings/settings-prod';


const get = (
  endpoint: string,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 20000,
  returnEntireRequest: boolean = false,
): Observable<any> => {
  return _axiosCall('get', endpoint, useAuth, { responseType, timeout }, returnEntireRequest,{});
};


const post =  (
  endpoint: string,
  data: any,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 20000,
  returnEntireRequest: boolean = false,
): Observable<any> => {
  return _axiosCall('post', endpoint, useAuth, { responseType, timeout }, returnEntireRequest, data);
};

const LongRequest = (
  endpoint: string,
  data: any,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 120000,
  returnEntireRequest: boolean = false,
): Observable<any> => {
  return _axiosCall('post', endpoint, useAuth, { responseType, timeout }, returnEntireRequest, data);
};

const put = (
  endpoint: string,
  data: any,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 20000,
  returnEntireRequest: boolean = false,
): Observable<any> => {
  return _axiosCall('put', endpoint, useAuth, { responseType, timeout }, returnEntireRequest, data);
};

const patch = (
  endpoint: string,
  data: any,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 20000,
  returnEntireRequest: boolean = false,
): Observable<any> => {
  return _axiosCall('patch', endpoint, useAuth, { responseType, timeout }, returnEntireRequest, data);
};

const del = (
  endpoint: string,
  useAuth: boolean = true,
  responseType: string = 'json',
  timeout: number = 20000,
): Observable<any> => {
  return _axiosCall('delete', endpoint, useAuth, { responseType, timeout });
};

const catchAxiosError = catchError(error => {
  if (error.response) {
    return throwError(error.response);
  } else if (error.request) {
    return throwError(error.request);
  } else {
    return throwError(error.message);
  }
});

const _axiosCall = (
  method: string,
  endpoint: string,
  useAuth: boolean,
  opts: any,
  returnEntireRequest: boolean = false,
  data: any = {}
  
): Observable<any> => {
  // If is a relative URL, concat with baseAPI address, if not, use only the provided URL.
  const url = endpoint.substring(0, 4).includes('http') ? endpoint : baseApi + endpoint;
   
  // Make Axios Request and returns a Observable from it's Promise
  const makeAxiosRequest = switchMap((u) => {
    const axiosPromise = axios.request({
      method,
      url,
      data,
      responseType: opts.responseType === 'formdata'?'json':opts.responseType,
      timeout: opts.timeout,
      headers: useAuth ? {'Content-Type': opts.responseType === 'formdata' ? 'multipart/form-data':'application/json'} : {},
    });

    return from(axiosPromise).pipe(map((i: any) => { 
      return returnEntireRequest ? i : i.data;
    }));
  });


  // The returned Observable
  return of(true).pipe(
    makeAxiosRequest,
    catchAxiosError,
  );
};


const AxiosUpload = (endpoint: string, data: FormData): Observable<any> => {
  
    const url = endpoint.substring(0, 4).includes('http') ? endpoint : baseApi + endpoint;
    

    const makeAxiosRequest = switchMap((u) => {
      return axios.post(url, data, { headers: { }});
    });

    return of(true).pipe(
      makeAxiosRequest,
      catchAxiosError,
    );

};

export { get, post, put, patch, del, LongRequest, AxiosUpload };
