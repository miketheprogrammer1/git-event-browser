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
    
    var repoOwner = null;
    var repoName = null;
    var eventType = null;
    
    if (this.get('controller') == null) {
      /*The page is not ready yet. We cannot retrieve events yet.*/
//      return modelResponse;
      return modelResponse;
    } else {
      repoOwner = this.get('controller').get('repoOwner');
      repoName = this.get('controller').get('repoName');
      eventType = this.get('controller').get('eventType');
    }
    //Check for blank inputs
    if(repoOwner == null || repoOwner === '' 
        || repoName == null || repoName === '') 
    {
      modelResponse.message = "You must provide a repo owner and a repo name. ";
      return modelResponse; 
    }
    return Ember.$.getJSON('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/events').then((data) => {
       modelResponse.events = [];
       for (var i = 0; i < data.length; i++) {
          if (eventType == null || eventType === "" || eventType === data[i].type) {
            modelResponse.events.push(convertGithubEventToViewEvent(data[i]));
          }
       }
       modelResponse.message = "Displaying " + modelResponse.events.length + " matching github events of a possible " + data.length;
       return modelResponse;
    }, function() {
      // on error or rejection
      modelResponse.message = "Could not access this repository";
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
    eventResponse.actor = githubEvent.actor.display_login;
    eventResponse.timestamp = githubEvent.created_at;
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


