import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {GitHubService} from '../../github.service';

@Page({
	templateUrl: './build/pages/repo-list/repo-list.html'
})
export class RepoList implements OnInit {
	username: string = 'neolwc';
	repos: any;

	constructor (private _githubService: GitHubService) {}

	getRepos (username) {
		this._githubService.getRepos(username)
			.subscribe(repos => this.repos = repos);
	}

	ngOnInit () {
		this.getRepos(this.username);
	}
}
