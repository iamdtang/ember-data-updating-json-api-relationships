import Ember from 'ember';

let { Mixin, String: { dasherize } } = Ember;

export default Mixin.create({
  urlForUpdateRecord(id, modelName, snapshot) {
    let { adapterOptions } = snapshot;
    if (this.urlForUpdateRelationship && adapterOptions) {
      return this.urlForUpdateRelationship(id, modelName, snapshot, adapterOptions.relationshipToUpdate);
    }

    let originalUpdateURL = this._super(...arguments);
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      let { relationshipToUpdate } = adapterOptions;
      let path = dasherize(relationshipToUpdate);
      return `${originalUpdateURL}/relationships/${path}`;
    }

    return originalUpdateURL;
  },
  updateRecord(store, type, snapshot) {
    let promise = this._super(...arguments);
    let { adapterOptions } = snapshot;
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      return promise.then(() => {
        return null;
      });
    }
    return promise;
  }
});
