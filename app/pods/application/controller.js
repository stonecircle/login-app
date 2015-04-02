import Ember from 'ember';
import config from 'oauthloginapp/config/environment';

export default Ember.Controller.extend({
  urlPrefix: config.urlPrefix,

  queryParams: ['response_type', 'display', 'client_id', 'redirect_uri', 'scope', 'state'],

  response_type: '',
  display: '',
  client_id: '',
  redirect_uri: '',
  scope: '',
  state: ''
});
