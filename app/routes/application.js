import Ember from 'ember';

export default Ember.Route.extend({
  animate: Ember.inject.service(),

  actions: {
    willTransition(transition) {
      this.get('animate.out').perform(transition);
    },

    didTransition() {
      this.get('animate.in').perform();
    }
  }
});
