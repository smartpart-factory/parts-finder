/* ===== ค้นหาอะไหล่ด้วยรูปภาพ =====
 อ่านตัวอักษร/เลขรุ่นจากรูป (OCR ด้วย Tesseract.js ทำงานในเบราว์เซอร์ ไม่ส่งรูปไปเซิร์ฟเวอร์ของเรา)
 แล้วเทียบกับรหัส/ชื่อ/คำค้นใน SP_ITEMS ให้ช่างกดยืนยัน
 ใช้: spImageSearch.open(function(item){ ... })  ต้องโหลด data.js ก่อน */
var spImageSearch=(function(){
var TESS="https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.1/tesseract.min.js";
var css='#is-ov{position:fixed;inset:0;background:rgba(15,23,42,.6);display:none;align-items:center;justify-content:center;z-index:80;padding:14px;font:14px "Noto Sans Thai","Segoe UI",sans-serif;color:#1e293b}#is-ov.on{display:flex}'
+'#is-box{background:#fff;border-radius:12px;width:520px;max-width:100%;max-height:92vh;overflow:auto;padding:18px}#is-box h3{margin:0 0 4px}#is-box .sub{color:#64748b;font-size:13px;margin-bottom:12px}'
+'#is-box .row{display:flex;gap:8px;flex-wrap:wrap}#is-box button{padding:10px 14px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;font:inherit;cursor:pointer}#is-box button.p{background:#1565d8;color:#fff;border-color:#1565d8}'
+'#is-prev{max-width:100%;max-height:220px;border-radius:8px;margin:12px 0 6px;display:none}#is-st{font-size:13px;color:#475569;min-height:20px;margin:6px 0}'
+'#is-bar{height:6px;background:#e2e8f0;border-radius:99px;overflow:hidden;display:none}#is-bar i{display:block;height:100%;width:0;background:#1565d8;transition:width .2s}'
+'#is-txt{width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;margin-top:4px}#is-box label{font-size:12px;color:#64748b;display:block;margin-top:10px}'
+'.is-r{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:8px;margin-top:8px;cursor:pointer}.is-r:hover{background:#eaf2ff;border-color:#1565d8}.is-r small{color:#64748b;display:block}.is-r em{font-style:normal;font-size:11px;background:#e0ecff;color:#1565d8;padding:2px 8px;border-radius:99px;white-space:nowrap}';
var ov,cb=null,busy=false,loaded=null,lastIm=null,vres=null;
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function build(){if(ov)return;var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
 ov=document.createElement("div");ov.id="is-ov";
 ov.innerHTML='<div id="is-box"><h3>📷 ค้นหาด้วยรูป</h3><div class="sub">ถ่ายหรือเลือกรูปอะไหล่/ป้ายเลขรุ่น ระบบจะเทียบ “หน้าตา” กับรูปที่บันทึกไว้ และอ่านตัวอักษรบนป้ายให้ด้วย (ถ่ายบนพื้นเรียบ แสงพอ เห็นชิ้นงานเต็มภาพ จะแม่นขึ้น)</div>'
 +'<div class="row"><button class="p" id="is-cam">📷 ถ่ายรูป</button><button id="is-pick">🖼️ เลือกรูป</button><button id="is-x" style="margin-left:auto">ปิด</button></div>'
 +'<input type="file" id="is-f1" accept="image/*" capture="environment" style="display:none"><input type="file" id="is-f2" accept="image/*" style="display:none">'
 +'<img id="is-prev" alt=""><div id="is-bar"><i></i></div><div id="is-st"></div>'
 +'<label>ข้อความที่อ่านได้ (แก้เองได้ ถ้าอ่านผิด)</label><input id="is-txt" placeholder="เช่น 6205-2RS หรือรหัสบนป้าย"><div id="is-res"></div></div>';
 document.body.appendChild(ov);
 $("is-cam").onclick=function(){$("is-f1").click()};$("is-pick").onclick=function(){$("is-f2").click()};$("is-x").onclick=close;
 ov.onclick=function(e){if(e.target===ov)close()};
 $("is-f1").onchange=$("is-f2").onchange=function(e){var f=e.target.files[0];e.target.value="";if(f)run(f)};
 $("is-txt").oninput=function(){match($("is-txt").value)}}

// ---- เทียบหน้าตา (รูปร่าง/สี) กับรูปอะไหล่ที่บันทึกไว้ ทำงานในเบราว์เซอร์ล้วน ไม่ต้องโหลดโมเดล ----
var VS=64,FK="sp_vfeat1",fcache=null;
function fload(){if(fcache)return fcache;try{fcache=JSON.parse(localStorage.getItem(FK)||"{}")}catch(e){fcache={}}return fcache}
function fsave(){try{localStorage.setItem(FK,JSON.stringify(fcache))}catch(e){}}
function sq(src,rot){var c=document.createElement("canvas");c.width=c.height=VS;var x=c.getContext("2d"),w=src.naturalWidth||src.width,h=src.naturalHeight||src.height,m=Math.min(w,h)*.92,sx=(w-m)/2,sy=(h-m)/2;
 x.fillStyle="#fff";x.fillRect(0,0,VS,VS);x.translate(VS/2,VS/2);x.rotate((rot||0)*Math.PI/2);x.drawImage(src,sx,sy,m,m,-VS/2,-VS/2,VS,VS);return x.getImageData(0,0,VS,VS).data}
function feat(d){var N=VS,g=new Float32Array(N*N),hue=new Float32Array(16),grid=new Float32Array(27),gc=new Float32Array(9),i,j;
 for(i=0;i<N*N;i++){var r=d[i*4]/255,gg=d[i*4+1]/255,b=d[i*4+2]/255;g[i]=.299*r+.587*gg+.114*b;
  var mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),dl=mx-mn,sa=mx?dl/mx:0,h=0;
  if(dl){h=mx===r?((gg-b)/dl)%6:mx===gg?(b-r)/dl+2:(r-gg)/dl+4;h=(h<0?h+6:h)/6}
  if(sa>.25&&mx>.2)hue[Math.min(11,Math.floor(h*12))]++;else hue[12+Math.min(3,Math.floor(mx*4))]++;
  var cx=Math.floor((i%N)/N*3),cy=Math.floor(Math.floor(i/N)/N*3),k=cy*3+cx;gc[k]++;grid[k*3]+=r;grid[k*3+1]+=gg;grid[k*3+2]+=b}
 for(i=0;i<9;i++)for(j=0;j<3;j++)grid[i*3+j]/=gc[i]||1;
 var hs=0;for(i=0;i<16;i++)hs+=hue[i];for(i=0;i<16;i++)hue[i]/=hs||1;
 var hog=new Float32Array(128);
 for(var y=1;y<N-1;y++)for(var x=1;x<N-1;x++){var gx=g[y*N+x+1]-g[y*N+x-1],gy=g[(y+1)*N+x]-g[(y-1)*N+x],mg=Math.hypot(gx,gy);if(mg<.02)continue;
  var an=Math.atan2(gy,gx);if(an<0)an+=Math.PI;var bn=Math.min(7,Math.floor(an/Math.PI*8)),cell=Math.floor(y/16)*4+Math.floor(x/16);hog[cell*8+bn]+=mg}
 var nn=0;for(i=0;i<128;i++)nn+=hog[i]*hog[i];nn=Math.sqrt(nn)||1;for(i=0;i<128;i++)hog[i]/=nn;
 return{h:Array.prototype.map.call(hog,function(v){return Math.round(v*255)}),c:Array.prototype.map.call(hue,function(v){return Math.round(v*255)}),g:Array.prototype.map.call(grid,function(v){return Math.round(v*255)})}}
function vsim(a,b){var i,dot=0,na=0,nb=0,hi=0,ha=0,hb=0,gd=0;
 for(i=0;i<128;i++){dot+=a.h[i]*b.h[i];na+=a.h[i]*a.h[i];nb+=b.h[i]*b.h[i]}
 var hs=dot/(Math.sqrt(na*nb)||1);
 for(i=0;i<16;i++){hi+=Math.min(a.c[i],b.c[i]);ha+=a.c[i];hb+=b.c[i]}
 var cs=hi/(Math.max(ha,hb)||1);
 for(i=0;i<27;i++)gd+=Math.abs(a.g[i]-b.g[i]);var gs=Math.max(0,1-gd/27/255*2.2);
 return .5*hs+.25*cs+.25*gs}
function loadImg(u){return new Promise(function(ok){var im=new Image();if(u.indexOf("data:")!==0)im.crossOrigin="anonymous";im.onload=function(){ok(im)};im.onerror=function(){ok(null)};im.src=u})}
function itemFeats(items){var C=fload(),dirty=false,out=[],p=Promise.resolve();
 items.forEach(function(i){if(!i.img)return;var key=i.img.length+":"+i.img.slice(-24);var e=C[i.c];
  if(e&&e.k===key){out.push({i:i,f:e.f});return}
  p=p.then(function(){return loadImg(i.img)}).then(function(im){if(!im)return;var f=feat(sq(im,0));C[i.c]={k:key,f:f};dirty=true;out.push({i:i,f:f})})});
 return p.then(function(){if(dirty)fsave();return out})}
function visual(src){var qs=[0,1,2,3].map(function(r){return feat(sq(src,r))});
 return itemFeats(SP_ITEMS).then(function(list){return list.map(function(x){var b=0;qs.forEach(function(q){var v=vsim(q,x.f);if(v>b)b=v});return{i:x.i,v:b}}).sort(function(a,b){return b.v-a.v})})}
function close(){ov.classList.remove("on")}
function open(fn){build();cb=fn;$("is-prev").style.display="none";$("is-st").textContent="";$("is-res").innerHTML="";$("is-txt").value="";$("is-bar").style.display="none";ov.classList.add("on")}
function loadTess(){if(window.Tesseract)return Promise.resolve();if(loaded)return loaded;
 loaded=new Promise(function(ok,no){var s=document.createElement("script");s.src=TESS;s.onload=ok;s.onerror=function(){loaded=null;no(new Error("load"))};document.head.appendChild(s)});return loaded}
function prep(file){return new Promise(function(ok,no){var u=URL.createObjectURL(file),im=new Image();
 im.onload=function(){var m=1800,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
  var x=c.getContext("2d");lastIm=im;x.filter="grayscale(1) contrast(1.4)";x.drawImage(im,0,0,c.width,c.height);$("is-prev").src=u;$("is-prev").style.display="block";ok(c)};
 im.onerror=function(){no(new Error("img"))};im.src=u})}
function run(file){if(busy)return;busy=true;$("is-res").innerHTML="";var st=$("is-st"),bar=$("is-bar"),fill=bar.firstChild;
 st.textContent="กำลังเตรียมรูป...";prep(file).then(function(c){vres=null;visual(lastIm).then(function(v){vres=v;match($("is-txt").value)});st.textContent="กำลังโหลดตัวอ่านตัวอักษร (ครั้งแรกอาจใช้เวลาสักครู่)...";bar.style.display="block";fill.style.width="3%";
  return loadTess().then(function(){return Tesseract.recognize(c,"eng",{logger:function(m){if(m.status==="recognizing text"){st.textContent="กำลังอ่านตัวอักษรจากรูป...";fill.style.width=Math.max(8,Math.round(m.progress*100))+"%"}}})})})
 .then(function(r){busy=false;bar.style.display="none";var t=(r.data.text||"").replace(/\s+/g," ").trim();$("is-txt").value=t;
  st.textContent=t?"อ่านได้แล้ว เลือกรายการที่ตรงด้านล่าง":"อ่านตัวอักษรจากรูปไม่ได้ ลองถ่ายให้ใกล้และชัดขึ้น หรือพิมพ์เลขรุ่นเองในช่องด้านล่าง";match(t)})
 .catch(function(e){busy=false;bar.style.display="none";st.textContent=e.message==="load"?"โหลดตัวอ่านตัวอักษรไม่สำเร็จ (ต้องต่ออินเทอร์เน็ต) พิมพ์เลขรุ่นเองในช่องด้านล่างได้ (ผลเทียบหน้าตายังใช้ได้)":"อ่านตัวอักษรไม่สำเร็จ ดูผลเทียบหน้าตาด้านล่าง หรือพิมพ์เลขรุ่นเองได้"})}
function norm(s){return String(s).toUpperCase().replace(/[^A-Z0-9ก-๙]/g,"")}
function score(item,txt){var T=norm(txt),sc=0,why=[];if(!T)return{sc:0};
 var c=norm(item.c);if(c.length>=3&&T.indexOf(c)>-1){sc+=10;why.push(item.c)}
 String(item.c+" "+item.n).toUpperCase().split(/[^A-Z0-9]+/).forEach(function(p){if(p.length>=3&&(/\d/.test(p)||p.length>=4)&&T.indexOf(p)>-1){sc+=4;if(why.indexOf(p)<0)why.push(p)}});
 String(item.k||"").toUpperCase().split(/\s+/).forEach(function(p){var n=norm(p);if(n.length>=3&&T.indexOf(n)>-1){sc+=2;if(why.indexOf(p)<0)why.push(p)}});
 return{sc:sc,why:why}}
function match(txt){var box=$("is-res");box.innerHTML="";textPart(txt,box);visPart(box)}
function visPart(box){if(!vres)return;
 if(!vres.length){box.insertAdjacentHTML("beforeend",'<div class="is-r" style="cursor:default">ยังไม่มีอะไหล่ที่มีรูปในระบบ เพิ่มรูปที่หน้า “จัดการระบบ” เพื่อให้ค้นหาจากหน้าตาได้</div>');return}
 box.insertAdjacentHTML("beforeend",'<label style="margin-top:14px">🖼️ หน้าตาใกล้เคียง (เทียบรูปร่าง/สีกับรูปที่บันทึกไว้)</label>');
 vres.slice(0,5).forEach(function(x){var d=document.createElement("div");d.className="is-r";
  d.innerHTML='<div style="display:flex;gap:10px;align-items:center"><img src="'+x.i.img+'" alt="" style="width:44px;height:44px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1"><div><b>'+esc(x.i.n)+'</b><small>'+esc(x.i.c)+' · '+esc(spLocShort(x.i))+'</small></div></div><em>คล้าย '+Math.round(x.v*100)+'%</em>';
  d.onclick=function(){close();if(cb)cb(x.i)};box.appendChild(d)})}
function textPart(txt,box){
 if(!SP_ITEMS.length){box.innerHTML='<div class="is-r" style="cursor:default">ยังไม่มีข้อมูลอะไหล่ในระบบ</div>';return}
 var a=SP_ITEMS.map(function(i){var r=score(i,txt);return{i:i,sc:r.sc,why:r.why}}).filter(function(x){return x.sc>0}).sort(function(x,y){return y.sc-x.sc}).slice(0,5);
 if(!a.length){if(txt.trim())box.innerHTML='<div class="is-r" style="cursor:default">ไม่พบอะไหล่ที่ตรงกับข้อความนี้ ลองแก้ข้อความด้านบน</div>';return}
 a.forEach(function(x){var d=document.createElement("div");d.className="is-r";var s=spStatus(x.i);
  d.innerHTML='<div><b>'+esc(x.i.n)+'</b><small>'+esc(x.i.c)+' · '+SP_TXT[s]+' · '+esc(spLocShort(x.i))+'</small></div><em>ตรง: '+esc(x.why.slice(0,2).join(", "))+'</em>';
  d.onclick=function(){close();if(cb)cb(x.i)};box.appendChild(d)})}
return{open:open,_match:score,_visual:visual};
})();
