import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  email: DS.attr('string'),
  originalId: DS.attr('string'),
});
