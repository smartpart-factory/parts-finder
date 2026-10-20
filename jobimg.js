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
/* หาเส้นตารางแนวนอน (เส้นเทาบาง ๆ ที่พาดเกือบทั้งความกว้าง) */
function hLines(ctx,W,H){var d=ctx.getImageData(0,0,W,H).data,ys=[];for(var y=0;y<H;y++){var c=0;for(var x=0;x<W;x+=3){var i=(y*W+x)*4,mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);if(mx-mn<30&&mn<190)c++}if(c/(W/3)>.5)ys.push(y)}
 var cl=[];ys.forEach(function(y){if(cl.length&&y-cl[cl.length-1][1]<=2)cl[cl.length-1][1]=y;else cl.push([y,y])});return cl.map(function(c){return Math.round((c[0]+c[1])/2)})}
function binCell(src,x,y,w,h){var s=Math.min(3,2400/w),c=document.createElement("canvas");c.width=Math.round(w*s);c.height=Math.round(h*s);var g=c.getContext("2d");g.imageSmoothingQuality="high";g.drawImage(src,x,y,w,h,0,0,c.width,c.height);
 var im=g.getImageData(0,0,c.width,c.height),d=im.data,hist=new Array(256).fill(0),n=c.width*c.height;for(var i=0;i<d.length;i+=4)hist[Math.round(lum(d,i))]++;
 var a=0,bg=0;for(;bg<256;bg++){a+=hist[bg];if(a>=n/2)break}var th=bg*.75,dark=0;
 for(i=0;i<d.length;i+=4){var v=lum(d,i)<th?0:255;if(!v)dark++;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255}g.putImageData(im,0,0);return{canvas:c,dark:dark/n}}
/* file: ไฟล์รูป, ym:"2026-10", onProg(txt) -> Promise<[{date,machine,from,to,note,kind,raw}]> */
function run(file,ym,onProg){var yy=+ym.slice(0,4),mm=+ym.slice(5,7)-1,first=new Date(yy,mm,1).getDay(),days=new Date(yy,mm+1,0).getDate(),weeks=Math.ceil((first+days)/7);
 return loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js").then(function(){return new Promise(function(ok,no){var im=new Image();im.onload=function(){ok(im)};im.onerror=function(){no(new Error("เปิดรูปไม่ได้"))};im.src=URL.createObjectURL(file)})}).then(function(img){
  var W=img.naturalWidth,H=img.naturalHeight,cv=document.createElement("canvas");cv.width=W;cv.height=H;var ctx=cv.getContext("2d");ctx.drawImage(img,0,0);
  var L=hLines(ctx,W,H),rows=[];for(var i=0;i+1<L.length;i++)if(L[i+1]-L[i]>H*.08)rows.push([L[i],L[i+1]]);
  if(rows.length<weeks)throw new Error("หาเส้นตารางปฏิทินไม่เจอ (พบ "+rows.length+" แถว ต้องการ "+weeks+") ลองครอปรูปให้เห็นเฉพาะตารางปฏิทินทั้งเดือน");
  rows=rows.slice(0,weeks);var cw=W/7,cells=[];
  rows.forEach(function(r,ri){for(var c=0;c<7;c++){var day=1-first+ri*7+c;if(day<1||day>days)continue;cells.push({day:day,x:Math.round(c*cw)+3,y:r[0]+3,w:Math.round(cw)-6,h:r[1]-r[0]-6})}});
  return Tesseract.createWorker("eng",1,{logger:function(){}}).then(function(wk){return wk.setParameters({tessedit_pageseg_mode:"6"}).then(function(){var res=[],k=0;
   function nxt(){if(k>=cells.length)return wk.terminate().then(function(){return res});var c=cells[k++];onProg("กำลังอ่านรูป "+k+"/"+cells.length+" ช่อง");var b=binCell(cv,c.x,c.y,c.w,c.h);
    if(b.dark<.004)return nxt();return wk.recognize(b.canvas).then(function(o){parseCell(o.data.text).forEach(function(e){e.date=yy+"-"+("0"+(mm+1)).slice(-2)+"-"+("0"+c.day).slice(-2);res.push(e)});return nxt()})}
   return nxt()})})})}
return{parseCell:parseCell,run:run,LINES:LINES}})();
if(typeof module!=="undefined")module.exports=SP_IMG;
