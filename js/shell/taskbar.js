App.taskbar=(()=>{
 const tick=()=>{
  const d=new Date(),c=$('#clk');
  c.textContent=d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
  c.title=d.toLocaleDateString([],{dateStyle:'full'});
 };
 const shut=()=>{$('#start').hidden=true;$('#orb').classList.remove('on')};
 function init(){
  const u=App.cfg.user,base='https://github.com/'+encodeURIComponent(u);
  $('#gh').href=base;
  $('#gr2').href=base+'?tab=repositories';
  $('#gs').href=base+'?tab=stars';
  $('#sun').textContent=u;
  $('#orb').onclick=e=>{
   e.stopPropagation();
   const m=$('#start');m.hidden=!m.hidden;
   $('#orb').classList.toggle('on',!m.hidden);
   if(!m.hidden&&innerWidth>760)$('#ss').focus();
  };
  document.addEventListener('click',shut);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
  $('#ss').onkeydown=e=>{
   if(e.key!=='Enter')return;
   const v=e.target.value.trim();
   App.projects.ui();
   const q=$('#q');if(q){q.value=v;q.dispatchEvent(new Event('input'))}
   App.projects.load();
   e.target.value='';shut();
  };
  $('#start').onclick=e=>{
   e.stopPropagation();
   const a=e.target.closest('[data-o]');
   if(!a){if(e.target.closest('a'))shut();return}
   const o=a.dataset.o;
   if(o==='p'){App.projects.ui();App.projects.load()}
   else if(o==='n'){App.posts.ui();App.posts.load()}
   else if(o==='s')App.sidebar.toggle();
   else if(o==='l')Object.keys(App.wm.wins).forEach(k=>App.wm.close(k));
   else if(o==='r')location.reload();
   shut();
  };
  $('#sbt').onclick=e=>{e.stopPropagation();App.sidebar.toggle()};
  tick();setInterval(tick,3e4);
 }
 return{init};
})();
