import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ''; // Exemplo de URL base com caminho para os usuários

  constructor(private http: HttpClient) { }

  index(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  delete(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }

  update(userId: number, updatedUser: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<User>(url, updatedUser);
  }
}

