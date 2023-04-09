import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { UserReposListingComponent } from './user-repos-listing.component';
import { GithubDevApiService } from 'src/app/shared/services/github-dev-api.service';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom-error-handler.service';
import { RepoInfo, Repository } from 'src/app/shared/models/user-info.model';
import { By } from '@angular/platform-browser';

describe('UserReposListingComponent', () => {
  let component: UserReposListingComponent;
  let fixture: ComponentFixture<UserReposListingComponent>;
  let mockGithubDevService: jasmine.SpyObj<GithubDevApiService>;
  let mockErrorHandler: jasmine.SpyObj<CustomErrorHandlerService>;

  beforeEach(async () => {
    mockGithubDevService = jasmine.createSpyObj('GithubDevApiService', ['getUserReposByUsername']);
    mockErrorHandler = jasmine.createSpyObj('CustomErrorHandlerService', ['handle']);
    
    await TestBed.configureTestingModule({
      declarations: [ UserReposListingComponent ],
      providers: [
        { provide: GithubDevApiService, useValue: mockGithubDevService },
        { provide: CustomErrorHandlerService, useValue: mockErrorHandler }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReposListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pageSizes', () => {
    expect(component.pageSizes).toEqual([10, 15, 25, 50, 100]);
  });

  it('should set previousIcon and nextIcon', () => {
    expect(component.previousIcon).toEqual(PrimeIcons.CHEVRON_LEFT);
    expect(component.nextIcon).toEqual(PrimeIcons.CHEVRON_RIGHT);
  });

  it('should call getUserRepos with default values on loadRepos', () => {
    const mockEvent: any = { first: 0, rows: 10 };
    component.username = 'testuser';
    spyOn(component, 'getUserRepos');
    
    component.loadRepos(mockEvent);

    expect(component.first).toEqual(1);
    expect(component.pageSize).toEqual(10);
    expect(component.getUserRepos).toHaveBeenCalledWith(1, 10);
  });

  it('should call getUserRepos with correct values on loadRepos', () => {
    const mockEvent: any = { first: 10, rows: 25 };
    component.username = 'testuser';
    spyOn(component, 'getUserRepos');
    
    component.loadRepos(mockEvent);

    expect(component.first).toEqual(1);
    expect(component.pageSize).toEqual(25);
    expect(component.getUserRepos).toHaveBeenCalledWith(1, 25);
  });

  it('should set repos and isRepoLoading on success', () => {
    const mockResponse = {
      items: [{ name: 'repo1' }, { name: 'repo2' }],
    };
    mockGithubDevService.getUserReposByUsername.and.returnValue(of(mockResponse as Repository));
    component.username = 'testuser';

    component.getUserRepos();

    expect(component.repos).toEqual(mockResponse.items as RepoInfo[]);
    expect(component.isRepoLoading).toBeFalse();
  });

  it('should display repo information when data is available', () => {
    component.repos = [
      {
        name: 'test-repo',
        html_url: 'https://github.com/test-user/test-repo',
        description: 'This is a test repo',
        language: 'typescript'
      },
    ];
    fixture.detectChanges();

    const repoName = fixture.debugElement.query(By.css('.repo-name'));
    expect(repoName.nativeElement.textContent).toContain('test-repo');

    const repoDescription = fixture.debugElement.query(By.css('.repo-description'));
    expect(repoDescription.nativeElement.textContent).toContain('This is a test repo');

  });
});
