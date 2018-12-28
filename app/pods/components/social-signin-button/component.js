import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  directLogo: computed('login', function() {
    switch(this.login) {
      case 'freeagent':
        return this.login;
    }
  }),

  loginIcon: computed('login', function() {
    return `${this.login}-square`;
  }),

  actions: {
    socialLogin(login) {
      // TODO remove the need for bubbling here
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('socialLogin', login);
    }
  }
});
