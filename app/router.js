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
});

export default Router;
