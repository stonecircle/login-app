import Ember from 'ember';
import SocialLogins from 'authmaker-login-app/mixins/social-logins';

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

export default Ember.Controller.extend(Validations, SocialLogins, {
  ajax: service(),
  notifications: service('notification-messages'),

  actions: {
    signIn() {
      get(this, 'notifications').clearAll()

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return get(this, 'notifications').error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return get(this, 'ajax').post('/api/login', {
        dataType: 'text',
        data: {
          email: this.get('email'),
          password: this.get('password')
        },
      }).then(() => {
        //success
        location.reload();
      })
      .catch((err) => {
        get(this, 'notifications').error(`Error signing in: ${err.payload.message}`);
      });
    }
  }
});
