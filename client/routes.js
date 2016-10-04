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
  this.route('IdentifySubproblems', {
    path: 'big-idea/identify/',
    template: 'IdentifySubproblems',
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

});
