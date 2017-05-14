import Ember from 'ember';

export default Ember.Mixin.create({
  serialize(snapshot) {
    let serialized = this._super(...arguments);
    let { adapterOptions } = snapshot;
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      let { relationshipToUpdate } = adapterOptions;
      return serialized.data.relationships[relationshipToUpdate];
    }

    return serialized;
  }
});
