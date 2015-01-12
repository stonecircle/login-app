import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
        },
        domain: {
            'is-url': true
        },
        password: {
            presence: true
        },
        terms: {
            confirmation: true
        }
    },

    actions: {
        signUp: function(){
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
                if (err.domain.length){
                    return this.set('error', 'You must enter a valid domain');
                }
                if (err.password.length){
                    return this.set('error', 'Your password is incorrect');
                }
                if (err.terms.length){
                    return this.set('error', 'You must agree to the Blooie terms');
                }

            }.bind(this));
        }
    }
});
