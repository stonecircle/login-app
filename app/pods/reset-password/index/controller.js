import Controller, { inject as controller } from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

import ENV from '@authmaker/login-app/config/environment';

const Validations = buildValidations({
  email: validator('format', {
    type: 'email'
  }),
});

export default Controller.extend(Validations, {
  ajax: service(),
  notifications: service('notification-messages'),

  applicationController: controller('application'),

  actions: {
    resetPassword() {
      get(this, 'notifications').clearAll();

      if (!get(this, 'validations.isValid')) {
        const firstError = get(this, 'validations.errors.0');
        return get(this, 'notifications').error(`${get(firstError, 'attribute')}: ${get(firstError, 'message')}`);
      }

      return get(this, 'ajax').post(`${ENV.apiHost || ''}/v1/password/requestReset`, {
        dataType: 'text',
        data: {
          email: this.get('email'),
          redirectUri: this.get('applicationController.redirect_uri'),
          clientId: this.get('applicationController.client_id')
        },
      })
      .then(() => {
        this.transitionToRoute('reset-password.reset-sent');
      }).catch((err) => {
        get(this, 'notifications').error(`Error resetting password: ${err.payload}`);
      });
    }
  }
});
