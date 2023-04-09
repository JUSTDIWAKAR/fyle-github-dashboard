
export interface GithubUser {
    login: string;
    name: string;
    avatar_url: string;
    public_repos: number;
    bio: string;
    location: string;
    twitter_username: string;
    html_url: string;
    username: string;
  }
  
  export interface RepoInfo {
    name: string;
    description: string;
    language: string;
    html_url: string;
  }

 export interface Repository {
    incomplete_results: Boolean;
    items: RepoInfo[];
    total_count: string;
  }