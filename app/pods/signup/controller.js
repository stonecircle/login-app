import { not, alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import SocialLogins from '@authmaker/login-app/mixins/social-logins';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    disabled: not('model.options.askName')
  }),
  website: validator('format', {
    type: 'url',
    disabled: not('model.options.askWebsite')
  }),
  companyName: validator('presence', {
    presence: true,
    disabled: not('model.options.askCompany')
  }),
  contactNumber: validator('presence', {
    presence: true,
    disabled: not('model.options.askContactNumber')
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

export default Controller.extend(SocialLogins, Validations, {
  ajax: service(),
  notifications: service('notification-messages'),

  options: alias('application.model'),

  emailSubscribe: true, //default to true

  actions: {
    signUp() {
      this.notifications.clearAll();

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return this.notifications.error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return this.ajax.post('/api/signup', {
        dataType: 'text',
        data: {
          client_id: this.get('application.client_id'),
          email: this.email,
          emailSubscribe: this.emailSubscribe && this.get('options.emailSubscribe'),
          name: this.name,
          companyName: this.companyName,
          contactNumber: this.contactNumber,
          website: this.website,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          previous_location: this.get('application.previous_location'),
          redirect_uri: this.get('application.redirect_uri'),
          terms: this.terms,
        }
      })
        .then(() => {
          this.notifications.info("Success!", {
            autoClear: true,
          });

          //success
          location.reload();
        })
        .catch((err) => {
          this.notifications.error(`Error signing up:  ${err.payload}`);
        });
    }
  }
});
