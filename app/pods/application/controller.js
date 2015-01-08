import Ember from 'ember';
import config from 'oauthloginapp/config/environment';

export default Ember.Controller.extend({
  urlPrefix: config.urlPrefix
});
