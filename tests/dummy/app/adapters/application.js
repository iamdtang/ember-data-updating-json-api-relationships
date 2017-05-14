import JSONAPIAdapter from 'ember-data/adapters/json-api';
import UpdateRelationshipsAdapterMixin  from 'ember-data-update-json-api-relationships-independently/mixins/adapter';

export default JSONAPIAdapter.extend(UpdateRelationshipsAdapterMixin, {

});
