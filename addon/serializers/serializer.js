import Ember from 'ember';
import DS from 'ember-data';

let { String: { dasherize } } = Ember;

export default DS.JSONAPISerializer.extend({
  serialize(snapshot) {
    let serialized = this._super(...arguments);
    let { adapterOptions } = snapshot;
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      let relationshipKey = dasherize(adapterOptions.relationshipToUpdate);
      return serialized.data.relationships[relationshipKey];
    }

    return serialized;
  }
});
