import Ember from 'ember';
import { task } from 'ember-concurrency';

const $ = Ember.$;

export default Ember.Service.extend({
  use: null,
  target: 'body',

  inOut: {
    fade: { in: 'fadeIn', out: 'fadeOut' }
  },

  inAnimation: Ember.computed('use', function() {
    let use = this.get('use');
    let map = this.get('inOut');
    return map[use] ? map[use].in : null;
  }),

  outAnimation: Ember.computed('use', function() {
    let use = this.get('use');
    let map = this.get('inOut');
    return map[use] ? map[use].out : null;
  }),

  element: Ember.computed('target', function() {
    let target = this.get('target');
    return $(target)[0];
  }),

  out: task(function*(transition) {
    let element = this.get('element');
    let animation = this.get('outAnimation');

    if (element && animation) {
      try {
        yield transition.abort();
      } catch(e) {
        // abort will cause the task to cancel if we dont wrap it
      }

      yield $.Velocity
        .animate(element, animation, { duration: 500 });

      yield transition.retry();
    }
  }).drop(),

  in: task(function*() {
    let element = this.get('element');
    let animation = this.get('inAnimation');

    if (element && animation) {
      yield $.Velocity
        .animate(element, animation, { duration: 500 });
    }
  }),
});
