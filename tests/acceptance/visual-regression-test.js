import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

const pages = [
  '/signin',
  '/authorize',
  '/signup',
  '/download',
  '/reset-password/confirm',
  '/reset-password/success',
  '/reset-password/reset-sent',
  '/confirm-password',
  '/account-enabled',
  '/account-disabled',
  '/server-error',
  '/admin',
];

module('Acceptance | visual-regression', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('percy snapshots', async function(assert) {
    assert.expect(0);
    await pages.reduce(async (prev, page) => {
      await prev;

      await visit(page);

      await percySnapshot(`${page} page`);
    }, Promise.resolve())
  });
});
