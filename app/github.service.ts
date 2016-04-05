import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs';

@Injectable()
export class GitHubService {
	constructor (private http: Http) {}

	private _url = 'https://api.github.com';
	private _key = '';

	getRepos (username) {
		return this.http.get(this._url + '/users/' + username + '/repos' + '?access_token=' + this._key)
			.map(res => res.json())
	}
}
