/* ===== PM (Preventive Maintenance) + ตาราง JOB — ข้อมูลเก็บในเบราว์เซอร์ (localStorage) ===== */
var SP_PM_INT={"3M":3,"6M":6,"1Y":12},SP_PM_NAME={"3M":"PM 3 เดือน","6M":"PM 6 เดือน","1Y":"PM 1 ปี"},SP_PM_CLR={"3M":"#2563eb","6M":"#d97706","1Y":"#7c3aed"};
var SP_PM_CHECK={"3M":[],"6M":[],"1Y":[]}; /* หัวข้อตรวจสอบ: ผู้ใช้กำหนดเองในแต่ละแผน */
function _pmLoad(k){try{var a=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function spPlans(){return _pmLoad("sp_pm_plans")}function spPlansSave(a){localStorage.setItem("sp_pm_plans",JSON.stringify(a))}
function spPmRec(){return _pmLoad("sp_pm_rec")}function spPmRecSave(a){localStorage.setItem("sp_pm_rec",JSON.stringify(a))}
/* บันทึกงานประจำวัน (ซ่อมเครื่องจักร / เปลี่ยนอะไหล่ / ตรวจเช็ค / บันทึกทั่วไป) */
var SP_LOG_TYPES={repair:["🔧 ซ่อมเครื่องจักร","#dc2626"],change:["🔩 เปลี่ยนอะไหล่","#7c3aed"],check:["🔍 ตรวจเช็ค / ปรับตั้ง","#0891b2"],note:["📝 บันทึกทั่วไป","#64748b"]},SP_LOG_ST={done:["เสร็จแล้ว","#16a34a"],wait:["ค้างอยู่ / ติดตามต่อ","#d97706"],parts:["รออะไหล่","#dc2626"]};
function spDayLog(){return _pmLoad("sp_daylog")}function spDayLogSave(a){localStorage.setItem("sp_daylog",JSON.stringify(a))}
function spJobs(){return _pmLoad("sp_jobs")}function spJobsSave(a){localStorage.setItem("sp_jobs",JSON.stringify(a))}
function spPmId(){return "p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function spYmd(d){var m=d.getMonth()+1,x=d.getDate();return d.getFullYear()+"-"+(m<10?"0":"")+m+"-"+(x<10?"0":"")+x}
function spParse(s){var p=String(s).split("-");return new Date(+p[0],+p[1]-1,+p[2])}
function spToday(){return spYmd(new Date())}
function spAddMonths(s,n){var d=spParse(s),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);var last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return spYmd(d)}
function spAddDays(s,n){var d=spParse(s);d.setDate(d.getDate()+n);return spYmd(d)}
function spDiff(a,b){return Math.round((spParse(a)-spParse(b))/864e5)}
function spFmt(s,long){if(!s)return"-";return spParse(s).toLocaleDateString("th-TH",{day:"numeric",month:long?"long":"short",year:"numeric"})}
/* วันที่ทำ PM ล่าสุดของแผนนี้ (อิงเครื่อง+ชนิด) */
var SP_SIDES=["A","B","C"];
function spPlanSides(plan){return plan&&plan.sides&&plan.sides.length?plan.sides:SP_SIDES}
function spSideLast(plan,recs,s){var r=(recs||spPmRec()).filter(function(x){return x.machine===plan.machine&&x.type===plan.type&&(!x.sides||!x.sides.length||x.sides.indexOf(s)>=0)}).sort(function(a,b){return a.date<b.date?1:-1})[0];return r?r.date:""}
function spSideInfo(plan,recs){return spPlanSides(plan).map(function(s){return{s:s,last:spSideLast(plan,recs,s)}})}
function spLastDone(plan,recs){var si=spSideInfo(plan,recs),ds=si.map(function(x){return x.last}).filter(Boolean);if(!ds.length)return "";if(ds.length<si.length)return "";return ds.sort()[0]}
function spLastDoneOld(plan,recs){var r=(recs||spPmRec()).filter(function(x){return x.machine===plan.machine&&x.type===plan.type}).sort(function(a,b){return a.date<b.date?1:-1})[0];return r?r.date:""}
function spNextDue(plan,recs){var l=spLastDone(plan,recs);return l?spAddMonths(l,SP_PM_INT[plan.type]):plan.start}
/* สถานะ: over=เลยกำหนด, soon=ภายใน 14 วัน, ok */
function spDueState(d){var n=spDiff(d,spToday());return n<0?"over":n<=14?"soon":"ok"}
/* กำหนด PM ที่จะเกิดขึ้นในช่วงวันที่ (รวมรอบถัดๆ ไปตามช่วงเวลา) */
function spOccur(from,to){var out=[],recs=spPmRec();spPlans().forEach(function(p){if(p.active===false)return;var d=spNextDue(p,recs),i=0;
 while(d<=to&&i<80){if(d>=from||(i===0&&d<spToday()&&from<=spToday()))out.push({plan:p,date:d,over:i===0&&d<spToday()});d=spAddMonths(d,SP_PM_INT[p.type]);i++}});return out}
/* ตรวจสต็อกอะไหล่ที่แผนต้องใช้: คืนรายการที่ไม่พอ */
function spPartsLines(txt){return String(txt||"").split(/\n/).map(function(l){l=l.trim();if(!l)return null;var m=l.match(/^(.+?)\s*[x×*]\s*(\d+)\s*$/i);return m?{c:m[1].trim(),q:+m[2]}:{c:l,q:1}}).filter(Boolean)}
function spPartsShort(plan){return spPartsLines(plan.parts).map(function(p){var it=SP_ITEMS.filter(function(i){return i.c.toLowerCase()===p.c.toLowerCase()})[0];return{c:p.c,need:p.q,name:it?it.n:"",u:it?(it.u||""):"",ok:it?spStatus(it)==='stock':false,known:!!it}})}

/* ===== โครงสร้างโรงงาน: อาคาร > เตา > ไลน์ (แก้ได้โดยเก็บ sp_lines) ===== */
var SP_LINES_DEF=[{b:"A",f:"เตา 1",l:["L11","L12","L13"]},{b:"A",f:"เตา 2",l:["L21","L22","L23","L24"]},{b:"B",f:"เตา 3",l:["L31","L32","L33"]},{b:"B",f:"เตา 4",l:["L41","L42","L43","L44"]}];
function spLines(){try{var a=JSON.parse(localStorage.getItem("sp_lines")||"null");if(Array.isArray(a)&&a.length)return a}catch(e){}return SP_LINES_DEF}
function spLineList(){var o=[];spLines().forEach(function(g){g.l.forEach(function(n){o.push({n:n,b:g.b,f:g.f})})});return o}
function spLineInfo(n){var r=spLineList().filter(function(x){return x.n===n})[0];return r?("อาคาร "+r.b+" · "+r.f):""}
function spLineIdx(n){var l=spLineList(),i=l.findIndex(function(x){return x.n===n});return i<0?999:i}
/* ขอบเขต: "" ทั้งหมด | "B:A" อาคาร | "F:เตา 1" เตา | "L:L11" ไลน์ */
function spInScope(sc,m){if(!sc)return true;var r=spLineList().filter(function(x){return x.n===m})[0];if(!r)return false;var k=sc.slice(0,1),v=sc.slice(2);return k==="B"?r.b===v:k==="F"?r.f===v:r.n===v}
/* ตารางรวม JOB + PM ในช่วงวัน */
function spSchedule(from,to,sc){var out=[];
 spOccur(from,to).forEach(function(o){if(spInScope(sc,o.plan.machine))out.push({date:o.date,time:"",kind:"pm",machine:o.plan.machine,type:o.plan.type,label:SP_PM_NAME[o.plan.type],over:o.over,plan:o.plan})});
 spPmRec().forEach(function(r){if(r.date>=from&&r.date<=to&&spInScope(sc,r.machine))out.push({date:r.date,time:"",kind:"rec",machine:r.machine,type:r.type,label:"ทำ "+SP_PM_NAME[r.type]+" แล้ว",rec:r})});
 spJobs().forEach(function(x){if(x.status!=="cancel"&&x.date>=from&&x.date<=to&&spInScope(sc,x.machine))out.push({date:x.date,time:x.time||"",kind:"job",machine:x.machine,label:"JOB",job:x,from:x.from,to:x.to,note:x.note,status:x.status})});
 return out.sort(function(a,b){return(a.date+a.time+(1e3+spLineIdx(a.machine)))<(b.date+b.time+(1e3+spLineIdx(b.machine)))?-1:1})}
