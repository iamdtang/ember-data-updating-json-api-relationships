import Ember from 'ember';
import UpdateRelationshipsSerializerMixin from 'ember-data-update-json-api-relationships-independently/mixins/serializer';
import { module, test } from 'qunit';

module('Unit | Mixin | serializer');

// Replace this with your real tests.
test('it works', function(assert) {
  let UpdateRelationshipsSerializerObject = Ember.Object.extend(UpdateRelationshipsSerializerMixin);
  let subject = UpdateRelationshipsSerializerObject.create();
  assert.ok(subject);
});
