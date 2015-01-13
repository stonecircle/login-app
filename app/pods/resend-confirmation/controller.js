import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
        }
    },

    actions: {
        resendConfirmation: function(){
            return this.validate().then(function(){
                this.set('message', 'Confirmation email sent successfully, please check your inbox for more instructions');
                this.get('content').save().then(function(){

                }.bind(this), function(err){
                    this.set('error', err.message);

                    throw err;
                }.bind(this));
            }.bind(this)).catch(function(err){
                if(err.email.length){
                    this.notifications.addNotification({
                        message: 'There is no account associated with this email',
                        type: 'error'
                    });
                }

            }.bind(this));
        }
    }
});
