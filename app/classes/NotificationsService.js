import Ember from 'ember';

export default Ember.ArrayProxy.extend({
    content: Ember.A(),

    defaultClearDuration: 3200,

    addNotification: function(options) {

        var notification = {
            message: options.message,
            type: options.type || 'info', // info, success, warning, error
            autoClear: options.autoClear,
            clearDuration: options.clearDuration || this.get('defaultClearDuration')
        };

        this.pushObject(notification);

        if (notification.autoClear) {
            this.setupAutoClear(notification);
        }

        return notification;
    },

    removeNotification: function(notification) {
        this.removeObject(notification);
    },

    setupAutoClear: function(notification) {
        Ember.run.later(this, function() {
            // Hasn't been closed manually
            if (this.indexOf(notification) >= 0) {
                this.set('dismiss', true);
                this.removeNotification(notification);
            }
        }.bind(this), notification.clearDuration);
    }
});
