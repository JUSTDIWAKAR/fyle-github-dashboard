import { Component, Input } from '@angular/core';
import { GithubUser } from 'src/app/shared/models/user-info.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user?: GithubUser | null;
}
