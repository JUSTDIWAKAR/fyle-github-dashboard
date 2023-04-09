import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GithubUser, RepoInfo, Repository } from 'src/app/shared/models/user-info.model';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom-error-handler.service';
import { GithubDevApiService } from 'src/app/shared/services/github-dev-api.service';

@Component({
  selector: 'app-user-dashboard-display',
  templateUrl: './user-dashboard-display.component.html',
  styleUrls: ['./user-dashboard-display.component.scss']
})
export class UserDashboardDisplayComponent {
  username: string = '';
  user?: GithubUser | null;
  repos: RepoInfo[] = []; 
  totalRepos: number = 0;
  isProfileLoading: boolean = false;
  isRepoLoading: boolean = false;
  isInvalidUserEntry: boolean = false;

  constructor(private githubDevService: GithubDevApiService,
    private errorHandler: CustomErrorHandlerService) { }

  getUserProfile() {
    this.isProfileLoading = true;
    this.username = this.username.trim();
    this.githubDevService.getUserDataByUsername(this.username).subscribe({
      next: (user: GithubUser) => {
        this.user = user;
        this.isProfileLoading = false;
        if (this.user?.public_repos) {
          this.totalRepos = this.user.public_repos;
          this.getUserRepos();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        this.isProfileLoading = false;
        if (err.status === 404) {
          this.isInvalidUserEntry = true;
        }
      }
    });
  }

  getUserRepos() {
    this.isRepoLoading = true;
    this.githubDevService.getUserReposByUsername(this.username, 1, 10).subscribe({
      next: (resp: Repository) => {
        this.repos = resp.items;
        this.isRepoLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        this.isRepoLoading = false;
      }
    });
  }

}
