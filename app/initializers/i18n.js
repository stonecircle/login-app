import Ember from 'ember';

var i18n = {
    name: 'i18n',
    initialize(container, application) {
        application.deferReadiness();

        Ember.$.getJSON("/i18n", function(json) {
            Ember.I18n.translations = json;
            application.advanceReadiness();
        });

        Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;
    }
};

export default i18n;
