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
            return this.validate().then(function(){
                this.set('message', 'Reset email sent successfully, please check your inbox for more instructions');
                this.get('content').save().then(function(){

                }.bind(this), function(err){
                    this.set('error', err.message);

                    throw err;
                }.bind(this));
            }.bind(this)).catch(function(err){
                if(err.email.length){
                    return this.set('error', 'There is no account associated with this email');
                }

            }.bind(this));
        }
    }
});
