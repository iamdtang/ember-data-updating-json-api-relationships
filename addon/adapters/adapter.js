import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend({
  urlForUpdateRecord(id, modelName, snapshot) {
    let { adapterOptions } = snapshot;
    if (this.urlForUpdateRelationship && adapterOptions) {
      return this.urlForUpdateRelationship(id, modelName, snapshot, adapterOptions.relationshipToUpdate);
    }

    let originalUpdateURL = this._super(...arguments);
    if (adapterOptions && adapterOptions.relationshipToUpdate) {
      let { relationshipToUpdate } = adapterOptions;
      let relationship = this._getRelationship(relationshipToUpdate, snapshot);
      let path = this._normalizeRelationshipPath(relationship.type, relationship.kind);
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
      })
      .catch((error) => {
        throw error;
      });
    }
    return promise;
  },
  _getRelationship(relationshipToUpdate, snapshot) {
    let relationshipDescriptor;
    snapshot.eachRelationship((name, relationship) => {
      if (name === relationshipToUpdate) {
        relationshipDescriptor = relationship;
      }
    });

    return relationshipDescriptor;
  },
  _normalizeRelationshipPath(type, relationshipKind) {
    if (relationshipKind === 'hasMany') {
      return pluralize(type);
    }

    return type;
  }
});
