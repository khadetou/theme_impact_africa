// @odoo-module ignore

/* CURSOR */
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
if(cur&&curR){
  let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
  const setCursorPosition=(x,y)=>{
    mx=x;my=y;
    cur.style.left=mx+'px';
    cur.style.top=my+'px';
  };
  setCursorPosition(mx,my);
  document.addEventListener('pointermove',e=>setCursorPosition(e.clientX,e.clientY),{passive:true});
  (function loop(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    curR.style.left=rx+'px';curR.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.article-card,.blog-featured,.filter-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>curR.classList.add('big'));
    el.addEventListener('mouseleave',()=>curR.classList.remove('big'));
  });
}

/* NAV SCROLL */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>60));

/* DRAWER */
function toggleDrawer(){const d=document.getElementById('drawer'),o=document.getElementById('drawerOverlay'),b=document.getElementById('hbgBtn');const open=d.classList.contains('open');if(open){closeDrawer();}else{d.classList.add('open');o.classList.add('open');b.classList.add('open');document.body.style.overflow='hidden';}}
function closeDrawer(){const d=document.getElementById('drawer'),o=document.getElementById('drawerOverlay'),b=document.getElementById('hbgBtn');d.classList.remove('open');o.classList.remove('open');b.classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});

/* FILTER */
function filterCat(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.article-card').forEach(card=>{
    card.style.display=(cat==='all'||card.dataset.cat===cat)?'flex':'none';
  });
}

/* SEARCH */
function searchArticles(q){
  const lq=q.toLowerCase();
  document.querySelectorAll('.article-card').forEach(card=>{
    const title=card.querySelector('.ac-title')?.textContent.toLowerCase()||'';
    const excerpt=card.querySelector('.ac-excerpt')?.textContent.toLowerCase()||'';
    card.style.display=(title.includes(lq)||excerpt.includes(lq))?'flex':'none';
  });
}

/* NEWSLETTER */
function subscribeNL(){
  const inp=document.querySelector('.nl-input');
  if(!inp.value||!inp.value.includes('@')){inp.style.borderColor='rgba(224,85,85,.5)';return;}
  inp.style.borderColor='rgba(139,207,52,.5)';
  const n=document.getElementById('notif');
  n.innerHTML='<iconify-icon icon="mdi:check-circle-outline" style="font-size:16px;margin-right:6px;vertical-align:middle"></iconify-icon>Inscription confirmée !';
  n.classList.add('on');
  setTimeout(()=>n.classList.remove('on'),3500);
  inp.value='';
}

/* LOAD MORE */
function loadMore(){
  const btn=document.querySelector('.load-more-btn');
  btn.innerHTML='<iconify-icon icon="mdi:loading" style="animation:spin 1s linear infinite;font-size:18px"></iconify-icon>Chargement...';
  setTimeout(()=>{btn.innerHTML='<iconify-icon icon="mdi:check-circle-outline"></iconify-icon>Tous les articles chargés';btn.disabled=true;btn.style.opacity='.5';},1500);
}
