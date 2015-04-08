import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    needs: ['application'],
    validations: {
        email: {
            'is-email': true
        },
        password: {
            confirmation: true
        },
        terms: {
            acceptance: {
                'if' : function(object){
                    if(object.get('termsLink')){
                        return true;
                    }
                }
            }
        }
    },

    actions: {
        signUp: function(){
            return this.validate().then(function(){

                return Ember.$.post('/api/signup', {
                        email: this.get('email'),
                        password: this.get('password'),
                        passwordConfirmation: this.get('passwordConfirmation'),
                        terms: this.get('terms'),
                        redirect_uri: this.get('controllers.application.redirect_uri'),
                        client_id: this.get('controllers.application.client_id')
                    });

            }.bind(this))
            .then(() => {
                this.notifications.addNotification({
                    message:  "Success!",
                    type: 'info'
                });

                //success
                location.reload();
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

                                erroredYet = true;

                                self.notifications.addNotification({
                                    message:  errorMessage,
                                    type: 'error'
                                });
                            });
                        }
                    });
                } else {
                    self.notifications.addNotification({
                        message:  "Error signing up: " + (err.message || err.responseText),
                        type: 'error'
                    });
                }

            }.bind(this));
        }
    }
});
