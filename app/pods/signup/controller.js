import Ember from 'ember';
import EmberValidations from 'ember-validations';
import SocialLogins from 'authmaker-login-app/mixins/social-logins';

export default Ember.Controller.extend(EmberValidations, SocialLogins, {
    validations: {
        name: {
            presense: {
                'if': function(object){
                    if(object.get('askName')) {
                        return true;
                    }
                }
            }
        },
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

    termsLink: Ember.computed.alias('application.model.termsLink'),
    askName: Ember.computed.alias('application.model.askName'),

    actions: {
        signUp() {
            this.notifications.set('content', Ember.A());
            return this.validate().then(() => {

                    return Ember.$.post('/api/signup', {
                        name: this.get('name'),
                        email: this.get('email'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        terms: this.get('terms'),
                        redirect_uri: this.get('application.redirect_uri'),
                        client_id: this.get('application.client_id'),
                        previous_location: this.get('application.previous_location'),
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
