import Ember from 'ember';

let { Mixin, String: { dasherize } } = Ember;

export default Mixin.create({
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
