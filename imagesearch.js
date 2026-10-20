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
var ov,cb=null,busy=false,loaded=null;
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function build(){if(ov)return;var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
 ov=document.createElement("div");ov.id="is-ov";
 ov.innerHTML='<div id="is-box"><h3>📷 ค้นหาด้วยรูป</h3><div class="sub">ถ่ายหรือเลือกรูปป้าย/เลขรุ่นบนอะไหล่หรือกล่อง ระบบจะอ่านตัวอักษรแล้วหารายการที่ตรง</div>'
 +'<div class="row"><button class="p" id="is-cam">📷 ถ่ายรูป</button><button id="is-pick">🖼️ เลือกรูป</button><button id="is-x" style="margin-left:auto">ปิด</button></div>'
 +'<input type="file" id="is-f1" accept="image/*" capture="environment" style="display:none"><input type="file" id="is-f2" accept="image/*" style="display:none">'
 +'<img id="is-prev" alt=""><div id="is-bar"><i></i></div><div id="is-st"></div>'
 +'<label>ข้อความที่อ่านได้ (แก้เองได้ ถ้าอ่านผิด)</label><input id="is-txt" placeholder="เช่น 6205-2RS หรือรหัสบนป้าย"><div id="is-res"></div></div>';
 document.body.appendChild(ov);
 $("is-cam").onclick=function(){$("is-f1").click()};$("is-pick").onclick=function(){$("is-f2").click()};$("is-x").onclick=close;
 ov.onclick=function(e){if(e.target===ov)close()};
 $("is-f1").onchange=$("is-f2").onchange=function(e){var f=e.target.files[0];e.target.value="";if(f)run(f)};
 $("is-txt").oninput=function(){match($("is-txt").value)}}
function close(){ov.classList.remove("on")}
function open(fn){build();cb=fn;$("is-prev").style.display="none";$("is-st").textContent="";$("is-res").innerHTML="";$("is-txt").value="";$("is-bar").style.display="none";ov.classList.add("on")}
function loadTess(){if(window.Tesseract)return Promise.resolve();if(loaded)return loaded;
 loaded=new Promise(function(ok,no){var s=document.createElement("script");s.src=TESS;s.onload=ok;s.onerror=function(){loaded=null;no(new Error("load"))};document.head.appendChild(s)});return loaded}
function prep(file){return new Promise(function(ok,no){var u=URL.createObjectURL(file),im=new Image();
 im.onload=function(){var m=1800,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
  var x=c.getContext("2d");x.filter="grayscale(1) contrast(1.4)";x.drawImage(im,0,0,c.width,c.height);$("is-prev").src=u;$("is-prev").style.display="block";ok(c)};
 im.onerror=function(){no(new Error("img"))};im.src=u})}
function run(file){if(busy)return;busy=true;$("is-res").innerHTML="";var st=$("is-st"),bar=$("is-bar"),fill=bar.firstChild;
 st.textContent="กำลังเตรียมรูป...";prep(file).then(function(c){st.textContent="กำลังโหลดตัวอ่านตัวอักษร (ครั้งแรกอาจใช้เวลาสักครู่)...";bar.style.display="block";fill.style.width="3%";
  return loadTess().then(function(){return Tesseract.recognize(c,"eng",{logger:function(m){if(m.status==="recognizing text"){st.textContent="กำลังอ่านตัวอักษรจากรูป...";fill.style.width=Math.max(8,Math.round(m.progress*100))+"%"}}})})})
 .then(function(r){busy=false;bar.style.display="none";var t=(r.data.text||"").replace(/\s+/g," ").trim();$("is-txt").value=t;
  st.textContent=t?"อ่านได้แล้ว เลือกรายการที่ตรงด้านล่าง":"อ่านตัวอักษรจากรูปไม่ได้ ลองถ่ายให้ใกล้และชัดขึ้น หรือพิมพ์เลขรุ่นเองในช่องด้านล่าง";match(t)})
 .catch(function(e){busy=false;bar.style.display="none";st.textContent=e.message==="load"?"โหลดตัวอ่านตัวอักษรไม่สำเร็จ (ต้องต่ออินเทอร์เน็ต) พิมพ์เลขรุ่นเองในช่องด้านล่างได้":"เปิดรูปนี้ไม่ได้ ลองรูปอื่น"})}
function norm(s){return String(s).toUpperCase().replace(/[^A-Z0-9ก-๙]/g,"")}
function score(item,txt){var T=norm(txt),sc=0,why=[];if(!T)return{sc:0};
 var c=norm(item.c);if(c.length>=3&&T.indexOf(c)>-1){sc+=10;why.push(item.c)}
 String(item.c+" "+item.n).toUpperCase().split(/[^A-Z0-9]+/).forEach(function(p){if(p.length>=3&&(/\d/.test(p)||p.length>=4)&&T.indexOf(p)>-1){sc+=4;if(why.indexOf(p)<0)why.push(p)}});
 String(item.k||"").toUpperCase().split(/\s+/).forEach(function(p){var n=norm(p);if(n.length>=3&&T.indexOf(n)>-1){sc+=2;if(why.indexOf(p)<0)why.push(p)}});
 return{sc:sc,why:why}}
function match(txt){var box=$("is-res");box.innerHTML="";
 if(!SP_ITEMS.length){box.innerHTML='<div class="is-r" style="cursor:default">ยังไม่มีข้อมูลอะไหล่ในระบบ</div>';return}
 var a=SP_ITEMS.map(function(i){var r=score(i,txt);return{i:i,sc:r.sc,why:r.why}}).filter(function(x){return x.sc>0}).sort(function(x,y){return y.sc-x.sc}).slice(0,5);
 if(!a.length){if(txt.trim())box.innerHTML='<div class="is-r" style="cursor:default">ไม่พบอะไหล่ที่ตรงกับข้อความนี้ ลองแก้ข้อความด้านบน</div>';return}
 a.forEach(function(x){var d=document.createElement("div");d.className="is-r";var s=spStatus(x.i);
  d.innerHTML='<div><b>'+esc(x.i.n)+'</b><small>'+esc(x.i.c)+' · '+SP_TXT[s]+' · '+esc(spLocShort(x.i))+'</small></div><em>ตรง: '+esc(x.why.slice(0,2).join(", "))+'</em>';
  d.onclick=function(){close();if(cb)cb(x.i)};box.appendChild(d)})}
return{open:open,_match:score};
})();
