/********************************************************************
 * Configuring Pince logger to enable multi-level logging for
 * system monitoring to console
 *******************************************************************/
//Set global message logging level
Logger.setLevel('info');

// Configure logger for event logging
var logger = new Logger('Tools:Logging');
// Comment out to use global logging level
// Logger.setLevel('Tools:Logging', 'trace');
//Logger.setLevel('Tools:Logging', 'debug');
Logger.setLevel('Tools:Logging', 'info');
//Logger.setLevel('Tools:Logging', 'warn');

EventLogger = (function () {
  return {
    /*****************************************************************
    * Global object for logging high level system events to database
    ******************************************************************/
    log: function(msg, data) {
      /*
      *  log any event. If insufficient data is given, warning is
      *  logged, but does not throw error
      *   Input:
      *   type - the EventType associated with this event
      *   data - (Optional) the data to be associated with the event
      *       Specified as an object where only fieldNames specified
      *       in type are stored
      */
      //The current user is assumed to have generated the event
      var user = Session.get("currentUser");
      var event = new Event(msg, user);
      //Index participantID and experimentID if experiment is set
      var exp = Session.get("currentExp");
      if (exp) {
        var part = Session.get("currentParticipant");
        if (part) {
          event['participantID'] = part._id;
          event['conditionID'] = part.conditionID;
        }
        event['expID'] = exp._id;
      }

      //Set each field provided in data
      if (typeof data != undefined) {
        for (var field in data) {
          event[field] = data[field];
        }
      }
      //Insert into db
      event._id = Events.insert(event);
      return event;
    },

    remove: function(events) {
      /**************************************************************
       * Remove a set of logged events
       *    This is primarily to support tests and needs to eventually
       *    be secured.
       * @params
       *    events: an array or cursor of events to be removed
       * @return
       *    n/a
       *************************************************************/
      if (hasForEach(events)) {
        ids = getIDs(events);
        if (Meteor.isServer) {
          Events.remove({_id: {$in: ids}});
        } else {
          events.forEach(function(event) {
            Events.remove({_id: event._id});
          });
        }
      } else {
        Events.remove({_id: events._id});
      }

    },
    logBeginIdentifyTutorial: function() {
      var msg = "User began tutorial for problem identification task";
      this.log(msg);
    },
    logBeginIdentifyTask: function() {
      var msg = "User began problem identification task";
      this.log(msg);
    },
    logBeginTreeTutorial: function() {
      var msg = "User began tutorial for subproblem tree task";
      this.log(msg);
    },
    logBeginTreeTask: function() {
      var msg = "User began subproblem tree task";
      this.log(msg);
    },
    logFinishTreeTask: function() {
      var msg = "User finished subproblem tree task";
      this.log(msg);
    },
  };
}());

// EventTypeManager = (function() {
  // return {
    // create: function(desc, fields) {
      // var type = new EventType(desc, fields);
      // type._id = EventTypes.insert(type);
      // return type;
    // },
    // get: function(desc, fields) {
      // var create = false;
      // if (fields) {
        // logger.trace("Looking for EventType with matching fields");
        // var results = EventTypes.find(
          // {desc: desc,
            // fields: fields
          // });
        // if (results.count() > 0) {
          // logger.trace("found " + results.count() + " matching results");
          // return results.fetch()[0];
        // }
      // } else {
        // logger.trace("Looking for EventType with matching desc");
        // var results = EventTypes.find({desc: desc});
        // if (results.count() > 0) {
          // logger.trace("found " + results.count() + " matching results");
          // return results.fetch()[0];
        // }
      // }
      // //No result foudn, so return newly created type
      // logger.trace("no match creating new EventType");
      // return this.create(desc, fields);
    // },
    // remove: function(types) {
      // if (hasForEach(types)) {
        // ids = getIDs(types);
        // if (Meteor.isServer) {
          // EventTypes.remove({"_id": {$in: ids}});
        // } else {
          // types.forEach(function(type) {
            // EventTypes.remove({"_id": type._id});
          // });
        // }
      // } else {
        // //types is just a single EventType object, not an array
        // EventTypes.remove({_id: types._id});
      // }
    // }
  // };
// }());
