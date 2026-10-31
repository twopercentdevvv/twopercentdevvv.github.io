App.discord=(()=>{
 const COL={online:'#43b581',idle:'#faa61a',dnd:'#f04747',offline:'#747f8d'};
 const LBL={online:'Online',idle:'Idle',dnd:'Do Not Disturb',offline:'Offline'};
 const VERB=['Playing','Streaming','Listening to','Watching','','Competing in'];
 const html=()=>'<section class="gd"><div class="gh">Discord</div><div class="gb" id="dcb">Loading...</div></section>';
 const avatar=u=>u.avatar?`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${u.avatar.startsWith('a_')?'gif':'png'}?size=128`:'https://cdn.discordapp.com/embed/avatars/0.png';
 function render(d){
  const u=d.discord_user,s=d.discord_status,acts=d.activities||[];
  const custom=acts.find(a=>a.type===4),act=acts.find(a=>a.type!==4);
  let line='';
  if(d.listening_to_spotify&&d.spotify)line='Listening to '+d.spotify.song+' by '+d.spotify.artist;
  else if(act)line=(VERB[act.type]?VERB[act.type]+' ':'')+act.name+(act.details?' - '+act.details:'')+(act.state?' ('+act.state+')':'');
  const cs=custom&&custom.state?((custom.emoji&&custom.emoji.name&&!custom.emoji.id?custom.emoji.name+' ':'')+custom.state):'';
  $('#dcb').innerHTML=`<div class="dcu"><div class="av"><img src="${esc(avatar(u))}" alt="" onerror="this.hidden=true"><i style="background:${COL[s]||COL.offline}" title="${esc(LBL[s]||s)}"></i></div><div><b>${esc(u.global_name||u.username)}</b><span>${esc(LBL[s]||s)}</span></div></div>${cs?`<p>${esc(cs)}</p>`:''}${line?`<p>${esc(line)}</p>`:''}`;
 }
 async function poll(){
  try{
   const r=await fetch('https://api.lanyard.rest/v1/users/'+encodeURIComponent(App.cfg.discordId));
   const j=await r.json();
   if(!j.success)throw new Error('no data');
   render(j.data);
  }catch(e){if(!$('.dcu'))$('#dcb').textContent='Status unavailable.'}
 }
 const start=()=>{poll();setInterval(poll,2e4)};
 return{html,start};
})();
