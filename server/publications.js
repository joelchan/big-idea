/********************************************************************
 * Publishing all the collections relevant to the current module.
 * Subscriptions are in the corresponding folder in the client module
 * or in Routes.js in the corresponding folder
********************************************************************/

Meteor.startup(function(){
  /*****************************************************************
  * Publish Task related collections
  ******************************************************************/
  Meteor.publish("problems", function(){
	  return Problems.find({isTrash: false});
  });
  Meteor.publish("problemsNoDummy", function(){
	  return Problems.find({isTrash: false, isDummy: false});
  });
});
