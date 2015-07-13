import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
    needs: ['application'],

    validations: {
        email: {
            'is-email': true
        }
    },

    actions: {
        resetPassword: function(){
            this.notifications.set('content', Ember.A());

            return this.validate()
            .then(() => {
                return Ember.$.post('/api/password/requestReset', {
                        email: this.get('email'),
                        redirect_uri: this.get('controllers.application.redirect_uri'),
                        client_id: this.get('controllers.application.client_id')
                    });
            })
            .then(() => {
                this.notifications.addNotification({
                    message:  'Reset email sent successfully, please check your inbox for more instructions',
                    type: 'info'
                });
            }).catch((err) => {
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
                        message:  "Error signing in: " + (err.message || err.responseText),
                        type: 'error'
                    });
                }

            });
        }
    }
});
