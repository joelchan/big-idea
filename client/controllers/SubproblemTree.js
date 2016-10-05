// Configure logger for Tools
var logger = new Logger('Client:SubproblemTree');
// Comment out to use global logging level
Logger.setLevel('Client:SubproblemTree', 'trace');
// Logger.setLevel('Client:SubproblemTree', 'debug');
// Logger.setLevel('Client:SubproblemTree', 'info');
// Logger.setLevel('Client:SubproblemTree', 'warn');

var abstractID = "dummy";

Template.SubproblemTree.onRendered(function(){

  // disable idea submission during tutorial
  $(".idea-entry input").prop("disabled", true);
  $(".idea-entry textArea").prop("disabled", true);
  $(".submit-idea").prop("disabled", true);

  var spacer = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
  // Instance the tour
  var subproblemTreeTour = new Tour({
      template: "<div class='popover tour'>" +
          "<div class='arrow'></div>" +
          "<h3 class='popover-title'></h3>" +
          "<div class='popover-content'></div>" +
          "<div class='popover-navigation'>" +
              "<button class='btn btn-default' data-role='prev'>« Prev</button>" +
              "<button class='btn btn-default' data-role='next'>Next »</button>" +
          "</div>" +
        "</div>",
      steps: [
      {
        element: "#lpheader",
        title: "Instructions tutorial (Step 1 of N)" + spacer,
        content: "Welcome! Before you begin, please follow this brief 8-step tutorial to familiarize you with the interface.",
        backdrop: true,
        placement: "bottom",
        // orphan: true,
        onNext: function() {
          // EventLogger.logTutorialStarted();
        }
      }],
      onEnd: function(tour) {
        // $(".idea-entry input").prop("disabled", false);
        // $(".idea-entry textArea").prop("disabled", false);
        // $(".submit-idea").prop("disabled", false);
      },
  });

  // Initialize the tour
  logger.debug("Initializing tutorial");
  subproblemTreeTour.init();

  // Start the tour
  logger.debug("Starting tutorial");
  // subproblemTreeTour.start();

  // if(subproblemTreeTour.ended()) {
    // subproblemTreeTour.restart();
  // }

});

Template.STInstructions.helpers({
  instructionProblems: function() {
    return Problems.find({abstractID: "instruction-example"}).fetch();
  }
});

Template.ProblemTree.helpers({
  problems: function() {
    return Problems.find({abstractID: abstractID}, {sort: {time: -1}});
  },
  numProblems: function() {
    return Problems.find({abstractID: abstractID}).count();
  }
});

Template.STInstructions.events({
  'click .finish-tutorial': function(event, target) {
    $('#abstract').show();
    $('.problem-list').show();
    $('#instructions-toggler').click();
    $('.finish-task').show();
  },
  'click .finish-task': function(event, target) {
    //var problemID = event.currentTarget.id.split("-")[2];
    var parents = $('input[name="problem-parent"]:checked');
    logger.trace("All selected parents: " + parents);
    var numChildren = Problems.find({abstractID: abstractID}, {sort: {time: -1}}).count();
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
        Router.go(Session.get("nextRoute"));
      }
    }

    // Problems.update({_id: problemID},{$set: {isEdit: true}});
  },
});

Template.STProblem.helpers({
  possibleParents: function() {
    logger.debug("Calling possibleParents()");
    var problemCursor = Problems.find({
        abstractID: abstractID, _id: {$not: this._id}}, {sort: {time: 1}}
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
