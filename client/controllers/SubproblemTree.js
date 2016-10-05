// Configure logger for Tools
var logger = new Logger('Client:SubproblemTree');
// Comment out to use global logging level
Logger.setLevel('Client:SubproblemTree', 'trace');
// Logger.setLevel('Client:SubproblemTree', 'debug');
// Logger.setLevel('Client:SubproblemTree', 'info');
// Logger.setLevel('Client:SubproblemTree', 'warn');

// var userID = Session.get("currentUser")._id;
// var abstractID = Session.get("currentAbstract").abstractID;

Template.SubproblemTree.onRendered(function(){

  // disable idea submission during tutorial
  $(".idea-entry input").prop("disabled", true);
  $(".idea-entry textArea").prop("disabled", true);
  $(".submit-idea").prop("disabled", true);

});

Template.STInstructions.helpers({
  instructionProblems: function() {
    return Problems.find({abstractID: "instruction-example"}).fetch();
  }
});

Template.ProblemTree.helpers({
  problems: function() {
    return Problems.find({abstractID: Session.get("currentAbstract").abstractID, userID: Session.get("currentUser")._id}, {sort: {time: -1}});
  },
  numProblems: function() {
    return Problems.find({abstractID: Session.get("currentAbstract")._id, userID: Session.get("currentUser")._id}).count();
  }
});

Template.STInstructions.events({
  'click .finish-tutorial': function(event, target) {
    $('#abstract').show();
    $('.problem-list').show();
    $('#instructions-toggler').click();
    $('.finish-task').show();
    EventLogger.logBeginTreeTask();
  },
  'click .finish-task': function(event, target) {
    //var problemID = event.currentTarget.id.split("-")[2];
    var parents = $('input[name="problem-parent"]:checked');
    logger.trace("All selected parents: " + parents);
    var numChildren = Problems.find({abstractID: Session.get("currentAbstract").abstractID, userID: Session.get("currentUser")._id}, {sort: {time: -1}}).count();
    if (parents.length < numChildren) {
      alert("Each statement must be tied to a parent problem!");
    } else {
      parents.each(function(index) {
        var child_id = $(this).attr("data-child");
        var parent_id = $(this).attr("data-id");
        logger.trace("This child is " + child_id);
        if ($(this).hasClass("inferred-parent")) {
          var inferred_parent = $('#implicit-root-for-' + child_id).val();
          parent_id = "Inferred-parent: " + inferred_parent
          logger.trace(parent_id);
        }
        ProblemFactory.addParent(child_id, parent_id);
      });
      var finished = confirm("Are you sure you are finished? Once you advance to the next screen you will not be able to edit your work.");
      logger.debug(finished);
      if (finished == true) {
        CompletionManager.markCompletion(Session.get("currentAbstract").abstractID, Session.get("currentUser").userName);
        Router.go(Session.get("nextRoute"), {userID: Session.get("currentUser")._id, abstractID: Session.get("currentAbstract").abstractID});
        EventLogger.logFinishTreeTask();
      }
    }

    // Problems.update({_id: problemID},{$set: {isEdit: true}});
  },
});

Template.STInstructionProblemPair.helpers({
  parentDescr: function() {
    var parent = Problems.findOne(this.parent);
    if (parent) {
      return parent.problem;
    } else {
      return this.parent;
    }
  }
});

Template.STAbstract.helpers({
  abstract: function() {
    return Session.get("currentAbstract").content;
  }
})

Template.STProblem.helpers({
  possibleParents: function() {
    logger.debug("Calling possibleParents()");
    var problemCursor = Problems.find({
        abstractID: Session.get("currentAbstract").abstractID, userID: Session.get("currentUser")._id, _id: {$not: this._id}}, {sort: {time: 1}}
      );
    logger.debug("Finishing possibleParents() call");
    return problemCursor;
  }
});

Template.STProblemChoices.helpers({
  getPivotId: function() {
    logger.debug("Call getPivotId()");
    return Template.parentData(1)._id;
  }
});
