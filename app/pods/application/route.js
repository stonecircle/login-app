import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  i18n: service(),

  beforeModel() {
    this.ajax.request(`${ENV.apiHost || ''}/i18n`).then((translations) => {
      this.i18n.addTranslations('en', translations);
    })
  },

  model() {
    return this.ajax.request(`${ENV.apiHost || ''}/settings/login`);
  }
});
