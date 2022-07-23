import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  URL = 'http://127.0.0.1:5000/';
  constructor(private httpClient: HttpClient) {}
  uploadFile(file: any): Observable<any> {
    let customURL = this.URL + 'predict';
    let header = new HttpHeaders({
      enctype: 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    });
    console.log(customURL);

    console.log(file);

    return this.httpClient.post(customURL, file, { headers: header });
  }
}
