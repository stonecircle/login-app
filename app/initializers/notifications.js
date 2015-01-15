import NotificationsService from 'oauthloginapp/classes/NotificationsService';

export default {
    name: 'notificationsService',

    initialize: function(container, application) {
        application.register('notifications:service', NotificationsService);

        ['controller', 'component', 'route', 'router'].forEach(function(injectionTarget) {
            application.inject(injectionTarget, 'notifications', 'notifications:service');
        });
    }
};
