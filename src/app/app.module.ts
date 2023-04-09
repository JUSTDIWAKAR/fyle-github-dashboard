import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardDisplayComponent } from './core/user-dashboard-display/user-dashboard-display.component';
import { UserReposListingComponent } from './core/user-dashboard-display/user-repos-listing/user-repos-listing.component';
import { UserDetailsComponent } from './core/user-dashboard-display/user-details/user-details.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MessageService, PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    UserDashboardDisplayComponent,
    UserReposListingComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    SkeletonModule,
    PaginatorModule,
    AvatarModule,
    FormsModule,
    CommonModule,
    TableModule
  ],
  providers: [PrimeIcons, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
