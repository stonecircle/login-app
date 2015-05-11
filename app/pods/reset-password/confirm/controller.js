import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {

    needs: ['application'],
    queryParams: ['email', 'code'],

    email: '',
    code: '',

    validations: {
        password: {
            presence: true,
            confirmation: true
        }
    },

    actions: {
        resetPassword(){
            this.notifications.set('content', Ember.A());
            
            return this.validate().then(() => {
                return Ember.$.post('/api/password/reset', {
                        email: this.get('email'),
                        resetCode: this.get('code'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        redirect_uri: this.get('controllers.application.redirect_uri'),
                        client_id: this.get('controllers.application.client_id')
                    });
            })
            .then(() => {
                this.notifications.addNotification({
                    message:  'Password reset successfully, you can now login to the application.',
                    type: 'success'
                });
            })
            .catch((err) => {
                var keys = Ember.keys(err);
                var erroredYet = false;

                if(this.get('isInvalid')){
                    // For each validation error
                    keys.forEach((key) => {
                        if(!erroredYet && err.get(key + '.length')) {
                            err.get(key).forEach((errorMessage) => {

                                erroredYet = true;

                                this.notifications.addNotification({
                                    message:  errorMessage,
                                    type: 'error'
                                });
                            });
                        }
                    });
                } else {

                    this.notifications.addNotification({
                        message:  "Error updating password: " + (err.message || err.responseText),
                        type: 'error'
                    });
                }
            });
        }
    }
});
