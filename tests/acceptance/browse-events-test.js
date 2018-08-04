import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | browse events', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /events', async function(assert) {
    await visit('/events');

    assert.equal(currentURL(), '/events');
  });
  
  test('clicking the refresh link', async function(assert) {
    await visit('/events');
    await click('.refresh-click');
    assert.ok(this.element.querySelectorAll('.eventListing').length >= 2, "there should be more than 2 events"); 
  });
});
