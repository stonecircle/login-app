import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

import ENV from '@authmaker/login-app/config/environment';

export default Route.extend({
  ajax: service(),
  i18n: service(),

  beforeModel() {
    return fetch(`${ENV.apiHost || ''}/i18n`).then(function(response) {
      return response.json();
    }).then((translations) => {
      this.i18n.addTranslations('en', translations);
    })
  },

  model() {
    return fetch(`${ENV.apiHost || ''}/settings/login`).then(function(response) {
      return response.json();
    });
  }
});
