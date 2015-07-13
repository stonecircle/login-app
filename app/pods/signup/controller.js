import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
    needs: ['application'],
    validations: {
        email: {
            'is-email': true
        },
        password: {
            confirmation: true,
            presence: true
        },
        terms: {
            acceptance: {
                'if': function(object) {
                    if (object.get('termsLink')) {
                        return true;
                    }
                }
            }
        }
    },

    termsLink: Ember.computed.alias('controllers.application.model.termsLink'),

    actions: {
        signUp() {
            this.notifications.set('content', Ember.A());
            return this.validate().then(() => {

                    return Ember.$.post('/api/signup', {
                        email: this.get('email'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        terms: this.get('terms'),
                        redirect_uri: this.get('controllers.application.redirect_uri'),
                        client_id: this.get('controllers.application.client_id')
                    });

                })
                .then(() => {
                    this.notifications.addNotification({
                        message: "Success!",
                        type: 'info'
                    });

                    //success
                    location.reload();
                })
                .catch((err) => {
                    var keys = Ember.keys(err);
                    var erroredYet = false;

                    if (this.get('isInvalid')) {
                        // For each validation error
                        keys.forEach((key) => {
                            if (!erroredYet && err.get(key + '.length')) {
                                err.get(key).forEach((errorMessage) => {

                                    erroredYet = true;

                                    this.notifications.addNotification({
                                        message: errorMessage,
                                        type: 'error'
                                    });
                                });
                            }
                        });
                    } else {
                        this.notifications.addNotification({
                            message: "Error signing up: " + (err.message || err.responseText),
                            type: 'error'
                        });
                    }

                });
        }
    }
});
