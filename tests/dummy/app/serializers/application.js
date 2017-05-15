import JSONAPISerializer from 'ember-data/serializers/json-api';
import UpdateRelationshipsSerializerMixin  from 'ember-data-updating-json-api-relationships/mixins/serializer';

export default JSONAPISerializer.extend(UpdateRelationshipsSerializerMixin, {
});
