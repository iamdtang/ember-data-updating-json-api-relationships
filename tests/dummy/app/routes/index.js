import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.store.push({
      data: [
        {
          id: 1,
          type: 'tag',
          attributes: {
            name: 'Ember'
          }
        },
        {
          id: 2,
          type: 'tag',
          attributes: {
            name: 'React'
          }
        },
        {
          id: 3,
          type: 'tag',
          attributes: {
            name: 'JavaScript'
          }
        }
      ]
    });

    return this.store.push({
      data: {
        id: 1,
        type: 'article',
        attributes: {
          title: 'Article 1'
        }
      }
    });
  }
});
