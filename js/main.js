App.taskbar.init();
App.sidebar.init();
App.posts.ui();
App.posts.load();
App.projects.ui();
App.projects.load();
setInterval(()=>{if(App.wm.wins.proj)App.projects.load(true)},App.cfg.refreshMin*6e4);
setInterval(()=>{if(App.wm.wins.posts)App.posts.load()},6e4);
