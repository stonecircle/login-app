import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
    application: controller(),

    actions: {
        logOut() {
            window.location = `/api/logout?redirect=${this.get('application.redirect_uri')}`;
        }
    }
});
