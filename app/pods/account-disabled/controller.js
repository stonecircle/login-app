import Controller, { inject as controller } from '@ember/controller';
import { alias } from '@ember/object/computed'

export default Controller.extend({
    application: controller(),

    options: alias('application.model'),

    actions: {
        logOut() {
            window.location = `/api/logout?redirect=${this.get('application.redirect_uri')}`;
        }
    }
});
