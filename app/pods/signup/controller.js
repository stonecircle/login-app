import Ember from 'ember';
import EmberValidations from 'ember-validations';
import SocialLogins from 'authmaker-login-app/mixins/social-logins';

export default Ember.Controller.extend(EmberValidations, SocialLogins, {
    validations: {
        name: {
            presence: {
                'if': function(object){
                    if(object.get('options.askName')) {
                        return true;
                    }
                }
            }
        },
        companyName: {
            presence: {
                'if': function(object){
                    if(object.get('options.askCompany')) {
                        return true;
                    }
                }
            }
        },
        phone: {
            presence: {
                'if': function(object){
                    if(object.get('options.askPhone')) {
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
                    if (object.get('options.termsLink')) {
                        return true;
                    }
                }
            }
        }
    },

    options: Ember.computed.alias('application.model'),

    emailSubscribe: true, //default to true

    actions: {
        signUp() {
            this.notifications.set('content', Ember.A());
            return this.validate().then(() => {

                    return Ember.$.post('/api/signup', {
                        client_id: this.get('application.client_id'),
                        email: this.get('email'),
                        emailSubscribe: this.get('emailSubscribe') && this.get('options.emailSubscribe'),
                        name: this.get('name'),
                        companyName: this.get('companyName'),
                        phone: this.get('phone'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        previous_location: this.get('application.previous_location'),
                        redirect_uri: this.get('application.redirect_uri'),
                        terms: this.get('terms'),
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
