import Ember from 'ember';

const { Service, inject } = Ember;

export default Service.extend({
    i18n: inject.service(),

    fetch() {
        Ember.$.getJSON('/i18n').then(this._addTranslations.bind(this));
    },

    _addTranslations(json) {
        const i18n = this.get('i18n');
        i18n.addTranslations('en', json);
    }
});
