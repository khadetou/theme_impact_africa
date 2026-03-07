// @odoo-module ignore

/* CURSOR */
const curs=[...document.querySelectorAll('#cur')];
const rings=[...document.querySelectorAll('#curR')];
curs.slice(1).forEach(el=>el.remove());
rings.slice(1).forEach(el=>el.remove());

const cur=curs[0],curR=rings[0];
if(cur&&curR){
  let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my,active=false;
  const activateCursor=()=>{
    if(active){
      return;
    }
    active=true;
    cur.classList.add('is-active');
    curR.classList.add('is-active');
  };
  const setCursorPosition=(x,y)=>{
    activateCursor();
    mx=x;my=y;
    cur.style.left=mx+'px';
    cur.style.top=my+'px';
  };
  document.addEventListener('pointermove',e=>setCursorPosition(e.clientX,e.clientY),{passive:true});
  document.addEventListener('pointerdown',e=>setCursorPosition(e.clientX,e.clientY),{passive:true});
  (function loop(){
    if(active){
      rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
      curR.style.left=rx+'px';curR.style.top=ry+'px';
    }
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.auth-tab,.f-check,.pw-toggle,.s-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>curR.classList.add('big'));
    el.addEventListener('mouseleave',()=>curR.classList.remove('big'));
  });
}

/* TAB SWITCH */
function switchTab(panel,btn){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panel==='login'?'loginPanel':'registerPanel').classList.add('active');
}

/* PASSWORD TOGGLE */
function togglePw(id,icon){
  const inp=document.getElementById(id);
  if(inp.type==='password'){
    inp.type='text';
    icon.innerHTML='<iconify-icon icon="mdi:eye-off-outline"></iconify-icon>';
  } else {
    inp.type='password';
    icon.innerHTML='<iconify-icon icon="mdi:eye-outline"></iconify-icon>';
  }
}

/* FORM VALIDATION */
function clearError(id){document.getElementById(id)?.classList.remove('error');}

function handleLogin(){
  const email=document.getElementById('loginEmail').value;
  const pw=document.getElementById('loginPw').value;
  let ok=true;
  if(!email||!email.includes('@')){document.getElementById('fg-email').classList.add('error');ok=false;}
  if(!pw){document.getElementById('fg-pw').classList.add('error');ok=false;}
  if(!ok)return;
  const btn=document.getElementById('loginBtn');
  btn.style.opacity='.7';
  btn.innerHTML='<iconify-icon icon="mdi:loading" style="animation:spin 1s linear infinite"></iconify-icon> Connexion...';
  setTimeout(()=>{
    btn.style.opacity='1';
    btn.style.background='var(--green-dark)';
    btn.innerHTML='<iconify-icon icon="mdi:check-circle-outline"></iconify-icon> Connecté !';
  },2000);
}

function handleRegister(){
  const btn=event.currentTarget;
  btn.style.opacity='.7';
  btn.innerHTML='<iconify-icon icon="mdi:loading" style="animation:spin 1s linear infinite"></iconify-icon> Création...';
  setTimeout(()=>{
    btn.style.opacity='1';
    btn.style.background='var(--green-dark)';
    btn.innerHTML='<iconify-icon icon="mdi:check-circle-outline"></iconify-icon> Compte créé !';
  },2200);
}
