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
 S1:{x:2.57,z:3.12,w:1.11,d:4.02,h:1.8,n:3},
 S2:{x:4.22,z:3.23,w:0.97,d:4.1,h:1.8,n:3},
 C1:{x:4.13,z:0.43,w:0.77,d:0.47,h:1.8,n:3},
 C2:{x:5.12,z:0.44,w:0.85,d:0.5,h:1.8,n:3},
 C3:{x:5.48,z:1.63,w:0.46,d:0.88,h:1.8,n:3},
 C4:{x:5.36,z:2.74,w:0.47,d:1.12,h:1.8,n:3},
 C5:{x:5.38,z:3.91,w:0.51,d:0.95,h:1.8,n:3},
 G1:{x:5.39,z:5.2,w:0.64,d:1.2,h:1.8,n:4},
 L1:{x:1.81,z:5.91,w:0.74,d:0.39,h:1.0,n:2},
 L2:{x:2.58,z:5.91,w:0.8,d:0.39,h:1.0,n:2},
 L3:{x:3.44,z:5.91,w:0.91,d:0.39,h:1.0,n:2},
 L4:{x:4.37,z:5.89,w:0.95,d:0.35,h:1.0,n:2},
 W1:{x:4.85,z:8.33,w:1.39,d:1.25,h:2.0,n:4},
 W2:{x:4.85,z:9.61,w:1.39,d:1.32,h:2.0,n:4},
 K1:{x:1.44,z:12.5,w:0.75,d:1.2,h:1.8,n:3}};
/* เวอร์ชันผังชั้นวาง: เมื่อเปลี่ยนผังเริ่มต้นใหม่ (เปลี่ยนเลขนี้) ผังที่เคยแก้ไว้ในเบราว์เซอร์จะถูกล้างหนึ่งครั้ง เพื่อใช้ผังใหม่ */
var SP_RACKS_VER="floor1-v3";
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
function spLoc(i){return i.r?("ชั้นวาง "+i.r+(i.s?" ชั้นที่ "+i.s:"")):(i.at||"จุดที่ปักหมุดใน 3D")}
function spLocShort(i){return i.r?(i.r+"-"+(i.s||1)):(i.at||"ปักหมุด")}
/* รูปอะไหล่: ย่อรูปที่เลือกเป็น JPEG ไม่เกิน 360px (เก็บเป็น data URL ในเบราว์เซอร์) */
function spResize(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,360/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.78))};im.onerror=function(){cb("")};im.src=r.result};r.onerror=function(){cb("")};r.readAsDataURL(file)}
function spImg(i){return i.img||("images/"+i.c+".jpg")}
function spStatus(i){return i.rep?"repair":i.q<=0?"out":i.q<=i.min?"low":"stock"}
/* ถ้า admin เคยแก้ข้อมูลในหน้า "จัดการระบบ" ข้อมูลจะถูกเก็บในเบราว์เซอร์และใช้แทนรายการด้านบน */
var SP_BASE_ITEMS=SP_ITEMS.slice();
try{var _sv=localStorage.getItem("sp_items");if(_sv)SP_ITEMS=JSON.parse(_sv)}catch(e){}
function spItemsSave(a){SP_ITEMS=a;localStorage.setItem("sp_items",JSON.stringify(a))}
