FlowRouter.route('/', {
  name: 'home',
  action(){
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/landing/', {
  name: 'landing',
  action(){
    BlazeLayout.render('landing');
  }
});

FlowRouter.route('/landing/signin', {
  name: 'signin',
  action(){
  	BlazeLayout.render('signin');
  }
});

FlowRouter.route('/landing/login', {
  name: 'login',
  action(){
    BlazeLayout.render('login');
  }
});

//render bid page with event id
FlowRouter.route('/home/bid/:id', {
  name: 'bid',
  action(){
  	BlazeLayout.render('bid');
  }
});

//render event page with event id
FlowRouter.route('/home/event/:id', {
  name: 'eventinfo',
  action(){
    BlazeLayout.render('eventinfo');
  }
});

//render product page with event id
FlowRouter.route('/home/product/:id', {
  name: 'product',
  action(){
    BlazeLayout.render('product');
  }
});

//render leaderboard page with event id
FlowRouter.route('/home/bid/leaderboard/:id', {
  name: 'leaderboard',
  action(){
    BlazeLayout.render('leaderboard');
  }
});

FlowRouter.route('/adminpulse', {
  name: 'admin',
  action(){
  	BlazeLayout.render('admin');
  }
});

FlowRouter.route('/home/over/:id', {
  name: 'over',
  action(){
    BlazeLayout.render('over');
  }
});

FlowRouter.route('/home/soon/:id', {
  name: 'soon',
  action(){
    BlazeLayout.render('soon');
  }
});