import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs';

@Injectable()
export class GitHubService {
	constructor (private http: Http) {}

	private _url = 'https://api.github.com';
	private _key = '';
	private _link;

	getRepos (username) {
		let url = `${this._url}/users/${username}/repos`;
		if (this._key.length > 0) url += `?access_token=${this._key}`;
		return this.http.get(url)
			.map(res => res.json());
	}

	searchUsers (q) {
		let url = `${this._url}/search/users?q=${q}`;
		if (this._key.length > 0) url += `&access_token=${this._key}`;
		return this.http.get(url)
			.do(res => this._link = res.headers.get('Link'))
			.map(res => res.json());
	}

	linkTo(link) {
		let links = this._link.split(', ');
		let obj = {};
		links.forEach(link => obj[/rel="(next|last|first|prev)"/.exec(link)[1]] = /<(http\S*)>/.exec(link)[1]);
		return obj[link];
	}

	nextPage() {
		let url = this.linkTo('next');
		if (url) return this.http.get(url)
			.do(res => this._link = res.headers.get('Link'))
			.map(res => res.json());
	}
}
