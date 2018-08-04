import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    refreshRepository() {
      console.debug('Show the events for miketheprogrammer1/git-event-browser/events');
    }
  },
  
  model() {
    //TODO: Remove this and make a call to the events api
     // The events API is here: https://api.github.com/repos/:owner/:repo/events
     // eg: https://api.github.com/repos/miketheprogrammer1/git-event-browser/events
    return [
      {
        "id": "8061605967",
        "type": "CreateEvent",
        "actor": {
          "id": 5091818,
          "login": "miketheprogrammer1",
          "display_login": "miketheprogrammer1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miketheprogrammer1",
          "avatar_url": "https://avatars.githubusercontent.com/u/5091818?"
        },
        "repo": {
          "id": 143408465,
          "name": "miketheprogrammer1/git-event-browser",
          "url": "https://api.github.com/repos/miketheprogrammer1/git-event-browser"
        },
        "payload": {
          "ref": "master",
          "ref_type": "branch",
          "master_branch": "master",
          "description": "Sample code for viewing GIT events",
          "pusher_type": "user"
        },
        "public": true,
        "created_at": "2018-08-03T09:35:44Z"
      },
      {
        "id": "8061602633",
        "type": "CreateEvent",
        "actor": {
          "id": 5091818,
          "login": "miketheprogrammer1",
          "display_login": "miketheprogrammer1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miketheprogrammer1",
          "avatar_url": "https://avatars.githubusercontent.com/u/5091818?"
        },
        "repo": {
          "id": 143408465,
          "name": "miketheprogrammer1/git-event-browser",
          "url": "https://api.github.com/repos/miketheprogrammer1/git-event-browser"
        },
        "payload": {
          "ref": null,
          "ref_type": "repository",
          "master_branch": "master",
          "description": "Sample code for viewing GIT events",
          "pusher_type": "user"
        },
        "public": true,
        "created_at": "2018-08-03T09:35:03Z"
      }
    ];
  }

});
