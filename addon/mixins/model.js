import Ember from 'ember';

export default Ember.Mixin.create({
  updateRelationship(relationship) {
    return this.save({
      adapterOptions: { relationshipToUpdate: relationship }
    });
  }
});
