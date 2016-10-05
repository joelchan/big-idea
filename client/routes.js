// Configure logger for Tools
var logger = new Logger('Client:Routes');
// Comment out to use global logging level
Logger.setLevel('Client:Routes', 'trace');
//Logger.setLevel('Client:Routes', 'debug');
// Logger.setLevel('Client:Routes', 'info');
// Logger.setLevel('Client:Routes', 'warn');

//Maps routes to templates
Router.map(function () {
  /***************************************************************
   * Define custom routes
   * *************************************************************/
   this.route('Land', {
       path: '/',
       template: 'land',
       subscriptions: function()  {
        //  this.subscribe("documents");
           this.subscribe("abstracts");
           this.subscribe("myUsers");
       },
       onBeforeAction: function() {
           if (this.ready()) {
               // $('.navbar-brand').text("Annotator: Welcome");
               Session.set("nextRoute", "IdentifySubproblemsTutorial")
               this.next();
           }
       }
   });

   this.route('IdentifySubproblemsTutorial', {
     path: 'big-idea/identify-t/:userID/:abstractID',
     template: 'IdentifySubproblems',
     subscriptions: function() {
       this.subscribe('problems');
       this.subscribe('myUsers');
       this.subscribe('abstracts');
       this.subscribe('completions');
       // this.subscribe('abstracts').wait();
     },
     onBeforeAction: function() {
       if (this.ready()) {
         logger.debug("Data ready");
         Session.set("isTutorial", true);
         Session.set("nextRoute", "IdentifySubproblems");
         var user = MyUsers.findOne(this.params.userID);
         Session.set("currentUser", user);
         var abstract = Abstracts.findOne({abstractID: this.params.abstractID});
         Session.set("currentAbstract", abstract);
         this.next();
       }
     },
     action: function() {
       if (this.ready()) {
         this.render();
       } else {
         this.render('loading');
       }
     },
     // onAfterAction: function() {
     //
     // }
   });

  this.route('IdentifySubproblems', {
    path: 'big-idea/identify/:userID/:abstractID',
    template: 'IdentifySubproblems',
    subscriptions: function() {
      this.subscribe('problemsNoDummy');
      this.subscribe('myUsers');
      this.subscribe('abstracts');
      this.subscribe('completions');
      // this.subscribe('abstracts').wait();
    },
    onBeforeAction: function() {
      if (this.ready()) {
        logger.debug("Data ready");
        Session.set("isTutorial", false);
        Session.set("nextRoute", "SubproblemTree");
        var user = MyUsers.findOne(this.params.userID);
        Session.set("currentUser", user);
        var abstract = Abstracts.findOne({abstractID: this.params.abstractID});
        Session.set("currentAbstract", abstract);
        this.next();
      }
    },
    action: function() {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
    // onAfterAction: function() {
    //
    // }
  });

  // not being used ATM
  this.route('SubproblemTreeTutorial', {
    path: 'big-idea/tree-t/',
    template: 'SubproblemTreeTutorial',
    subscriptions: function() {
      this.subscribe('problems');
      // this.subscribe('abstracts').wait();
    },
    onBeforeAction: function() {
      if (this.ready()) {
        logger.debug("Data ready");
        this.next();
      }
    },
    action: function() {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
    // onAfterAction: function() {
    //
    // }
  });

  this.route('SubproblemTree', {
    path: 'big-idea/tree/:userID/:abstractID',
    template: 'SubproblemTree',
    subscriptions: function() {
      this.subscribe('problemsNoDummy');
      this.subscribe('myUsers');
      this.subscribe('abstracts');
      this.subscribe('completions');
      // this.subscribe('abstracts').wait();
    },
    onBeforeAction: function() {
      if (this.ready()) {
        logger.debug("Data ready");
        Session.set("nextRoute", "MTurkFinalPage");
        var user = MyUsers.findOne(this.params.userID);
        Session.set("currentUser", user);
        var abstract = Abstracts.findOne({abstractID: this.params.abstractID});
        Session.set("currentAbstract", abstract);
        this.next();
      }
    },
    action: function() {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
    // onAfterAction: function() {
    //
    // }
  });

  this.route('MTurkFinalPage', {
    path: 'big-idea/finished/:userID/:abstractID',
    template: 'FinalizePage',
    subscriptions: function() {
      this.subscribe('myUsers');
      this.subscribe('abstracts');
      this.subscribe('completions');
    },
    onBeforeAction: function(pause) {
        logger.debug("before action");
        if (this.ready()) {
          logger.debug("Data ready");
          var user = MyUsers.findOne(this.params.userID);
          Session.set("currentUser", user);
          var abstract = Abstracts.findOne({abstractID: this.params.abstractID});
          Session.set("currentAbstract", abstract);
          this.next();
        } else {
          logger.debug("Not ready");
        }
    },
    action: function(){
      if(this.ready())
        this.render();
      else
        this.render('loading');
    },

  });
});
