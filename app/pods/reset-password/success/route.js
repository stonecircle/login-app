import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  model() {
    return fetch(`${ENV.apiHost || ''}/settings`).then(function(response) {
      return response.json();
    });
  }
});
