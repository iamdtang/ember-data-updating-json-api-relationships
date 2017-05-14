import JSONAPISerializer from 'ember-data/serializers/json-api';
import UpdateRelationshipsSerializerMixin  from 'ember-data-update-json-api-relationships-independently/mixins/serializer';

export default JSONAPISerializer.extend(UpdateRelationshipsSerializerMixin, {
});
