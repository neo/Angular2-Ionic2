import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class GitHubService {
	constructor (private http: Http) {}

	private _url = 'https://api.github.com';
	private _key = '';
	private _link = {};

	getRepos (username) {
		let url = `${this._url}/users/${username}/repos`;
		if (this._key.length > 0) url += `?access_token=${this._key}`;
		return this.http.get(url)
			.do(res => this._link['repos'] = res.headers.get('Link'))
			.map(res => res.json());
	}

	searchUsers (q) {
		let url = `${this._url}/search/users?q=${q}`;
		if (this._key.length > 0) url += `&access_token=${this._key}`;
		return this.http.get(url)
			.do(res => this._link['users'] = res.headers.get('Link'))
			.map(res => res.json());
	}

	linkTo(name, prop) {
		if (!this._link[name]) return;
		let links = this._link[name].split(', ');
		let obj = {};
		links.forEach(link => obj[/rel="(next|last|first|prev)"/.exec(link)[1]] = /<(http\S*)>/.exec(link)[1]);
		return obj[prop];
	}

	nextPage(name) {
		let url = this.linkTo(name, 'next');
		if (url) return this.http.get(url)
			.do(res => this._link[name] = res.headers.get('Link'))
			.map(res => res.json());
		else return Observable.throw({"end": true});
	}
}
