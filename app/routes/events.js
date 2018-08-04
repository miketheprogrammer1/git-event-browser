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
    
    console.log("We are retrieving data. ");
    var repoOwner = null;
    var repoName = null;
    
    if (this.get('controller') == null) {
      /*The page is not ready yet. We cannot retrieve events yet.*/
//      return modelResponse;
      repoOwner = "miketheprogrammer1";
      repoName = "git-event-browser";
    } else {
      repoOwner = this.get('controller').get('repoOwner');
      repoName = this.get('controller').get('repoName');
    }
    if(repoOwner == null || repoOwner === '' || repoName == null || repoName === '') {
      repoOwner = "miketheprogrammer1";
      repoName = "git-event-browser";
    }
    return Ember.$.getJSON('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/events').then((data) => {
       modelResponse.events = [];
       for (var i = 0; i < data.length; i++) {
            modelResponse.events.push(convertGithubEventToViewEvent(data[i]));
       }
       modelResponse.message = "Displaying " + data.length + " github events";
       return modelResponse;
    });
  }

});

/**
 * Map a github event from the API to a common response object
 * that we can display in the view. We should REALLY use Ember Data for this 
 * but I don't know how to use ember data yet, so I won't here.   
 */ 
var convertGithubEventToViewEvent = function(githubEvent) {
    var eventResponse = {};
    eventResponse.type = githubEvent.type;
    if (githubEvent.type === "PushEvent") {
        //TODO: We should find a better way of displaying commits.
         //Commit really deserves its own route. When we click on an event 
         // we should display this in its own component.
        if (githubEvent.payload.commits == null || githubEvent.payload.commits.length == 0) {
          eventResponse.description = "No commits";
        } else {   
          eventResponse.description = githubEvent.payload.commits[0].message;
        } 
    } else if (githubEvent.type === "CreateEvent") {
        eventResponse.description = githubEvent.payload.description;
    } else {
        eventResponse.description = "No description";
    }
    return eventResponse;
}


