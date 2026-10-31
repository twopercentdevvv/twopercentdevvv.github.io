App.sidebar=(()=>{
 let el;
 const face=()=>{
  let t='';
  for(let i=0;i<12;i++){const a=i*Math.PI/6;t+=`<line x1="${50+38*Math.sin(a)}" y1="${50-38*Math.cos(a)}" x2="${50+43*Math.sin(a)}" y2="${50-43*Math.cos(a)}" stroke="#fff" stroke-width="${i%3?1:2.2}"/>`}
  return `<svg class="ck" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="ckr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".5" stop-color="#8d98a6"/><stop offset="1" stop-color="#d9e0e8"/></linearGradient><radialGradient id="ckf" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="#2c4468"/><stop offset="1" stop-color="#101b30"/></radialGradient><linearGradient id="ckg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#ckr)"/><circle cx="50" cy="50" r="45" fill="url(#ckf)" stroke="rgba(0,0,0,.7)"/>${t}<line id="hh" x1="50" y1="50" x2="50" y2="28" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><line id="mh" x1="50" y1="50" x2="50" y2="17" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><line id="sh" x1="50" y1="56" x2="50" y2="14" stroke="#ff8a5c" stroke-width="1"/><circle cx="50" cy="50" r="2.5" fill="#fff"/><path d="M12 40a40 40 0 0 1 76 0c-14-9-62-9-76 0z" fill="url(#ckg)"/></svg>`;
 };
 const spin=()=>{
  const d=new Date(),s=d.getSeconds(),m=d.getMinutes()+s/60,h=d.getHours()%12+m/60;
  [['hh',h*30],['mh',m*6],['sh',s*6]].forEach(([i,a])=>$('#'+i).setAttribute('transform',`rotate(${a} 50 50)`));
 };
 function init(){
  const on=App.socials.filter(s=>s.enabled&&s.url);
  el=document.createElement('aside');
  el.id='sb';
  el.innerHTML=`<section class="gd"><div class="gh">Clock</div><div class="gb">${face()}</div></section><section class="gd"><div class="gh">Profile</div><div class="gb" id="prof">Loading...</div></section>${App.cfg.discordId?App.discord.html():''}${on.length?`<section class="gd"><div class="gh">Find me online</div><div class="gb"><div class="sl">${on.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="me noopener" title="${esc(s.name)}" aria-label="${esc(s.name)}" style="color:${esc(s.color)}">${App.icon(s.id)}</a>`).join('')}</div></div></section>`:''}`;
  document.body.append(el);
  if(App.cfg.discordId)App.discord.start();
  spin();setInterval(spin,1000);
  App.gh('/users/'+App.cfg.user).then(u=>{
   const sa=$('#sav');if(sa){sa.src=u.avatar_url;sa.hidden=false}
   $('#prof').innerHTML=`<img src="${esc(u.avatar_url)}" alt="" onerror="this.hidden=true"><div><b>${esc(u.name||u.login)}</b><span>@${esc(u.login)}</span><span>${u.followers} followers &middot; ${u.public_repos} repos</span></div>`;
  }).catch(e=>{$('#prof').textContent=e.message});
 }
 const toggle=()=>{if(innerWidth<=760)el.classList.toggle('open');else document.documentElement.classList.toggle('nosb')};
 const close=()=>{if(el)el.classList.remove('open')};
 return{init,toggle,close};
})();
