App.gh=async(path,fresh)=>{
 const k='gh'+path;let c=null;
 try{c=JSON.parse(localStorage.getItem(k)||'null')}catch(e){}
 if(c&&!fresh&&Date.now()-c.t<App.cfg.refreshMin*6e4)return c.v;
 try{
  const r=await fetch('https://api.github.com'+path,{headers:{Accept:'application/vnd.github+json'}});
  if(!r.ok)throw new Error(r.status===403||r.status===429?'GitHub rate limit reached. Try again in a few minutes.':'GitHub returned error '+r.status+'.');
  const v=await r.json();
  try{localStorage.setItem(k,JSON.stringify({t:Date.now(),v}))}catch(e){}
  return v;
 }catch(e){if(c)return c.v;throw e}
};
