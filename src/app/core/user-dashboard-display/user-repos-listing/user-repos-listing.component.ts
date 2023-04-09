import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { LazyLoadEvent, PrimeIcons } from 'primeng/api';
import { RepoInfo, Repository } from 'src/app/shared/models/user-info.model';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom-error-handler.service';
import { GithubDevApiService } from 'src/app/shared/services/github-dev-api.service';

@Component({
  selector: 'app-user-repos-listing',
  templateUrl: './user-repos-listing.component.html',
  styleUrls: ['./user-repos-listing.component.scss']
})
export class UserReposListingComponent {
  @Input() repos: RepoInfo[] = []; 
  @Input() username: string = '';
  @Input() totalRepos: number = 0;
  @Input()isRepoLoading: boolean = false;
  @Input() publicRepoLength: number = 0;
  first = 0;
  pageSize: number = 10;
  pageSizes: number[] = [10, 15, 25, 50, 100];
  previousIcon = PrimeIcons.CHEVRON_LEFT;
  nextIcon = PrimeIcons.CHEVRON_RIGHT;

  constructor(private githubDevService: GithubDevApiService,
    private errorHandler: CustomErrorHandlerService) { }

  getUserRepos(pageNumber: number = 1, pageSize: number = 10) {
    this.isRepoLoading = true;
    this.githubDevService.getUserReposByUsername(this.username, pageNumber, pageSize).subscribe({
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

  loadRepos(event: LazyLoadEvent) {   
    const first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.first = Math.floor(first / this.pageSize) + 1;
    this.getUserRepos(this.first, this.pageSize);
  }
}
