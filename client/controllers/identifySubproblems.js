// Configure logger for Tools
var logger = new Logger('Client:IdentifySubproblems');
// Comment out to use global logging level
Logger.setLevel('Client:IdentifySubproblems', 'trace');
// Logger.setLevel('Client:IdentifySubproblems', 'debug');
// Logger.setLevel('Client:IdentifySubproblems', 'info');
// Logger.setLevel('Client:IdentifySubproblems', 'warn');

var abstractID = "dummy";

Template.IdentifySubproblems.onRendered(function(){

  // disable idea submission during tutorial
  if (Session.equals("isTutorial", true)) {
    $('#abstract').hide();
    $('#problem-entry').hide();
    $('#problem-list').hide();
  }

  $(".idea-entry input").prop("disabled", true);
  $(".idea-entry textArea").prop("disabled", true);
  $(".submit-idea").prop("disabled", true);

  var spacer = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
  // Instance the tour
  var identifyProblemsTour = new Tour({
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
  identifyProblemsTour.init();

  // Start the tour
  logger.debug("Starting tutorial");
  identifyProblemsTour.start();

  if(identifyProblemsTour.ended()) {
    // identifyProblemsTour.restart();
  }

});

Template.IdentifySubproblems.events({
  'click .finish-tutorial': function(event, target) {
    $('#abstract').show();
    $('#problem-entry').show();
    $('#problem-list').show();
    $('#instructions-toggler').click();
  },
});

Template.Instructions.helpers({
  isTutorial: function() {
    return Session.get("isTutorial");
  },
});

Template.Instructions.events({
  'click .finish-task': function() {
    // check if we have a minimal number of problems
    // Router.go('')
  },
})

Template.Abstract.helpers({
  isTutorial: function() {
    return Session.get("isTutorial");
  },
})

Template.ProblemEntry.helpers({
  isTutorial: function() {
    return Session.get("isTutorial");
  },
});

Template.ProblemEntry.events({

  'click .submit-problem': function (e, target) {
    //console.log("event submitted");
    logger.debug("submitting a new problem");
    var problemDescr = $("#problem-problem").val();
    var solutionDescr = $("#problem-solution").val();
    //Add idea to database
    if (Session.get("isTutorial")) {
      var problem = ProblemFactory.create(problemDescr, solutionDescr, abstractID, true);
    } else {
      var problem = ProblemFactory.create(problemDescr, solutionDescr, abstractID, false);
    }

    if (problem) {

      // Clear the text field
      $("#problem-problem").val("");
      $("#problem-solution").val("");

    } else {
      alert("Make sure all fields are filled out before submitting!");
    }
  },

});

Template.ProblemList.helpers({
  problems: function() {
    return Problems.find({abstractID: abstractID}, {sort: {time: -1}})
  },
  tutorialAnswers: function() {
    return Problems.find({abstractID: "tutorial"}, {sort: {time: -1}});
  },
  dummyProblems: function() {
    return Problems.find({abstractID: abstractID, isDummy: true}, {sort: {time: -1}})
  },
  numProblems: function() {
    return Problems.find({abstractID: abstractID}).count();
  }
});

Template.Problem.events({
  'click .card-edit': function(event, target) {
    var problemID = event.currentTarget.id.split("-")[2];
    Problems.update({_id: problemID},{$set: {isEdit: true}});
  },
  'click .card-save': function(event, target) {
    logger.debug("Clicked on card-save");
    var problemID = event.currentTarget.id.split("-")[2];
    var problemSelector = "#problem-descr-" + this._id;
    var solutionSelector = "#solution-descr-" + this._id;
    var problemDescr = $(problemSelector).val();
    var solutionDescr = $(solutionSelector).val();
    ProblemFactory.update(problemID, problemDescr, solutionDescr);
  },
  'click .card-delete': function(event, target) {
    logger.debug("Clicked to delete card");
    var confirmDelete = confirm("Are you sure? This action cannot be undone.");
    if (confirmDelete) {
      ProblemFactory.archive(event.currentTarget.id.split("-")[2]);
    }

  }
});
