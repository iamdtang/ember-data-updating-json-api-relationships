import Model from 'ember-data/model';
import DS from 'ember-data';

let { attr } = DS;

export default Model.extend({
  name: attr('string')
});
