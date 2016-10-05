Template.FinalizePage.rendered = function() {
  window.scrollTo(0,0);
};

Template.FinalizePage.helpers({
    code: function() {
        // var part = Session.get("currentParticipant");
        var verifyCode = Random.hexString(20).toLowerCase();
        var completion = Completions.findOne({abstractID: Session.get("currentAbstract").abstractID,
                                              userName: Session.get("currentUser").userName})
        return completion.verifyCode;
        // Participants.update({_id: part._id},
        //     {$set: {verifyCode: verifyCode}})
        // return part.verifyCode;
    }
});
