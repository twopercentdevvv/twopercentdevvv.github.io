App.repo=(()=>{
 async function open(name){
  const r=App.projects.repos.find(x=>x.name===name);if(!r)return;
  const id='r:'+name;
  if(App.wm.wins[id]){App.wm.raise(id);return}
  const w=App.wm.open(id,r.name,{left:'6vw',top:'6vh',width:'calc(88vw - 212px)',height:'80vh'},true,'assets/icons/folder.png'),b=w.body,base=`/repos/${App.cfg.user}/${name}`;
  const stats=(i,p)=>'<div class="stats">'+[['Stars',r.stargazers_count],['Forks',r.forks_count],['Open issues',i],['Open pull requests',p],['Updated',ago(r.pushed_at)]].map(x=>`<div><b>${x[1]}</b>${x[0]}</div>`).join('')+'</div>';
  b.innerHTML=`<div class="hd"><h1>${esc(r.name)}</h1><div>${esc(r.description||'No description provided.')}</div><div class="chips">${(r.topics||[]).map(t=>'<span>'+esc(t)+'</span>').join('')}</div><a class="btn" href="${esc(r.html_url)}" target="_blank" rel="noopener">Open on GitHub</a>${App.site(r)?`<a class="btn" href="${esc(App.site(r))}" target="_blank" rel="noopener">Open website</a>`:''}</div><div id="st">${stats('...','...')}</div><div id="lg"></div><div class="tabs"></div><div class="list"><p class="msg">Loading...</p></div>`;
  const [a,p,l,c]=await Promise.allSettled([App.gh(base+'/issues?state=open&per_page=50'),App.gh(base+'/pulls?state=open&per_page=50'),App.gh(base+'/languages'),App.gh(base+'/commits?per_page=10')]);
  const g=x=>x.status==='fulfilled'?x.value:null;
  const iss=(g(a)||[]).filter(x=>!x.pull_request),prs=g(p)||[],com=g(c)||[];
  const bad=[a,p,c].find(x=>x.status==='rejected');
  $('#st',b).innerHTML=stats(g(a)&&g(p)?Math.max(0,r.open_issues_count-prs.length):'?',g(p)?prs.length+(prs.length>=50?'+':''):'?');
  const L=g(l)||{},tot=Object.values(L).reduce((s,x)=>s+x,0);
  if(tot){
   const e=Object.entries(L);
   $('#lg',b).innerHTML='<div class="langs">'+e.map(([k,v])=>`<i style="width:${v/tot*100}%;background:${lc(k)}" title="${esc(k)} ${(v/tot*100).toFixed(1)}%"></i>`).join('')+'</div><p class="leg">'+e.slice(0,6).map(([k,v])=>`<span><u style="background:${lc(k)}"></u>${esc(k)} ${Math.round(v/tot*100)}%</span>`).join('')+'</p>';
  }
  const T={'Issues':iss,'Pull requests':prs,'Commits':com};
  const row=(t,x)=>t==='Commits'
   ?`<a href="${esc(x.html_url)}" target="_blank" rel="noopener"><b>${esc((x.commit.message||'').split('\n')[0])}</b><small>${esc((x.commit.author||{}).name||'')} &middot; ${ago((x.commit.author||{}).date)} &middot; ${esc(x.sha.slice(0,7))}</small></a>`
   :`<a href="${esc(x.html_url)}" target="_blank" rel="noopener"><b>#${x.number} ${esc(x.title)}</b><small>${esc((x.user||{}).login||'')} &middot; opened ${ago(x.created_at)}${x.comments!=null?' &middot; '+x.comments+' comments':''}</small></a>`;
  const tabs=$('.tabs',b),list=$('.list',b);
  const show=t=>{
   tabs.querySelectorAll('button').forEach(k=>k.classList.toggle('on',k.dataset.t===t));
   list.innerHTML=T[t].length?T[t].map(x=>row(t,x)).join(''):'<p class="msg">'+esc(bad?bad.reason.message:'Nothing here yet.')+'</p>';
  };
  tabs.innerHTML=Object.keys(T).map(t=>`<button data-t="${t}">${t} (${T[t].length})</button>`).join('');
  tabs.onclick=e=>{const k=e.target.closest('button');if(k)show(k.dataset.t)};
  show('Issues');
 }
 return{open};
})();
