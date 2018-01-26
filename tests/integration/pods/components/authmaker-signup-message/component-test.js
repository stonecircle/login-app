import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('authmaker-signup-message', 'Integration | Component | authmaker signup message', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{authmaker-signup-message}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#authmaker-signup-message}}
      template block text
    {{/authmaker-signup-message}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
