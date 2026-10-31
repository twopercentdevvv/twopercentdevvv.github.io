App.projects=(()=>{
 let repos=[];
 const W='proj';
 const globe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>';
 const tile=r=>`<div class="tw" data-s="${esc((r.name+' '+(r.description||'')+' '+(r.language||'')).toLowerCase())}"><button class="tile" data-n="${esc(r.name)}"><div class="pv"><i>${esc(r.name)}</i><p>${esc(r.description||'No description')}</p><span class="st">&#9733; ${r.stargazers_count}</span></div><span class="nm">${esc(r.name)}</span></button>${App.site(r)?`<a class="go" href="${esc(App.site(r))}" target="_blank" rel="noopener" title="Open website" aria-label="Open ${esc(r.name)} website">${globe}</a>`:''}</div>`;
 const info=r=>`<b>${esc(r.name)}</b>${esc(r.description||'No description')}<br>&#9733; ${r.stargazers_count} stars &middot; ${r.forks_count} forks${r.language?' &middot; '+esc(r.language):''} &middot; updated ${ago(r.pushed_at)}`;
 const hint=()=>repos.length?repos.length+' items':'';
 async function load(fresh){
  if(!$('#gr'))return;
  try{
   let all=[];
   for(let p=1;p<=5;p++){const r=await App.gh(`/users/${App.cfg.user}/repos?per_page=100&page=${p}`,fresh);all=all.concat(r);if(r.length<100)break}
   repos=all.filter(r=>App.cfg.showForks||!r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count||new Date(b.pushed_at)-new Date(a.pushed_at));
   if(!$('#gr'))return;
   $('#gr').innerHTML=repos.length?repos.map(tile).join(''):'<p class="msg">No public projects yet.</p>';
   $('#cnt').textContent=repos.length+' projects, '+repos.reduce((s,r)=>s+r.stargazers_count,0)+' stars';
   $('#q').dispatchEvent(new Event('input'));
   $('#det').textContent=hint();
  }catch(e){if($('#gr'))$('#gr').innerHTML='<p class="msg">'+esc(e.message)+'</p>'}
 }
 function ui(){
  if(App.wm.wins[W]){App.wm.raise(W);return}
  const w=App.wm.open(W,'Projects - '+App.cfg.user,{left:'12px',top:'5vh',width:'calc((100vw - 212px) * .58 - 18px)',height:'calc(100vh - 100px)'},0,'assets/icons/folder.png');
  w.body.innerHTML=`<div class="ex"><div class="nav"><div class="crumbs">${esc(App.cfg.user)} &#9656; Projects &#9656; Most starred first</div><input id="q" type="search" placeholder="Search projects" aria-label="Search projects"></div><div class="cmd"><button id="rf">Refresh</button><a href="https://github.com/${esc(App.cfg.user)}" target="_blank" rel="noopener">View on GitHub</a><span class="c"></span><span id="cnt"></span></div><div class="view"><div id="gr" class="grid"><p class="msg">Loading projects...</p></div></div><div class="det" id="det">${hint()}</div></div>`;
  $('#rf',w.body).onclick=()=>load(true);
  $('#q',w.body).oninput=e=>{const q=e.target.value.trim().toLowerCase();w.body.querySelectorAll('.tw').forEach(t=>{t.hidden=!t.dataset.s.includes(q)})};
  const show=e=>{const t=e.target.closest('.tile');const r=t&&repos.find(x=>x.name===t.dataset.n);if(r)$('#det',w.body).innerHTML=info(r)};
  w.body.addEventListener('mouseover',show);
  w.body.addEventListener('focusin',show);
  w.body.addEventListener('mouseleave',()=>{$('#det',w.body).innerHTML=hint()});
  w.body.onclick=e=>{const t=e.target.closest('.tile');if(t)App.repo.open(t.dataset.n)};
 }
 return{ui,load,get repos(){return repos}};
})();
