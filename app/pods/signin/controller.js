import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
        },
        password: {
            presence: true
        }
    },

    actions: {
        submit: function(){
            this.set('isSubmitted', true);

            return this.validate().then(function(){
                this.set('message', 'Success!');
                this.get('content').save().then(function(){

                }.bind(this), function(err){
                    this.set('error', err.message);

                    throw err;
                }.bind(this));
            }.bind(this)).catch(function(err){
                if(err.email.length){
                    return this.set('error', 'You must enter a valid email address');
                }
                if (err.password.length){
                    return this.set('error', 'Your password is incorrect');
                }

            }.bind(this));
        }
    }
});
