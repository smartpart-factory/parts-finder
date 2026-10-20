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
 st.textContent=".u-out{margin-left:8px;border:1px solid #5b78b8;background:transparent;color:#dbe6fb;border-radius:6px;padding:5px 10px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}.u-out:hover{background:#15306e}";
 document.head.appendChild(st);
 var n=document.getElementById("u-name");
 if(n){n.textContent=SP_USER.name;var sm=document.createElement("small");sm.textContent=SP_ROLE_TXT[SP_USER.role]||SP_USER.role;n.appendChild(sm)}
 var u=document.querySelector(".user");
 if(u){var b=document.createElement("button");b.className="u-out";b.textContent="ออกจากระบบ";b.onclick=spLogout;u.appendChild(b)}
 if(!spCanEdit()){var e=document.querySelectorAll("[data-editor],[data-admin]");for(var j=0;j<e.length;j++)e[j].style.display="none"}
 if(!spIsAdmin()){var a=document.querySelectorAll("[data-adminonly]");for(var i=0;i<a.length;i++)a[i].style.display="none"}
});
