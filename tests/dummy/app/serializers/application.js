import JSONAPISerializer from 'ember-data/serializers/json-api';
import UpdateRelationshipsSerializerMixin  from 'ember-data-update-json-api-relationships-independently/mixins/update-relationships-serializer';

export default JSONAPISerializer.extend(UpdateRelationshipsSerializerMixin, {
});
