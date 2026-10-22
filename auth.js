/* ===== ระบบกลาง (Supabase) — ซิงก์ข้อมูล localStorage <-> ฐานข้อมูลกลาง =====
   ปิดระบบกลาง: ลบบรรทัด SP_CLOUD ออก แอปจะกลับไปทำงานในเบราว์เซอร์เครื่องเดียวเหมือนเดิม */
var SP_CLOUD={url:"https://zgejwrpfxlkxfjcueadr.supabase.co",key:"sb_publishable_iKK_PPIucflJzBvd8nkTDA_gLfT_XhK",dom:"@sparepart.app"};
var SPC=(function(){
 if(!window.SP_CLOUD||!window.Storage||!window.XMLHttpRequest)return null;
 var C=SP_CLOUD,LS=window.localStorage,P=Storage.prototype,rawSet=P.setItem,rawRem=P.removeItem;
 var SK="sp_cloud_sess",PK="sp_cloud_prof",BK="sp_cloud_base",DK="sp_cloud_dirty",FK="sp_cloud_fail";
 var KEYS=["sp_items","sp_requests","sp_takes","sp_pm_plans","sp_pm_rec","sp_jobs","sp_machines","sp_racks","sp_racks_ver","sp_model","sp_lines","sp_company","sp_daylog"],KS={};
 KEYS.forEach(function(k){KS[k]=1});
 function lget(k){try{return LS.getItem(k)}catch(e){return null}}
 function lset(k,v){try{rawSet.call(LS,k,v)}catch(e){}}
 function lrem(k){try{rawRem.call(LS,k)}catch(e){}}
 function J(k,d){try{var s=lget(k);return s?JSON.parse(s):d}catch(e){return d}}
 function W(k,o){lset(k,JSON.stringify(o))}
 function toStr(v){return v&&typeof v==="object"&&v.__raw!==undefined?v.__raw:JSON.stringify(v)}
 function toVal(s){try{var p=JSON.parse(s);if(p&&typeof p==="object")return p}catch(e){}return{__raw:s}}
 function canon(x){if(Array.isArray(x))return"["+x.map(canon).join(",")+"]";if(x&&typeof x==="object")return"{"+Object.keys(x).sort().map(function(k){return JSON.stringify(k)+":"+canon(x[k])}).join(",")+"}";return JSON.stringify(x)}
 function same(a,b){try{return canon(a)===canon(b)}catch(e){return false}}
 function pack(j){return{at:j.access_token,rt:j.refresh_token,exp:j.expires_at||Math.floor(Date.now()/1000+(j.expires_in||3600)),uid:j.user&&j.user.id}}
 function netBad(){try{return !navigator.onLine||Date.now()-(+sessionStorage.getItem(FK)||0)<45000}catch(e){return false}}
 function netMark(ok){try{if(ok)sessionStorage.removeItem(FK);else sessionStorage.setItem(FK,String(Date.now()))}catch(e){}}
 function hdrs(o){var h={apikey:C.key,"Content-Type":"application/json"};var s=o.noauth?null:(o.tok||(J(SK,null)||{}).at);h.Authorization="Bearer "+(s||C.key);if(o.prefer)h.Prefer=o.prefer;return h}
 function callS(m,path,body,o){o=o||{};var x=new XMLHttpRequest(),h=hdrs(o),r={s:0,j:null};
  try{x.open(m,C.url+path,false);for(var k in h)x.setRequestHeader(k,h[k]);x.send(body==null?null:JSON.stringify(body));r.s=x.status;try{r.j=x.responseText?JSON.parse(x.responseText):null}catch(e){}}catch(e){r.s=0}
  netMark(r.s!==0);return r}
 function call(m,path,body,o){o=o||{};return fetch(C.url+path,{method:m,headers:hdrs(o),body:body==null?undefined:JSON.stringify(body)}).then(function(res){netMark(1);return res.text().then(function(t){var j=null;try{j=t?JSON.parse(t):null}catch(e){}return{s:res.status,j:j}})},function(){netMark(0);return{s:0,j:null}})}
 /* ---- เซสชัน / โปรไฟล์ ---- */
 function signoutLocal(){lrem(SK);lrem(PK);lrem(BK);lrem(DK);KEYS.forEach(lrem)}
 function fresh(){var s=J(SK,null);if(!s)return null;if(s.exp-Date.now()/1000>60)return s;
  if(netBad())return s;
  var r=callS("POST","/auth/v1/token?grant_type=refresh_token",{refresh_token:s.rt},{noauth:1});
  if(r.s===200&&r.j&&r.j.access_token){s=pack(r.j);if(!s.uid)s.uid=J(SK,{}).uid;W(SK,s);return s}
  if(r.s>=400&&r.s<500){signoutLocal();return null}
  return s}
 function loadProfile(){var s=fresh();if(!s)return null;
  if(netBad())return J(PK,null);
  var r=callS("GET","/rest/v1/profiles?id=eq."+s.uid+"&select=id,username,name,role,active,created_at",null,{tok:s.at});
  if(r.s===200){var p=r.j&&r.j[0];if(!p){signoutLocal();return null}W(PK,p);return p}
  if(r.s===401||r.s===403){signoutLocal();return null}
  return J(PK,null)}
 /* ---- ดึงข้อมูล ---- */
 function hasLocal(){return KEYS.some(function(k){return k!=="sp_racks_ver"&&lget(k)!==null})}
 function pull(force){var s=fresh();if(!s||netBad())return false;
  try{if(!force&&Date.now()-(+sessionStorage.getItem("sp_cloud_pull")||0)<6000)return true}catch(e){}
  var r=callS("GET","/rest/v1/kv?select=k,v,ver",null,{tok:s.at});if(r.s!==200||!Array.isArray(r.j))return false;
  var base=J(BK,{}),dirty=J(DK,{}),seen={},p=J(PK,{});
  if(!r.j.length&&p.role==="admin"&&hasLocal()&&!Object.keys(dirty).length){
   if(confirm("ระบบกลางยังไม่มีข้อมูล\nอัปโหลดข้อมูลที่อยู่ในเครื่องนี้ (อะไหล่ คำขอ แผน PM ฯลฯ) ขึ้นระบบกลางเลยไหม ?\n\nกด ตกลง = อัปโหลดข้อมูลเครื่องนี้ขึ้นไป\nกด ยกเลิก = เริ่มต้นใหม่ (ข้อมูลในเครื่องนี้จะถูกล้าง)")){KEYS.forEach(function(k){if(lget(k)!==null)dirty[k]=Date.now()});W(DK,dirty)}}
  r.j.forEach(function(row){seen[row.k]=1;if(!KS[row.k]||dirty[row.k])return;var t=toStr(row.v);lset(row.k,t);base[row.k]={ver:row.ver,v:t}});
  KEYS.forEach(function(k){if(!seen[k]&&!dirty[k]){lrem(k);delete base[k]}});
  W(BK,base);try{sessionStorage.setItem("sp_cloud_pull",String(Date.now()))}catch(e){}return true}
 /* ---- รวมข้อมูลเมื่อมีคนแก้พร้อมกัน (3-way merge ตาม id) ---- */
 function m3(b,l,r,idf,numf){var B={},L={},R={},out=[],seen={};
  b.forEach(function(x){B[idf(x)]=x});l.forEach(function(x){L[idf(x)]=x});r.forEach(function(x){R[idf(x)]=x});
  r.forEach(function(x){var id=idf(x),bb=B[id],ll=L[id];
   if(bb&&!ll)return;                       // ลบในเครื่องนี้
   if(!ll){out.push(x);return}              // เพิ่มจากเครื่องอื่น
   seen[id]=1;
   if(!bb){out.push(ll);return}             // เพิ่มพร้อมกัน ใช้ของเครื่องนี้
   if(!same(ll,bb)){var m=ll;if(numf&&typeof ll[numf]==="number"&&typeof bb[numf]==="number"&&typeof x[numf]==="number"){m=JSON.parse(JSON.stringify(ll));m[numf]=x[numf]+(ll[numf]-bb[numf])}out.push(m)}
   else out.push(x)});
  l.forEach(function(x){var id=idf(x);if(!seen[id]&&!R[id]&&!B[id])out.push(x)});   // เพิ่มในเครื่องนี้
  return out}
 function merge(k,bs,ls,rs){try{var b=bs?JSON.parse(bs):[],l=JSON.parse(ls),r=JSON.parse(rs);
   if(Array.isArray(l)&&Array.isArray(r)&&Array.isArray(b)){
    if(k==="sp_items")return JSON.stringify(m3(b,l,r,function(x){return String(x.c)},"q"));
    if(l.every(function(x){return x&&x.id!==undefined})&&r.every(function(x){return x&&x.id!==undefined}))return JSON.stringify(m3(b,l,r,function(x){return String(x.id)}))}
  }catch(e){}return ls}
 /* ---- ส่งข้อมูลขึ้น ---- */
 var st={busy:false,err:"",tm:0,note:""};
 function setBase(k,ver,v){var b=J(BK,{});b[k]={ver:ver,v:v};W(BK,b)}
 function clearDirty(k,seq){var d=J(DK,{});if(d[k]===seq||seq===undefined){delete d[k];W(DK,d)}}
 function denied(k,row,seq){if(row){lset(k,toStr(row.v));setBase(k,row.ver,toStr(row.v))}else lrem(k);clearDirty(k,seq);st.note="บัญชีนี้ไม่มีสิทธิ์บันทึกข้อมูลส่วนนี้ (ข้อมูลถูกย้อนกลับเป็นของระบบกลาง)";return"denied"}
 function push(k,seq,n){var base=J(BK,{})[k],s=lget(k);
  if(s===null){return call("DELETE","/rest/v1/kv?k=eq."+k,null,{prefer:"return=representation"}).then(function(r){if(r.s===0)return"offline";
    var b=J(BK,{});delete b[k];W(BK,b);clearDirty(k,seq);return"ok"})}
  var val=toVal(s);
  var p=base?call("PATCH","/rest/v1/kv?k=eq."+k+"&ver=eq."+base.ver,{v:val},{prefer:"return=representation"}):call("POST","/rest/v1/kv",{k:k,v:val},{prefer:"return=representation"});
  return p.then(function(r){
   if((r.s===200||r.s===201)&&r.j&&r.j[0]){setBase(k,r.j[0].ver,s);clearDirty(k,seq);return"ok"}
   if(r.s===0)return"offline";
   if(r.s===401)return"auth";
   return call("GET","/rest/v1/kv?k=eq."+k+"&select=k,v,ver",null,{}).then(function(g){
    if(g.s===0)return"offline";if(g.s!==200)return"error";var row=g.j&&g.j[0];
    if(!row){if(base){var b=J(BK,{});delete b[k];W(BK,b);return n<3?push(k,seq,n+1):"error"}return denied(k,null,seq)}
    if(same(row.v,val)){setBase(k,row.ver,toStr(row.v));clearDirty(k,seq);return"ok"}
    if(r.s===403||(base&&row.ver===base.ver&&r.s===200))return denied(k,row,seq);
    if(n>=3)return"conflict";
    var mg=merge(k,base?base.v:null,s,toStr(row.v));lset(k,mg);setBase(k,row.ver,toStr(row.v));st.note="มีคนแก้ข้อมูลพร้อมกัน ระบบรวมข้อมูลให้แล้ว (รีเฟรชหน้าเพื่อดูล่าสุด)";
    return push(k,seq,n+1)})})}
 function flushAll(){if(st.busy)return Promise.resolve();if(!J(SK,null))return Promise.resolve();
  var d=J(DK,{}),ks=Object.keys(d);if(!ks.length){pill();return Promise.resolve()}
  if(!fresh()){pill();return Promise.resolve()}
  st.busy=true;pill();var res="ok";
  return ks.reduce(function(pr,k){return pr.then(function(){return push(k,d[k],0).then(function(x){if(x!=="ok"&&x!=="denied")res=x})})},Promise.resolve()).then(function(){st.busy=false;st.err=res==="ok"?"":res;pill();
   var d2=J(DK,{});if(Object.keys(d2).length&&res==="ok")return flushAll();
   if(st.note){toast(st.note);st.note=""}},function(){st.busy=false;st.err="error";pill()})}
 function markDirty(k){var d=J(DK,{});d[k]=Date.now()+Math.random();W(DK,d);pill();clearTimeout(st.tm);st.tm=setTimeout(flushAll,250)}
 P.setItem=function(k,v){rawSet.apply(this,arguments);if(this===LS&&KS[k]&&J(SK,null)){var b=J(BK,{})[k];if(b&&b.v===String(v))return;markDirty(k)}};
 P.removeItem=function(k){rawRem.apply(this,arguments);if(this===LS&&KS[k]&&J(SK,null)){if(!J(BK,{})[k]&&!J(DK,{})[k])return;markDirty(k)}};
 /* ---- ตัวบอกสถานะ ---- */
 function pill(){var e=document.getElementById("cl-st");if(!e)return;var n=Object.keys(J(DK,{})).length;
  var off=st.err==="offline"||(!navigator.onLine&&n);
  e.className=off||st.err?"bad":(n||st.busy?"wait":"ok");
  e.textContent=off?"☁ ออฟไลน์":st.err?"⚠ ซิงก์ไม่สำเร็จ":(n||st.busy?"☁ กำลังบันทึก…":"☁ ซิงก์แล้ว");
  e.title=off?"ไม่มีอินเทอร์เน็ต ข้อมูลที่แก้จะส่งขึ้นระบบกลางอัตโนมัติเมื่อกลับมาออนไลน์":st.err?"ลองรีเฟรชหน้า":"ข้อมูลตรงกับระบบกลาง"}
 function toast(t,fn){var d=document.createElement("div");d.textContent=t;d.setAttribute("style","position:fixed;left:12px;right:12px;bottom:84px;max-width:460px;margin:auto;background:#0f172a;color:#fff;padding:12px 16px;border-radius:12px;font:600 13px 'Noto Sans Thai',sans-serif;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,.35);cursor:pointer");
  d.onclick=function(){d.remove();if(fn)fn()};(document.body||document.documentElement).appendChild(d);setTimeout(function(){if(d.parentNode)d.remove()},fn?15000:6000)}
 function poll(){if(document.hidden||!J(SK,null))return;
  flushAll().then(function(){if(netBad()||Object.keys(J(DK,{})).length)return;var s=fresh();if(!s)return;
   return call("GET","/rest/v1/kv?select=k,ver",null,{tok:s.at}).then(function(r){if(r.s!==200||!Array.isArray(r.j))return;var b=J(BK,{}),ch=false;
    r.j.forEach(function(x){if(KS[x.k]&&(!b[x.k]||b[x.k].ver!==x.ver))ch=true});KEYS.forEach(function(k){if(b[k]&&!r.j.some(function(x){return x.k===k}))ch=true});
    if(ch&&!document.getElementById("cl-new"))toast("📥 มีข้อมูลใหม่จากเครื่องอื่น — แตะที่นี่เพื่อรีเฟรช",function(){try{sessionStorage.removeItem("sp_cloud_pull")}catch(e){}location.reload()})})})}
 /* ---- เริ่มต้น (ทำก่อนหน้าเว็บโหลดข้อมูล) ---- */
 (function boot(){var s=J(SK,null);if(!s)return;var p=loadProfile();if(!p||!p.active||p.role==="pending"){signoutLocal();return}pull(false)})();
 window.addEventListener("online",function(){flushAll()});document.addEventListener("visibilitychange",function(){if(!document.hidden)poll()});setInterval(poll,30000);
 document.addEventListener("DOMContentLoaded",function(){if(J(SK,null)){var u=document.querySelector(".user");if(u&&!document.getElementById("cl-st")){var e=document.createElement("span");e.id="cl-st";u.insertBefore(e,u.firstChild);
   var c=document.createElement("style");c.textContent="#cl-st{font:600 11px 'Noto Sans Thai',sans-serif;padding:3px 9px;border-radius:99px;white-space:nowrap;margin-right:6px}#cl-st.ok{background:#e7f8ee;color:#15803d}#cl-st.wait{background:#fff4dc;color:#b45309}#cl-st.bad{background:#fee2e2;color:#b91c1c}@media(max-width:760px){#cl-st{display:none}}";document.head.appendChild(c)}pill();setTimeout(flushAll,300)}});
 /* ---- ล็อกอิน / ผู้ใช้ ---- */
 function em(un){return String(un).trim().toLowerCase()+C.dom}
 function errMsg(r,d){var m=r.j&&(r.j.msg||r.j.message||r.j.error_description||r.j.error)||"";return r.s===0?"เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองใหม่":(m||d||"เกิดข้อผิดพลาด ("+r.s+")")}
 function afterAuth(j){var s=pack(j);W(SK,s);var r=callS("GET","/rest/v1/profiles?id=eq."+s.uid+"&select=id,username,name,role,active,created_at",null,{tok:s.at});
  var p=r.j&&r.j[0];if(!p){signoutLocal();return{ok:false,msg:"ไม่พบข้อมูลโปรไฟล์ผู้ใช้ — ตรวจว่ารัน SQL ใน Supabase ครบแล้ว"}}
  if(!p.active){signoutLocal();return{ok:false,msg:"บัญชีนี้ถูกปิดใช้งาน"}}
  if(p.role==="pending"){signoutLocal();return{ok:false,msg:"บัญชียังไม่ได้รับสิทธิ์ ให้ผู้ดูแลระบบกำหนดบทบาทให้ก่อน"}}
  W(PK,p);pull(true);return{ok:true,user:p}}
 var api={
  on:true,
  hasAdmin:function(){return call("POST","/rest/v1/rpc/has_admin",{},{noauth:1}).then(function(r){return r.s===200?{ok:true,v:r.j===true}:{ok:false,msg:errMsg(r)}})},
  login:function(un,pw){return call("POST","/auth/v1/token?grant_type=password",{email:em(un),password:pw},{noauth:1}).then(function(r){
    if(r.s===200&&r.j&&r.j.access_token)return afterAuth(r.j);if(r.s===400||r.s===401)return{ok:false,msg:"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"};return{ok:false,msg:errMsg(r)}})},
  signupFirst:function(un,name,pw){return call("POST","/auth/v1/signup",{email:em(un),password:pw,data:{name:name}},{noauth:1}).then(function(r){
    if(r.s===200&&r.j&&r.j.access_token)return afterAuth(r.j);
    if(r.s===200)return{ok:false,msg:"Supabase ยังเปิด Confirm email อยู่ — ไปปิดที่ Authentication > Sign In / Providers > Email แล้วลองใหม่"};
    return{ok:false,msg:errMsg(r)}})},
  createUser:function(un,name,pw,role){return call("POST","/auth/v1/signup",{email:em(un),password:pw,data:{name:name}},{noauth:1}).then(function(r){
    var id=r.j&&(r.j.user&&r.j.user.id||r.j.id);
    if(r.s===422||(r.j&&r.j.error_code==="user_already_exists"))return{ok:false,msg:"ชื่อผู้ใช้นี้มีอยู่แล้ว"};
    if(r.s!==200||!id)return{ok:false,msg:errMsg(r)};
    if(!r.j.access_token)return{ok:false,msg:"Supabase ยังเปิด Confirm email อยู่ — ปิดก่อนแล้วลบผู้ใช้นี้ในหน้า Authentication > Users"};
    var u=api.updateUser(id,{role:role,name:name});return u.ok?{ok:true}:u})},
  listUsers:function(){var r=callS("GET","/rest/v1/profiles?select=id,username,name,role,active,created_at&order=created_at.asc",null,{tok:(fresh()||{}).at});
   return r.s===200&&Array.isArray(r.j)?r.j.map(function(x){return{id:x.id,username:x.username,name:x.name,role:x.role,active:x.active,created:x.created_at}}):[]},
  updateUser:function(id,f){var r=callS("PATCH","/rest/v1/profiles?id=eq."+id,f,{tok:(fresh()||{}).at,prefer:"return=representation"});return r.s===200&&r.j&&r.j.length?{ok:true}:{ok:false,msg:r.s===200?"ไม่มีสิทธิ์แก้ไขผู้ใช้":errMsg(r)}},
  setPassword:function(id,pw){var r=callS("POST","/rest/v1/rpc/admin_set_password",{target:id,new_pw:pw},{tok:(fresh()||{}).at});return r.s>=200&&r.s<300?{ok:true}:{ok:false,msg:errMsg(r)}},
  deleteUser:function(id){var r=callS("POST","/rest/v1/rpc/admin_delete_user",{target:id},{tok:(fresh()||{}).at});return r.s>=200&&r.s<300?{ok:true}:{ok:false,msg:errMsg(r)}},
  token:function(){var s=fresh();return s&&s.at||""},
  rest:function(m,p,b,pf){var s=fresh();return call(m,p,b,{tok:s&&s.at,prefer:pf})},
  flush:flushAll,
  logout:function(){var go=function(){signoutLocal();location.href="login.html"};var t=setTimeout(go,2500);flushAll().then(function(){clearTimeout(t);go()},go)},
  user:function(){var s=J(SK,null),p=J(PK,null);if(!s||!p||!p.active||p.role==="pending")return null;return{id:p.id,username:p.username,name:p.name,role:p.role,active:true,created:p.created_at}},
  _keys:KEYS};
 return api})();

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
function _spLoginL(username,pw){var u=spUsers().filter(function(x){return x.username.toLowerCase()===String(username).trim().toLowerCase()})[0];
 if(!u||!u.active)return Promise.resolve(null);
 return spHash(pw,u.salt).then(function(h){if(h!==u.hash)return null;localStorage.setItem("sp_session",JSON.stringify({id:u.id,t:Date.now()}));return u})}
function _spCurrentL(){try{var s=JSON.parse(localStorage.getItem("sp_session")||"null");if(!s||Date.now()-s.t>12*36e5)return null;
 var u=spUsers().filter(function(x){return x.id===s.id})[0];if(!u||!u.active)return null;s.t=Date.now();localStorage.setItem("sp_session",JSON.stringify(s));return u}catch(e){return null}}
function _spLogoutL(){try{localStorage.removeItem("sp_session")}catch(e){}location.href="login.html"}
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
 if(sd&&!sd.querySelector('a[href="board.html"]')){var bl=document.createElement("a");bl.href="board.html";bl.innerHTML='💬 บอร์ดข้อความ';var ad=sd.querySelector("a[data-admin]");if(ad)sd.insertBefore(bl,ad);else sd.appendChild(bl)}
 if(sd&&!document.getElementById("mnav")){var nv=document.createElement("nav");nv.id="mnav";
  Array.prototype.forEach.call(sd.querySelectorAll("a"),function(a){var t=a.textContent.trim(),m=t.match(/^(\S+)\s+(.*)$/),c=document.createElement("a");c.href=a.getAttribute("href");
   if(a.hasAttribute("data-editor"))c.setAttribute("data-editor","");if(a.hasAttribute("data-admin"))c.setAttribute("data-admin","");if(a.hasAttribute("data-adminonly"))c.setAttribute("data-adminonly","");
   var lab=(m?m[2]:t).replace(/\s*\(.*\)/,"").replace("ขอเบิกคลังใหญ่","ขอเบิก").replace("ค้นหาอะไหล่","ค้นหา").replace("จัดวางโมเดล","จัดวาง 3D").replace("แผน PM / JOB","PM/JOB").replace("จัดการคำขอ","คำขอ").replace("จัดการระบบ","ระบบ").replace("บอร์ดข้อความ","แชต");
   c.innerHTML="<i>"+(m?m[1]:"•")+"</i><span>"+lab+"</span>";if(a.classList.contains("on"))c.className="on";nv.appendChild(c)});
  document.body.appendChild(nv);
  var cur=nv.querySelector(".on");if(cur&&cur.scrollIntoView)try{nv.scrollLeft=cur.offsetLeft-40}catch(e){}}
 if(!spCanEdit()){var e=document.querySelectorAll("[data-editor],[data-admin]");for(var j=0;j<e.length;j++)e[j].style.display="none"}
 if(!spIsAdmin()){var a=document.querySelectorAll("[data-adminonly]");for(var i=0;i<a.length;i++)a[i].style.display="none"}
});

function spCurrent(){return SPC?SPC.user():_spCurrentL()}
function spLogout(){if(SPC)SPC.logout();else _spLogoutL()}
function spLogin(u,p){if(!SPC)return _spLoginL(u,p);return SPC.login(u,p).then(function(r){window.SP_LOGIN_MSG=r.msg||"";return r.ok?r.user:null})}


/* ===== บอร์ดข้อความ (SPM) + กระดิ่งแจ้งเตือน =====
   ระบบกลาง: ตาราง msgs ใน Supabase (ดู board-setup.sql) | ไม่มีระบบกลาง: เก็บในเบราว์เซอร์ (localStorage sp_msgs) */
var SPM=(function(){
 var C=window.SPC;function me(){return window.SP_USER?SP_USER.id:""}
 function lget(){try{return JSON.parse(localStorage.getItem("sp_msgs")||"[]")}catch(e){return[]}}
 function lput(a){try{localStorage.setItem("sp_msgs",JSON.stringify(a))}catch(e){}}
 function vis(m){return !m.to_id||m.to_id===me()||m.from_id===me()}
 function bad(r){return{status:r&&r.s,missing:!!(r&&(r.s===404||(r.j&&/msgs|relation|schema cache/i.test(JSON.stringify(r.j)))))}}
 var api={cloud:!!C,
  list:function(){if(!C)return Promise.resolve(lget().filter(vis).sort(function(a,b){return a.created_at<b.created_at?1:-1}));
   return C.rest("GET","/rest/v1/msgs?select=*&order=created_at.desc&limit=300").then(function(r){if(r.s===200&&Array.isArray(r.j))return r.j;throw bad(r)})},
  send:function(m){if(!C){var u=SP_USER,a=lget(),to=m.to_id?spUsers().filter(function(x){return x.id===m.to_id})[0]:null;
    var o={id:"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),created_at:new Date().toISOString(),from_id:u.id,from_name:u.name,to_id:m.to_id||null,to_name:to?to.name:"",kind:m.kind||"msg",subject:m.subject||"",body:m.body,item_code:m.item_code||"",qty:m.qty||null,parent_id:m.parent_id||null,status:"open",read_by:[u.id]};a.push(o);lput(a);return Promise.resolve(o)}
   return C.rest("POST","/rest/v1/msgs",{to_id:m.to_id||null,kind:m.kind||"msg",subject:m.subject||"",body:m.body,item_code:m.item_code||"",qty:m.qty||null,parent_id:m.parent_id||null},"return=representation").then(function(r){if(r.s>=200&&r.s<300)return r.j&&r.j[0];throw bad(r)})},
  mark:function(ids){if(!ids.length)return Promise.resolve();if(!C){var a=lget();a.forEach(function(m){if(ids.indexOf(m.id)>=0&&m.read_by.indexOf(me())<0)m.read_by.push(me())});lput(a);return Promise.resolve()}
   return C.rest("POST","/rest/v1/rpc/msg_mark_read",{ids:ids})},
  status:function(id,st){if(!C){var a=lget();a.forEach(function(m){if(m.id===id)m.status=st});lput(a);return Promise.resolve()}return C.rest("POST","/rest/v1/rpc/msg_set_status",{mid:id,st:st}).then(function(r){if(r.s>=200&&r.s<300)return;throw bad(r)})},
  remove:function(id){if(!C){lput(lget().filter(function(m){return m.id!==id&&m.parent_id!==id}));return Promise.resolve()}return C.rest("DELETE","/rest/v1/msgs?id=eq."+id).then(function(r){if(r.s>=200&&r.s<300)return;throw bad(r)})},
  users:function(){if(!C)return Promise.resolve(spUsers().filter(function(u){return u.active&&u.id!==me()}).map(function(u){return{id:u.id,name:u.name,role:u.role}}));
   return C.rest("POST","/rest/v1/rpc/sp_directory",{}).then(function(r){if(r.s===200&&Array.isArray(r.j))return r.j.filter(function(u){return u.id!==me()});return[]})},
  unreadOf:function(l){return l.filter(function(m){return m.from_id!==me()&&(m.read_by||[]).indexOf(me())<0})},
  unread:function(){return api.list().then(function(l){return api.unreadOf(l).length},function(){return 0})}};
 return api})();
function spBellSet(n){var b=document.getElementById("u-bell");if(!b)return;var i=b.querySelector("i");i.textContent=n>99?"99+":n;i.style.display=n>0?"":"none";var l=document.querySelectorAll('.side a[href="board.html"],#mnav a[href="board.html"]');Array.prototype.forEach.call(l,function(a){var t=a.querySelector(".bdg");if(!t){t=document.createElement("b");t.className="bdg";t.style.cssText="margin-left:auto;background:#ef4444;color:#fff;border-radius:99px;font-size:11px;padding:1px 7px;font-style:normal";if(a.parentNode.id==="mnav"){t.style.cssText="position:absolute;top:2px;right:18%;background:#ef4444;color:#fff;border-radius:99px;font-size:10px;padding:0 5px;margin:0";a.style.position="relative"}a.appendChild(t)}t.textContent=n;t.style.display=n>0?"":"none"})}
document.addEventListener("DOMContentLoaded",function(){
 if(!SP_USER)return;var top=document.querySelector(".top"),us=document.querySelector(".top .user");if(!top||!us)return;
 Array.prototype.forEach.call(document.querySelectorAll(".top .bell"),function(e){e.remove()});
 var st=document.createElement("style");st.textContent="#u-bell{position:relative;font-size:20px;text-decoration:none;color:#fff;margin-right:6px;line-height:1}#u-bell i{position:absolute;top:-7px;right:-9px;background:#ef4444;color:#fff;font-style:normal;font-size:10px;border-radius:99px;padding:1px 5px;min-width:16px;text-align:center}";document.head.appendChild(st);
 var b=document.createElement("a");b.id="u-bell";b.href="board.html";b.title="บอร์ดข้อความ";b.innerHTML='🔔<i style="display:none">0</i>';top.insertBefore(b,us);
 function poll(){if(document.hidden)return;SPM.unread().then(spBellSet)}
 poll();setInterval(poll,45000);document.addEventListener("visibilitychange",poll);window.spBellPoll=poll});
