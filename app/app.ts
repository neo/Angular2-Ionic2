import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS} from 'angular2/http';
import {GitHubService} from './github.service';
import {SearchUsers} from './pages/search-users/search-users';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [HTTP_PROVIDERS, GitHubService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = SearchUsers;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
