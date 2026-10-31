App.posts=(()=>{
 const c=App.cfg,W='posts';
 let list=[],err='';
 const url=u=>{try{const x=new URL(u);return /^https?:$/.test(x.protocol)?x.href:''}catch(e){return ''}};
 const fmt=d=>new Date(d).toLocaleString([],{dateStyle:'medium',timeStyle:'short'});
 const live=p=>{const n=Date.now();return new Date(p.posted)<=n&&(!p.expires||new Date(p.expires)>n)};
 async function load(){
  try{
   const r=await fetch(c.postsPath+'?t='+Date.now(),{cache:'no-store'});
   if(!r.ok)throw new Error(r.status===404?'Nothing posted yet.':'Could not load posts ('+r.status+').');
   const j=await r.json();
   list=Array.isArray(j)?j:[];err='';
  }catch(e){list=[];err=e instanceof SyntaxError?'hiii! i broke the posts by accident. sorry about that :(\nerror log:\n':e.message}
  draw();
 }
 function draw(){
  const b=$('#pl');if(!b)return;
  const rows=list.filter(live).sort((a,z)=>new Date(z.posted)-new Date(a.posted));
  b.innerHTML=rows.length?rows.map(p=>`<article class="po"><header><b>${esc(fmt(p.posted))}</b>${p.expires?`<span>expires ${esc(fmt(p.expires))}</span>`:''}</header><p>${esc(p.text)}</p>${(p.images||[]).map(url).filter(Boolean).map(u=>`<img src="${esc(u)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.hidden=true">`).join('')}</article>`).join(''):`<p class="msg">${esc(err||'Nothing posted right now.')}</p>`;
 }
 function ui(){
  if(App.wm.wins[W]){App.wm.raise(W);return}
  const w=App.wm.open(W,'Posts',{left:'calc((100vw - 212px) * .58 + 6px)',top:'5vh',width:'calc((100vw - 212px) * .42 - 18px)',height:'calc(100vh - 100px)'},0,'assets/icons/posts.png');
  w.body.innerHTML='<div class="ex"><div class="cmd"><button id="pr">Refresh</button></div><div class="view" id="pl"><p class="msg">Loading...</p></div></div>';
  $('#pr',w.body).onclick=load;
 }
 return{ui,load};
})();
