import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            'is-email': true
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
            return this.validate()
            .then(function(){
                Ember.$.post('localauth.bloo.ie/sign_up', {
                    email: this.get('email'),
                    password: this.get('password'),
                    tnc: true
                }, function(err, data){
                    if(err){
                        this.notifications.addNotification({
                            message: 'Signup failed, please try again',
                            type: 'error'
                        });

                        return;
                    }

                    this.notifications.addNotification({
                        message: 'Signup failed, please try again',
                        type: 'success'
                    });
                }.bind(this));
            }.bind(this)).catch(function(err){
                if(err.email.length){
                    this.notifications.addNotification({
                        message: 'You must enter a valid email address',
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
