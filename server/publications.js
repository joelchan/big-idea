/********************************************************************
 * Publishing all the collections relevant to the current module.
 * Subscriptions are in the corresponding folder in the client module
 * or in Routes.js in the corresponding folder
********************************************************************/

Meteor.startup(function(){
  /*****************************************************************
  * Publish Task related collections
  ******************************************************************/
  Meteor.publish("myUsers", function(){
    return MyUsers.find();
  });
  Meteor.publish("problems", function(){
	  return Problems.find({isTrash: false});
  });
  Meteor.publish("problemsNoDummy", function(){
	  return Problems.find({isTrash: false, isDummy: false});
  });
  Meteor.publish("completions", function(){
    return Completions.find();
  });
  Meteor.publish("abstracts", function(){
    return Abstracts.find();
  });
  Meteor.publish("events", function(){
    return Events.find();
  });
});
