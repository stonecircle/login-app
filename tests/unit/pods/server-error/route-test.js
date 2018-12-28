import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('route:server-error', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:server-error');
    assert.ok(route);
  });
});
