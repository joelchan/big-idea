var logger = new Logger('Client:land');

Logger.setLevel('Client:land', 'trace');
// Logger.setLevel('Client:land', 'debug');
// Logger.setLevel('Client:land', 'info');
// Logger.setLevel('Client:land', 'warn');

Template.land.events({
    'click .continue' : function() {
        var userName = $('#userName').val();
        var abstractID = $('#docTitle').val();
        if (abstractID == "") {
          var newDoc = getRandomElement(Abstracts.find({seenBy: {$nin: [userName]}}).fetch());
          abstractID = newDoc.abstractID;
        }
        if (userName == "" || abstractID == "") {
            logger.warn("User is not logged in");
            alert("You need to have entered both your MTurkID and the docID from the HIT to continue");
        }
        if (userName == "") {
          logger.warn("User is not logged in");
          alert("Please enter a userName - anything will do. Just be sure to remember it if you want to use it again.");
        } else {
            logger.trace("User " + userName + " clicked continue");
            userID = UserManager.loginUser(userName);
            Router.go(Session.get("nextRoute"), {userID: userID, abstractID: abstractID});
        }
    },
    'keyup input#userName': function (evt) {
      if(evt.keyCode==13) {
        //console.log("enter released, clicking continue");
        $('#nextPage').click();
      }
    },
});
