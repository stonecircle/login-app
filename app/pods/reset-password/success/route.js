import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  model() {
    return this.ajax.request(`${ENV.apiHost || ''}/api/settings`);
  }
});
