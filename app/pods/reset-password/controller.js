import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
        }
    },

    actions: {
        resetPassword: function(){
            return this.validate()
            .then(function(){
                Ember.$.post('localauth.bloo.ie/reset_password', {
                }, function(err, data){
                    if(err){
                        this.notifications.addNotification({
                            message: 'There is no account associated with this email',
                            type: 'error'
                        });
                        return;
                    }

                    this.set('message', 'Reset email sent successfully, please check your inbox for more instructions');
                }.bind(this));
            }.bind(this)).catch(function(err){
                if(err.email.length){
                    this.notifications.addNotification({
                        message: 'You must enter a valid email address',
                        type: 'error'
                    });
                }

            }.bind(this));
        }
    }
});
