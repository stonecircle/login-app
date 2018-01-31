import Controller from '@ember/controller';
import config from '@authmaker/login-app/config/environment';

import { inject as service } from '@ember/service';

export default Controller.extend({
  i18n: service(),
  router: service(),

  urlPrefix: config.urlPrefix,

  queryParams: ['response_type', 'display', 'client_id', 'redirect_uri', 'scope', 'state', 'previous_location'],

  response_type: '',
  display: '',
  client_id: '',
  redirect_uri: '',
  scope: '',
  state: '',
  previous_location: ''
});
