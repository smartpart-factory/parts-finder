/* ===== ข้อมูลอะไหล่ (ตอนนี้ว่างเปล่า — เพิ่มรายการจริงของแผนกที่นี่) =====
 c=รหัส  n=ชื่อ  k=คำค้นเพิ่ม(ให้ค้นด้วยชื่อเรียกอื่นได้)  m=เครื่องจักรที่ใช้  q=คงเหลือ  min=ขั้นต่ำ
 r=ชั้นวาง(ต้องมีใน SP_RACKS)  s=ชั้นที่  u=หน่วย  rep=ข้อความ(ใส่เฉพาะของที่กำลังซ่อม)  glb=ไฟล์โมเดล 3D ของอะไหล่ชิ้นนี้ (ไม่บังคับ เช่น "models/bearing.glb")  pos=[x,y,z] ตำแหน่ง 3D เฉพาะ (ไม่บังคับ)
 ตัวอย่างข้อมูลเดิมเก็บไว้ที่ไฟล์ data.sample.js */
/* เครื่องจักร/แผนก: แก้ได้ที่หน้า "จัดการระบบ" > "เครื่องจักร" (เพิ่ม/เปลี่ยนชื่อ/ใส่รูป) ค่าด้านล่างเป็นค่าเริ่มต้น */
var SP_MACH=[{k:"ISM",d:"เครื่องเป่าขวด / ขวด PET",f:"ism.jpg"},{k:"RENGER",d:"เครื่องบรรจุ",f:"renger.jpg"},{k:"OLT",d:"เครื่องหดฟิล์ม / บรรจุรวม",f:"olt.jpg"},{k:"EVO",d:"ระบบลำเลียง / แพ็คกิ้ง",f:"evo.jpg"},{k:"COLD END",d:"ระบบทำความเย็น",f:"coldend.jpg"},{k:"METTAL",d:"เครื่องซีลรูป / ปั๊ม",f:"mettal.jpg"}];
try{var _mm=localStorage.getItem("sp_machines");if(_mm)SP_MACH=JSON.parse(_mm)}catch(e){}
var SP_MACHINES=SP_MACH.map(function(m){return m.k});
function spMachSave(a){SP_MACH=a;SP_MACHINES=a.map(function(m){return m.k});localStorage.setItem("sp_machines",JSON.stringify(a))}
/* ===== ผังชั้นวางใน 3D =====
 x,z = ตำแหน่งบนพื้น (เมตรสมมติ)  w,d,h = กว้าง/ลึก/สูง  n = จำนวนชั้น (ชั้นที่ 1 อยู่ล่างสุด)
 แก้ได้ที่หน้า "จัดการระบบ" > "ผังคลัง 3D" (จะเก็บในเบราว์เซอร์ และใช้แทนค่าด้านล่าง) */
/* ผังจริงชั้น 1 (หน้า 3 เหนือสุด → หน้า 1 ใต้สุด/ทางเข้า) — S/C/G/L = ห้องเก็บอะไหล่, W/K = ห้องช่าง ดูชื่อเต็มในไฟล์ dept.js */
var SP_RACKS={
 S1:{x:3.18,z:4.875,w:1.25,d:4.875,h:2.625,n:3},
 S2:{x:6.075,z:4.875,w:1.212,d:4.875,h:2.625,n:3},
 C1:{x:6.15,z:0.66,w:1.5,d:0.6,h:2.4,n:8},
 C2:{x:7.7,z:0.66,w:1.5,d:0.6,h:2.25,n:5},
 C3:{x:8.22,z:2.445,w:0.575,d:1.15,h:2.25,n:4},
 C4:{x:8.04,z:4.11,w:0.575,d:1.15,h:2.25,n:4},
 C5:{x:8.07,z:5.865,w:0.62,d:1.5,h:2.4,n:8},
 G1:{x:8.085,z:7.8,w:0.8,d:1.5,h:2.25,n:4},
 L1:{x:2.715,z:8.865,w:0.925,d:0.488,h:1.25,n:2},
 L2:{x:3.87,z:8.865,w:1.0,d:0.488,h:1.25,n:2},
 L3:{x:5.16,z:8.865,w:1.137,d:0.488,h:1.25,n:2},
 L4:{x:6.555,z:8.835,w:1.188,d:0.438,h:1.25,n:2},
 W1:{x:7.275,z:12.495,w:1.737,d:1.562,h:2.5,n:4},
 W2:{x:7.275,z:14.415,w:1.737,d:1.65,h:2.5,n:4},
 K1:{x:2.16,z:18.55,w:0.6,d:2.1,h:1.15,n:2}};
/* เวอร์ชันผังชั้นวาง: เมื่อเปลี่ยนผังเริ่มต้นใหม่ (เปลี่ยนเลขนี้) ผังที่เคยแก้ไว้ในเบราว์เซอร์จะถูกล้างหนึ่งครั้ง เพื่อใช้ผังใหม่ */
var SP_RACKS_VER="floor1-v7";
try{if(localStorage.getItem("sp_racks_ver")!==SP_RACKS_VER){localStorage.removeItem("sp_racks");localStorage.setItem("sp_racks_ver",SP_RACKS_VER)}}catch(e){}
try{var _rk=localStorage.getItem("sp_racks");if(_rk)SP_RACKS=JSON.parse(_rk)}catch(e){}
function spRacksSave(o){SP_RACKS=o;localStorage.setItem("sp_racks",JSON.stringify(o));try{localStorage.setItem("sp_racks_ver",SP_RACKS_VER)}catch(e){}}
/* ===== โมเดล 3D ของคลังจริง (เตรียมไว้) =====
 url = path ไฟล์ .glb เช่น "models/warehouse.glb" (วางไฟล์ในโฟลเดอร์ models/) เว้นว่าง = ใช้ชั้นวางกล่องจำลอง
 scale = ขนาด, x/y/z = ตำแหน่งชดเชย, hideRacks = ซ่อนชั้นวางกล่องจำลองเมื่อมีโมเดลจริง */
var SP_MODEL={url:"",scale:1,x:0,y:0,z:0,hideRacks:true};
try{var _md=localStorage.getItem("sp_model");if(_md)SP_MODEL=JSON.parse(_md)}catch(e){}
function spModelSave(o){SP_MODEL=o;localStorage.setItem("sp_model",JSON.stringify(o))}
/* ===== ผู้ช่วย AI (ไม่บังคับ) =====
 ถ้ามีเซิร์ฟเวอร์ที่ต่อ AI ไว้ ใส่ URL ตรงนี้ บอทจะส่งคำถามที่ตัวเองตอบไม่ได้ไปที่นั่น (POST JSON {message}) และรับ {reply}
 ห้ามใส่ API key ในไฟล์นี้ */
var SP_AI_ENDPOINT="";
var SP_TXT={stock:"มีของ",low:"ใกล้หมด",out:"หมด",repair:"กำลังซ่อม"};
var SP_ITEMS=[
  // ตัวอย่างการเพิ่มอะไหล่ 1 รายการ (ลบ // หน้าบรรทัดออก แล้วแก้เป็นของจริง คั่นแต่ละรายการด้วยจุลภาค)
  // {c:"BRG-6205",n:"Bearing 6205",k:"ลูกปืน แบริ่ง",m:["ISM","RENGER"],q:48,min:20,r:"A1",s:2,u:"ตัว"},
];
/* ข้อความตำแหน่งของอะไหล่: อยู่บนชั้นวาง หรือปักหมุดในโมเดล 3D (เช่น บนโต๊ะ) */
function spLoc(i){if(i.dw)return "ตู้ลิ้นชัก (หน้าโต๊ะ) แถว "+i.dw[1]+" ชั้น "+i.dw[2]+(i.tx?" · "+i.tx:"");var pin=!!(i.pos||i.at),b=i.r?("ชั้นวาง "+i.r+(i.s?" ชั้นที่ "+i.s:"")):(pin?(i.at||"จุดที่ปักหมุดใน 3D"):(i.tx||"ยังไม่ได้กำหนดตำแหน่ง"));return i.tx&&(i.r||pin)?b+" · "+i.tx:b}
/* โมเดล 3D ของอะไหล่ที่เลือกเองได้ (เก็บในฟิลด์ mt) — ไม่เลือก = ไม่แสดงโมเดล */
var SP_MODELS=[["","— ไม่แสดงโมเดล 3D —"],["hbelt","🧲 สายพานแขวนผนัง (เสาสี่เหลี่ยม)"],["hbeltb","🧲 สายพานแขวนผนัง (ใหญ่/หลายเส้น)"],["hcoil","🧲 สายยาง/สายไฟแขวนผนัง"],["motor","⚙️ มอเตอร์"],["gear","🔩 เกียร์มอเตอร์"],["cable","🔌 สายไฟ (ม้วน)"],["cablebox","🧰 สายไฟในกล่อง"],["belt","🟤 สายพานมอเตอร์"],["bearing","⚪ ตลับลูกปืน"],["board","🟩 การ์ด / แผงวงจร (PLC)"],["valve","🔵 กระบอกลม / วาล์ว"],["sensor","📡 เซ็นเซอร์"],["pump","💧 ปั๊ม"],["bin","📥 กล่องพลาสติกอะไหล่ชิ้นเล็ก"],["box","📦 กล่องพัสดุ"],["fender","🛡️ แผ่นโค้ง / บังโคลน (ห่อพลาสติก)"],["gearbox","⚙️ ชุดเฟือง / เกียร์บ็อกซ์ (ห่อพลาสติก)"],["bracket","🟩 ขาจับ / ชุดใบมีด"],["beltbag","🛍️ สายพานในถุงซิป"],["fiber","🧵 สายไฟเบอร์ออปติกในถุง"],["dcmotor","🔋 มอเตอร์ DC (ห่อพลาสติก)"],["micro","🎚️ ชุดปรับไมโครมิเตอร์"],["roller","🟤 ลูกกลิ้ง / ดรัมพันผ้าทราย"],["vgear","🏭 เกียร์มอเตอร์แนวตั้ง (ห่อพลาสติก)"],["disc","⚪ แผ่นกลม / แหวนรอง"],["shaft","📏 เพลา / สไปล์ชาฟต์"],["sensorcable","🔌 สายเซ็นเซอร์ + หัวคอนเน็กเตอร์"]];
var SP_WALLM=["hbelt","hbeltb","hcoil"];
function spModelOpts(sel,wall){return SP_MODELS.filter(function(m){return !wall?true:(m[0]===""||SP_WALLM.indexOf(m[0])>=0)}).map(function(m){return '<option value="'+m[0]+'"'+(m[0]===sel?' selected':'')+'>'+m[1]+'</option>'}).join("")}
function spModelGuess(n){var s=String(n||"").toLowerCase();
 if(/fiber|ไฟเบอร์|optic/.test(s))return "fiber";if(/micro|ไมโคร/.test(s))return "micro";if(/shaft|เพลา|spline|สไปล์/.test(s))return "shaft";if(/fender|บังโคลน|ครอบล้อ/.test(s))return "fender";if(/gearbox|เกียร์บ็อก|เฟือง/.test(s))return "gearbox";if(/roller|ลูกกลิ้ง|ดรัม|drum/.test(s))return "roller";if(/washer|แหวนรอง|disc|แผ่นกลม/.test(s))return "disc";if(/dc motor|มอเตอร์ dc|มอเตอร์ดีซี/.test(s))return "dcmotor";if(/bracket|ขาจับ|ขายึด/.test(s))return "bracket";
 if(/สายพาน|belt/.test(s))return "belt";if(/เกียร์|gear/.test(s))return "gear";if(/มอเตอร์|motor/.test(s))return "motor";if(/สายไฟ|cable|wire|สาย/.test(s))return "cable";
 if(/bearing|ลูกปืน|แบริ่ง/.test(s))return "bearing";if(/card|board|plc|การ์ด|แผง|pcb|module|โมดูล|drive|ไดรฟ์/.test(s))return "board";
 if(/valve|วาล์ว|cylinder|กระบอก|solenoid|โซลินอยด์/.test(s))return "valve";if(/sensor|เซนเซอร์|เซ็นเซอร์|switch|สวิตช์|สวิทช์/.test(s))return "sensor";if(/pump|ปั๊ม/.test(s))return "pump";return ""}
function spLocShort(i){if(i.dw)return "ลิ้นชัก "+i.dw[1]+"-"+i.dw[2];return i.r?(i.r+"-"+(i.s||1)):(i.at||i.tx||(i.pos?"ปักหมุด":"ยังไม่กำหนด"))}
/* รูปอะไหล่: ย่อรูปที่เลือกเป็น JPEG ไม่เกิน 360px (เก็บเป็น data URL ในเบราว์เซอร์) */
function spResize(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,480/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.74))};im.onerror=function(){cb("")};im.src=r.result};r.onerror=function(){cb("")};r.readAsDataURL(file)}
function spImg(i){return i.img||("images/"+i.c+".jpg")}
function spStatus(i){return i.rep?"repair":(i.t==="re"&&i.q<=0&&i.rp>0)?"repair":i.q<=0?"out":i.q<=i.min?"low":"stock"}
/* อะไหล่ประเภท "ซ่อมแล้วใช้ซ้ำได้" (i.t==="re"): ส่งซ่อม = ย้ายจากคงเหลือไปยอดกำลังซ่อม (i.rp), ซ่อมเสร็จ = กลับมาเพิ่มในคงเหลือ */
function spRepair(code,n,dir){n=parseInt(n,10);if(!(n>0))return "ใส่จำนวนให้ถูกต้อง";var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===code})[0];if(!x)return "ไม่พบอะไหล่นี้";
 x.rp=x.rp||0;if(dir==="send"){if(n>x.q)return "ในแผนกมีแค่ "+x.q+" "+(x.u||"");x.q-=n;x.rp+=n}else{if(n>x.rp)return "ยอดที่กำลังซ่อมมีแค่ "+x.rp+" "+(x.u||"");x.rp-=n;x.q+=n}
 var u=window.SP_USER||{};x.rlog=(x.rlog||[]).concat([{t:new Date().toISOString(),by:u.name||"",d:dir,n:n}]).slice(-30);
 try{spItemsSave(l)}catch(e){return "บันทึกไม่สำเร็จ"}return ""}
function spRepairUI(box,it,dir,done){var mx=dir==="send"?it.q:(it.rp||0);box.innerHTML='<span>'+(dir==="send"?'ส่งซ่อมกี่':'ซ่อมเสร็จกี่')+(it.u?' ('+it.u+')':'')+'? <input type="number" min="1" max="'+mx+'" value="1" style="width:70px;padding:6px;border:1px solid #cfd8ea;border-radius:8px"> <button type="button" class="ok2">✔ ยืนยัน</button> <button type="button" class="cn2">ยกเลิก</button> <small class="er2" style="color:#dc2626"></small></span>';
 var inp=box.querySelector("input");inp.focus();box.querySelector(".cn2").onclick=function(){done&&done(false)};
 box.querySelector(".ok2").onclick=function(){var e=spRepair(it.c,inp.value,dir);if(e){box.querySelector(".er2").textContent=e;return}done&&done(true)}}
/* ถ้า admin เคยแก้ข้อมูลในหน้า "จัดการระบบ" ข้อมูลจะถูกเก็บในเบราว์เซอร์และใช้แทนรายการด้านบน */
var SP_BASE_ITEMS=SP_ITEMS.slice();
try{var _sv=localStorage.getItem("sp_items");if(_sv)SP_ITEMS=JSON.parse(_sv)}catch(e){}
function spItemsSave(a){var old=SP_ITEMS;SP_ITEMS=a;try{localStorage.setItem("sp_items",JSON.stringify(a))}catch(e){SP_ITEMS=old;throw e}}

function spUsedKB(){var t=0;try{Object.keys(localStorage).forEach(function(k){t+=k.length+String(localStorage.getItem(k)||"").length})}catch(e){}return Math.round(t*2/1024)}
function spShrink(list,cb){var L=list.filter(function(i){return i.img&&String(i.img).indexOf("data:")===0&&i.img.length>7000}),n=0;if(!L.length)return cb();
 L.forEach(function(i){var im=new Image();im.onload=function(){var k=Math.min(1,200/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);var u=c.toDataURL("image/jpeg",.55);if(u.length<i.img.length)i.img=u;if(++n===L.length)cb()};im.onerror=function(){if(++n===L.length)cb()};im.src=i.img})}

/* ===== เก็บรูปบน Supabase Storage (bucket "parts") — ถ้าอัปโหลดไม่ได้จะใช้รูปในเบราว์เซอร์แทน ===== */
function spUploadImg(du,tag,cb){try{var C=window.SP_CLOUD,T=window.SPC&&SPC.token&&SPC.token();if(!C||!T||!/^data:image\//.test(du||""))return cb("");
 var b=atob(du.split(",")[1]),a=new Uint8Array(b.length),i;for(i=0;i<b.length;i++)a[i]=b.charCodeAt(i);var mime=du.slice(5,du.indexOf(";")),ext=mime.indexOf("png")>0?"png":"jpg",
 p="items/"+String(tag||"x").replace(/[^A-Za-z0-9_-]/g,"_").slice(0,40)+"-"+Date.now().toString(36)+Math.random().toString(36).slice(2,5)+"."+ext;
 fetch(C.url+"/storage/v1/object/parts/"+p,{method:"POST",headers:{apikey:C.key,Authorization:"Bearer "+T,"Content-Type":mime,"x-upsert":"false"},body:a}).then(function(r){cb(r.ok?C.url+"/storage/v1/object/public/parts/"+p:"")},function(){cb("")})}catch(e){cb("")}}
function spMigrateImgs(prog,cb){var L=[];SP_ITEMS.forEach(function(i){if(i.img&&String(i.img).indexOf("data:")===0)L.push({o:i,t:i.c})});SP_MACH.forEach(function(m){if(m.img&&String(m.img).indexOf("data:")===0)L.push({o:m,t:"mach-"+m.k})});
 var n=L.length,done=0,ok=0,k=0;if(!n)return cb({n:0,ok:0});
 function next(){if(k>=L.length)return;var e=L[k++];spUploadImg(e.o.img,e.t,function(u){if(u){e.o.img=u;ok++}done++;prog&&prog(done,n);if(done===n){var er="";try{spItemsSave(SP_ITEMS);spMachSave(SP_MACH)}catch(x){er="save"}cb({n:n,ok:ok,err:er})}else next()})}
 for(var w=0;w<3&&w<n;w++)next()}
