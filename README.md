[![Build Status](https://travis-ci.org/skaterdav85/ember-data-updating-json-api-relationships.svg?branch=master)](https://travis-ci.org/skaterdav85/ember-data-updating-json-api-relationships)

# ember-data-updating-json-api-relationships

This addon adds support to Ember Data to update relationships independently. See [Updating Relationships in the JSON:API spec](http://jsonapi.org/format/#crud-updating-relationships) for more details. This library works for updating to-one and to-many relationships, as described in the JSON:API spec.

## Installation

```
ember install ember-data-updating-json-api-relationships
```

## Getting Started

First, add the adapter mixin to your application or model-specific adapter:

```js
// app/adapaters/application.js
import DS from 'ember-data';
import UpdateRelationshipsAdapterMixin  from 'ember-data-updating-json-api-relationships/mixins/adapter';

export default DS.JSONAPIAdapter.extend(UpdateRelationshipsAdapterMixin, {
});
```

Second, add the serializer mixin to your application or model-specific serializer:

```js
// app/serializers/application.js
import DS from 'ember-data';
import UpdateRelationshipsSerializerMixin  from 'ember-data-updating-json-api-relationships/mixins/serializer';

export default DS.JSONAPISerializer.extend(UpdateRelationshipsSerializerMixin, {
});
```

Third, add the model mixin to the model with the relationship that you want to update independently:

```js
// app/models/article.js
import DS from 'ember-data';
import UpdateRelationshipsModelMixin  from 'ember-data-updating-json-api-relationships/mixins/model';

let { Model, attr, hasMany } = DS;

export default Model.extend(UpdateRelationshipsModelMixin, {
  title: attr('string'),
  tags: hasMany()
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
