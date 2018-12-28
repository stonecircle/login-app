import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp'

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  model(){
    return hash({
      settings: this.ajax.request(`${ENV.apiHost || ''}/api/settings`),
      user: this.store.find('user', 'me').then(null, () => {
        // ignore error
      }),
    });
  }
});
