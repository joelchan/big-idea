Meteor.startup(function() {

  // var natural = Meteor.require('natural'),
  //   tokenizer = new natural.WordTokenizer();
  // console.log(tokenizer.tokenize("your dog has fleas."));
  if(Problems.find({abstractID: {$in: ["worked-example", "instruction-example"]}}).count() == 0) {
    tutorialProblems.forEach(function(p) {
      Problems.insert({_id: p._id, problem: p.problem, solution: p.solution, abstractID: p.abstractID,
                      parent: p.parent,
                      isEdit: p.isEdit,
                      isTrash: p.isTrash,
                      isDummy: p.isDummy,
                      time: new Date().getTime()});
    })
  } else {
    tutorialProblems.forEach(function(p) {
      Problems.update({_id: p._id}, {$set: {problem: p.problem, solution: p.solution, abstractID: p.abstractID,
                      parent: p.parent,
                      isEdit: p.isEdit,
                      isTrash: p.isTrash,
                      isDummy: p.isDummy,
                      time: new Date().getTime()}});
    })
  }
  if(Abstracts.find().count() == 0) {
    abstracts.forEach(function(a) {
      var newAbstract = new Abstract(a.ID, a.abstract, a.title);
      Abstracts.insert(newAbstract);
    })
  } else {
    abstracts.forEach(function(a) {
      Abstracts.update({abstractID: a.ID}, {$set: {content: a.abstract, title: a.title}});
    })
  }
});
