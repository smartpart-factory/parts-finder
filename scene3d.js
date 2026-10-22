/* ===== โมเดล 3D แผนก (ใช้ร่วมกันหน้า "เช็คของ" และ "ตำแหน่งจัดเก็บ") =====
 spScene({host,info,onChange,onSelect}) → {show(item), paint(), place(on,item)}
 - คลิกที่อะไหล่ในโมเดลเพื่อดูรายละเอียด
 - โหมด 📌 วางอะไหล่ (admin/manager): คลิกจุดใดก็ได้ (พื้น/โต๊ะ/บนตู้/ชั้นเชล) แล้วเลือกอะไหล่ที่จะวางตรงนั้น */
window.spScene=function(o){
var host=o.host,infoEl=o.info,HEX={stock:0x16a34a,low:0xd97706,out:0xdc2626,repair:0x7c3aed};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function loadScript(u){return new Promise(function(ok,no){var t=document.createElement("script");t.src=u;t.onload=ok;t.onerror=no;document.head.appendChild(t)})}
var GLTF_URL="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",gltfP=null;
function gltf(){if(THREE.GLTFLoader)return Promise.resolve();return gltfP||(gltfP=loadScript(GLTF_URL))}
var W=host.clientWidth||600,H=host.clientHeight||400,sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,W/H,.1,600);
var ren=new THREE.WebGLRenderer({antialias:true,alpha:true});ren.setSize(W,H);ren.setPixelRatio(Math.min(devicePixelRatio,2));
ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(ren.domElement);
var DOOR=spDept.entry,B=spDept.bounds.slice();
Object.keys(SP_RACKS).forEach(function(k){var r=SP_RACKS[k];B[0]=Math.min(B[0],r.x-r.w/2);B[2]=Math.max(B[2],r.x+r.w/2);B[1]=Math.min(B[1],r.z-r.d/2);B[3]=Math.max(B[3],r.z+r.d/2)});
B[3]=Math.max(B[3],DOOR[1]);
var cx=(B[0]+B[2])/2,cz=(B[1]+B[3])/2,span=Math.max(B[2]-B[0],B[3]-B[1]);
sc.add(new THREE.HemisphereLight(0xffffff,0x7b8597,.62));
var dl=new THREE.DirectionalLight(0xffffff,.7);dl.position.set(cx+span*.3,span*.8,cz+span*.25);dl.target.position.set(cx,0,cz);sc.add(dl,dl.target);
dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);var sh=dl.shadow.camera,sp=span*.62;sh.left=-sp;sh.right=sp;sh.top=sp;sh.bottom=-sp;sh.near=1;sh.far=span*2;dl.shadow.bias=-.0006;
var fl=new THREE.Mesh(new THREE.PlaneGeometry(span*3,span*3),new THREE.MeshStandardMaterial({color:0x8f8f8b,roughness:.97}));fl.rotation.x=-Math.PI/2;fl.position.set(cx,-.01,cz);fl.receiveShadow=true;fl.userData.surf="บนพื้น";sc.add(fl);
var door=new THREE.Mesh(new THREE.BoxGeometry(2,.1,.6),new THREE.MeshBasicMaterial({color:0x16a34a}));door.position.set(DOOR[0],.06,DOOR[1]);sc.add(door);
var DEPT=spDept.build(THREE,sc,SP_RACKS),PICKS=[fl].concat(DEPT.userData.pick);
var items=new THREE.Group(),modelG=new THREE.Group(),routeG=new THREE.Group(),hlG=new THREE.Group(),ring=new THREE.Mesh(new THREE.RingGeometry(.13,.19,32),new THREE.MeshBasicMaterial({color:0xf59e0b,side:THREE.DoubleSide,depthTest:false,transparent:true}));
ring.rotation.x=-Math.PI/2;ring.visible=false;ring.renderOrder=9;sc.add(items,modelG,routeG,hlG,ring);var mark=null,sel=null;
// ---- ตำแหน่งกล่องอะไหล่ ----
function lpos(i){var q=i.pos;if(!(q&&q.length===3))return null;return i.gv>=2?q:[q[0]*spDept.KP,q[1]*spDept.KD,q[2]*spDept.KP]}
function slotPos(i){var r=SP_RACKS[i.r],q=lpos(i);
 if(i.dw){var DB0=drawerBox(i);if(DB0)return{x:DB0.P.x,y:DB0.P.y,z:DB0.P.z,bw:.1,bh:.1,bd:.1,top:DB0.P.y,spot:true,dw:i.dw}}
 if(q&&i.wl)return{x:q[0],y:q[1],z:q[2],bw:.3,bh:.3,bd:.3,top:q[1],spot:true,wl:i.wl};
 if(q)return{x:q[0],y:q[1]+.12,z:q[2],bw:.26,bh:.24,bd:.2,top:q[1],spot:true};
 if(!r)return null;
 var same=SP_ITEMS.filter(function(q){return q.r===i.r&&q.s===i.s&&!(q.pos&&q.pos.length===3)}),idx=same.indexOf(i),cnt=same.length,alongX=r.w>=r.d,Lg=alongX?r.w:r.d,Sh=alongX?r.d:r.w,cw=Lg/cnt,bh=Math.min(.55,(r.h/r.n)*.6),y0=spDept.shelfY(r,i.s),
  c=-Lg/2+(idx+.5)*cw,lw=Math.min(.7,cw*.8),sw=Math.min(.9,Sh*.7);
 return alongX?{x:r.x+c,y:y0+bh/2,z:r.z,bw:lw,bh:bh,bd:sw,top:y0}:{x:r.x,y:y0+bh/2,z:r.z+c,bw:sw,bh:bh,bd:lw,top:y0}}
var gcache={},pgen=0,TXC={};function imgTex(u){if(TXC[u])return TXC[u];var t=new THREE.TextureLoader().load(u,function(){});t.anisotropy=4;return TXC[u]=t}
function glbOf(u){return gcache[u]||(gcache[u]=gltf().then(function(){return new Promise(function(ok,no){new THREE.GLTFLoader().load(u,ok,undefined,no)})}))}
function clear(g){while(g.children.length){var c=g.children.pop();c.traverse(function(n){if(n.geometry)n.geometry.dispose();if(n.material&&n.material.dispose)n.material.dispose()})}}
function modelFor(i){var p=slotPos(i);if(!p||!i.mt)return null;var m=spDept.model(i.mt);if(!m)return null;var W=new THREE.Group(),r=SP_RACKS[i.r],fit;
 if(p.wl){W.add(m);W.rotation.y=Math.atan2(p.wl[0],p.wl[1]);var ws=spDept.KD*(i.sc||1);W.scale.setScalar(ws);W.position.set(p.x,p.y,p.z);W.userData={code:i.c,s:ws,y0:p.y,w:.3};return W}
 if(i.dw){var DB=drawerBox(i);if(!DB)return null;fit=[DB.P.cw*.86,DB.P.ch*.8,DB.f.d*.55];W.rotation.y=DB.P.nz<0?Math.PI:0}
 else if(p.spot&&!(r&&!lpos(i))){fit=[.5,.42,.4]}
 else{fit=[p.bw,p.bh,p.bd];if(r&&r.w<r.d)m.rotation.y=Math.PI/2}
 W.add(m);if(i.ry)W.rotation.y+=i.ry*Math.PI/180;var b=new THREE.Box3().setFromObject(W),sz=b.getSize(new THREE.Vector3()),s=Math.min(fit[0]*.94/sz.x,fit[1]*.94/sz.y,fit[2]*.94/sz.z,1.8)*(i.sc||1);W.scale.setScalar(s);b.setFromObject(W);
 var y=i.dw?p.y-(b.min.y+b.max.y)/2:p.top-b.min.y;W.position.set(p.x,y,p.z);W.userData={code:i.c,s:s,y0:y,w:fit[0]};return W}
function packRack(){var map={},groups={};SP_ITEMS.forEach(function(i){if(!i.mt||i.dw||lpos(i)||!SP_RACKS[i.r]||!(i.s>0))return;(groups[i.r+"|"+i.s]=groups[i.r+"|"+i.s]||[]).push(i)});
 Object.keys(groups).forEach(function(k){var l=groups[k],r=SP_RACKS[l[0].r],alongX=r.w>=r.d,Lg=alongX?r.w:r.d,Sh=alongX?r.d:r.w,sp=r.h/r.n,fh=sp*.72,fd=Math.min(.9,Sh*.8),y0=spDept.shelfY(r,l[0].s),arr=[],tot=0;
  l.forEach(function(i){var m=spDept.model(i.mt);if(!m)return;var W=new THREE.Group();if(!alongX)m.rotation.y=Math.PI/2;W.add(m);if(i.ry)W.rotation.y+=i.ry*Math.PI/180;
   var z=new THREE.Box3().setFromObject(W).getSize(new THREE.Vector3()),s=Math.min(fh/z.y,fd/(alongX?z.z:z.x),1.6)*(i.sc||1),w=(alongX?z.x:z.z)*s;arr.push({i:i,W:W,s:s,w:w});tot+=w+.012});
  var f=Math.min(1,(Lg-.1)/Math.max(tot,.01)),cur=(alongX?r.x:r.z)-Lg/2+.06;
  arr.forEach(function(a){var s=a.s*f,w=a.w*f;a.W.scale.setScalar(s);var b=new THREE.Box3().setFromObject(a.W),c=cur+w/2,y=y0-b.min.y;cur+=w+.012*f;
   a.W.position.set(alongX?c:r.x,y,alongX?r.z:c);a.W.userData={code:a.i.c,s:s,y0:y,w:w};map[a.i.c]=a.W})});return map}
function paint(){pgen++;clear(items);items.userData.blink=null;var PKM=packRack();
 SP_ITEMS.forEach(function(i){if(!i.mt)return;var W=PKM[i.c]||modelFor(i);if(!W)return;items.add(W);
  if(sel&&sel.c===i.c){var mats=[];W.traverse(function(n){if(n.isMesh&&n.material&&n.material.emissive)mats.push(n.material)});
   var halo=(i.dw||i.wl)?null:new THREE.Mesh(new THREE.CircleGeometry(Math.max(.2,W.userData.w*.65),32),new THREE.MeshBasicMaterial({color:0xffd400,transparent:true,opacity:.5,depthWrite:false,depthTest:false}));if(halo){halo.rotation.x=-Math.PI/2;halo.position.set(W.position.x,W.userData.y0+.015,W.position.z);halo.renderOrder=7;items.add(halo)}
   items.userData.blink={g:W,s:W.userData.s,mats:mats,halo:halo}}});
 // แสดงเฉพาะหมุดตำแหน่ง (ไม่มีโมเดลจำลองกล่อง/ชิ้นอะไหล่)
 SP_ITEMS.forEach(function(i){if(!(sel&&sel.c===i.c&&i.pos&&i.pos.length===3)||i.dw)return;var p=slotPos(i),isSel=true,col=0x2563eb;
  var st2=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.34,6),new THREE.MeshBasicMaterial({color:0x334155}));st2.position.set(p.x,p.y+p.bh/2+.2,p.z);items.add(st2);
  var dot=new THREE.Mesh(new THREE.SphereGeometry(isSel?.09:.065,14,10),new THREE.MeshBasicMaterial({color:col}));dot.position.set(p.x,p.y+p.bh/2+.4,p.z);dot.userData.code=i.c;items.add(dot)})}
// โมเดลคลังจริง (.glb) ถ้าตั้งค่าไว้
if(SP_MODEL&&SP_MODEL.url){gltf().then(function(){new THREE.GLTFLoader().load(SP_MODEL.url,function(g){var m=g.scene;m.scale.setScalar(SP_MODEL.scale||1);m.position.set(SP_MODEL.x||0,SP_MODEL.y||0,SP_MODEL.z||0);modelG.add(m);
  fl.visible=false;DEPT.visible=false;PICKS=[fl].concat(modelG.children)},undefined,function(){infoEl.insertAdjacentHTML("beforeend",'<div style="color:#dc2626;font-size:12px">โหลดโมเดล 3D ไม่สำเร็จ ('+esc(SP_MODEL.url)+')</div>')})}).catch(function(){})}
// ---- ข้อมูล + เส้นทาง ----
function canEdit(){return !!(window.spIsAdmin&&spIsAdmin())}
function head(i){var s=spStatus(i);return (i.img?'<img src="'+i.img+'" alt="" style="float:right;width:72px;height:72px;object-fit:cover;border-radius:10px;border:1px solid #cbd5e1;margin:0 0 6px 10px">':'')+'<b>'+esc(i.n)+'</b> ('+esc(i.c)+') <span class="tg s-'+s+'" style="margin-left:4px">'+SP_TXT[s]+'</span><br>คงเหลือ '+i.q+' '+esc(i.u||"")+' (ขั้นต่ำ '+i.min+')<br>ตำแหน่ง: '+esc(spLoc(i))+'<br>ใช้กับ: '+(i.m||[]).map(esc).join(", ")+(i.rep?'<br>หมายเหตุ: '+esc(i.rep):'')}
function drawRoute(pts){clear(routeG);if(!pts)return;
 for(var k=0;k<pts.length-1;k++){var a=pts[k],b=pts[k+1],L=Math.hypot(b[0]-a[0],b[2]-a[2]);if(L<.01)continue;
  var m=new THREE.Mesh(new THREE.BoxGeometry(.12,.03,L+.12),new THREE.MeshBasicMaterial({color:0xef1c1c}));m.position.set((a[0]+b[0])/2,.17,(a[2]+b[2])/2);m.rotation.y=Math.atan2(b[0]-a[0],b[2]-a[2]);routeG.add(m)}}
// ไฮไลต์ตู้/ชั้น/โต๊ะที่อะไหล่อยู่ ให้กระพริบ
function hlTarget(i,p){var best=null,ba=1e9;function tryR(o,pad){if(!o||!o.w||!o.d||!o.h)return;if(Math.abs(p.x-o.x)<=o.w/2+pad&&Math.abs(p.z-o.z)<=o.d/2+pad&&p.y<=o.h+.35){var a=o.w*o.d;if(a<ba){ba=a;best=o}}}
 var r=SP_RACKS[i.r];if(!(i.pos&&i.pos.length===3)&&r)return r;
 Object.keys(SP_RACKS).forEach(function(k){tryR(SP_RACKS[k],.12)});
 (spDept.furn||[]).forEach(function(f){if(f.t==="belt"||f.t==="stool"||f.t==="column")return;tryR(f,.12)});return best}
function drawerBox(i){var f=spDept.furnById(i.dw[0]);if(!f)return null;var P=spDept.drawerPos(f,i.dw[1],i.dw[2]);return{f:f,P:P}}
function highlight(i,p){clear(hlG);hlG.userData.fill=null;hlG.userData.band=null;hlG.userData.base=.03;hlG.userData.amp=.09;
 if(i.dw){var D_=drawerBox(i);if(!D_)return;var P=D_.P,g0=new THREE.BoxGeometry(P.cw*.98,P.ch*.98,.05),m0=new THREE.Mesh(g0,new THREE.MeshBasicMaterial({color:0xff2d2d,transparent:true,opacity:.4,depthWrite:false,depthTest:false}));
  m0.position.set(P.x,P.y,P.z+P.nz*.03);m0.renderOrder=8;var e0=new THREE.LineSegments(new THREE.EdgesGeometry(g0),new THREE.LineBasicMaterial({color:0xff0000,depthTest:false}));e0.position.copy(m0.position);e0.renderOrder=9;
  var fg=new THREE.BoxGeometry(D_.f.w+.06,D_.f.h+.06,D_.f.d+.06),eo=new THREE.LineSegments(new THREE.EdgesGeometry(fg),new THREE.LineBasicMaterial({color:0xff9500}));eo.position.set(D_.f.x,(D_.f.h+.06)/2,D_.f.z);eo.renderOrder=6;
  if(P.nz<0){m0.position.z=P.z-.03;e0.position.z=P.z-.03}hlG.add(m0,e0,eo);hlG.userData.base=.1;hlG.userData.amp=.2;hlG.userData.fill=m0;hlG.userData.edge=e0;return}
 var rk=SP_RACKS[i.r];if(rk&&i.s>0){var th=spDept.rackTheta(rk),L=Math.max(rk.w,rk.d),S=Math.min(rk.w,rk.d),sp=rk.h/rk.n,y0=spDept.shelfY(rk,i.s),hg=new THREE.Group();hg.position.set(rk.x,0,rk.z);hg.rotation.y=th;
  var bg=new THREE.BoxGeometry(L-.01,sp*.8,.03),bm=new THREE.Mesh(bg,new THREE.MeshBasicMaterial({color:0xff4d4d,transparent:true,opacity:.1,depthWrite:false,depthTest:false}));bm.position.set(0,y0+sp*.4,S/2+.03);bm.renderOrder=8;
  var be=new THREE.LineSegments(new THREE.EdgesGeometry(bg),new THREE.LineBasicMaterial({color:0xff0000,depthTest:false}));be.position.copy(bm.position);be.renderOrder=9;hg.add(bm,be);hlG.add(hg);hlG.userData.band={m:bm,e:be}}
 var o=hlTarget(i,p);if(!o)return;var w=o.w+.06,d=o.d+.06,h=o.h+.06,g=new THREE.BoxGeometry(w,h,d);
 var m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xffc400,transparent:true,opacity:.3,depthWrite:false}));m.position.set(o.x,h/2,o.z);m.renderOrder=5;
 var e=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0xff9500}));e.position.copy(m.position);e.renderOrder=6;hlG.add(m,e);hlG.userData.fill=m;hlG.userData.edge=e}
function show(i){if(EDR){var rv=EDR;EDR=null;rv()}spDept.xray(false);sel=i;paint();drawRoute(null);clear(hlG);hlG.userData.fill=null;if(mark){sc.remove(mark);mark=null}
 var p=slotPos(i),r=SP_RACKS[i.r],h=head(i),btn="";
 if(canEdit())var RYO=[0,45,90,135,180,225,270,315].map(function(d){return '<option value="'+d+'"'+(d===(i.ry||0)?' selected':'')+'>'+d+'°</option>'}).join("");
 btn='<div id="ed" style="margin-top:8px;padding:9px;border:1px solid #cfd8ea;border-radius:10px;background:#f8fafc"><label style="font-size:12px;color:#475569;font-weight:600">✏️ แก้ไขโมเดล 3D ของอะไหล่นี้</label><select id="mt-q" style="width:100%;padding:7px 9px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;margin-top:4px">'+spModelOpts(i.mt||"",!!i.wl)+'</select>'
  +'<div style="display:flex;align-items:center;gap:6px;margin-top:8px"><span style="font-size:12px;color:#475569">ขนาด</span><button type="button" class="btn" id="sc-m" style="padding:3px 10px">−</button><input type="range" id="sc-q" min="30" max="300" step="5" value="'+Math.round((i.sc||1)*100)+'" style="flex:1;min-width:60px"><button type="button" class="btn" id="sc-p" style="padding:3px 10px">+</button><b id="sc-v" style="font-size:12px;min-width:40px;text-align:right">'+Math.round((i.sc||1)*100)+'%</b></div>'
  +'<div style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap"><span style="font-size:12px;color:#475569">หมุน</span><select id="ry-q" style="padding:5px 8px;border:1px solid #cbd5e1;border-radius:8px;font:inherit">'+RYO+'</select><span style="flex:1"></span><button type="button" class="btn p" id="ed-s" style="padding:6px 12px">💾 บันทึก</button><button type="button" class="btn" id="ed-c" style="padding:6px 10px">↩ ยกเลิก</button></div><div id="ed-m" style="font-size:12px;margin-top:5px;min-height:15px"></div></div><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn p" data-a="mv" style="padding:6px 10px">📌 '+(p?'ย้ายตำแหน่ง':'วางตำแหน่ง')+'</button>'+(i.pos?'<button class="btn" data-a="rm" style="padding:6px 10px">🗑 ลบหมุด</button>':'')+'</div>';
 infoEl.innerHTML=h+btn;wire(i);
 if(!p){infoEl.insertAdjacentHTML("afterbegin",'<div style="color:#dc2626;margin-bottom:4px">ยังไม่มีตำแหน่งในโมเดล 3D'+(i.r?' (ชั้นวาง '+esc(i.r)+' ไม่มีในผัง)':'')+'</div>');return}
 highlight(i,p);
 var tgz=p.z,tgx=p.x,DB=i.dw?drawerBox(i):null;if(DB){tgz=DB.f.z+DB.P.nz*(DB.f.d/2+.6*spDept.KD);tgx=DB.P.x}
 var pts=spDept.pathTo([tgx,tgz],SP_RACKS);drawRoute(pts);
 if(DB){infoEl.insertAdjacentHTML("beforeend",diagram(DB.f,i.dw));focus(DB.f.x,DB.P.y,DB.f.z,1.9*spDept.KD,DB.P.nz<0?Math.PI:0,.28)}
 else if(r)focusRack(i.r,i.s);else focus(p.x,p.y*.6,p.z,3.4*spDept.KD,null,.7);
 if(!i.dw)mark=new THREE.Mesh(new THREE.ConeGeometry(.17,.38,16),new THREE.MeshBasicMaterial({color:0xf59e0b}));if(mark){mark.rotation.x=Math.PI;mark.userData.y0=p.y+p.bh/2+.55;mark.position.set(p.x,mark.userData.y0,p.z);sc.add(mark)}
 if(innerWidth<1100)host.scrollIntoView({behavior:"smooth",block:"center"})}
function focusRack(k,lv){var r=SP_RACKS[k];if(!r)return;spDept.xray(false);var L=Math.max(r.w,r.d);var nm=(spDept.rackNames&&spDept.rackNames[k])||"",cb=/ตู้/.test(nm);spDept.xray(true,k);focus(r.x,spDept.shelfY(r,lv||1)+.2,r.z,(cb?(r.h<1.4?Math.max(2.6,L*1.1):4.2):Math.max(3,Math.min(L,5)*.85))*spDept.KD,spDept.rackTheta(r),cb?(r.h<1.4?.6:.72):.4)}
function diagram(f,dw){var cells="";for(var r=1;r<=f.rows;r++)for(var c=1;c<=f.cols;c++){var on=c===dw[1]&&r===dw[2];cells+='<i style="display:block;height:11px;border:1px solid '+(on?'#dc2626':'#b6c3cf')+';background:'+(on?'#ef4444':'#eef3f7')+';border-radius:2px;'+(on?'animation:spb .6s infinite alternate':'')+'"></i>'}
 return '<style>@keyframes spb{to{opacity:.35}}</style><div style="margin-top:8px;font-size:12px;color:#475569"><b>🗄 '+esc(f.n)+'</b> — แถว '+dw[1]+' (นับจากซ้าย มองจากด้านหน้า) · ชั้น '+dw[2]+' (นับจากบน)<div style="display:grid;grid-template-columns:repeat('+f.cols+',1fr);gap:2px;width:170px;margin-top:4px;padding:4px;background:#dfe7ee;border-radius:6px">'+cells+'</div></div>'}
var EDR=null;
function wire(i){var m=infoEl.querySelector('[data-a=mv]'),d=infoEl.querySelector('[data-a=rm]'),mq=infoEl.querySelector('#mt-q');
 if(mq){var og={mt:i.mt,sc:i.sc,ry:i.ry},sq=infoEl.querySelector('#sc-q'),sv=infoEl.querySelector('#sc-v'),rq=infoEl.querySelector('#ry-q'),sb=infoEl.querySelector('#ed-s'),cb=infoEl.querySelector('#ed-c'),em=infoEl.querySelector('#ed-m');
  var dirty=function(){return (i.mt||"")!==(og.mt||"")||(i.sc||1)!==(og.sc||1)||(i.ry||0)!==(og.ry||0)};
  var upd=function(msg){sv.textContent=Math.round((i.sc||1)*100)+'%';var d=dirty();sb.style.boxShadow=d?'0 0 0 3px rgba(37,99,235,.3)':'';em.innerHTML=msg||(d?'<span style="color:#d97706">มีการแก้ไขที่ยังไม่บันทึก — กด 💾 บันทึก เมื่อทำเสร็จ</span>':'');paint()};
  var setSc=function(v){v=Math.max(.3,Math.min(3,v));if(Math.abs(v-1)<.001)delete i.sc;else i.sc=+v.toFixed(2);sq.value=Math.round((i.sc||1)*100);upd()};
  mq.onchange=function(){if(mq.value)i.mt=mq.value;else delete i.mt;upd()};
  sq.oninput=function(){setSc(sq.value/100)};infoEl.querySelector('#sc-m').onclick=function(){setSc((i.sc||1)-.1)};infoEl.querySelector('#sc-p').onclick=function(){setSc((i.sc||1)+.1)};
  rq.onchange=function(){if(+rq.value)i.ry=+rq.value;else delete i.ry;upd()};
  var rest=function(){if(og.mt)i.mt=og.mt;else delete i.mt;if(og.sc)i.sc=og.sc;else delete i.sc;if(og.ry)i.ry=og.ry;else delete i.ry};
  sb.onclick=function(){var l=SP_ITEMS.slice();spItemsSave(l);og={mt:i.mt,sc:i.sc,ry:i.ry};upd('<span style="color:#16a34a">✅ บันทึกแล้ว</span>');o.onChange&&o.onChange()};
  cb.onclick=function(){rest();mq.value=i.mt||"";sq.value=Math.round((i.sc||1)*100);rq.value=String(i.ry||0);upd()};
  EDR=function(){if(dirty()){rest();paint()}}}
 if(m)m.onclick=function(){place(true,i)};
 if(d)d.onclick=function(){if(!confirm("ลบตำแหน่งที่ปักหมุดของ "+i.n+" ?"))return;var l=SP_ITEMS.slice();delete i.pos;delete i.at;delete i.spot;delete i.dw;EDR=null;spItemsSave(l);o.onChange&&o.onChange();show(i)}}
// ---- โหมดวางอะไหล่ ----
var placing=false,target=null,hit=null;
function place(on,item){placing=!!on;target=item||null;hit=null;ring.visible=false;host.style.cursor=on?"crosshair":"";
 if(on)infoEl.innerHTML='<b>📌 โหมดวางอะไหล่</b>'+(item?' — '+esc(item.n):'')+'<br>คลิกจุดที่ต้องการในโมเดล (พื้น · โต๊ะ · บนตู้ · ชั้นเชล) <button class="btn" id="pl-x" style="padding:4px 10px;margin-left:6px">ยกเลิก</button>';
 var x=document.getElementById("pl-x");if(x)x.onclick=function(){place(false);infoEl.innerHTML="เลือกอะไหล่จากรายการเพื่อดูตำแหน่งและเส้นทาง"};
 if(plb){plb.classList.toggle("on",placing);plb.textContent=placing?"✖ ออกจากโหมดวางอะไหล่":"📌 วางอะไหล่ในโมเดล"}}
function ray(e){var rc=host.getBoundingClientRect(),v=new THREE.Vector2((e.clientX-rc.left)/rc.width*2-1,-((e.clientY-rc.top)/rc.height*2-1)),r=new THREE.Raycaster();r.setFromCamera(v,cam);return r}
function surfHit(e){var hs=ray(e).intersectObjects(PICKS,true);
 for(var k=0;k<hs.length;k++){var h=hs[k],ob=h.object,u=ob.userData;if(!u.surf)continue;
  if(u.wall){if(!h.face)continue;var wn=h.face.normal.clone().transformDirection(ob.matrixWorld);if(Math.abs(wn.y)>.3)continue;var ox=(B[0]+B[2])/2-h.point.x,oz=(B[1]+B[3])/2-h.point.z,ed=.3,per=h.point.x<B[0]+ed||h.point.x>B[2]-ed||h.point.z<B[1]+ed||h.point.z>B[3]-ed;
   if(per&&wn.x*ox+wn.z*oz<0)continue;var ax=Math.abs(wn.x)>Math.abs(wn.z);return{x:h.point.x,y:h.point.y,z:h.point.z,surf:"ผนัง",wall:true,wl:[ax?(wn.x>0?1:-1):0,ax?0:(wn.z>0?1:-1)]}}
  if(u.dw){var f_=spDept.furnById(u.dw[0]),P_=spDept.drawerPos(f_,u.dw[1],u.dw[2]);return{x:P_.x,y:P_.y,z:P_.z,surf:u.surf,dw:u.dw}}if(h.face){var n=h.face.normal.clone().transformDirection(ob.matrixWorld);if(n.y<.5)continue}
  return{x:h.point.x,y:h.point.y,z:h.point.z,surf:u.surf,rack:u.rack,level:u.level,dwf:u.dwf}}return null}
function form(h){
 var DF=spDept.furnById(h.dw?h.dw[0]:h.dwf),CH=h.dw||null;if(DF)focus(DF.x,DF.h*.5,DF.z,1.9*spDept.KD,DF.face===-1?Math.PI:0,.28);
 var IS="width:100%;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font:inherit;box-sizing:border-box",LB="font-size:12px;color:#475569;margin:2px 0 -2px;display:block";
 function buildOpts(mc){return '<option value="">➕ อะไหล่ใหม่ (กรอกด้านล่าง)</option>'+SP_ITEMS.map(function(q,k){return{q:q,k:k}}).filter(function(z){return !mc||(z.q.m||[]).indexOf(mc)>=0}).reverse().map(function(z){var q=z.q;return '<option value="'+z.k+'"'+(target&&target===q?' selected':'')+'>'+esc(q.c)+' · '+esc(q.n)+(q.r||q.pos?' — '+esc(spLocShort(q)):'')+'</option>'}).join("")}
 var opts=buildOpts("");
 infoEl.innerHTML='<b>📌 วางอะไหล่ที่จุดนี้</b> <small style="color:#64748b">('+esc(h.surf)+' · x '+h.x.toFixed(2)+', z '+h.z.toFixed(2)+')</small>'
  +'<div style="display:grid;gap:8px;margin-top:8px"><label style="'+LB+'">🏭 หมวดเครื่องจักร <small>(เลือกเพื่อกรองรายการ / ใช้กับอะไหล่ใหม่)</small></label><select id="pl-mc" style="'+IS+'"><option value="">ทุกเครื่องจักร</option>'+SP_MACHINES.map(function(m){return '<option value="'+esc(m)+'">'+esc(m)+'</option>'}).join("")+'</select><label style="'+LB+'">เลือกอะไหล่ (ที่เพิ่มล่าสุดอยู่บนสุด)</label><select id="pl-it" style="'+IS+'">'+opts+'</select>'
  +'<div id="pl-new" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><label style="'+LB+'">รหัสอะไหล่ <small>(ไม่มีเว้นว่างได้)</small></label><input id="pl-c" style="'+IS+'" placeholder="เว้นว่าง = NC-xxxx"></div><div><label style="'+LB+'">ชื่ออะไหล่ *</label><input id="pl-n" style="'+IS+'" placeholder="ชื่ออะไหล่"></div>'
  +'<div><label style="'+LB+'">คงเหลือ</label><input id="pl-q" type="number" min="0" value="1" style="'+IS+'"></div><div><label style="'+LB+'">ขั้นต่ำ</label><input id="pl-m" type="number" min="0" value="0" style="'+IS+'"></div><div style="grid-column:1/3"><label style="'+LB+'">หน่วย</label><input id="pl-u" value="ชิ้น" style="'+IS+'"></div></div>'
  +'<label style="'+LB+'">📷 รูปอะไหล่ (ใช้รูปเดียวกับหน้า "จัดการระบบ" — ไม่บังคับ)</label><div style="display:flex;gap:10px;align-items:center"><img id="pl-ip" alt="" style="display:none;width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1"><input id="pl-img" type="file" accept="image/*" style="flex:1;min-width:0"></div>'
  +(DF?'<div><label style="'+LB+'">🗄 เลือกลิ้นชักที่เก็บ (แถวนับจากซ้าย · ชั้นนับจากบน) <small>— ไม่เลือก = วางบนตู้</small></label><div id="pl-dw" style="display:grid;grid-template-columns:repeat('+DF.cols+',1fr);gap:3px;max-width:240px;margin-top:4px;padding:5px;background:#dfe7ee;border-radius:8px"></div><div id="pl-dwt" style="font-size:12px;margin-top:3px;color:#dc2626"></div></div>':'')
  +'<div><label style="'+LB+'">🧩 โมเดล 3D ของอะไหล่ <small>(แสดงตรงตำแหน่ง และกะพริบเมื่อค้นหา)</small></label><select id="pl-mt" style="'+IS+'">'+spModelOpts("",!!h.wall)+'</select></div>'
  +'<div><label style="'+LB+'">🔄 หมุนโมเดล</label><select id="pl-ry" style="'+IS+'"><option value="0">0° (ตามแนวชั้น/โต๊ะ)</option><option value="90">หมุน 90°</option><option value="180">หมุน 180°</option><option value="270">หมุน 270°</option></select></div>'
  +'<div id="pl-e" style="color:#dc2626;font-size:12px"></div><div style="display:flex;gap:6px"><button class="btn p" id="pl-ok" style="padding:7px 14px">บันทึกตำแหน่ง</button><button class="btn" id="pl-no" style="padding:7px 12px">ยกเลิก</button></div></div>';
 if(DF){var G=document.getElementById("pl-dw"),T=document.getElementById("pl-dwt");(function dr(){var x="";for(var r=1;r<=DF.rows;r++)for(var c=1;c<=DF.cols;c++){var on=CH&&CH[1]===c&&CH[2]===r;x+='<button type="button" data-c="'+c+'" data-r="'+r+'" title="แถว '+c+' ชั้น '+r+'" style="height:18px;padding:0;border:1px solid '+(on?'#dc2626':'#9fb0bf')+';background:'+(on?'#ef4444':'#f4f7fa')+';border-radius:3px;cursor:pointer"></button>'}
  G.innerHTML=x;T.textContent=CH?"เลือกแล้ว: แถว "+CH[1]+" ชั้น "+CH[2]:"";Array.prototype.forEach.call(G.children,function(b){b.onclick=function(){var v=[DF.id,+b.dataset.c,+b.dataset.r];CH=CH&&CH[1]===v[1]&&CH[2]===v[2]?null:v;dr()}})})()}
 if(h.rack)focusRack(h.rack,h.level);
 var sel_=document.getElementById("pl-it"),nw=document.getElementById("pl-new"),mcs=document.getElementById("pl-mc");
 var mts=document.getElementById("pl-mt"),mtTouched=false;mts.onchange=function(){mtTouched=true};
 function pim(){var ip=document.getElementById("pl-ip"),q=sel_.value===""?null:SP_ITEMS[+sel_.value];if(!mtTouched||(q&&q.mt))mts.value=q?(q.mt||spModelGuess(q.n)):spModelGuess((document.getElementById("pl-n")||{}).value);if(h.wall&&SP_WALLM.indexOf(mts.value)<0)mts.value="hbelt";document.getElementById("pl-ry").value=String(q&&q.ry||0);if(q&&q.mt)mtTouched=false;if(q&&q.img){ip.src=q.img;ip.style.display="block"}else ip.style.display="none"}
 mcs.onchange=function(){sel_.innerHTML=buildOpts(mcs.value);sel_.value="";sel_.onchange()};
 sel_.onchange=function(){nw.style.display=sel_.value===""?"grid":"none";pim()};sel_.onchange();
 document.getElementById("pl-img").onchange=function(){var f=this.files[0],ip=document.getElementById("pl-ip");if(f){ip.src=URL.createObjectURL(f);ip.style.display="block"}else pim()};
 document.getElementById("pl-n").oninput=function(){if(!mtTouched&&sel_.value===""){mts.value=spModelGuess(this.value);if(h.wall&&SP_WALLM.indexOf(mts.value)<0)mts.value="hbelt"}};
 document.getElementById("pl-no").onclick=function(){place(false);infoEl.innerHTML="เลือกอะไหล่จากรายการเพื่อดูตำแหน่งและเส้นทาง"};
 document.getElementById("pl-ok").onclick=function(){var l=SP_ITEMS.slice(),it,err=document.getElementById("pl-e");
  if(sel_.value===""){var c=document.getElementById("pl-c").value.trim(),n=document.getElementById("pl-n").value.trim(),q=parseInt(document.getElementById("pl-q").value,10),m=parseInt(document.getElementById("pl-m").value,10);
   if(!n){err.textContent="กรอกชื่ออะไหล่";return}if(!c){var mx=0;l.forEach(function(x){var mm=/^NC-(\d+)$/i.exec(String(x.c));if(mm)mx=Math.max(mx,+mm[1])});c="NC-"+("000"+(mx+1)).slice(-4)}if(l.some(function(x){return x.c.toLowerCase()===c.toLowerCase()})){err.textContent="รหัสนี้มีอยู่แล้ว — เลือกจากรายการด้านบน";return}
   it={c:c,n:n,k:"",m:mcs.value?[mcs.value]:[],q:q>=0?q:0,min:m>=0?m:0,u:document.getElementById("pl-u").value.trim()||"ชิ้น",r:"",s:0};l.push(it)}
  else it=l[+sel_.value];
  var fi=document.getElementById("pl-img").files[0],fin=function(){EDR=null;spItemsSave(l);place(false);o.onChange&&o.onChange();show(it);if(o.onSelect)o.onSelect(it)};
  var ry_=+document.getElementById("pl-ry").value;if(ry_)it.ry=ry_;else delete it.ry;var mv_=mts.value;if(mv_)it.mt=mv_;else delete it.mt;it.pos=[+h.x.toFixed(3),+h.y.toFixed(3),+h.z.toFixed(3)];it.gv=2;it.spot=true;it.at=h.surf;if(h.wall){it.wl=h.wl;delete it.ry}else delete it.wl;
  if(CH){var P_=spDept.drawerPos(DF,CH[1],CH[2]);it.pos=[+P_.x.toFixed(3),+P_.y.toFixed(3),+P_.z.toFixed(3)];it.at="ตู้ลิ้นชัก แถว "+CH[1]+" ชั้น "+CH[2];it.dw=CH;it.r="";it.s=0}else{delete it.dw;if(h.rack){it.r=h.rack;it.s=h.level}else{it.r="";it.s=0}}
  if(fi)spResize(fi,function(d){if(!d)return fin();spUploadImg(d,it.c,function(u){it.img=u||d;fin()})});else fin()}}
// ---- กล้อง ----
var ang=.08,el=1.05,dist=span*1.25,horiz=false,drag=false,lx=0,ly=0,pd={},moved=0,PICKQ=new URLSearchParams(location.search).get("pick");
var ty=0,FOC=null,tx=cx,tz=cz,walk=false,wx=DOOR[0],wz=DOOR[1]-.8,wyaw=0,wpit=-.05,keys={},COL=spDept.colliders(SP_RACKS),RAD=.24,last=Date.now(),BTN={};
function blocked(x,z){for(var k=0;k<COL.length;k++){var c=COL[k],qx=Math.max(c[0],Math.min(c[2],x)),qz=Math.max(c[1],Math.min(c[3],z));if(Math.hypot(x-qx,z-qz)<RAD)return true}return false}
function step(dx,dz){var nx=wx+dx,nz=wz+dz;if(!blocked(nx,wz))wx=nx;if(!blocked(wx,nz))wz=nz;wx=Math.max(B[0]-.5,Math.min(B[2]+.5,wx));wz=Math.max(B[1]-.5,Math.min(B[3]+1.2,wz))}
function walkTick(){var now=Date.now(),dt=Math.min(.1,(now-last)/1000);last=now;if(!walk)return;
 var f=(keys.w||keys.ArrowUp||BTN.f?1:0)-(keys.s||keys.ArrowDown||BTN.b?1:0),r=(keys.d||BTN.r?1:0)-(keys.a||BTN.l?1:0),t=(keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0)+(BTN.tr?1:0)-(BTN.tl?1:0);
 wyaw+=t*1.8*dt;var sp=(keys.Shift?4.2:2.0)*dt;
 if(f||r){var fx=Math.sin(wyaw),fz=-Math.cos(wyaw),rx=Math.cos(wyaw),rz=Math.sin(wyaw),n=Math.hypot(f,r);step((fx*f+rx*r)/n*sp,(fz*f+rz*r)/n*sp)}}
function setWalk(on){walk=!!on;if(walk){var m=document.getElementById("wkb");wx=DOOR[0];wz=DOOR[1]-.8;wyaw=0;wpit=-.05}
 if(wkb)wkb.textContent=walk?"🧭 กลับมุมสูง":"🚶 เดินในโมเดล";wkh.style.display=walk?"block":"none";wkp.style.display=walk?"flex":"none";host.style.cursor=walk?"grab":""}
if(getComputedStyle(host).position==="static")host.style.position="relative";
var wkb=document.createElement("button"),wkh=document.createElement("div"),wkp=document.createElement("div");
wkb.className="btn";wkb.style.cssText="position:absolute;left:10px;top:10px;z-index:3;padding:7px 14px";wkb.textContent="🚶 เดินในโมเดล";wkb.onclick=function(){setWalk(!walk)};
wkh.style.cssText="display:none;position:absolute;left:10px;bottom:10px;z-index:3;background:rgba(11,33,80,.78);color:#fff;font-size:12px;padding:6px 10px;border-radius:8px;pointer-events:none";wkh.textContent="W A S D / ลูกศร = เดิน · ลากเมาส์ = มองรอบ · Shift = วิ่ง · เลื่อนล้อ = เดินหน้า/ถอย";
wkp.style.cssText="display:none;position:absolute;right:10px;bottom:10px;z-index:3;flex-direction:column;align-items:center;gap:4px;touch-action:none";
function pad(lab,key){var b=document.createElement("button");b.textContent=lab;b.style.cssText="width:46px;height:42px;border:0;border-radius:10px;background:rgba(11,33,80,.8);color:#fff;font-size:18px;touch-action:none";
 var on=function(e){e.preventDefault();e.stopPropagation();BTN[key]=true},off=function(e){BTN[key]=false};b.addEventListener("pointerdown",on);["pointerup","pointerleave","pointercancel"].forEach(function(n){b.addEventListener(n,off)});return b}
(function(){var r1=document.createElement("div"),r2=document.createElement("div");r1.style.cssText=r2.style.cssText="display:flex;gap:4px";
 r1.appendChild(pad("↶","tl"));r1.appendChild(pad("▲","f"));r1.appendChild(pad("↷","tr"));r2.appendChild(pad("◀","l"));r2.appendChild(pad("▼","b"));r2.appendChild(pad("▶","r"));wkp.appendChild(r1);wkp.appendChild(r2)})();
function ob(txt,css,fn){var b=document.createElement("button");b.className="btn";b.style.cssText="position:absolute;z-index:3;padding:7px 12px;"+css;b.textContent=txt;b.onclick=fn;host.appendChild(b);return b}
var plb=ob("📌 วางอะไหล่ในโมเดล","left:10px;top:52px",function(){if(!canEdit()){infoEl.innerHTML='<span style="color:#dc2626">การวางอะไหล่ทำได้เฉพาะบัญชี ผู้ดูแลระบบเท่านั้น</span>';return}if(walk)setWalk(false);place(!placing)});plb.id="plbtn";
var vwb=ob("🔄 มุมมอง","right:56px;top:10px",function(){if(walk)setWalk(false);fitView(!horiz)});
var fsb=ob("⛶","right:10px;top:10px;padding:7px 11px",function(){var el=host.parentNode;if(document.fullscreenElement){document.exitFullscreen()}else if(el.requestFullscreen){el.requestFullscreen()}else{el.classList.toggle("spfs")}});fsb.title="เต็มจอ";
var stx=document.createElement("style");stx.textContent=".spfs{position:fixed!important;inset:0;z-index:999;background:#fff;overflow:auto}";document.head.appendChild(stx);
var panMode=false,PK={},FREE=null;
var panb=ob("✋ เลื่อน","left:10px;top:10px",function(){panMode=!panMode;panb.textContent=panMode?"🔄 หมุน":"✋ เลื่อน";panb.title=panMode?"ตอนนี้ลากเมาส์เพื่อเลื่อนซ้าย-ขวา (กดเพื่อกลับไปหมุน)":"กดเพื่อสลับเป็นโหมดเลื่อนซ้าย-ขวา";host.style.cursor=panMode?"grab":""});
panb.title="กดเพื่อสลับเป็นโหมดเลื่อนซ้าย-ขวา";plb.style.top="52px";
function pbtn(lab,css,key){var b=document.createElement("button");b.textContent=lab;b.style.cssText="position:absolute;z-index:3;width:46px;height:42px;border:0;border-radius:10px;background:rgba(11,33,80,.78);color:#fff;font-size:18px;touch-action:none;"+css;
 var on=function(e){e.preventDefault();e.stopPropagation();PK[key]=true},off=function(){PK[key]=false};b.addEventListener("pointerdown",on);["pointerup","pointerleave","pointercancel"].forEach(function(n){b.addEventListener(n,off)});host.appendChild(b)}
pbtn("◀","left:10px;bottom:10px","l");(function(){[["＋","left:10px;bottom:62px",-6],["－","left:62px;bottom:62px",6]].forEach(function(z){var b=document.createElement("button");b.type="button";b.textContent=z[0];b.style.cssText="position:absolute;z-index:3;width:46px;height:42px;border:0;border-radius:10px;background:rgba(11,33,80,.78);color:#fff;font-size:20px;"+z[1];b.onclick=function(){FOC=null;dist=Math.max(1,Math.min(170,dist*(z[2]<0?.8:1.25)))};host.appendChild(b)})})();pbtn("▶","right:10px;bottom:10px","r");pbtn("▲","left:62px;bottom:10px","u");pbtn("▼","right:62px;bottom:10px","d");
var hint=document.createElement("div");hint.style.cssText="position:absolute;left:50%;transform:translateX(-50%);bottom:10px;z-index:3;background:rgba(11,33,80,.7);color:#fff;font-size:12px;padding:5px 10px;border-radius:8px;pointer-events:none;white-space:nowrap;max-width:calc(100% - 240px);overflow:hidden;text-overflow:ellipsis";hint.textContent="ลาก = หมุน · คลิกขวา/Shift+ลาก/นิ้วสองนิ้ว = เลื่อน · ปุ่มลูกศร = เลื่อน · Ctrl+ล้อเมาส์ / ปุ่ม ＋－ = ซูม";host.appendChild(hint);
host.addEventListener("contextmenu",function(e){e.preventDefault()});
window.addEventListener("keydown",function(e){if(true||!walk||/INPUT|SELECT|TEXTAREA/.test((e.target.tagName||"")))return;var k=e.key.length===1?e.key.toLowerCase():e.key;if(k==="Escape"){setWalk(false);return}
 if(["w","a","s","d","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Shift"].indexOf(k)>-1){keys[k]=true;e.preventDefault()}});
window.addEventListener("keyup",function(e){var k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=false});window.addEventListener("blur",function(){keys={}});
window.addEventListener("keydown",function(e){if(/INPUT|SELECT|TEXTAREA/.test((e.target.tagName||"")))return;var m={ArrowLeft:"l",ArrowRight:"r",ArrowUp:"u",ArrowDown:"d"}[e.key];if(m){PK[m]=true;e.preventDefault()}});
window.addEventListener("keyup",function(e){var m={ArrowLeft:"l",ArrowRight:"r",ArrowUp:"u",ArrowDown:"d"}[e.key];if(m)PK[m]=false});
function panBy(dx,dy){var k=dist*.0017;tx+=Math.cos(ang)*(-dx)*k+(-Math.sin(ang))*(-dy)*k*-1;tz+=(-Math.sin(ang))*(-dx)*k+(-Math.cos(ang))*(-dy)*k*-1;tx=Math.max(B[0]-8,Math.min(B[2]+8,tx));tz=Math.max(B[1]-8,Math.min(B[3]+8,tz))}
function cp(){if(FREE){cam.position.set(FREE[0],FREE[1],FREE[2]);cam.lookAt(FREE[3],FREE[4],FREE[5]);return}if(walk){cam.position.set(wx,1.6,wz);cam.lookAt(wx+Math.sin(wyaw)*Math.cos(wpit),1.6+Math.sin(wpit),wz-Math.cos(wyaw)*Math.cos(wpit));return}
if(FOC){var nw=Date.now(),dt=Math.min(.25,(nw-(cp.t||nw))/1000);cp.t=nw;var k=1-Math.exp(-Math.max(dt,.016)*6);tx+=(FOC.x-tx)*k;tz+=(FOC.z-tz)*k;ty+=(FOC.y-ty)*k;dist+=(FOC.d-dist)*k;el+=(FOC.el-el)*k;if(FOC.a!=null){var da=FOC.a-ang;da=Math.atan2(Math.sin(da),Math.cos(da));ang+=da*k}
 if(Math.abs(FOC.x-tx)+Math.abs(FOC.z-tz)+Math.abs(FOC.d-dist)<.01)FOC=null}
 if(!FOC)cp.t=Date.now();cam.position.set(tx+dist*Math.sin(ang)*Math.cos(el),ty+dist*Math.sin(el),tz+dist*Math.cos(ang)*Math.cos(el));cam.lookAt(tx,ty,tz)}
function focus(x,y,z,d,a,e){FOC={x:x,y:y,z:z,d:d,a:a,el:e}}
function fitView(h){FOC=null;ty=0;horiz=h;var asp=host.clientWidth/Math.max(1,host.clientHeight),L=B[3]-B[1],Wd=B[2]-B[0],T=Math.tan(22.5*Math.PI/180);tx=cx;tz=cz;
 if(h){ang=1.3;el=1.0;var pr=L*Math.abs(Math.sin(ang))+Wd*Math.abs(Math.cos(ang));dist=Math.max(pr*.5/(T*asp)*1.04,Wd*2.5)}else{ang=.08;el=1.1;dist=Math.max(L*.5/T*.9*Math.min(1,.55/asp+.45),Wd*2.2)}}
fitView(host.clientWidth/Math.max(1,host.clientHeight)>.9);
host.addEventListener("pointerdown",function(e){pd[e.pointerId]=e;drag=true;lx=e.clientX;ly=e.clientY;moved=0});
window.addEventListener("pointerup",function(e){var was=pd[e.pointerId];delete pd[e.pointerId];drag=false;if(!was||moved>5||e.target!==ren.domElement)return;
 if(placing){var h=surfHit(e);if(h)form(h);return}
 if(PICKQ){var h2=surfHit(e);if(h2)infoEl.innerHTML='<b>📐 โหมดหาพิกัด</b><br>x = '+h2.x.toFixed(2)+' · y = '+h2.y.toFixed(2)+' · z = '+h2.z.toFixed(2);return}
 var hs=ray(e).intersectObjects(items.children,false).filter(function(q){return q.object.userData.code});
 if(hs.length){var it=SP_ITEMS.filter(function(q){return q.c===hs[0].object.userData.code})[0];if(it){show(it);if(o.onSelect)o.onSelect(it)}}});
window.addEventListener("pointermove",function(e){if(placing&&!pd[e.pointerId]&&e.target===ren.domElement){var h=surfHit(e);hit=h;if(h){ring.visible=true;if(h.wall){ring.rotation.set(0,Math.atan2(h.wl[0],h.wl[1]),0);ring.position.set(h.x+h.wl[0]*.03,h.y,h.z+h.wl[1]*.03)}else{ring.rotation.set(-Math.PI/2,0,0);ring.position.set(h.x,h.y+.02,h.z)}}else ring.visible=false}
 if(!pd[e.pointerId])return;var ids=Object.keys(pd);moved+=Math.abs(e.clientX-lx)+Math.abs(e.clientY-ly);
 if(ids.length===2){var q=pd[ids[0]]===pd[e.pointerId]?pd[ids[1]]:pd[ids[0]],d0=Math.hypot(pd[e.pointerId].clientX-q.clientX,pd[e.pointerId].clientY-q.clientY),d1=Math.hypot(e.clientX-q.clientX,e.clientY-q.clientY);FOC=null;dist=Math.max(1,Math.min(170,dist*d0/d1));panBy((e.clientX-lx)*.5,(e.clientY-ly)*.5)}
 else if(drag&&!walk&&(panMode||e.shiftKey||(e.buttons&2)||(e.buttons&4))){panBy(e.clientX-lx,e.clientY-ly)}
 else if(drag&&walk){wyaw+=(e.clientX-lx)*.005;wpit=Math.max(-1.2,Math.min(1.0,wpit-(e.clientY-ly)*.004))}
 else if(drag){ang-=(e.clientX-lx)*.01;el=Math.max(.12,Math.min(1.52,el+(e.clientY-ly)*.008))}pd[e.pointerId]=e;lx=e.clientX;ly=e.clientY});
host.addEventListener("wheel",function(e){if(!walk&&!e.ctrlKey&&!e.metaKey)return;e.preventDefault();if(walk){step(-Math.sin(wyaw)*e.deltaY*.004,Math.cos(wyaw)*e.deltaY*.004);return}FOC=null;dist=Math.max(1,Math.min(170,dist+e.deltaY*.03))},{passive:false});
function rs(){W=host.clientWidth;H=host.clientHeight;if(!W||!H)return;ren.setSize(W,H);cam.aspect=W/H;cam.updateProjectionMatrix()}window.addEventListener("resize",rs);if(window.ResizeObserver)new ResizeObserver(rs).observe(host);document.addEventListener("fullscreenchange",function(){setTimeout(function(){rs();fitView(horiz)},100)});
(function loop(){requestAnimationFrame(loop);walkTick();var pk=(PK.r?1:0)-(PK.l?1:0),pv=(PK.d?1:0)-(PK.u?1:0);if(pk||pv)panBy(-pk*9,-pv*9);cp();if(mark)mark.position.y=mark.userData.y0+Math.sin(Date.now()/250)*.12;var bl=items.userData.blink;if(bl){var q=.5+.5*Math.sin(Date.now()/170);bl.mats.forEach(function(m){m.emissive.setHex(0xff6a00);m.emissiveIntensity=.05+1.0*q});bl.g.scale.setScalar(bl.s*(1+.07*q));if(bl.halo)bl.halo.material.opacity=.08+.22*q}var hf=hlG.userData.fill;if(hf){var ph=Math.sin(Date.now()/260),qq=.5+.5*ph,bs=hlG.userData.base==null?.03:hlG.userData.base,am=hlG.userData.amp==null?.09:hlG.userData.amp;hf.material.opacity=bs+am*qq;var ed=hlG.userData.edge;ed.material.transparent=true;ed.material.opacity=.2+.4*qq;var bd=hlG.userData.band;if(bd){bd.m.material.opacity=.07+.16*qq;bd.e.material.transparent=true;bd.e.material.opacity=.25+.4*qq}}ren.render(sc,cam)})();
paint();
var API={cam:cam,show:show,paint:paint,place:place,canEdit:canEdit,walk:setWalk,setCam:function(a){FREE=a},shot:function(){cp();ren.render(sc,cam);return ren.domElement.toDataURL('image/jpeg',.93)},ren:ren,B:B,fit:fitView,view:function(a,e,d,x,z){if(a!=null)ang=a;if(e!=null)el=e;if(d!=null)dist=d;if(x!=null){tx=x;tz=z}},scene:sc,THREE:THREE};window.spSceneApi=API;return API};
