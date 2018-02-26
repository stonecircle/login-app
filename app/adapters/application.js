import DS from 'ember-data';
import ENV from '@authmaker/login-app/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: ENV.apiNamespace,
  host: ENV.apiHost,
});
