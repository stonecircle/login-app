import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  directLogo: computed('login', function() {
    switch(get(this, 'login')) {
      case 'freeagent':
        return get(this, 'login');
    }
  }),

  loginIcon: computed('login', function() {
    return `${get(this, 'login')}-square`;
  }),

  actions: {
    socialLogin(login) {
      // TODO remove the need for bubbling here
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('socialLogin', login);
    }
  }
});
