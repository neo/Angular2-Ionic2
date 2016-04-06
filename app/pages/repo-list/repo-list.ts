import {Page} from 'ionic-angular';
import {GitHubService} from '../../github.service';

@Page({
	templateUrl: './build/pages/repo-list/repo-list.html'
})
export class RepoList {
	username: string = 'neolwc';
	repos: any;

	constructor (private _githubService: GitHubService) {}

	getRepos (username) {
		this._githubService.getRepos(username)
			.subscribe(repos => this.repos = repos);
	}

	onPageDidEnter () {
		this.getRepos(this.username);
	}
}
