import Ember from 'ember';

export default Ember.Component.extend({
    loginClass: Ember.computed('login', function() {
        return `btn-${this.get('login')}`;
    })
});
