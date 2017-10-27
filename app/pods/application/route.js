import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  i18n: service(),

  beforeModel() {
    get(this, 'ajax').request('/i18n').then((translations) => {
      get(this, 'i18n').addTranslations('en', translations);
    })
  },

  model() {
    return get(this, 'ajax').request('/settings/login');
  }
});
