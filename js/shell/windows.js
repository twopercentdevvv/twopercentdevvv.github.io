App.wm=(()=>{
 const wins={};let z=10,focused=null;
 const G={mn:'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 6.5h8v2.5H1z" fill="#fff"/></svg>',mx:'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 1.5h7v7h-7z" fill="none" stroke="#fff" stroke-width="2"/></svg>',x:'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#fff" stroke-width="2.2"/></svg>'};
 function raise(id){
  const w=wins[id];if(!w)return;
  w.el.classList.remove('min');w.el.style.zIndex=++z;focused=id;
  Object.keys(wins).forEach(k=>{wins[k].btn.classList.toggle('on',k===id);wins[k].el.classList.toggle('act',k===id)});
  if(App.sidebar)App.sidebar.close();
 }
 function close(id){
  const w=wins[id];if(!w)return;
  w.el.remove();w.btn.remove();delete wins[id];
  const ids=Object.keys(wins).filter(k=>!wins[k].el.classList.contains('min')).sort((a,b)=>wins[b].el.style.zIndex-wins[a].el.style.zIndex);
  if(ids.length)raise(ids[0]);else focused=null;
 }
 function drag(el){
  const tb=$('.tb',el);let o=null;
  tb.addEventListener('pointerdown',e=>{
   if(e.target.closest('.cap')||el.classList.contains('max')||innerWidth<=760)return;
   const r=el.getBoundingClientRect();o={x:e.clientX-r.left,y:e.clientY-r.top};tb.setPointerCapture(e.pointerId);
  });
  tb.addEventListener('pointermove',e=>{
   if(!o)return;
   el.style.left=Math.max(-200,Math.min(innerWidth-80,e.clientX-o.x))+'px';
   el.style.top=Math.max(0,Math.min(innerHeight-80,e.clientY-o.y))+'px';
  });
  tb.addEventListener('pointerup',()=>{o=null});
 }
 function open(id,title,pos,max,icon){
  if(wins[id]){raise(id);return wins[id]}
  const el=document.createElement('section');
  el.className='win'+(max?' max':'');
  Object.assign(el.style,pos||{});
  el.innerHTML=`<div class="tb">${icon?`<img src="${icon}" alt="">`:''}<b></b><div class="cap"><button class="mn" aria-label="Minimize">${G.mn}</button><button class="mx" aria-label="Maximize">${G.mx}</button><button class="x" aria-label="Close">${G.x}</button></div></div><div class="body"></div>`;
  $('b',el).textContent=title;
  const btn=document.createElement('button');
  btn.className='tk';if(icon){const i=document.createElement('img');i.src=icon;i.alt='';btn.append(i)}const t=document.createElement('span');t.textContent=title;btn.append(t);
  $('#tasks').append(btn);$('#desk').append(el);
  wins[id]={el,btn,body:$('.body',el)};
  el.addEventListener('pointerdown',()=>raise(id),true);
  $('.mn',el).onclick=()=>{el.classList.add('min');el.classList.remove('act');btn.classList.remove('on')};
  $('.mx',el).onclick=()=>el.classList.toggle('max');
  $('.x',el).onclick=()=>close(id);
  $('.tb',el).ondblclick=e=>{if(!e.target.closest('.cap'))$('.mx',el).click()};
  btn.onclick=()=>{if(el.classList.contains('min')||focused!==id)raise(id);else $('.mn',el).click()};
  drag(el);raise(id);
  return wins[id];
 }
 return{wins,open,raise,close};
})();
