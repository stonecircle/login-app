import Ember from 'ember';

export default Ember.Mixin.create({
    i18n: Ember.inject.service(),

    beforeModel() {
        let routeName = this.get('routeName');
        $(document).attr('title', this.get('i18n').t(`titles.${routeName}`));
    }
});
