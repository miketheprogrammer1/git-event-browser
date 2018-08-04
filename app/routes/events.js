import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    refreshRepository() {
      alert(this.get('controller').get('repoOwner'));
      this.refresh();
    }
  },
  
  model() {
    //TODO: Remove this and make a call to the events api
     // The events API is here: https://api.github.com/repos/:owner/:repo/events
     // eg: https://api.github.com/repos/miketheprogrammer1/git-event-browser/events
    return Ember.$.getJSON('https://api.github.com/repos/miketheprogrammer1/git-event-browser/events').then((data) => {
       return data;
    });
  }

});
