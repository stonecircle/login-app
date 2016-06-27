import Ember from 'ember';
import TransitionActionMixin from '../../../mixins/transition-action';
import { module, test } from 'qunit';

module('Unit | Mixin | transition action');

// Replace this with your real tests.
test('it works', function(assert) {
  var TransitionActionObject = Ember.Object.extend(TransitionActionMixin);
  var subject = TransitionActionObject.create();
  assert.ok(subject);
});
