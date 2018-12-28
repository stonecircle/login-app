import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import { validator, buildValidations } from 'ember-cp-validations';

import ENV from '@authmaker/login-app/config/environment';

const Validations = buildValidations({
  password: validator('presence', {
    presence: true,
  }),

  passwordConfirmation: validator('confirmation', {
    on: 'password',
    message: 'Passwords do not match'
  }),
});

export default Controller.extend(Validations, {
  notifications: service('notification-messages'),
  ajax: service(),

  applicationController: controller('application'),
  queryParams: ['email', 'code'],

  email: '',
  code: '',

  actions: {
    resetPassword() {
      this.notifications.clearAll()

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return this.notifications.error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return this.ajax.post(`${ENV.apiHost || ''}/v1/password/reset`, {
        dataType: 'text',
        data: {
          email: this.email,
          resetCode: this.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          redirect_uri: this.get('applicationController.redirect_uri'),
          client_id: this.get('applicationController.client_id')
        }
      }).then(() => {
        this.transitionToRoute('reset-password.success');
      })
      .catch((err) => {
        this.notifications.error(`Error updating password: ${err.payload}`);
      });
    }
  }
});
