import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubUser, Repository } from '../models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class GithubDevApiService {
  public apiUrl: string = 'https://api.github.com';
  constructor(private http: HttpClient) { }

  getUserDataByUsername(username: string = ''): Observable<GithubUser> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<GithubUser>(url);
  }

  getUserReposByUsername(username: string = '', page: number = 1, perPage: number = 10): Observable<Repository> {
    const url = `${this.apiUrl}/search/repositories?q=user:${username}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
    return this.http.get<Repository>(url);
  }

}
