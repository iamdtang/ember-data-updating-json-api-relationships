import JSONAPIAdapter from 'ember-data/adapters/json-api';
import UpdateRelationshipsAdapterMixin  from 'ember-data-update-json-api-relationships-independently/mixins/update-relationships-adapter';

export default JSONAPIAdapter.extend(UpdateRelationshipsAdapterMixin, {

});
