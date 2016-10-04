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
  subproblemTreeTour.start();

  if(subproblemTreeTour.ended()) {
    subproblemTreeTour.restart();
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

Template.STProblem.helpers({
  possibleSubproblems: function() {
    problemSet = Problems.find({abstractID: abstractID, _id: {$not: this._id}}, {sort: {time: 1}});
    for (var i = 0; i < problemSet.length; i++) {
        problemSet[i].pivotID = this._id;
    }
    return problemSet;
  }
});
