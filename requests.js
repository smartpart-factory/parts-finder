/* ===== ระบบคำขออะไหล่ (เก็บในเบราว์เซอร์ผ่าน localStorage) ===== */
var SP_REQ_TXT={pending:"รออนุมัติ",approved:"อนุมัติ",rejected:"ปฏิเสธ",cancelled:"ยกเลิก",done:"เบิกแล้ว"};
function spReqLoad(){try{return JSON.parse(localStorage.getItem("sp_requests")||"[]")}catch(e){return[]}}
function spReqSave(a){try{localStorage.setItem("sp_requests",JSON.stringify(a));return true}catch(e){return false}}
function spReqNextId(a){var y=new Date().getFullYear(),mx=0;a.forEach(function(r){var m=/^PR-(\d+)-(\d+)$/.exec(r.id);if(m&&+m[1]===y&&+m[2]>mx)mx=+m[2]});return "PR-"+y+"-"+String(mx+1).padStart(4,"0")}
function spReqTime(iso){var d=new Date(iso),n=new Date(),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()),b=new Date(d.getFullYear(),d.getMonth(),d.getDate()),k=Math.round((a-b)/864e5);
 if(k<=0)return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)+" น.";if(k===1)return "เมื่อวาน";return k+" วันที่แล้ว"}
function spReqClass(s){return s==="pending"?"w":s==="approved"||s==="done"?"o":s==="rejected"?"x":"c"}

/* อาคาร/เตา ของคำขอ (ใช้โครงสร้างจาก pm.js) */
function spBldOpts(){var o='<option value="">— เลือกอาคาร —</option>',g=spLines(),bs=[];g.forEach(function(x){if(bs.indexOf(x.b)<0)bs.push(x.b)});
 bs.forEach(function(b){o+='<optgroup label="อาคาร '+b+'"><option value="'+b+'|">อาคาร '+b+' (ไม่ระบุเตา)</option>'+g.filter(function(x){return x.b===b}).map(function(x){return '<option value="'+b+'|'+x.f+'">อาคาร '+b+' · '+x.f+' ('+x.l.join(", ")+')</option>'}).join("")+'</optgroup>'});return o+'<option value="-|">อื่นๆ / นอกอาคารผลิต</option>'}
function spBldVal(v){if(!v)return{};var p=v.split("|");return{bld:p[0],furn:p[1]||""}}
function spReqBld(r){return r.bld?(r.bld==="-"?"อื่นๆ":"อาคาร "+r.bld+(r.furn?" · "+r.furn:"")):""}

/* ตัดสต็อกเมื่อเบิกจริง: คืน false = ผู้ใช้ยกเลิก */
function spReqCut(r){if(r.cut)return true;var l=SP_ITEMS.slice(),it=l.filter(function(i){return r.code&&i.c===r.code})[0];if(!it){r.cutNote="ไม่พบรหัสในคลัง จึงไม่ตัดสต็อก";return true}
 if(it.q<r.qty&&!confirm("ในคลังเหลือ "+it.q+" "+(it.u||"")+" น้อยกว่าที่เบิก "+r.qty+"\nตัดสต็อกเหลือ 0 และดำเนินการต่อ ?"))return false;
 var n=Math.min(it.q,r.qty);it.q=it.q-n;r.cut=n;r.cutNote="ตัดสต็อก "+n+" "+(it.u||"")+" (คงเหลือ "+it.q+")";spItemsSave(l);return true}
function spReqUncut(r){if(!r.cut)return;var l=SP_ITEMS.slice(),it=l.filter(function(i){return i.c===r.code})[0];if(it){it.q+=r.cut;spItemsSave(l)}r.cutNote="คืนสต็อก "+r.cut;r.cut=0}

/* ===== บันทึกการหยิบใช้ (ของมีในแผนก ไม่ต้องขอเบิก — บันทึกเพื่อให้สต็อกตรง) ===== */
function spTakeLoad(){try{return JSON.parse(localStorage.getItem("sp_takes")||"[]")}catch(e){return[]}}
function spTakeSave(a){try{localStorage.setItem("sp_takes",JSON.stringify(a));return true}catch(e){return false}}
/* คืนข้อความ error หรือ "" ถ้าสำเร็จ */
function spTake(it,qty){qty=parseInt(qty,10);if(!(qty>0))return "ใส่จำนวนให้ถูกต้อง";var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===it.c})[0];if(!x)return "ไม่พบอะไหล่นี้ในคลัง";
 if(qty>x.q)return "ในแผนกมีแค่ "+x.q+" "+(x.u||"");x.q-=qty;spItemsSave(l);var t=spTakeLoad(),u=window.SP_USER||{};
 t.push({id:"TK-"+Date.now(),code:x.c,item:x.n,qty:qty,u:x.u||"",by:u.name||"",byId:u.id||"",time:new Date().toISOString(),left:x.q});return spTakeSave(t)?"":"บันทึกประวัติไม่สำเร็จ"}
function spTakeUndo(id){var t=spTakeLoad(),r=t.filter(function(k){return k.id===id})[0];if(!r)return;var l=SP_ITEMS.slice(),x=l.filter(function(i){return i.c===r.code})[0];if(x){x.q+=r.qty;spItemsSave(l)}spTakeSave(t.filter(function(k){return k.id!==id}))}
/* กล่องกรอกจำนวนในหน้า: box = element ที่จะใส่ UI, done = callback หลังบันทึก */
function spTakeUI(box,it,done){box.innerHTML='<span class="tkb">หยิบกี่'+(it.u?' ('+it.u+')':'')+'? <input type="number" min="1" max="'+it.q+'" value="1" style="width:70px;padding:6px;border:1px solid #cfd8ea;border-radius:8px"> <button type="button" class="ok2">✔ ยืนยัน</button> <button type="button" class="cn2">ยกเลิก</button> <span class="er2" style="color:#dc2626;font-size:12px"></span></span>';
 var inp=box.querySelector("input");inp.focus();box.querySelector(".cn2").onclick=function(){done&&done(false)};
 box.querySelector(".ok2").onclick=function(){var e=spTake(it,inp.value);if(e){box.querySelector(".er2").textContent=e;return}done&&done(true)}}
