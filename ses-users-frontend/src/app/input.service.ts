import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './app.user';
import { __values } from 'tslib';


const baseUrl = 'http://localhost:8083/api/v1/user';
const batchUrl = "http://localhost:5000/generate-users"

@Injectable()
export class InputService{
    constructor(private http: HttpClient) { }
    getUsers() {
        return this.http.get<User[]>(baseUrl);   
      }
    
      createUser(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
      }
    
      updateUser(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
      }
    
      deleteUser(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }

      generateMultipleUsers(data: any): Observable<any> {
        return this.http.post(batchUrl, data);
      }
}