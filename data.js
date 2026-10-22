/* ===== ข้อมูลอะไหล่ (ตอนนี้ว่างเปล่า — เพิ่มรายการจริงของแผนกที่นี่) =====
 c=รหัส  n=ชื่อ  k=คำค้นเพิ่ม(ให้ค้นด้วยชื่อเรียกอื่นได้)  m=เครื่องจักรที่ใช้  q=คงเหลือ  min=ขั้นต่ำ
 r=ชั้นวาง(ต้องมีใน SP_RACKS)  s=ชั้นที่  u=หน่วย  rep=ข้อความ(ใส่เฉพาะของที่กำลังซ่อม)  glb=ไฟล์โมเดล 3D ของอะไหล่ชิ้นนี้ (ไม่บังคับ เช่น "models/bearing.glb")  pos=[x,y,z] ตำแหน่ง 3D เฉพาะ (ไม่บังคับ)
 ตัวอย่างข้อมูลเดิมเก็บไว้ที่ไฟล์ data.sample.js */
/* เครื่องจักร/แผนก: แก้ได้ที่หน้า "จัดการระบบ" > "เครื่องจักร" (เพิ่ม/เปลี่ยนชื่อ/ใส่รูป) ค่าด้านล่างเป็นค่าเริ่มต้น */
var SP_MACH=[{k:"ISM",d:"เครื่องเป่าขวด / ขวด PET",f:"ism.jpg"},{k:"RENGER",d:"เครื่องบรรจุ",f:"renger.jpg"},{k:"OLT",d:"เครื่องหดฟิล์ม / บรรจุรวม",f:"olt.jpg"},{k:"EVO",d:"ระบบลำเลียง / แพ็คกิ้ง",f:"evo.jpg"},{k:"COLD END",d:"ระบบทำความเย็น",f:"coldend.jpg"},{k:"MATEL",d:"เครื่องซีลรูป / ปั๊ม",f:"matel.jpg"}];
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
var SP_TXT={stock:"มีของ",out:"หมด",ordering:"กำลังสั่งของ",repair:"กำลังซ่อม"};
var SP_ITEMS=[
  // ตัวอย่างการเพิ่มอะไหล่ 1 รายการ (ลบ // หน้าบรรทัดออก แล้วแก้เป็นของจริง คั่นแต่ละรายการด้วยจุลภาค)
  // {c:"BRG-6205",n:"Bearing 6205",k:"ลูกปืน แบริ่ง",m:["ISM","RENGER"],q:48,min:20,r:"A1",s:2,u:"ตัว"},
];
/* ข้อความตำแหน่งของอะไหล่: อยู่บนชั้นวาง หรือปักหมุดในโมเดล 3D (เช่น บนโต๊ะ) */
function spLoc(i){if(i.dw)return "ตู้ลิ้นชัก (หน้าโต๊ะ) แถว "+i.dw[1]+" ชั้น "+i.dw[2]+(i.tx?" · "+i.tx:"");var pin=!!(i.pos||i.at),b=i.r?("ชั้นวาง "+i.r+(i.s?" ชั้นที่ "+i.s:"")):(pin?(i.at||"จุดที่ปักหมุดใน 3D"):(i.tx||"ยังไม่ได้กำหนดตำแหน่ง"));return i.tx&&(i.r||pin)?b+" · "+i.tx:b}
/* โมเดล 3D ของอะไหล่ที่เลือกเองได้ (เก็บในฟิลด์ mt) — ไม่เลือก = ไม่แสดงโมเดล */
var SP_MODELS=[["","— ไม่แสดงโมเดล 3D —"],["hbelt","🧲 สายพานแขวนผนัง (เสาสี่เหลี่ยม)"],["hbeltb","🧲 สายพานแขวนผนัง (ใหญ่/หลายเส้น)"],["hcoil","🧲 สายยาง/สายไฟแขวนผนัง"],["motor","⚙️ มอเตอร์"],["gear","🔩 เกียร์มอเตอร์"],["cable","🔌 สายไฟ (ม้วน)"],["cablebox","🧰 สายไฟในกล่อง"],["belt","🟤 สายพานมอเตอร์"],["bearing","⚪ ตลับลูกปืน"],["board","🟩 การ์ด / แผงวงจร (PLC)"],["valve","🔵 กระบอกลม / วาล์ว"],["sensor","📡 เซ็นเซอร์"],["pump","💧 ปั๊ม"],["bin","📥 กล่องพลาสติกอะไหล่ชิ้นเล็ก"],["box","📦 กล่องพัสดุ"],["fender","🛡️ แผ่นโค้ง / บังโคลน (ห่อพลาสติก)"],["gearbox","⚙️ ชุดเฟือง / เกียร์บ็อกซ์ (ห่อพลาสติก)"],["bracket","🟩 ขาจับ / ชุดใบมีด"],["beltbag","🛍️ สายพานในถุงซิป"],["fiber","🧵 สายไฟเบอร์ออปติกในถุง"],["dcmotor","🔋 มอเตอร์ DC (ห่อพลาสติก)"],["micro","🎚️ ชุดปรับไมโครมิเตอร์"],["roller","🟤 ลูกกลิ้ง / ดรัมพันผ้าทราย"],["vgear","🏭 เกียร์มอเตอร์แนวตั้ง (ห่อพลาสติก)"],["disc","⚪ แผ่นกลม / แหวนรอง"],["shaft","📏 เพลา / สไปล์ชาฟต์"],["sensorcable","🔌 สายเซ็นเซอร์ + หัวคอนเน็กเตอร์"],["dinpsu","🔋 พาวเวอร์ซัพพลาย DIN-rail (Mean Well DR-120-24)"],["rackmod","🗄️ โมดูลแร็ค Precitec M4 (ตลับอลูมิเนียม)"],["tcpmod","🎛️ โมดูล TCP.I (ปุ่มหมุน + สวิตช์)"],["rackcase","🖥️ เครื่องควบคุมแบบแร็ค WSIO (ห่อพลาสติก)"]];
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
/* สถานะมี 3 แบบ: มีของ (q>0) / หมด (q<=0) / กำลังซ่อม (มี rep) — ไม่นับจำนวนแล้ว */
function spStatus(i){return i.rep?"repair":(i.q>0?"stock":(i.ord?"ordering":"out"))}
/* ตั้งสถานะ "กำลังสั่งของ" (ของหมด + มีการสั่งอยู่) note = ข้อความ เช่น เลขคำขอ/วันที่คาดว่าของมา */
function spSetOrder(code,note){var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===code})[0];if(!x||x.q>0||x.rep)return "";x.ord=note||"สั่งของแล้ว";try{spItemsSave(l)}catch(e){return "บันทึกไม่สำเร็จ"}return ""}
/* เปลี่ยนสถานะทุกแบบ: st = stock|out|ordering|repair, note = หมายเหตุ (ใช้กับ ordering/repair) */
function spSetStatus(code,st,note){var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===code})[0];if(!x)return "ไม่พบอะไหล่นี้";
 delete x.rep;delete x.ord;x.q=st==="stock"?1:0;if(st==="repair")x.rep=note||"กำลังซ่อม";if(st==="ordering")x.ord=note||"สั่งของแล้ว";
 try{spItemsSave(l)}catch(e){return "บันทึกไม่สำเร็จ"}return ""}
/* ตั้งสถานะ มีของ/หมด (has=true/false) แล้วบันทึก */
function spSetStock(code,has){var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===code})[0];if(!x)return "ไม่พบอะไหล่นี้";x.q=has?1:0;if(has){x.rep="";delete x.ord}
 var u=window.SP_USER||{};x.slog=(x.slog||[]).concat([{t:new Date().toISOString(),by:u.name||"",h:has?1:0}]).slice(-10);
 try{spItemsSave(l)}catch(e){return "บันทึกไม่สำเร็จ"}return ""}
/* ถ้า admin เคยแก้ข้อมูลในหน้า "จัดการระบบ" ข้อมูลจะถูกเก็บในเบราว์เซอร์และใช้แทนรายการด้านบน */
var SP_BASE_ITEMS=SP_ITEMS.slice();
try{var _sv=localStorage.getItem("sp_items");if(_sv)SP_ITEMS=JSON.parse(_sv)}catch(e){}
/* แก้ชื่อเครื่องจักรที่สะกดเดิม (METTAL) ให้ตรงกับชื่อที่ตั้งไว้ในหน้าเครื่องจักร (เช่น MATEL) — คืน true ถ้ามีการแก้ */
function spHealMach(){var to=SP_MACHINES.filter(function(m){return /^MA?T[A-Z]*L$/i.test(m)&&m.toUpperCase()!=="METTAL"})[0];if(!to||SP_MACHINES.indexOf("METTAL")>-1)return false;var ch=false;
 SP_ITEMS.forEach(function(i){if(i.m&&i.m.indexOf("METTAL")>-1){i.m=i.m.map(function(x){return x==="METTAL"?to:x}).filter(function(x,k,a){return a.indexOf(x)===k});ch=true}});return ch}
var SP_HEALED=spHealMach();
/* ===== ช่วยคิดคำค้น/ชื่อเรียกอื่น (ไทย-อังกฤษ) จากชื่ออะไหล่ ===== */
var SP_SYN=[
[/halogen/,"ฮาโลเจน หลอดฮาโลเจน หลอดไฟ"],[/\blamp|bulb|osram|หลอดไฟ/,"หลอดไฟ หลอด lamp bulb"],[/\bled\b|flash/,"แอลอีดี ไฟled ไฟ"],
[/bearing|ลูกปืน|\b6[0-9]{3}\b|\b3205\b/,"ลูกปืน แบริ่ง ตลับลูกปืน bearing"],
[/timing belt|toothed belt|\bbelt\b|สายพาน/,"สายพาน ไทมิ่ง สายพานไทมิ่ง belt"],[/chain|โซ่/,"โซ่ โซ่ขับ chain"],
[/sprocket|gear|teeth|wheel|เฟือง/,"เฟือง เฟืองโซ่ gear sprocket"],[/pulley|มู่เล่|พูลเลย์/,"มูเล่ย์ พูลเลย์ pulley"],
[/motor|มอเตอร์/,"มอเตอร์ motor"],[/servo/,"เซอร์โว servo"],[/invert|inverter/,"อินเวอร์เตอร์ อินเวอร์เตอร์ไดรฟ์ ไดรฟ์ inverter"],
[/\bdrive\b/,"ไดรฟ์ drive"],[/encoder/,"เอ็นโค้ดเดอร์ encoder"],
[/sensor|proximity|reflector|cell\b|light barrier|เซนเซอร์|เซ็นเซอร์/,"เซนเซอร์ เซ็นเซอร์ หัววัด ตัวตรวจจับ sensor"],
[/proximity/,"พร็อกซิมิตี้ พร็อกซ์ สวิตช์ตรวจจับ"],[/reflector/,"รีเฟลคเตอร์ แผ่นสะท้อน"],[/light barrier/,"ม่านแสง"],
[/emitter|transmitter/,"ตัวส่งสัญญาณ ตัวส่ง emitter"],[/receiver/,"ตัวรับสัญญาณ ตัวรับ receiver"],
[/limit switch/,"ลิมิตสวิตช์ limit"],[/switch|สวิตช์/,"สวิตช์ สวิทช์ switch"],[/relay|รีเลย์/,"รีเลย์ relay"],[/contactor/,"คอนแทคเตอร์ แมกเนติก"],
[/cable|สายไฟ|wire/,"สายไฟ สายสัญญาณ สายเคเบิล cable"],[/optic|fiber/,"ไฟเบอร์ ออปติก ไฟเบอร์ออปติก"],[/tubing|air hose/,"สายลม ท่อลม"],
[/\bplug\b/,"ปลั๊ก ปลั๊กเกจ หัววัดปากขวด plug"],[/ring gauge/,"ริงเกจ ring"],[/gauge|gauging/,"เกจ เกจวัด วัด gauge"],
[/wear plate|plate|แผ่น/,"เพลท แผ่น แผ่นรอง แผ่นกันสึก plate"],[/roller|ลูกกลิ้ง/,"ลูกกลิ้ง โรลเลอร์ roller"],[/shaft|axle|แกน/,"แกน เพลา shaft"],
[/oil seal|\bseal\b|ซีล/,"ซีล ซีลน้ำมัน ซีลกันน้ำมัน seal"],[/spring|สปริง/,"สปริง spring"],[/washer|แหวน/,"แหวน แหวนรอง washer"],
[/screw|\bbolt\b|สกรู|น็อต/,"สกรู น็อต ตัวหนอน bolt screw"],[/\bnut\b/,"น็อต ตัวเมีย nut"],[/clamp|holder/,"แคลมป์ ตัวจับ ขายึด ตัวยึด holder clamp"],
[/coupling/,"คัปปลิ้ง ข้อต่อ coupling"],[/rubber|foam|ยาง/,"ยาง ฟองน้ำ rubber"],[/disk|disc/,"จานยาง แผ่นกลม disk"],
[/camera/,"กล้อง camera"],[/lens/,"เลนส์ lens"],
[/power supply|supply|smps/,"พาวเวอร์ซัพพลาย แหล่งจ่ายไฟ ซัพพลาย power supply"],[/battery|sonnenschein|แบตเตอรี่/,"แบตเตอรี่ แบต battery"],[/\bups\b|interruptible/,"ยูพีเอส เครื่องสำรองไฟ ups"],
[/\bcard\b|board|\bpcb\b|\bbord\b|circuit/,"การ์ด แผงวงจร บอร์ด เมนบอร์ด board card"],[/computer|\bcpu\b/,"คอมพิวเตอร์ คอม ซีพียู computer"],
[/monitor|\blcd\b|screen|touch|display|จอ/,"จอ หน้าจอ จอทัชสกรีน จอแสดงผล display"],[/mouse|เมาส์/,"เมาส์ mouse"],[/keyboard|key board/,"คีย์บอร์ด แป้นพิมพ์"],[/ssd|hdd|\bnas\b/,"ฮาร์ดดิสก์ เอสเอสดี ssd"],
[/\bfan\b|cooling|พัดลม/,"พัดลม ระบายความร้อน cooling fan"],[/air condition/,"แอร์ เครื่องปรับอากาศ ตู้แอร์"],[/filter|กรอง/,"ไส้กรอง กรอง filter"],[/regulator/,"เร็กกูเลเตอร์ ปรับแรงดันลม"],
[/pump|ปั๊ม/,"ปั๊ม pump"],[/valve|วาล์ว/,"วาล์ว valve"],[/fitting|3 ทาง/,"ข้อต่อลม ฟิตติ้ง"],
[/guide|ไกด์/,"ไกด์ รางนำ guide"],[/infeed/,"อินฟีด infeed"],[/outfeed/,"เอาท์ฟีด outfeed"],[/conveyor/,"สายพานลำเลียง คอนเวเยอร์ conveyor"],
[/\bdip\b/,"ดิพ dip หัวดิพ"],[/drum|ดรัม/,"ดรัม drum"],[/rotation/,"โรเทชั่น หมุน rotation"],[/stripper/,"สตริปเปอร์ stripper"],[/\bcam\b/,"แคม cam"],
[/\brod\b|crank/,"ก้าน ก้านต่อ rod"],[/brush|แปรง/,"แปรง brush"],[/lock|ล็อก/,"ล็อค ล็อก lock"],[/\bdoor\b|ประตู/,"ประตู door"],[/cover|ฝา/,"ฝาครอบ ฝา cover"],
[/bracket|support/,"ขายึด ตัวรอง support"],[/\bpin\b/,"พิน สลัก pin"],[/\bkey\b/,"คีย์ ลิ่ม"],[/\bhead\b|หัว/,"หัว head"],[/\bneck\b/,"คอขวด neck"],
[/mou?ld|แม่พิมพ์/,"แม่พิมพ์ โมลด์ mould"],[/thickness|wall/,"ความหนาผนัง ความหนา thickness"],[/safety|safty/,"เซฟตี้ ความปลอดภัย safety"],
[/adapter|adaptor/,"อะแดปเตอร์ adapter"],[/overhaul|\bkit\b/,"ชุดซ่อม โอเวอร์ฮอล ชุดอะไหล่ kit"],[/spacer/,"สเปเซอร์ แหวนรอง"],
[/torque|clutch/,"คลัทช์ เซฟตี้คลัทช์ ตัวจำกัดแรงบิด clutch"],[/worm/,"เกียร์ตัวหนอน worm"],[/gearbox|gear box|reducer/,"เกียร์บ็อกซ์ เกียร์ทด gearbox"],
[/flange/,"หน้าแปลน flange"],[/tube|ท่อ/,"ท่อ tube"],[/sleeve/,"ปลอก sleeve"],[/magnet|magnetic/,"แม่เหล็ก"],[/thermocouple/,"เทอร์โมคัปเปิล"],
[/power|กำลัง/,"ไฟ"],[/socket/,"ซ็อกเก็ต ซ็อกเก็ตรีเลย์ socket"],[/terminal/,"เทอร์มินัล ขั้วต่อ"],[/fuse/,"ฟิวส์"],[/breaker/,"เบรกเกอร์"]
];
function spAutoKeys(i){var t=((i.n||"")+" "+(i.k||"")).toLowerCase(),have={};t.split(/[\s,\/()]+/).forEach(function(w){if(w)have[w]=1});var out=[];
 SP_SYN.forEach(function(p){if(p[0].test(t))p[1].split(" ").forEach(function(w){if(w&&!have[w.toLowerCase()]&&out.indexOf(w)<0&&t.indexOf(w.toLowerCase())<0)out.push(w)})});return out.slice(0,14)}
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
