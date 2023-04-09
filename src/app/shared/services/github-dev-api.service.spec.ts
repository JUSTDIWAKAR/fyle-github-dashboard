import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubDevApiService } from './github-dev-api.service';
import { GithubUser, Repository } from '../models/user-info.model';

describe('GithubDevApiService', () => {
  let service: GithubDevApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubDevApiService]
    });
    service = TestBed.inject(GithubDevApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve user data by username', () => {
    const mockUser: GithubUser = {
      login: 'testuser',
      username: 'testuser',
      location: 'delhi',
      name: 'Test User',
      avatar_url: 'https://avatar.url',
      public_repos: 10,
      twitter_username: 'teststart',
      html_url: 'https://github.in/test',
      bio: 'Test bio'
    };

    service.getUserDataByUsername('testuser').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/users/testuser`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should retrieve user repositories by username, page and perPage', () => {
    const mockRepo: Repository = {
      total_count: '11',
      incomplete_results: false,
      items: [
        {
          name: 'Test Repo',
          description: 'Test description',
          html_url: 'https://repo.url',
          language: 'JavaScript'
        }
      ]
    };

    service.getUserReposByUsername('testuser', 1, 1).subscribe(repo => {
      expect(repo).toEqual(mockRepo);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/search/repositories?q=user:testuser&sort=stars&order=desc&page=1&per_page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepo);
  });

});
