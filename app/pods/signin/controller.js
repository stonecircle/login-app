import Ember from 'ember';
import EmberValidations from 'ember-validations';
import SocialLogins from 'authmaker-login-app/mixins/social-logins';

export default Ember.Controller.extend(EmberValidations, SocialLogins, {

    validations: {
        email: {
            'is-email': true
        },
        password: {
            presence: true
        }
    },

    actions: {
        signIn() {
            this.notifications.set('content', Ember.A());
            return this.validate().then(function(){
                return Ember.$.post('/api/login', {
                        email: this.get('email'),
                        password: this.get('password')
                    });
            }.bind(this))
            .then(function(){
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
                                    message: errorMessage,
                                    type: 'error'
                                });
                            });
                        }
                    });
                } else {

                    self.notifications.addNotification({
                        message:  "Error signing in: " + (err.message || err.responseText),
                        type: 'error'
                    });
                }

            }.bind(this));
        }
    }
});
