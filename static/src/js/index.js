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
  document.querySelectorAll('a,button,.prod-card,.svc-item,.feat,.partner-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>curR.classList.add('big'));
    el.addEventListener('mouseleave',()=>curR.classList.remove('big'));
  });
}

/* NAV SCROLL */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>60));

/* COUNT-UP */
function countUp(el){
  const target=parseInt(el.dataset.n||el.dataset.count||0);
  const suffix=el.dataset.s||el.dataset.suffix||'';
  let n=0;const step=target/60;
  const t=setInterval(()=>{
    n+=step;if(n>=target){n=target;clearInterval(t);}
    el.innerHTML=Math.floor(n)+'<sup style="color:var(--lime);font-size:.6em">'+suffix+'</sup>';
  },18);
}
const co=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){countUp(e.target);co.unobserve(e.target);}
}),{threshold:0});
document.querySelectorAll('[data-n],[data-count]').forEach(el=>co.observe(el));

/* HOME CONTACT FORM */
const homeContactForm=document.querySelector('.impact-home-contact-form');
const homeContactRequestType=document.getElementById('homeContactRequestType');
const homeContactLeadName=document.getElementById('homeContactLeadName');
const notif=document.getElementById('notif');
if(homeContactForm){
  const syncHomeLeadName=()=>{
    const option=homeContactRequestType?.selectedOptions?.[0];
    const label=option&&homeContactRequestType.value?option.textContent.trim():'Contact accueil';
    if(homeContactLeadName)homeContactLeadName.value=`Site web - ${label}`;
  };
  syncHomeLeadName();
  homeContactRequestType?.addEventListener('change',syncHomeLeadName);

  const showNotif=()=>{
    if(!notif)return;
    notif.classList.add('on');
    window.clearTimeout(showNotif._timer);
    showNotif._timer=window.setTimeout(()=>notif.classList.remove('on'),3500);
  };
  const observer=new MutationObserver(()=>{
    const result=homeContactForm.querySelector('#s_website_form_result');
    if(result?.classList.contains('text-success')){
      showNotif();
      syncHomeLeadName();
    }
  });
  observer.observe(homeContactForm,{childList:true,subtree:true});
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href')||'';
    const id=href.slice(1);
    const target=id?document.getElementById(id):null;
    const isOdooUiLink=!!a.closest('#oe_main_menu_navbar,.o_main_navbar,.o_we_website_top_actions,.o_we_customize_panel,.modal,.dropdown-menu');
    if(!id||!target||isOdooUiLink||a.getAttribute('role')==='button'||a.dataset.bsToggle){
      return;
    }
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth'});
    if(window.innerWidth<769)document.querySelector('.nav-links')?.style.setProperty('display','');
  });
});

/* DRAWER */
function toggleDrawer(){const d=document.getElementById('drawer'),o=document.getElementById('drawerOverlay'),b=document.getElementById('hbgBtn');const open=d.classList.contains('open');if(open){closeDrawer();}else{d.classList.add('open');o.classList.add('open');b.classList.add('open');document.body.style.overflow='hidden';}}
function closeDrawer(){const d=document.getElementById('drawer'),o=document.getElementById('drawerOverlay'),b=document.getElementById('hbgBtn');d.classList.remove('open');o.classList.remove('open');b.classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
