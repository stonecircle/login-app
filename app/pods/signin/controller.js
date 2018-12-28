import Controller from '@ember/controller';
import SocialLogins from '@authmaker/login-app/mixins/social-logins';

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: validator('format', {
    type: 'email'
  }),
  password: validator('presence', {
    presence: true,
  }),
});

export default Controller.extend(Validations, SocialLogins, {
  ajax: service(),
  notifications: service('notification-messages'),

  actions: {
    signIn() {
      this.notifications.clearAll()

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return this.notifications.error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return this.ajax.post('/api/login', {
        dataType: 'text',
        data: {
          email: this.email,
          password: this.password
        },
      }).then(() => {
        //success
        location.reload();
      })
      .catch((err) => {
        this.notifications.error(`Error signing in: ${err.payload.message}`);
      });
    }
  }
});
