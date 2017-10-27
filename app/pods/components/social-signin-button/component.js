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
      this.sendAction('socialLogin', login);
    }
  }
});
