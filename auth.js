/* ===== ระบบผู้ใช้ (ทำงานในเบราว์เซอร์) =====
 บทบาท: admin = ทำได้ทุกอย่าง | manager = เหมือน admin แต่สร้างผู้ใช้/รีเซ็ตรหัสผ่าน/เปลี่ยนบทบาทไม่ได้ | user = ดู ค้นหา และสร้างคำขอ
 หมายเหตุ: นี่คือระบบฝั่งเบราว์เซอร์ เหมาะกับต้นแบบ ไม่ใช่ความปลอดภัยระดับเซิร์ฟเวอร์ */
var SP_ROLE_TXT={admin:"ผู้ดูแลระบบ",manager:"ช่าง Day time",user:"ช่างกะ"};
function spUsers(){try{return JSON.parse(localStorage.getItem("sp_users")||"[]").map(function(u){if(u.role==="editor")u.role="manager";return u})}catch(e){return[]}}
function spUsersSave(a){localStorage.setItem("sp_users",JSON.stringify(a))}
function spHex(a){return Array.from(a).map(function(x){return ("0"+x.toString(16)).slice(-2)}).join("")}
function spSalt(){var a=new Uint8Array(8);if(window.crypto&&crypto.getRandomValues)crypto.getRandomValues(a);else for(var i=0;i<8;i++)a[i]=Math.floor(Math.random()*256);return spHex(a)}
function spHash(pw,salt){var s=salt+":"+pw;
 if(window.crypto&&crypto.subtle&&window.TextEncoder)return crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)).then(function(b){return spHex(new Uint8Array(b))});
 return Promise.resolve("x"+btoa(unescape(encodeURIComponent(s))))}
function spMakeUser(username,name,role,pw){var salt=spSalt();return spHash(pw,salt).then(function(h){
 return{id:"u"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),username:username,name:name,role:role,salt:salt,hash:h,active:true,created:new Date().toISOString()}})}
function spLogin(username,pw){var u=spUsers().filter(function(x){return x.username.toLowerCase()===String(username).trim().toLowerCase()})[0];
 if(!u||!u.active)return Promise.resolve(null);
 return spHash(pw,u.salt).then(function(h){if(h!==u.hash)return null;localStorage.setItem("sp_session",JSON.stringify({id:u.id,t:Date.now()}));return u})}
function spCurrent(){try{var s=JSON.parse(localStorage.getItem("sp_session")||"null");if(!s||Date.now()-s.t>12*36e5)return null;
 var u=spUsers().filter(function(x){return x.id===s.id})[0];if(!u||!u.active)return null;s.t=Date.now();localStorage.setItem("sp_session",JSON.stringify(s));return u}catch(e){return null}}
function spLogout(){try{localStorage.removeItem("sp_session")}catch(e){}location.href="login.html"}
function spIsAdmin(){return !!(window.SP_USER&&SP_USER.role==="admin")}
function spCanEdit(){return !!(window.SP_USER&&(SP_USER.role==="admin"||SP_USER.role==="manager"))}
var SP_USER=spCurrent();
if(!window.SP_NOGUARD&&!SP_USER){var _pg=location.pathname.split("/").pop()||"index.html";location.replace("login.html?next="+encodeURIComponent(_pg+location.search))}
document.addEventListener("DOMContentLoaded",function(){
 if(!SP_USER)return;
 var st=document.createElement("style");
 st.textContent=".u-out{margin-left:8px;border:1px solid #5b78b8;background:transparent;color:#dbe6fb;border-radius:6px;padding:5px 10px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}.u-out:hover{background:#15306e}@media(max-width:760px){#mnav{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;overflow-x:auto;background:#fff;border-top:1px solid #e2e8f0;box-shadow:0 -6px 18px -10px rgba(15,23,42,.35);padding:4px 4px calc(4px + env(safe-area-inset-bottom));-webkit-overflow-scrolling:touch}#mnav a{flex:0 0 auto;min-width:64px;display:flex;flex-direction:column;align-items:center;gap:1px;padding:5px 8px;border-radius:10px;color:#475569;text-decoration:none;font:600 11px \"Noto Sans Thai\",sans-serif;white-space:nowrap}#mnav a i{font-style:normal;font-size:20px;line-height:1.2}#mnav a.on{background:#eaf1ff;color:#1d4ed8}body{padding-bottom:70px}.top{gap:8px!important;padding:0 10px!important}.top .logo{min-width:0}.user{gap:6px!important;flex:0 0 auto}.user .u-out{padding:4px 10px!important;margin-left:0!important}.user .av{width:32px;height:32px}main{min-width:0;max-width:100vw}.card,.box{overflow-x:auto}.card table{min-width:560px}#cb-btn{bottom:84px!important}#cb{bottom:152px!important}.row>*,.three>*,.foot>*{min-width:0}.sbar{flex-wrap:wrap}.sbar input{min-width:0;flex:1 1 100%}.sbar button{flex:1 1 auto;padding:10px 12px!important}.sbox{display:none!important}.top .sp{display:none}.top{justify-content:space-between}.logo b{font-size:16px!important}.logo img{height:36px!important;width:auto}.user .av{display:none}.user .u-out{font-size:12px!important;padding:5px 10px!important;white-space:nowrap}.bell{margin-left:auto}.hero{height:auto!important;min-height:96px;padding:16px!important;border-radius:12px!important}.hero h1{font-size:19px!important;line-height:1.3;margin:0 0 4px!important}.hero p{font-size:12.5px!important;line-height:1.4}.act{padding:14px!important;display:grid;grid-template-columns:52px 1fr;column-gap:12px;align-items:center}.act .ico{width:52px!important;height:52px!important;font-size:26px!important;margin:0!important;grid-row:1/4;border-radius:12px!important}.act h3{font-size:17px!important;margin:0 0 2px!important}.act p{font-size:12px!important;min-height:0!important;margin:0 0 8px!important;line-height:1.35}.act button{padding:8px 16px!important;font-size:13px;justify-self:start}h2{font-size:20px!important}.card,.box{border-radius:12px!important}.chip,.pill{font-size:12px}body{font-size:14px;-webkit-text-size-adjust:100%}#cb-btn{width:52px!important;height:52px!important;font-size:22px!important}}";
 document.head.appendChild(st);
 var n=document.getElementById("u-name");
 if(n){n.textContent=SP_USER.name;var sm=document.createElement("small");sm.textContent=SP_ROLE_TXT[SP_USER.role]||SP_USER.role;n.appendChild(sm)}
 var u=document.querySelector(".user");
 if(u){var b=document.createElement("button");b.className="u-out";b.textContent="ออกจากระบบ";b.onclick=spLogout;u.appendChild(b)}

 var sd=document.querySelector(".side");
 if(sd&&!document.getElementById("mnav")){var nv=document.createElement("nav");nv.id="mnav";
  Array.prototype.forEach.call(sd.querySelectorAll("a"),function(a){var t=a.textContent.trim(),m=t.match(/^(\S+)\s+(.*)$/),c=document.createElement("a");c.href=a.getAttribute("href");
   if(a.hasAttribute("data-editor"))c.setAttribute("data-editor","");if(a.hasAttribute("data-admin"))c.setAttribute("data-admin","");
   var lab=(m?m[2]:t).replace(/\s*\(.*\)/,"").replace("ขอเบิกคลังใหญ่","ขอเบิก").replace("ค้นหาอะไหล่","ค้นหา").replace("ตำแหน่งจัดเก็บ","ตำแหน่ง 3D").replace("แผน PM / JOB","PM/JOB").replace("จัดการคำขอ","คำขอ").replace("จัดการระบบ","ระบบ");
   c.innerHTML="<i>"+(m?m[1]:"•")+"</i><span>"+lab+"</span>";if(a.classList.contains("on"))c.className="on";nv.appendChild(c)});
  document.body.appendChild(nv);
  var cur=nv.querySelector(".on");if(cur&&cur.scrollIntoView)try{nv.scrollLeft=cur.offsetLeft-40}catch(e){}}
 if(!spCanEdit()){var e=document.querySelectorAll("[data-editor],[data-admin]");for(var j=0;j<e.length;j++)e[j].style.display="none"}
 if(!spIsAdmin()){var a=document.querySelectorAll("[data-adminonly]");for(var i=0;i<a.length;i++)a[i].style.display="none"}
});
