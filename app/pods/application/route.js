import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
    translationsFetch: inject.service(),

    beforeModel() {
        return this.get('translationsFetch').fetch();
    },

    model() {
        return Ember.$.getJSON('/settings/login');
    }
});
