import Ember from 'ember';
import UpdateRelationshipsAdapterMixin from 'ember-data-update-json-api-relationships-independently/mixins/update-relationships-adapter';
import { module, test } from 'qunit';

module('Unit | Mixin | update relationships adapter');

// Replace this with your real tests.
test('it works', function(assert) {
  let UpdateRelationshipsAdapterObject = Ember.Object.extend(UpdateRelationshipsAdapterMixin);
  let subject = UpdateRelationshipsAdapterObject.create();
  assert.ok(subject);
});
