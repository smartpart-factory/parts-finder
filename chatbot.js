/* ===== แชทบอทถามหาอะไหล่ (ทำงานในเบราว์เซอร์ ใช้ข้อมูลจาก data.js) =====
 ใส่ในหน้าไหนก็ได้: <script src="data.js"></script><script src="chatbot.js"></script> */
(function(){
var css='#cb-btn{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;border:0;background:#1565d8;color:#fff;font-size:26px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3);z-index:50}'
+'#cb{position:fixed;right:20px;bottom:90px;width:340px;max-width:calc(100vw - 24px);height:480px;max-height:calc(100vh - 110px);background:#fff;border:1px solid #d5deec;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:50;font:14px "Noto Sans Thai","Segoe UI",sans-serif;color:#1e293b}'
+'#cb.on{display:flex}#cb .h{background:#0b2150;color:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center}#cb .h small{display:block;color:#a9bde6;font-size:11px}#cb .h span{cursor:pointer;font-size:18px}'
+'#cb .ms{flex:1;overflow-y:auto;padding:12px;background:#f3f6fb;display:flex;flex-direction:column;gap:8px}'
+'#cb .b{max-width:88%;padding:9px 12px;border-radius:12px;line-height:1.5;white-space:pre-line}#cb .bot{background:#fff;border:1px solid #e2e8f0;align-self:flex-start}#cb .me{background:#1565d8;color:#fff;align-self:flex-end}'
+'#cb .bt{display:inline-block;margin:6px 6px 0 0;padding:5px 10px;border:1px solid #1565d8;color:#1565d8;background:#fff;border-radius:99px;font-size:12px;cursor:pointer}#cb .bt:hover{background:#eaf2ff}'
+'#cb .tg{font-size:11px;padding:2px 8px;border-radius:99px;color:#fff;margin-left:4px}.cs-stock{background:#16a34a}.cs-low{background:#d97706}.cs-out{background:#dc2626}.cs-repair{background:#7c3aed}'
+'#cb .chips{padding:8px 12px 0;background:#fff;border-top:1px solid #e2e8f0}#cb .in{display:flex;gap:8px;padding:10px 12px;background:#fff}#cb .in input{flex:1;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font:inherit}#cb .in button{border:0;background:#1565d8;color:#fff;border-radius:8px;padding:0 14px;cursor:pointer;font:inherit}#cb .in button.cam{background:#fff;color:#1565d8;border:1px solid #1565d8;padding:0 10px;font-size:16px}#cb .bt.ok{background:#16a34a;border-color:#16a34a;color:#fff}#cb .bt.no{border-color:#94a3b8;color:#64748b}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var d=document.createElement("div");
d.innerHTML='<button id="cb-btn" title="ถามบอท">💬</button><div id="cb"><div class="h"><div>🤖 บอทช่วยหาอะไหล่<small>ถามชื่อ รหัส สถานะ หรือเครื่องจักร</small></div><span id="cb-x">✕</span></div><div class="ms" id="cb-ms"></div><div class="chips" id="cb-ch"></div><div class="in"><button class="cam" id="cb-cam" title="ค้นหาด้วยรูป">📷</button><input id="cb-in" placeholder="เช่น ลูกปืนมีไหม / ขอลูกปืน 2 ตัว"><button id="cb-go">ส่ง</button></div></div>';
document.body.appendChild(d);
var box=document.getElementById("cb"),ms=document.getElementById("cb-ms"),inp=document.getElementById("cb-in");
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function add(h,cls){var b=document.createElement("div");b.className="b "+cls;b.innerHTML=h;ms.appendChild(b);ms.scrollTop=ms.scrollHeight;return b}
function btn(label,fn){var e=document.createElement("span");e.className="bt";e.textContent=label;e.onclick=fn;return e}
function load(src,fn){if(document.querySelector('script[data-cb="'+src+'"]'))return fn();var t=document.createElement("script");t.src=src;t.dataset.cb=src;t.onload=fn;t.onerror=function(){add("โหลดส่วนเสริมไม่สำเร็จ ตรวจว่าไฟล์ "+src+" อยู่ในโฟลเดอร์เดียวกัน","bot")};document.head.appendChild(t)}
function openCam(){add("📷 เปิดตัวค้นหาด้วยรูปแล้วครับ","bot");load("imagesearch.js",function(){spImageSearch.open(function(i){add("จากรูป: พบ "+esc(i.n),"bot");showOne(i)})})}
function confirmReq(it,qty,urgent){if(spStatus(it)!=="repair"&&it.q>=qty){var o=add("<b>"+esc(it.n)+"</b> มีในแผนกพอแล้ว (คงเหลือ "+it.q+" "+esc(it.u||"")+") หยิบได้เลย ไม่ต้องทำเรื่องขอครับ\nตำแหน่ง: "+esc(spLoc(it))+"\nถ้าของไม่พอจริง ๆ ค่อยขอเบิกคลังใหญ่ที่หน้า 'ขอเบิกคลังใหญ่' ครับ","bot");return}var b=add("ยืนยันส่งคำขอเบิกคลังใหญ่ไหมครับ?\n<b>"+esc(it.n)+"</b> ("+esc(it.c)+")\nจำนวน "+qty+" "+esc(it.u||"")+(urgent?" · ด่วน":"")+"\nคงเหลือในคลัง "+it.q,"bot");
 b.appendChild(document.createElement("br"));
 var y=btn("✅ ยืนยันส่งคำขอ",function(){y.remove();n.remove();load("requests.js",function(){try{var all=spReqLoad(),r={id:spReqNextId(all),item:it.n,code:it.c,qty:qty,machine:(it.m&&it.m[0])||"อื่นๆ",urgent:!!urgent,why:"ขอผ่านบอทแชท",by:SP_USER.name,byId:SP_USER.id,status:"pending",time:new Date().toISOString(),log:[{t:new Date().toISOString(),text:"สร้างคำขอโดย "+SP_USER.name+" (ผ่านบอท)"}]};
  all.push(r);if(!spReqSave(all))throw 0;var m=add("ส่งคำขอ <b>"+r.id+"</b> แล้วครับ สถานะ: รออนุมัติ","bot");m.appendChild(document.createElement("br"));m.appendChild(btn("📋 ดูคำขอ",function(){location.href=(window.spCanEdit&&spCanEdit())?"requests.html":"request-new.html"}))}catch(e){add("บันทึกคำขอไม่สำเร็จ (เบราว์เซอร์อาจเก็บข้อมูลไม่ได้) ลองสร้างที่หน้าจัดการคำขอแทนครับ","bot")}})});
 y.className="bt ok";var n=btn("ยกเลิก",function(){y.remove();n.remove();add("ยกเลิกแล้วครับ","bot")});n.className="bt no";b.appendChild(y);b.appendChild(n)}
function reqIntent(x,hits,mine){var it=hits.map(function(h){return h.i}).filter(mine);if(!it.length)return false;
 var q=/(\d+)\s*(ตัว|ชิ้น|เส้น|อัน|ชุด|ใบ|เครื่อง|ลูก|เมตร)/.exec(x)||/\s(\d{1,3})\s*$/.exec(x),qty=q?Math.max(1,parseInt(q[1],10)):1,urgent=/ด่วน/.test(x);
 if(!window.SP_USER){add("ต้องเข้าสู่ระบบก่อนจึงจะส่งคำขอได้ครับ","bot");return true}
 var top=hits.filter(function(h){return h.sc===hits[0].sc}).map(function(h){return h.i}).filter(mine);
 if(top.length===1){confirmReq(top[0],qty,urgent);return true}
 var b=add("ขออะไหล่ตัวไหนครับ? (จำนวน "+qty+")","bot");top.slice(0,6).forEach(function(i){b.appendChild(document.createElement("br"));b.appendChild(btn(i.n+" ("+i.c+")",function(){confirmReq(i,qty,urgent)}))});return true}
function info(i){var s=spStatus(i);return '<b>'+esc(i.n)+'</b> ('+i.c+')<span class="tg cs-'+s+'">'+SP_TXT[s]+'</span>\nคงเหลือ '+i.q+' '+i.u+' (ขั้นต่ำ '+i.min+')\nตำแหน่ง: '+spLoc(i)+'\nใช้กับ: '+i.m.join(", ")+(i.rep?'\nหมายเหตุ: '+esc(i.rep):'')}
function showOne(i){var b=add(info(i),"bot");
 b.appendChild(document.createElement("br"));
 b.appendChild(btn("📍 ดูบนแผนที่ 3D",function(){if(window.showOnMap){window.showOnMap(i.c);add("แสดงตำแหน่งของ "+esc(i.n)+" บนแผนที่ 3D แล้วครับ","bot")}else add("หน้านี้ยังไม่มีแผนที่ 3D ลองไปที่หน้าเช็คของครับ","bot")}))}
function list(arr,title){if(!arr.length){add("ไม่พบรายการที่ตรงเงื่อนไขครับ","bot");return}
 var b=add(title+" ("+arr.length+" รายการ)","bot");
 arr.slice(0,8).forEach(function(i){var s=spStatus(i);b.appendChild(document.createElement("br"));b.appendChild(btn(i.n+" · "+SP_TXT[s]+" · "+i.q,function(){ask(i.n,true)}))})}
function ask(raw,fromBtn){
 var t=raw.trim();if(!t)return;add(esc(t),"me");if(!SP_ITEMS.length){add("ตอนนี้ยังไม่มีข้อมูลอะไหล่ในระบบครับ เพิ่มรายการในไฟล์ data.js แล้วผมจะช่วยค้นหาให้ได้เลย","bot");return}var x=t.toLowerCase();
 var mach=SP_MACHINES.filter(function(m){return x.indexOf(m.toLowerCase())>-1});
 var hits=SP_ITEMS.map(function(i){var sc=0;if(x.indexOf(i.c.toLowerCase())>-1)sc+=3;if(x.indexOf(i.n.toLowerCase())>-1)sc+=3;
  i.k.toLowerCase().split(" ").forEach(function(w){if(w.length>=3&&x.indexOf(w)>-1)sc+=2});return{i:i,sc:sc}}).filter(function(h){return h.sc>0}).sort(function(a,b){return b.sc-a.sc});
 var mine=function(i){return !mach.length||i.m.indexOf(mach[0])>-1};
 if(/^(สวัสดี|หวัดดี|hi|hello)/.test(x)){add("สวัสดีครับ 👋 ถามชื่อหรือรหัสอะไหล่ได้เลย เช่น \"ลูกปืนมีไหม\" หรือกดปุ่มด้านล่างครับ","bot");return}
 if(/ช่วย|ทำอะไรได้|help/.test(x)){add("ผมช่วยได้ดังนี้ครับ\n• เช็คว่าอะไหล่มีไหม เหลือเท่าไร\n• บอกตำแหน่งชั้นวาง และเปิดบนแผนที่ 3D\n• สรุปของใกล้หมด / หมด / กำลังซ่อม\n• ดูอะไหล่ตามเครื่องจักร เช่น \"อะไหล่ ISM\"\n• ส่งคำขออะไหล่ เช่น \"ขอลูกปืน 2 ตัว\" (ผมจะถามยืนยันก่อนส่ง)\n• กดปุ่ม 📷 เพื่อถ่ายรูปป้าย/เลขรุ่นแล้วค้นหา","bot");return}
 if(/(ขอ(?!ง)|เบิก|สั่ง)/.test(x)&&!/ดู|ตำแหน่ง|อยู่|ที่ไหน|มีไหม|เหลือ|ซ่อม/.test(x)&&hits.length&&reqIntent(x,hits,mine))return;
 if(/รูป|ถ่าย|แสกน|สแกน/.test(x)){openCam();return}
 if(hits.length&&!/ใกล้หมด|ทั้งหมด/.test(x)){var top=hits.filter(function(h){return h.sc===hits[0].sc}).map(function(h){return h.i});
  if(top.length===1)showOne(top[0]);else list(top,"พบอะไหล่ที่ใกล้เคียง");return}
 var f=null,title="";
 if(/ใกล้หมด|เหลือน้อย/.test(x)){f=function(i){return spStatus(i)==="low"};title="อะไหล่ใกล้หมด"}
 else if(/ซ่อม/.test(x)){f=function(i){return spStatus(i)==="repair"};title="อะไหล่ที่กำลังซ่อม"}
 else if(/หมด/.test(x)){f=function(i){return spStatus(i)==="out"};title="อะไหล่ที่หมดสต็อก"}
 if(f){list(SP_ITEMS.filter(function(i){return f(i)&&mine(i)}),title+(mach.length?" ของ "+mach[0]:""));return}
 if(mach.length){list(SP_ITEMS.filter(mine),"อะไหล่ของ "+mach[0]);return}
 var miss=function(){add("ขอโทษครับ ยังหาไม่เจอ ลองพิมพ์ชื่อหรือรหัสอะไหล่ เช่น \"สายพาน\", \"BRG-6205\" หรือกดปุ่มด้านล่างครับ","bot")};
 if(typeof SP_AI_ENDPOINT==="string"&&SP_AI_ENDPOINT&&!fromBtn){var w=add("กำลังคิด...","bot"),ctl=new AbortController(),tm=setTimeout(function(){ctl.abort()},20000);
  fetch(SP_AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t}),signal:ctl.signal}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){clearTimeout(tm);w.textContent=String(j.reply||"").slice(0,1500)||"(ไม่มีคำตอบ)"}).catch(function(){clearTimeout(tm);w.remove();miss()});return}
 miss()}
var chips=["ของใกล้หมด","ของหมดสต็อก","ของกำลังซ่อม","ลูกปืนมีไหม"],ch=document.getElementById("cb-ch");
chips.forEach(function(c){ch.appendChild(btn(c,function(){ask(c)}))});ch.appendChild(btn("📷 ค้นหาด้วยรูป",openCam));document.getElementById("cb-cam").onclick=openCam;
document.getElementById("cb-btn").onclick=function(){box.classList.toggle("on");if(box.classList.contains("on")&&!ms.children.length)add("สวัสดีครับ 🤖 ผมช่วยหาอะไหล่ให้ได้ ลองพิมพ์ชื่อ รหัส หรือกดปุ่มด้านล่างได้เลยครับ","bot");inp.focus()};
document.getElementById("cb-x").onclick=function(){box.classList.remove("on")};
document.getElementById("cb-go").onclick=function(){ask(inp.value);inp.value=""};
inp.onkeydown=function(e){if(e.key==="Enter"){ask(inp.value);inp.value=""}};
})();
