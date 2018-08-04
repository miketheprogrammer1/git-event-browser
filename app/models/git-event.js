import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr(), 
  description: DS.attr(), 
  avatar_url: DS.attr(), 
  created_at: DS.attr()
});
