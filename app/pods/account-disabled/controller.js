import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),

    actions: {
        logOut() {
            window.location = '/api/logout?redirect=' + this.get('applicationController.redirect_uri');
        }
    }
});
