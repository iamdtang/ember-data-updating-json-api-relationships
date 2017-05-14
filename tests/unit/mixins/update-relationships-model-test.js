import Ember from 'ember';
import UpdateRelationshipsModelMixin from 'ember-data-update-json-api-relationships-independently/mixins/update-relationships-model';
import { module, test } from 'qunit';

module('Unit | Mixin | update relationships model');

// Replace this with your real tests.
test('it works', function(assert) {
  let UpdateRelationshipsModelObject = Ember.Object.extend(UpdateRelationshipsModelMixin);
  let subject = UpdateRelationshipsModelObject.create();
  assert.ok(subject);
});
