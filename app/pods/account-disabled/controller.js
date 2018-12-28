import Controller, { inject as controller } from '@ember/controller';
import { get, getProperties, computed } from '@ember/object';
import { alias } from '@ember/object/computed'

export default Controller.extend({
    application: controller(),

    options: alias('application.model'),

    formLink: computed('options.formLink', function() {
      let formAttributes = getProperties(this.model, 'email', 'displayName', 'originalId');

      let queryString = Object.keys(formAttributes).map((key) => {
        if (!formAttributes[key]) {
          return null;
        }

        return `${key.toLowerCase()}=${encodeURIComponent(formAttributes[key])}`
      }).filter(Boolean).join('&');

      return [get(this, 'options.formLink'), queryString].join('?');
    }),

    actions: {
      logOut() {
          window.location = `/api/logout?redirect=${this.get('application.redirect_uri')}`;
      }
    }
});
