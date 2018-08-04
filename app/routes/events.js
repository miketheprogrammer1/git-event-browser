import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    refreshRepository() {
      this.refresh();
    }
  },
  
  model() {
     // The events API is here: https://api.github.com/repos/:owner/:repo/events
     // eg: https://api.github.com/repos/miketheprogrammer1/git-event-browser/events
    var modelResponse = {
       "message" : "There is no data to show", 
       "events" : [] 
    };
    
    if (this.get('controller') == null) {
      console.log("controller is null");
      return modelResponse;
    }
    var repoOwner = this.get('controller').get('repoOwner');
    var repoName = this.get('controller').get('repoName');
    if(repoOwner === null || repoOwner === '' || repoName === null || repoName === '') {
      return modelResponse;
    }
    return Ember.$.getJSON('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/events').then((data) => {
       modelResponse.events = data;
       modelResponse.message = "Displaying " + data.length + " github events";
       return modelResponse;
    });
  }

});
