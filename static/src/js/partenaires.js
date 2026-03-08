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
  document.querySelectorAll('a,button,.val-card,.eq-card,.temo-card,.svc-item,.proc-step,.av-card,.tar-card,.partner-card,.faq-q,.ch-coord,.dev-avantage,.feat').forEach(el=>{
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

/* PARTNER FILTER */
function filterPartners(category, button) {
  document.querySelectorAll('.pf-btn').forEach(btn => btn.classList.remove('active'));
  if (button) {
    button.classList.add('active');
  }

  document.querySelectorAll('.partner-card').forEach(card => {
    const matches = category === 'all' || card.dataset.cat === category;
    card.style.display = matches ? '' : 'none';
  });
}

function initPartnerFilters() {
  const filterButtons = document.querySelectorAll('.pf-btn[data-partner-filter]');
  if (!filterButtons.length) {
    return;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterPartners(button.dataset.partnerFilter || 'all', button);
    });
  });

  const activeButton = document.querySelector('.pf-btn[data-partner-filter].active') || filterButtons[0];
  if (activeButton) {
    filterPartners(activeButton.dataset.partnerFilter || 'all', activeButton);
  }
}

initPartnerFilters();

window.filterPartners = filterPartners;
