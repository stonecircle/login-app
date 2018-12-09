import Mixin from '@ember/object/mixin';
import { inject as controller } from '@ember/controller';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Mixin.create({
  application: controller(),

  queryParams: ['logins'],

  socialLogins: alias('application.model.socialLogins'),
  onlySocialLogins: alias('application.model.onlySocialLogins'),
  limitSocialLogins: alias('application.model.limitSocialLogins'),

  shownSocialLogins: computed('socialLogins.[]', 'logins.[]', function() {
    const socialLogins = this.get('socialLogins') || [];

    if(!get(this, 'limitSocialLogins')) {
      return socialLogins;
    }

    return socialLogins.filter((login) => {
      return (this.get('logins') ? this.get('logins').split(',') : []).find(function(allow) {
        return login === allow;
      });
    });
  }),
  actions: {
    socialLogin(login) {
      var clientId = window.location.search.match(/client_id=([^&]+)/)[1];
      window.location = `/connect/${login}?redirect=${encodeURIComponent(window.location.href)}&clientId=${clientId}`;
    },
  },
});
