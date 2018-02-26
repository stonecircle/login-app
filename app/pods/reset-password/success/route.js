import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  model() {
    return get(this, 'ajax').request(`${ENV.apiHost || ''}/api/settings`);
  }
});
