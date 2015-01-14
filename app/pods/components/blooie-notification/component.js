import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: [':notification', 'notification.type', 'dismiss::in', ':pad1', ':center-block'],

    // Set icon depending on notification type
    notificationIcon: function() {
        switch(this.get('notification.type')){
            case "info":
                return 'fa-info-circle';
            case "success":
                return 'fa-check';
            case "warning":
                return 'fa-warning';
            case "error":
                return 'fa-warning';
        }
    }.property('notification.type'),

    actions: {
        removeNotification: function() {
            this.set('dismiss', true);
            Ember.run.later(this, function() {
                this.notifications.removeNotification(this.get('notification'));
            }.bind(this), 500);
        }
    }
});
