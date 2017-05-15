import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';
import Ember from 'ember';
import DS from 'ember-data';
import ModelMixin from 'ember-data-updating-json-api-relationships/mixins/model';
import Adapter from 'ember-data-updating-json-api-relationships/adapters/adapter';

let { run, getOwner } = Ember;
let { Model, hasMany, belongsTo } = DS;

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

test('updating a record retains original behavior', function(assert) {
  let done = assert.async();
  run(() => {
    this.server.patch('/articles/1', function(request) {
      let payload = JSON.parse(request.requestBody);
      assert.deepEqual(payload, {
        data: {
          id: '1',
          type: 'articles',
          attributes: {
            title: 'Hello, Ember!'
          }
        }
      });
      done();
      return [ 200, {}, JSON.stringify('') ];
    });
    let store = this.store();
    let article = store.peekRecord('article', 1);
    article.set('title', 'Hello, Ember!');
    article.save();
  });
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

test('updating a relationship with a custom URL using urlForUpdateRelationship', function(assert) {
  let done = assert.async();
  let ApplicationAdapter = Adapter.extend();
  getOwner(this).register('adapter:article', ApplicationAdapter.extend({
    urlForUpdateRelationship(id, modelName, snapshot, relationshipToUpdate) {
      if (relationshipToUpdate === 'tags') {
        return `/${modelName}s/${id}/categories`;
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

test('updating a relationship where the relationship name is different than the related type', function(assert) {
  let done = assert.async();
  let store = this.store();

  run(() => {
    getOwner(this).register('model:post', Model.extend(ModelMixin, {
      postCategories: hasMany('tag'),
      author: belongsTo()
    }));

    let post = store.push({
      data: {
        id: 1,
        type: 'post',
        attributes: {
          title: 'Post 1'
        }
      }
    });

    this.server.patch('/posts/1/relationships/tags', function(request) {
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

    post.get('postCategories').pushObject(store.peekRecord('tag', 1));
    post.get('postCategories').pushObject(store.peekRecord('tag', 2));
    post.updateRelationship('postCategories');
  });
});
