import Ember from 'ember';
import UpdateRelationshipsAdapterMixin from 'ember-data-updating-json-api-relationships/mixins/adapter';
import { module, test } from 'qunit';
import td from 'testdouble';

module('Unit | Mixin | adapter');

test(`urlForUpdateRecord() retains the original behavior when updating a record`, function(assert) {
  let BaseAdapter = Ember.Object.extend({
    urlForUpdateRecord(id) {
      return `http://myapi.com/api/v1/articles/${id}`;
    }
  });
  let Adapter = BaseAdapter.extend(UpdateRelationshipsAdapterMixin);
  let adapter = Adapter.create();
  let snapshot = {};
  let url = adapter.urlForUpdateRecord('1', 'article', snapshot);
  assert.equal(url, 'http://myapi.com/api/v1/articles/1');
});

test(`urlForUpdateRecord() retains the original behavior when updating the
      record and urlForUpdateRelationship is present`, function(assert) {
  let BaseAdapter = Ember.Object.extend({
    urlForUpdateRecord(id) {
      return `http://myapi.com/api/v1/articles/${id}`;
    }
  });
  let Adapter = BaseAdapter.extend(UpdateRelationshipsAdapterMixin, {
    urlForUpdateRelationship() {
      return 'foo';
    }
  });
  let adapter = Adapter.create();
  let snapshot = {};
  let url = adapter.urlForUpdateRecord('1', 'article', snapshot);
  assert.equal(url, 'http://myapi.com/api/v1/articles/1');
});

test(`urlForUpdateRecord() when updating a to-many relationship and
      urlForUpdateRelationship is not present`, function(assert) {
  let BaseAdapter = Ember.Object.extend({
    urlForUpdateRecord(id) {
      return `http://myapi.com/api/v1/articles/${id}`;
    }
  });
  let Adapter = BaseAdapter.extend(UpdateRelationshipsAdapterMixin);
  let adapter = Adapter.create();
  let snapshot = {
    adapterOptions: {
      relationshipToUpdate: 'tags'
    }
  };
  let url = adapter.urlForUpdateRecord('1', 'article', snapshot);
  assert.equal(url, 'http://myapi.com/api/v1/articles/1/relationships/tags');
});

test(`urlForUpdateRecord() when updating a to-many relationship and
      urlForUpdateRelationship is present`, function(assert) {
  let BaseAdapter = Ember.Object.extend({
    urlForUpdateRecord(id) {
      return `http://myapi.com/api/v1/articles/${id}`;
    }
  });
  let urlForUpdateRelationshipStub = td.function();
  let Adapter = BaseAdapter.extend(UpdateRelationshipsAdapterMixin, {
    urlForUpdateRelationship: urlForUpdateRelationshipStub
  });
  let adapter = Adapter.create();
  let snapshot = {
    adapterOptions: {
      relationshipToUpdate: 'tags'
    }
  };
  td.when(urlForUpdateRelationshipStub('1', 'article', snapshot, 'tags')).thenReturn('foo');
  let url = adapter.urlForUpdateRecord('1', 'article', snapshot);
  assert.equal(url, 'foo');
});

test(`urlForUpdateRecord() dasherizes the relationship name for the path`, function(assert) {
  let BaseAdapter = Ember.Object.extend({
    urlForUpdateRecord(id) {
      return `http://myapi.com/api/v1/articles/${id}`;
    }
  });
  let Adapter = BaseAdapter.extend(UpdateRelationshipsAdapterMixin);
  let adapter = Adapter.create();
  let snapshot = {
    adapterOptions: {
      relationshipToUpdate: 'myTags'
    }
  };
  let url = adapter.urlForUpdateRecord('1', 'article', snapshot);
  assert.equal(url, 'http://myapi.com/api/v1/articles/1/relationships/my-tags');
});
