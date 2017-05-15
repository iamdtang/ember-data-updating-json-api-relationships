import JSONAPIAdapter from 'ember-data/adapters/json-api';
import UpdateRelationshipsAdapterMixin from 'ember-data-updating-json-api-relationships/mixins/adapter';

export default JSONAPIAdapter.extend(UpdateRelationshipsAdapterMixin, {

});
