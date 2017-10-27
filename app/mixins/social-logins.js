import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),

  queryParams: ['logins'],

  socialLogins: Ember.computed.alias('application.model.socialLogins'),

  shownSocialLogins: Ember.computed('socialLogins.[]', 'logins.[]', function() {
    const socialLogins = this.get('socialLogins') || [];
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
