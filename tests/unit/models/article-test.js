import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';
import Ember from 'ember';
import DS from 'ember-data';
import AdapterMixin from 'ember-data-updating-json-api-relationships/mixins/adapter';

let { run, getOwner } = Ember;

moduleForModel('article', 'Unit | Model | article', {
  needs: [
    'model:tag',
    'model:author',
    'adapter:application',
    'serializer:application'
  ],
  beforeEach() {
    this.server = new Pretender();
    let store = this.store();
    store.push({
      data: [
        {
          id: 1,
          type: 'tag',
          attributes: {
            name: 'Ember'
          }
        },
        {
          id: 2,
          type: 'tag',
          attributes: {
            name: 'React'
          }
        },
        {
          id: 3,
          type: 'tag',
          attributes: {
            name: 'JavaScript'
          }
        }
      ]
    });

    store.push({
      data: {
        id: 1,
        type: 'article',
        attributes: {
          title: 'Article 1'
        }
      }
    });

    store.push({
      data: {
        id: 1,
        type: 'author',
        attributes: {
          name: 'David'
        }
      }
    });
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('updating a to-many relationship', function(assert) {
  let done = assert.async();
  this.server.patch('/articles/1/relationships/tags', function(request) {
    let payload = JSON.parse(request.requestBody);
    assert.deepEqual(payload, {
      data: [
        { id: '1', type: 'tags' },
        { id: '2', type: 'tags' }
      ]
    });
    done();
    return [ 200, {}, JSON.stringify('') ];
  });
  let store = this.store();
  let article = store.peekRecord('article', 1);
  article.get('tags').pushObject(store.peekRecord('tag', 1));
  article.get('tags').pushObject(store.peekRecord('tag', 2));
  article.updateRelationship('tags');
});

test('updating a to-one relationship', function(assert) {
  let done = assert.async();
  this.server.patch('/articles/1/relationships/author', function(request) {
    let payload = JSON.parse(request.requestBody);
    assert.deepEqual(payload, {
      data: { id: '1', type: 'authors' }
    });
    done();
    return [ 200, {}, JSON.stringify('') ];
  });
  let store = this.store();
  let article = store.peekRecord('article', 1);
  run(() => {
    article.set('author', store.peekRecord('author', 1));
    article.updateRelationship('author');
  });
});

test('updating a relationship with a custom URL', function(assert) {
  let done = assert.async();
  let ApplicationAdapter = DS.JSONAPIAdapter.extend(AdapterMixin);
  getOwner(this).register('adapter:article', ApplicationAdapter.extend({
    urlForUpdateRelationship(id, modelName, snapshot, relationshipToUpdate) {
      if (relationshipToUpdate === 'tags') {
        return `${modelName}s/${id}/categories`;
      }
    }
  }));
  this.server.patch('/articles/1/categories', function(request) {
    let payload = JSON.parse(request.requestBody);
    assert.deepEqual(payload, {
      data: [
        { id: '1', type: 'tags' },
        { id: '2', type: 'tags' }
      ]
    });
    done();
    return [ 200, {}, JSON.stringify('') ];
  });
  let store = this.store();
  let article = store.peekRecord('article', 1);
  article.get('tags').pushObject(store.peekRecord('tag', 1));
  article.get('tags').pushObject(store.peekRecord('tag', 2));
  article.updateRelationship('tags');
});
