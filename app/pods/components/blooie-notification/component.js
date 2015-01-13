import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: [':notification', 'notification.type', 'dismiss::in', ':pad1', ':center-block'],

    actions: {
        removeNotification: function() {
            this.set('dismiss', true);
            Ember.run.later(this, function() {
                this.notifications.removeNotification(this.get('notification'));
            }.bind(this), 500);
        }
    }
});
