import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signin');

  this.route('authorize');
  this.route('signup');
  this.route('download');
  this.route('reset-password', function(){
      this.route('confirm');
      this.route('success');
      this.route('reset-sent');
  });
  this.route('confirm-password');
  this.route('account-enabled');
  this.route('account-disabled');
  this.route('server-error');

  this.route('admin', { path: '/*path' });
});

export default Router;
