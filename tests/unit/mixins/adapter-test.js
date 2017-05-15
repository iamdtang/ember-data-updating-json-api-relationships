import Ember from 'ember';
import UpdateRelationshipsAdapterMixin from 'ember-data-updating-json-api-relationships/mixins/adapter';
import { module, test } from 'qunit';

module('Unit | Mixin | adapter');

test('it works', function(assert) {
  let UpdateRelationshipsAdapterObject = Ember.Object.extend(UpdateRelationshipsAdapterMixin);
  let subject = UpdateRelationshipsAdapterObject.create();
  assert.ok(subject);
});
