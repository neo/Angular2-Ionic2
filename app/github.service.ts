import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs';

@Injectable()
export class GitHubService {
	constructor (private http: Http) {}

	private _url = 'https://api.github.com';
	private _key = '';

	getRepos (username) {
		let url = this._url + '/users/' + username + '/repos';
		if (this._key.length > 0) url += '?access_token=' + this._key;
		return this.http.get(url)
			.map(res => res.json())
	}
}
