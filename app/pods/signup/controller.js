import Ember from 'ember';
import SocialLogins from 'authmaker-login-app/mixins/social-logins';

import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    disabled: computed.not('model.options.askName')
  }),
  website: validator('format', {
    type: 'url',
    disabled: computed.not('model.options.askWebsite')
  }),
  companyName: validator('presence', {
    presence: true,
    disabled: computed.not('model.options.askCompany')
  }),
  contactNumber: validator('presence', {
    presence: true,
    disabled: computed.not('model.options.askContactNumber')
  }),
  email: validator('format', {
    type: 'email'
  }),
  password: validator('presence', {
    presence: true,
  }),

  passwordConfirmation: validator('confirmation', {
    on: 'password',
    message: 'Passwords do not match'
  }),
});

export default Ember.Controller.extend(SocialLogins, Validations, {
  ajax: service(),
  notifications: service('notification-messages'),

  options: Ember.computed.alias('application.model'),

  emailSubscribe: true, //default to true

  actions: {
    signUp() {
      get(this, 'notifications').clearAll();

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return get(this, 'notifications').error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return get(this, 'ajax').post('/api/signup', {
        dataType: 'text',
        data: {
          client_id: this.get('application.client_id'),
          email: this.get('email'),
          emailSubscribe: this.get('emailSubscribe') && this.get('options.emailSubscribe'),
          name: this.get('name'),
          companyName: this.get('companyName'),
          contactNumber: this.get('contactNumber'),
          website: this.get('website'),
          password: this.get('password'),
          passwordConfirmation: this.get('passwordConfirmation'),
          previous_location: this.get('application.previous_location'),
          redirect_uri: this.get('application.redirect_uri'),
          terms: this.get('terms'),
        }
      })
        .then(() => {
          get(this, 'notifications').info("Success!", {
            autoClear: true,
          });

          //success
          location.reload();
        })
        .catch((err) => {
          get(this, 'notifications').error(`Error signing up:  ${err.payload}`);
        });
    }
  }
});
