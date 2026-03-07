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
  document.querySelectorAll('a,button,.faq-q,.ch-coord').forEach(el=>{
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

/* CONTACT FORM */
const contactForm=document.querySelector('.impact-contact-form');
const contactRequestType=document.getElementById('contactRequestType');
const contactLeadName=document.getElementById('contactLeadName');
const notif=document.getElementById('notif');
if(contactForm){
  const syncLeadName=()=>{
    const option=contactRequestType?.selectedOptions?.[0];
    const label=option&&contactRequestType.value?option.textContent.trim():'Contact';
    if(contactLeadName)contactLeadName.value=`Site web - ${label}`;
  };
  syncLeadName();
  contactRequestType?.addEventListener('change',syncLeadName);

  const showNotif=()=>{
    if(!notif)return;
    notif.classList.add('on');
    window.clearTimeout(showNotif._timer);
    showNotif._timer=window.setTimeout(()=>notif.classList.remove('on'),4000);
  };
  const observer=new MutationObserver(()=>{
    const result=contactForm.querySelector('#s_website_form_result');
    if(result?.classList.contains('text-success')){
      showNotif();
      syncLeadName();
    }
  });
  observer.observe(contactForm,{childList:true,subtree:true});
}

/* FAQ ACCORDION */
function toggleFaq(q){
  const item=q.parentElement;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen)item.classList.add('open');
}
