/* ===== นำเข้าตาราง JOB จากรูปปฏิทิน (อ่านตัวอักษรด้วย Tesseract.js ในเบราว์เซอร์ ไม่ส่งรูปออกไปไหน) ===== */
var SP_IMG=(function(){
var LINES=["L11","L12","L13","L21","L22","L23","L24","L31","L32","L33","L41","L42","L43","L44"];
function fixCodes(s){return s.replace(/\b([0-9IlT])([A-Z]{2})([0-9OIlSoB]{3})\b/g,function(m,a,b,c){return (/\d/.test(a)?a:"1")+b+c.replace(/[Oo]/g,"0").replace(/[Il]/g,"1").replace(/S/g,"5").replace(/B/g,"8")})}
var START=/^[LlI1T4|\[]{0,2}\s*([1-4])\s*([1-4])\s*[\]\)7]?\s*[:;]\s*(.*)$/;
function splitArrow(s){return s.split(/\s*(?:->|—>|–>|>|›|»)\s*/)}
/* แยกข้อความของช่องวันหนึ่งช่อง เป็นรายการงาน */
function parseCell(text){var out=[],cur=null;
 String(text||"").split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean).forEach(function(l){var m=START.exec(l);
  if(m){cur={m:"L"+m[1]+m[2],t:m[3]};out.push(cur)}else if(cur&&!/^\d{1,2}$/.test(l)){cur.t+=" "+l}});
 return out.map(function(e){var t=fixCodes(e.t.replace(/\s+/g," ").trim()),r={machine:LINES.indexOf(e.m)>=0?e.m:"",from:"",to:"",note:"",kind:"job",raw:e.m+" : "+t};
  var pm=/\bPM\b/i.test(t)&&/(\d+\s*(month|mth|m\b)|year|yr)/i.test(t);
  if(pm){r.kind="pm";r.to=t;r.note="นำเข้าจากรูปปฏิทิน";return r}
  if(/test\s*run/i.test(t)){r.kind="test";t=t.replace(/^.*?test\s*run\s*/i,"");r.note="Test run"}
  var p=splitArrow(t);if(p.length>1){r.from=p[0].trim();r.to=p.slice(1).join(" > ").trim()}else r.to=t.trim();
  return r})}
function loadScript(src){return new Promise(function(ok,no){if(window.Tesseract)return ok();var s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=function(){no(new Error("โหลดตัวอ่านรูปไม่สำเร็จ (ต้องต่ออินเทอร์เน็ต)"))};document.head.appendChild(s)})}
function lum(d,i){return .299*d[i]+.587*d[i+1]+.114*d[i+2]}
/* หาเส้นตารางแนวนอน: พิกเซลสีเทาที่เข้มกว่าพิกเซลเหนือ/ใต้ 2px (เส้นบาง ๆ) พาดเกือบทั้งความกว้าง — ทนต่อช่องที่ระบายสีทับ */
function hLines(d,W,H,thr,gap,frac){var ys=[],st=Math.max(1,Math.floor(W/300));for(var y=2;y<H-2;y++){var c=0,n=0;for(var x=0;x<W;x+=st){var i=(y*W+x)*4,mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);n++;if(mx-mn>40||mn>=thr)continue;var l=lum(d,i);if(l<lum(d,((y-2)*W+x)*4)-gap&&l<lum(d,((y+2)*W+x)*4)-gap)c++}if(c/n>frac)ys.push(y)}
 var cl=[];ys.forEach(function(y){if(cl.length&&y-cl[cl.length-1][1]<=3)cl[cl.length-1][1]=y;else cl.push([y,y])});return cl.map(function(c){return Math.round((c[0]+c[1])/2)})}
function toRows(L,H){var rows=[];for(var i=0;i+1<L.length;i++)if(L[i+1]-L[i]>H*.06)rows.push([L[i],L[i+1]]);return rows}
/* หาแถวของตารางให้ได้ครบ weeks แถวเสมอ: ลองหลายความเข้มของเส้น → ต่อเติมแถวที่ขาด → ถ้าไม่เจอเลยแบ่งเท่า ๆ กันทั้งรูป */
function findRows(ctx,W,H,weeks){var d=ctx.getImageData(0,0,W,H).data,best=[],tries=[[215,8,.45],[235,5,.35],[245,3,.25]];
 for(var t=0;t<tries.length;t++){var r=toRows(hLines(d,W,H,tries[t][0],tries[t][1],tries[t][2]),H);if(r.length>best.length)best=r;if(r.length>=weeks)break}
 var rows=best,note="";
 if(rows.length>weeks){var bi=0,bs=1e9;for(var i=0;i+weeks<=rows.length;i++){var hs=rows.slice(i,i+weeks).map(function(r){return r[1]-r[0]}),sp=Math.max.apply(null,hs)-Math.min.apply(null,hs);if(sp<bs){bs=sp;bi=i}}rows=rows.slice(bi,bi+weeks)}
 else if(rows.length<weeks&&rows.length>=2){var hs2=rows.map(function(r){return r[1]-r[0]}).sort(function(a,b){return a-b}),mh=hs2[Math.floor(hs2.length/2)];
  while(rows.length<weeks){var last=rows[rows.length-1],first=rows[0];if(last[1]+mh<=H*1.03)rows.push([last[1],Math.min(H,last[1]+mh)]);else if(first[0]-mh>=-H*.03)rows.unshift([Math.max(0,first[0]-mh),first[0]]);else break}
  note="เส้นตารางไม่ครบ ระบบเดาแถวที่ขาดให้"}
 if(rows.length<weeks){rows=[];var rh=H/weeks;for(var k=0;k<weeks;k++)rows.push([Math.round(k*rh),Math.round((k+1)*rh)]);note="หาเส้นตารางไม่เจอ แบ่งรูปเป็น "+weeks+" แถวเท่า ๆ กัน (ควรครอปให้เห็นเฉพาะตาราง)"}
 var xs=findCols(d,W,H,rows);if(!xs){xs=[];for(var q=0;q<=7;q++)xs.push(Math.round(W*q/7))}
 return{rows:rows,xs:xs,note:note}}
/* หาเส้นแนวตั้งของตาราง 7 คอลัมน์ (ถ้าหาไม่ได้ใช้ขอบนอกสุดแล้วแบ่ง 7 เท่า ๆ กัน) */
function findCols(d,W,H,rows){var y0=rows[0][0]+4,y1=rows[rows.length-1][1]-4,xs=[];if(y1-y0<20)return null;var st=Math.max(1,Math.floor((y1-y0)/200));
 [[215,8,.55],[235,5,.45],[245,3,.35]].some(function(tr){xs=[];for(var x=2;x<W-2;x++){var c=0,n=0;for(var y=y0;y<y1;y+=st){var i=(y*W+x)*4,mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);n++;if(mx-mn>40||mn>=tr[0])continue;var l=lum(d,i);if(l<lum(d,i-8)-tr[1]&&l<lum(d,i+8)-tr[1])c++}if(c/n>tr[2])xs.push(x)}
  var cl=[];xs.forEach(function(x){if(cl.length&&x-cl[cl.length-1][1]<=3)cl[cl.length-1][1]=x;else cl.push([x,x])});xs=cl.map(function(c){return Math.round((c[0]+c[1])/2)});return xs.length>=8});
 if(xs.length>=8){var bi=0,bs=1e9;for(var i=0;i+8<=xs.length;i++){var hs=[];for(var k=0;k<7;k++)hs.push(xs[i+k+1]-xs[i+k]);var sp=Math.max.apply(null,hs)-Math.min.apply(null,hs);if(sp<bs){bs=sp;bi=i}}return xs.slice(bi,bi+8)}
 if(xs.length>=2&&xs[xs.length-1]-xs[0]>W*.6){var o=[],x0=xs[0],x1=xs[xs.length-1];for(var j=0;j<=7;j++)o.push(Math.round(x0+(x1-x0)*j/7));return o}
 return null}
function binCell(src,x,y,w,h){var s=Math.min(3,2400/w),c=document.createElement("canvas");c.width=Math.round(w*s);c.height=Math.round(h*s);var g=c.getContext("2d");g.imageSmoothingQuality="high";g.drawImage(src,x,y,w,h,0,0,c.width,c.height);
 var im=g.getImageData(0,0,c.width,c.height),d=im.data,hist=new Array(256).fill(0),n=c.width*c.height;for(var i=0;i<d.length;i+=4)hist[Math.round(lum(d,i))]++;
 var a=0,bg=0;for(;bg<256;bg++){a+=hist[bg];if(a>=n/2)break}var th=bg*.75,dark=0;
 for(i=0;i<d.length;i+=4){var v=lum(d,i)<th?0:255;if(!v)dark++;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255}g.putImageData(im,0,0);return{canvas:c,dark:dark/n}}
/* file: ไฟล์รูป, ym:"2026-10", onProg(txt) -> Promise<[{date,machine,from,to,note,kind,raw}]> */
function run(file,ym,onProg){var yy=+ym.slice(0,4),mm=+ym.slice(5,7)-1,first=new Date(yy,mm,1).getDay(),days=new Date(yy,mm+1,0).getDate(),weeks=Math.ceil((first+days)/7);
 return loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js").then(function(){return new Promise(function(ok,no){var im=new Image();im.onload=function(){ok(im)};im.onerror=function(){no(new Error("เปิดรูปไม่ได้"))};im.src=URL.createObjectURL(file)})}).then(function(img){
  var W=img.naturalWidth,H=img.naturalHeight,cv=document.createElement("canvas");cv.width=W;cv.height=H;var ctx=cv.getContext("2d");ctx.drawImage(img,0,0);
  var fr=findRows(ctx,W,H,weeks),rows=fr.rows;if(fr.note)onProg(fr.note);var xs=fr.xs,cells=[];
  rows.forEach(function(r,ri){for(var c=0;c<7;c++){var day=1-first+ri*7+c;if(day<1||day>days)continue;cells.push({day:day,x:xs[c]+3,y:r[0]+3,w:xs[c+1]-xs[c]-6,h:r[1]-r[0]-6})}});
  return Tesseract.createWorker("eng",1,{logger:function(){}}).then(function(wk){return wk.setParameters({tessedit_pageseg_mode:"6"}).then(function(){var res=[],k=0;
   function nxt(){if(k>=cells.length)return wk.terminate().then(function(){return res});var c=cells[k++];onProg("กำลังอ่านรูป "+k+"/"+cells.length+" ช่อง");var b=binCell(cv,c.x,c.y,c.w,c.h);
    if(b.dark<.004)return nxt();return wk.recognize(b.canvas).then(function(o){parseCell(o.data.text).forEach(function(e){e.date=yy+"-"+("0"+(mm+1)).slice(-2)+"-"+("0"+c.day).slice(-2);res.push(e)});return nxt()})}
   return nxt()})})})}
return{parseCell:parseCell,run:run,LINES:LINES,findRows:findRows}})();
if(typeof module!=="undefined")module.exports=SP_IMG;
