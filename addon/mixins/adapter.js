import Ember from 'ember';

export default Ember.Mixin.create({
  urlForUpdateRecord(id, modelName, snapshot) {
    let originalUpdateURL = this._super(...arguments);
    let { adapterOptions } = snapshot;
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      let { relationshipToUpdate } = adapterOptions;
      return `${originalUpdateURL}/relationships/${relationshipToUpdate}`;
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
