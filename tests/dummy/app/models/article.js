import Model from 'ember-data/model';
import DS from 'ember-data';
import UpdateRelationshipsModelMixin  from 'ember-data-updating-json-api-relationships/mixins/model';

let { attr, hasMany } = DS;

export default Model.extend(UpdateRelationshipsModelMixin, {
  title: attr('string'),
  tags: hasMany()
});
