import Ember from 'ember';

export default Ember.Route.extend({
    redirect(model, transition) {
        this.transitionTo('signin', {queryParams: transition.queryParams});
    }
});
