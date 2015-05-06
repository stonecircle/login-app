import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signin');

  this.route('authorize');
  this.route('signup');
  this.route('download');
  this.route('resend-confirmation');
  this.resource('reset-password', function(){
      this.route('confirm');
  });
  this.route('confirm-password');
  this.route('account-enabled');
  this.route('account-disabled');
  this.route('server-error');

  this.route('admin', { path: '/*path' });
});

export default Router;
