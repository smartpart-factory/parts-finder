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

/* ไม่นับจำนวนคงเหลือแล้ว — การเบิกไม่ตัดสต็อก (คงฟังก์ชันไว้ให้โค้ดเดิมเรียกได้) */
function spReqCut(r){return true}
function spReqUncut(r){}
