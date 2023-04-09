import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserDashboardDisplayComponent } from './user-dashboard-display.component';
import { GithubDevApiService } from 'src/app/shared/services/github-dev-api.service';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom-error-handler.service';
import { GithubUser, Repository } from 'src/app/shared/models/user-info.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('UserDashboardDisplayComponent', () => {
  let component: UserDashboardDisplayComponent;
  let fixture: ComponentFixture<UserDashboardDisplayComponent>;
  let mockGithubDevService: jasmine.SpyObj<GithubDevApiService>;
  let mockErrorHandler: jasmine.SpyObj<CustomErrorHandlerService>;

  beforeEach(async () => {
    mockGithubDevService = jasmine.createSpyObj('GithubDevApiService', ['getUserDataByUsername', 'getUserReposByUsername']);
    mockErrorHandler = jasmine.createSpyObj('CustomErrorHandlerService', ['handle']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, CommonModule],
      declarations: [UserDashboardDisplayComponent],
      providers: [
        { provide: GithubDevApiService, useValue: mockGithubDevService },
        { provide: CustomErrorHandlerService, useValue: mockErrorHandler }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUserProfile', () => {
    it('should set user and totalRepos and call getUserRepos on success', () => {
      const userData = {
        login: "akki",
        username: "akki",
        avatar_url: "https://avatars.githubusercontent.com/u/4801628?v=4",
        html_url: "https://github.com/akki",
        name: "Akshesh Doshi",
        location: "Remote",
        bio: 'test bio',
        twitter_username: 'testUser',
        public_repos: 3,
    }
      mockGithubDevService.getUserDataByUsername.and.returnValue(of(userData));
      const userRepos = {
        incomplete_results: false,
        items: [
          { name: 'testrepo1', description: 'this is desc 1', language: 'typescript', html_url: 'https://github.com/akki' },
          { name: 'testrepo2', description: 'this is desc 2', html_url: 'https://github.com/akki2', language: 'javascript' },
          { name: 'testrepo3', language: 'java', description: 'this is desc 3',  html_url: 'https://github.com/akki3' },
        ],
        total_count: '26'
      };
      mockGithubDevService.getUserReposByUsername.and.returnValue(of(userRepos));
      component.username = 'testuser';

      component.getUserProfile();

      expect(mockGithubDevService.getUserDataByUsername).toHaveBeenCalledWith('testuser');
      expect(component.user).toEqual(userData);
      expect(component.isProfileLoading).toBeFalse();
      expect(component.totalRepos).toEqual(3);
      expect(mockGithubDevService.getUserReposByUsername).toHaveBeenCalledWith('testuser', 1, 10);
      expect(component.repos).toEqual(userRepos.items);
      expect(component.isRepoLoading).toBeFalse();
      expect(component.isInvalidUserEntry).toBeFalse();
    });

    it('should call getUserDataByUsername with trimmed username', () => {
      component.username = '  testuser  ';
      mockGithubDevService.getUserDataByUsername.and.returnValue(of({} as GithubUser));
      mockGithubDevService.getUserReposByUsername.and.returnValue(of({} as Repository));
  
      component.getUserProfile();
  
      expect(mockGithubDevService.getUserDataByUsername).toHaveBeenCalledWith('testuser');
    });
  
    it('should set isProfileLoading to false when user data is retrieved successfully', () => {
      mockGithubDevService.getUserDataByUsername.and.returnValue(of({} as GithubUser));
      mockGithubDevService.getUserReposByUsername.and.returnValue(of({} as Repository));
  
      component.getUserProfile();
  
      expect(component.isProfileLoading).toBeFalse();
    });
  
    it('should set user to the retrieved user data when user data is retrieved successfully', () => {
      const user = { login: 'testuser', name: 'Test User', avatar_url: 'test-avatar.jpg', public_repos: 5 };
      mockGithubDevService.getUserDataByUsername.and.returnValue(of(user  as GithubUser));
      mockGithubDevService.getUserReposByUsername.and.returnValue(of({} as Repository));
  
      component.getUserProfile();
  
      expect(component.user).toEqual(user as GithubUser);
    });
  
    it('should set totalRepos to the number of public repos when user data is retrieved successfully and user has public repos', () => {
      const user = { login: 'testuser', name: 'Test User', avatar_url: 'test-avatar.jpg', public_repos: 5 };
      mockGithubDevService.getUserDataByUsername.and.returnValue(of(user as GithubUser));
      mockGithubDevService.getUserReposByUsername.and.returnValue(of({} as Repository));
  
      component.getUserProfile();
  
      expect(component.totalRepos).toEqual(user.public_repos);
    });
  });

});
