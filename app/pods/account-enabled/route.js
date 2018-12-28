import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp'
import fetch from 'fetch';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  model(){
    return hash({
      settings: fetch(`${ENV.apiHost || ''}/settings`).then(function(response) {
        return response.json();
      }),
      user: this.store.find('user', 'me').then(null, () => {
        // ignore error
      }),
    });
  }
});
