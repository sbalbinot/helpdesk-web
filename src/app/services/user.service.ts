import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${environment.api}/auth`, user);
  }

  createOrUpdate(user: User) {
    if (user.id !== null && user.id !== '') {
      return this.http.put(`${environment.api}/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${environment.api}/user`, user);
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/user/${id}`);
  }

  findById(id: string) {
    return this.http.get(`${environment.api}/user/${id}`);
  }

  findAll(page: number, count: number) {
    return this.http.get(`${environment.api}/user/${page}/${count}`);
  }

}
