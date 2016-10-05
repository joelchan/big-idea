// Configure logger for Tools
var logger = new Logger('Models:Problems');
// Comment out to use global logging level
Logger.setLevel('Models:Problems', 'trace');
//Logger.setLevel('Models:Problems', 'debug');
//Logger.setLevel('Models:Problems', 'info');
//Logger.setLevel('Models:Problems', 'warn');

Problems = new Meteor.Collection("problems");

Problem = function(problem, solution, abstractID, isDummy){
  this.problem = problem;
  this.solution = solution;
  this.abstractID = abstractID;
  this.time = new Date().getTime();
  this.parent = ""; // the subproblem that spawned this subproblem
  this.isEdit = false;
  this.isTrash = false; // when user deletes a subproblem, we want to archive, not remove it completely
  this.isDummy = isDummy;
}

ProblemFactory = (function() {
  return {
    // create a new problem
    create: function(problem, solution, abstractID, isDummy) {
      logger.trace("Creating new Problem");
      var problemTrimmed = removeCR(problem);
      var solutionTrimmed = removeCR(solution);
      if (problemTrimmed !== "") {
        var newProblem = new Problem(problemTrimmed, solutionTrimmed, abstractID, isDummy);
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
    archive: function(problemID) {
      Problems.update({_id: problemID}, {$set: {isTrash: true}});
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

tutorialProblems = [
  {
    'problem': "improve speed on chart reading tasks",
    'solution': "automatically select semantically-resonant colors to represent data",
    'abstractID': "worked-example",
    '_id': "worked-example-0",
    'parent': null,
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "automatically select semantically-resonant colors to represent data",
    'solution': "algorithm that matches each data value with a unique color",
    'abstractID': "worked-example",
    '_id': "worked-example-1",
    'parent': "worked-example-0",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "match each data value with a unique color",
    'solution': "collect representative images, determine value-color affinity, choose optimal assignment",
    'abstractID': "worked-example",
    '_id': "worked-example-2",
    'parent': "worked-example-1",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "collect representative images",
    'solution': "",
    'abstractID': "worked-example",
    '_id': "worked-example-3",
    'parent': "worked-example-2",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "determine value-color affinity scores",
    'solution': "",
    'abstractID': "worked-example",
    '_id': "worked-example-4",
    'parent': "worked-example-2",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "analyze image color distributions",
    'solution': "",
    'abstractID': "worked-example",
    '_id': "worked-example-5",
    'parent': "worked-example-4",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "choose optimal assignment",
    'solution': "balance probability of color with how well it discriminates among data values",
    'abstractID': "worked-example",
    '_id': "worked-example-6",
    'parent': "worked-example-2",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "balance probability of color with how well it discriminates among data values",
    'solution': "",
    'abstractID': "worked-example",
    '_id': "worked-example-7",
    'parent': "worked-example-2",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "amplify the abilities of artists",
    'solution': "increase artists ability to sketch ideas with higher fidelity",
    'abstractID': "instruction-example",
    '_id': "instruction-example-0",
    'parent': null,
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "identify sketches",
    'solution': "machine learning",
    'abstractID': "instruction-example",
    '_id': "instruction-example-1",
    'parent': "instruction-example-2",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "show example images, color pallets, and subject information",
    'solution': "",
    'abstractID': "instruction-example",
    '_id': "instruction-example-2",
    'parent': "instruction-example-3",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "increase artists ability to sketch ideas with higher fidelity",
    'solution': "show example images, color pallets, and subject information",
    'abstractID': "instruction-example",
    '_id': "instruction-example-3",
    'parent': "instruction-example-0",
    'isEdit': false,
    'isTrash': false,
  },
  {
    'problem': "make it easier to reference and include existing examples",
    'solution': "show example images, color pallets, and subject information",
    'abstractID': "instruction-example",
    '_id': "instruction-example-4",
    'parent': "worked-example-3",
    'isEdit': false,
    'isTrash': false,
  },
]
