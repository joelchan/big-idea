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
                      time: new Date().getTime()});
    })
  }
});
