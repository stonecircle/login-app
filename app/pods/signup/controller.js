import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
        },
        password: {
            confirmation: true,
            // length: {
            //     minimum: 8
            // }
        },
        terms: {
            acceptance: true
        }
    },

    actions: {
        signUp: function(){
            return this.validate().then(function(){

                return Ember.$.post('/api/signup', {
                        email: this.get('email'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        terms: this.get('terms')
                    });

            }.bind(this))
            .then(function(){
                this.notifications.addNotification({
                    message:  "Success!",
                    type: 'info'
                });
            })
            .catch(function(err){

                var self = this;
                var keys = Ember.keys(err);
                var erroredYet = false;

                if(this.get('isInvalid')){
                    // For each validation error
                    keys.forEach(function(key){
                        if(!erroredYet && err.get(key + '.length')) {
                            err.get(key).forEach(function(errorMessage) {

                                console.log("face");
                                erroredYet = true;

                                self.notifications.addNotification({
                                    message:  errorMessage,
                                    type: 'error'
                                });
                            });
                        }
                    });
                } else {
                    console.log(err);
                    self.notifications.addNotification({
                        message:  "Error signing up: " + (err.message || err.responseText),
                        type: 'error'
                    });
                }

                return;

                if(err.email.length){
                    this.notifications.addNotification({
                        message: 'You must enter a valid email address',
                        type: 'error'
                    });
                }
                if (err.domain.length){
                    this.notifications.addNotification({
                        message: 'You must enter a valid domain',
                        type: 'error'
                    });
                }
                if (err.password.length){
                    this.notifications.addNotification({
                        message: 'Your password is invalid',
                        type: 'error'
                    });
                }
                if (err.terms.length){
                    this.notifications.addNotification({
                        message: 'You must agree to the Blooie terms',
                        type: 'error'
                    });
                }

            }.bind(this));
        }
    }
});
