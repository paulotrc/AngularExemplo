import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GlobalConstants} from '../constants/global.constants';
import {IResponse} from '../models/iresponse';

@Injectable()
export class ApiService<T> {

    constructor(protected http: HttpClient) {
    }

    public buildURL(endpoint: string) {
        const apiVersion: string = GlobalConstants.API.apiVersion;
        const apiUrl: string = GlobalConstants.API.apiUrl + '/' + apiVersion;
        return apiUrl + '/' + endpoint;
    }

    public getHttp() {
        return this.http;
    }

    public get<T>(endpoint: string): Observable<T> {
        const url = this.buildURL(endpoint);
        return this.http.get<IResponse>(url).map(response => response.resource as T);
    }

    public getPagination<T>(endpoint: string): Observable<T> {
        const url = this.buildURL(endpoint);

        return this.http.get(url).map(response => response as T);
    }

    public getById<T>(endpoint: string): Observable<T> {
        const url = this.buildURL(endpoint);

        return this.http.get(url).map(response => response as T);
    }

    public post<T>(endpoint: string, obj: any): Observable<T> {
        const url = this.buildURL(endpoint);

        return this.http.post<IResponse>(url, this.convertResourceToJson(obj)).map(response => response.resource[0] as T);
    }

    public postFile<T>(endpoint: string, fileToUpload: File): Observable<T> {
        const url = this.buildURL(endpoint);
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);

        return this.http.post<IResponse>(url, formData/*,{headers:{ 'Content-Type': 'multipart/form-data', 'Content-Disposition': 'form-data; name="' + fileToUpload.name + '"; filename="' + fileToUpload.name + '"' }}*/).map(response => response.resource[0] as T);
    }

    public put<T>(endpoint: string, obj: any): Observable<T> {
        const url = this.buildURL(endpoint);

        return this.http.put<IResponse>(url, this.convertResourceToJson(obj)).map(response => response.resource as T);
    }

    public delete<T>(endpoint: string): Observable<T> {
        const url = this.buildURL(endpoint);

        return this.http.delete(url).map(response => response as T);
    }

    private convertResourceToJson(obj: any): string {
        const resource = {resource: []};

        if (Array.isArray(obj)) {
            resource.resource = obj;
        } else {
            const array = [];
            array.push(obj);
            resource.resource = array;
        }

        // console.log(JSON.stringify(resource));

        return JSON.stringify(resource);
    }
}
