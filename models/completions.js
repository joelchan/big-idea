// Configure logger for event logging
var logger = new Logger('Managers:Completions');
// Comment out to use global logging level
Logger.setLevel('Managers:Completions', 'trace');
//Logger.setLevel('Managers:Completions', 'debug');
// Logger.setLevel('Managers:Completions', 'info');
//Logger.setLevel('Managers:Completions', 'warn');

Completions = new Mongo.Collection('completions');

Completion = function(abstractID, userName) {
    this.abstractID = abstractID;
    this.userName = userName;
    this.time = new Date().getTime();
    this.verifyCode = Random.hexString(20).toLowerCase();
}

CompletionManager = (function() {
    return {
        markCompletion: function(abstractID, userName) {
            var completion  = new Completion(abstractID, userName);
            AbstractManager.markSeenBy(abstractID, userName);
            completion._id = Completions.insert(completion);
            return completion._id;
        },
    };
}());
