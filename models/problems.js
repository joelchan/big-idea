// Configure logger for Tools
var logger = new Logger('Models:Problems');
// Comment out to use global logging level
Logger.setLevel('Models:Problems', 'trace');
//Logger.setLevel('Models:Problems', 'debug');
//Logger.setLevel('Models:Problems', 'info');
//Logger.setLevel('Models:Problems', 'warn');

Problems = new Meteor.Collection("problems");

Problem = function(problem, solution, abstractID){
  this.problem = problem;
  this.solution = solution;
  this.abstractID = abstractID;
  this.time = new Date().getTime();
  this.parent = ""; // the subproblem that spawned this subproblem
  this.isEdit = false;
}

ProblemFactory = (function() {
  return {
    // create a new problem
    create: function(problem, solution, abstractID) {
      logger.trace("Creating new Problem");
      var problemTrimmed = removeCR(problem);
      var solutionTrimmed = removeCR(solution);
      if (problemTrimmed !== "") {
        var newProblem = new Problem(problemTrimmed, solutionTrimmed, abstractID);
        logger.trace("Creating new Problem");
        newProblem._id = Problems.insert(newProblem);
        return newProblem;
      }
    },
    // update a problem
    update: function(problemID, problemDescr, solutionDescr) {
      logger.debug("Updating problem " + problemID);
      var problemTrimmed = removeCR(problemDescr);
      var solutionTrimmed = removeCR(solutionDescr);
      Problems.update({_id: problemID}, {$set: {isEdit: false, problem: problemTrimmed, solution: solutionTrimmed}});
    },
    // add a parent of the problem
    addParent: function(problemID, parentID) {

    },
    // remove a problem or set of problems
    remove: function(problems) {
      if (hasForEach(problems)) {
        ids = getIDs(problems);
        //for (var i=0; i<ideas.length; i++) {
          //ids.push(ideas._id);
        //}
        if (Meteor.isServer) {
          Problems.remove({_id: {$in: ids}});
        } else {
          ids.forEach(function(id) {
            Problems.remove({_id: id});
          });
        }
      } else {
        Problems.remove({_id: problems._id});
      }
    },
    removeAmount: function (amount) {
      for(var i  =  0; i < amount; i++ ){
        ProblemFactory.remove(Problems.findOne());
      }
    },
  };
}());
