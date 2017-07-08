[![Build Status](https://travis-ci.org/skaterdav85/ember-data-updating-json-api-relationships.svg?branch=master)](https://travis-ci.org/skaterdav85/ember-data-updating-json-api-relationships)

# ember-data-updating-json-api-relationships

This addon adds support to Ember Data to update relationships independently. See [Updating Relationships in the JSON:API spec](http://jsonapi.org/format/#crud-updating-relationships) for more details. This library works for updating to-one and to-many relationships, as described in the JSON:API spec.

## Installation

```
ember install ember-data-updating-json-api-relationships
```

## Getting Started

First, extend the adapter:

```js
// app/adapters/application.js
import DS from 'ember-data';
import JSONAPIAdapter from 'ember-data-updating-json-api-relationships/adapters/adapter';

export default JSONAPIAdapter.extend({
});
```

Second, extend the serializer:

```js
// app/serializers/application.js
import DS from 'ember-data';
import JSONAPISerializer from 'ember-data-updating-json-api-relationships/serializers/serializer';

export default JSONAPISerializer.extend({
});
```

Third, add the model mixin to the model with the relationship that you want to update independently:

```js
// app/models/article.js
import DS from 'ember-data';
import ModelMixin from 'ember-data-updating-json-api-relationships/mixins/model';

let { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend(ModelMixin, {
  title: attr('string'),
  tags: hasMany(),
  author: belongsTo()
});
```

Lastly, call `updateRelationship(relationship)` on your model:

```js
article.get('tags').pushObject(tag1);
article.get('tags').pushObject(tag2);

// PATCH /articles/:id/relationships/tags
article.updateRelationship('tags');

article.set('author', author);

// PATCH /articles/:id/relationships/author
article.updateRelationship('author');
```

## Customizations

### Customizing Relationship URLs

This addon will set relationship URLs to what is recommended in the spec, so something like `/articles/:id/relationships/tags` for a to-many relationship and `/articles/:id/relationships/author` for a to-one relationship. If you need to override this, use the `urlForUpdateRelationship()` hook:

```js
// app/adapters/article.js
export default ApplicationAdapter.extend({
  urlForUpdateRelationship(id, modelName, snapshot, relationshipToUpdate) {
    let { host, namespace } = this;
    if (relationshipToUpdate === 'tags') {
      return `${host}/${namespace}/articles/${id}/categories`;
    }
  }
})
```
