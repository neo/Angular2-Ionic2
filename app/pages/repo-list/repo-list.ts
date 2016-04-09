import {Page, NavParams} from 'ionic-angular';
import {GitHubService} from '../../github.service';

@Page({
	templateUrl: './build/pages/repo-list/repo-list.html'
})
export class RepoList {
	username: string;
	repos: any;

	private _end: boolean;

	constructor (private _githubService: GitHubService,
		private _params: NavParams) {}

	getRepos (username) {
		this._githubService.getRepos(username)
			.subscribe(repos => this.repos = repos);
	}

	onPageDidEnter () {
		this.username = this._params.get('username');
		this.getRepos(this.username);
	}

	scroll(infiniteScroll) {
		this._githubService.nextPage('repos')
			.subscribe(data => {
				this.repos = this.repos.concat(data);
				infiniteScroll.complete();
			}, error => {
				if (error.end) this._end = true;
				infiniteScroll.enable(false);
			});
	}
}
