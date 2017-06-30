import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  use: null,

  animate: Ember.inject.service(),

  didReceiveAttrs() {
    this.set('animate.use', this.get('use'));
  }

});
