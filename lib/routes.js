FlowRouter.route('/', {
  name: 'landing',
  action(){
    BlazeLayout.render('landing');
  }
});

FlowRouter.route('/signin', {
  name: 'signin',
  action(){
  	BlazeLayout.render('signin');
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action(){
    BlazeLayout.render('login');
  }
});

FlowRouter.route('/home/', {
  name: 'home',
  action(){
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/home/bid', {
  name: 'bid',
  action(){
  	BlazeLayout.render('bid');
  }
});

FlowRouter.route('/adminpulse', {
  name: 'admin',
  action(){
  	BlazeLayout.render('admin');
  }
});

FlowRouter.route('/home/over', {
  name: 'over',
  action(){
    BlazeLayout.render('over');
  }
});

FlowRouter.route('/home/soon', {
  name: 'soon',
  action(){
    BlazeLayout.render('soon');
  }
});