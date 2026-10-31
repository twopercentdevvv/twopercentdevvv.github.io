const $=(s,r=document)=>r.querySelector(s);
const esc=App.esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ago=App.ago=d=>{if(!d)return '';const s=(Date.now()-new Date(d))/1e3;for(const[u,n]of[['y',31536e3],['mo',2592e3],['d',864e2],['h',3600],['m',60]])if(s>=n)return Math.floor(s/n)+u+' ago';return 'just now'};
const LC={JavaScript:'#f1e05a',TypeScript:'#3178c6',Python:'#3572a5',HTML:'#e34c26',CSS:'#563d7c',Shell:'#89e051',C:'#555555','C++':'#f34b7d','C#':'#178600',Go:'#00add8',Rust:'#dea584',Java:'#b07219',PHP:'#4f5d95',Ruby:'#701516',Kotlin:'#a97bff',Swift:'#f05138',Lua:'#000080',Vue:'#41b883',Dart:'#00b4ab'};
const lc=App.lc=l=>LC[l]||'#8a99ab';
App.site=r=>{const h=(r.homepage||'').trim();if(!h)return '';try{const u=new URL(/^https?:\/\//i.test(h)?h:'https://'+h);return /^https?:$/.test(u.protocol)?u.href:''}catch(e){return ''}};
App.icon=(id,fill)=>{const i=App.icons[id];return i?`<svg viewBox="${i[0]}" fill="${fill||'currentColor'}" aria-hidden="true"><path d="${i[1]}"/></svg>`:''};
