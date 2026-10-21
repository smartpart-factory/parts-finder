/* ===== โมเดล 3 มิติแผนก ชั้น 1 (ต่อตามลูกศรทางเดิน: ทางเข้าอยู่ล่างสุดของหน้า 1 → เดินขึ้นไปหน้า 2 → หน้า 3 อยู่เหนือสุด) =====
 หน่วยเป็นเมตร: x = ซ้าย→ขวา, z = เหนือ→ใต้ (z มาก = ใต้) ประมาณจากสัดส่วนในภาพ (โต๊ะยาว ~1.6 ม.) แก้ตัวเลขได้โดยตรง
 walls=[x1,z1,x2,z2,ช่องประตู[[z1,z2]],ความสูง]  floors=[x1,z1,x2,z2,สี]  doors=[x,z1,z2,ชื่อ]  labels=[ข้อความ,x,y,z,สี,ขนาด]
 furn: t=ชนิด table stool column machine lathe bin bench dispenser belt fridge   ชั้นวาง/ตู้เก็บอะไหล่อยู่ใน SP_RACKS (data.js) */
var KP=1.5,KD=1.25;
var SP_DEPT={"bounds":[-2.4,0.0,8.85,50.625],"entry":[-1.2,49.5],"walls":[[-2.4,0.0,8.7,0.0],[-2.4,50.63,8.7,50.63],[-2.4,0.0,-2.4,50.63],[8.7,0.0,8.7,50.63],[0.0,0.0,0.0,50.63,[],1.25],[1.755,35.01,8.7,35.01],[1.755,41.025,8.7,41.025],[1.755,48.915,8.7,48.915],[1.755,35.01,1.755,48.915,[[41.985,43.68]]],[6.255,48.915,6.255,50.625],[1.905,0.075,8.7,0.075],[1.905,9.315,8.7,9.315],[1.905,0.075,1.905,9.315,[[7.545,9.3]]],[2.895,9.315,2.895,11.4]],"floors":[[-2.4,0.0,0.0,50.63,"#c9d1de"],[0.0,0.0,8.7,50.63,"#e3e8f0"],[1.755,35.01,8.7,41.025,"#b4bccb"],[1.905,0.075,8.7,9.315,"#eaeff7"],[2.895,9.315,8.7,11.4,"#b8c2d3"],[6.255,48.915,8.7,50.625,"#b8c2d3"]],"stairs":[{"x1":2.895,"z1":9.315,"x2":8.7,"z2":11.4,"n":"บันไดไปชั้น 2"},{"x1":6.255,"z1":48.915,"x2":8.7,"z2":50.625,"n":"บันไดไปชั้น 1"}],"doors":[[1.905,7.545,9.3,"ประตูเลื่อน"],[1.755,41.985,43.68,"ประตูคู่"]],"labels":[["ห้องเก็บอะไหล่",4.755,5.75,4.575,"#1d4ed8",5.0],["ห้องช่าง",4.35,5.75,17.85,"#1d4ed8",3.75],["แผนกอื่น",5.25,4.0,38.0175,"#7c2d12",3.75],["พื้นที่โต๊ะนั่ง",4.8,3.25,32.98,"#1d4ed8",3.75],["ห้องโต๊ะทำงาน",5.25,4.25,44.97,"#1d4ed8",4.25],["ทางเดิน",-1.2,1.5,6.0,"#475569",2.75],["ทางเดิน",-1.2,1.5,22.5,"#475569",2.75],["ทางเดิน",-1.2,1.5,39.0,"#475569",2.75],["ทางเข้า",-1.2,1.625,48.3,"#15803d",2.5]],"shell":{"C1":"cab","C2":"cab","C3":"cab","C4":"cab","C5":"cab","K1":"cab","G1":"glass"},"furn":[{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.28,"z":31.86,"w":0.6875,"d":1.3},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.905,"z":32.19,"w":0.7,"d":1.3125},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.865,"z":34.38,"w":1.3125,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":4.725,"z":34.365,"w":1.3125,"d":0.6875},{"t":"table","n":"โต๊ะ","h":0.9375,"x":6.57,"z":34.395,"w":1.3125,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.535,"z":44.715,"w":1.1875,"d":0.6875},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.505,"z":46.23,"w":1.1375,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.49,"z":47.625,"w":1.1125,"d":0.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.92,"z":44.265,"w":1.275,"d":0.775},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.965,"z":45.87,"w":1.2,"d":0.8125},{"t":"table","n":"โต๊ะ","h":0.9375,"x":8.01,"z":47.25,"w":1.1625,"d":0.65},{"t":"bench","n":"โต๊ะใหญ่","h":0.9375,"x":4.935,"z":42.105,"w":2.8125,"d":0.9375},{"t":"cabinet","n":"ตู้","h":2.25,"x":8.295,"z":42.39,"w":0.725,"d":1.4625},{"t":"cabinet","n":"ตู้","h":2.25,"x":4.92,"z":48.48,"w":2.1125,"d":0.7125},{"t":"fridge","n":"ตู้เย็น","h":2.125,"x":8.13,"z":34.125,"w":0.6125,"d":0.6},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.195,"z":31.755,"r":0.275},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.975,"z":32.13,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.775,"z":33.45,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":4.785,"z":33.42,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.48,"z":33.465,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.415,"z":45.435,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.355,"z":46.905,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.385,"z":48.285,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.115,"z":45.015,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.115,"z":46.575,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.13,"z":47.865,"r":0.1875},{"t":"machine","n":"เครื่องจักรขนาดเล็ก","h":1.25,"x":7.215,"z":16.155,"w":1.8375,"d":0.85,"col":"#2f6fb3"},{"t":"lathe","n":"เครื่องกลึง","h":1.5,"x":2.25,"z":15.735,"w":0.9625,"d":1.75},{"t":"bin","n":"ถังขยะ","h":1.0,"x":2.055,"z":20.01,"w":0.7375,"d":0.5625},{"t":"bin","n":"ถังขยะ","h":1.0,"x":2.055,"z":20.685,"w":0.7375,"d":0.5625},{"t":"wbench","n":"โต๊ะทำงานช่าง (มีปากกาจับชิ้นงาน)","h":1.0625,"x":4.8,"z":20.745,"w":1.125,"d":2.25},{"t":"inkjet","n":"เครื่องพ่นวันที่ (Videojet)","h":1.0625,"x":2.4,"z":1.35,"w":0.625,"d":0.625},{"t":"drawers","n":"ตู้ลิ้นชัก 5×10","id":"DRW1","cols":5,"rows":10,"h":1.075,"x":5.04,"z":27.225,"w":1.1875,"d":0.5,"face":1},{"t":"bench","n":"โต๊ะ/เครื่อง","h":1.125,"x":5.04,"z":25.98,"w":1.7375,"d":1.1625},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.83,"z":24.555,"w":0.825,"d":2.2625},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.31,"z":28.275,"w":0.9875,"d":1.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.295,"z":30.12,"w":1.0,"d":1.525},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.845,"z":28.245,"w":0.9875,"d":1.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.845,"z":30.105,"w":0.9875,"d":1.5},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":5.085,"z":24.465,"r":0.4},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.855,"z":24.435,"r":0.3625},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.57,"z":28.185,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.555,"z":30.0,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.585,"z":28.35,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.585,"z":30.165,"r":0.3375},{"t":"column","n":"เสา","h":4.0,"x":1.965,"z":26.865,"w":0.4375,"d":0.7625},{"t":"column","n":"เสา","h":4.0,"x":7.965,"z":26.715,"w":0.6625,"d":0.6625},{"t":"dispenser","n":"ตู้กดน้ำ","h":1.375,"x":2.73,"z":26.79,"w":0.6875,"d":0.6875},{"t":"belt","n":"สายพาน","h":0.375,"x":2.655,"z":0.6,"r":0.275},{"t":"belt","n":"สายพาน","h":0.375,"x":3.75,"z":0.555,"r":0.275},{"t":"belt","n":"สายพาน","h":0.375,"x":4.845,"z":0.6,"r":0.275}],"rackNames":{"S1":"เซลเหล็กวางของ 3 ชั้น","S2":"เซลเหล็กวางของ 3 ชั้น","C1":"ตู้เหล็ก 2 ประตู","C2":"ตู้เหล็ก 2 ประตู","C3":"ตู้เหล็ก 2 ประตู","C4":"ตู้เหล็ก 2 ประตู","C5":"ตู้เหล็ก 2 ประตู","G1":"ตู้กระจก","L1":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L2":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L3":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L4":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","W1":"เซลเหล็ก 4 ชั้น","W2":"เซลเหล็ก 4 ชั้น","K1":"ตู้เหล็ก 2 ประตู"},"nodes":{"E":[-1.2,49.5],"Se":[0.825,49.5],"r0":[0.75,24.15],"D":[1.905,8.43],"Sd":[0.825,8.43],"Di":[2.46,8.43],"a":[2.46,8.22],"b":[5.145,8.22],"c":[5.145,1.275],"d":[7.38,1.275],"e":[7.38,8.22],"f":[2.46,1.275],"r1":[0.75,12.15],"r2":[3.45,12.15],"r3":[5.85,12.15],"r4":[5.85,14.4],"r5":[5.85,16.05]},"edges":[["E","Se"],["Se","r0"],["r0","r1"],["r1","Sd"],["Sd","D"],["D","Di"],["Di","a"],["a","b"],["b","c"],["c","d"],["d","e"],["b","e"],["a","f"],["f","c"],["r1","r2"],["r2","r3"],["r3","r4"],["r4","r5"]],"seams":[11.4,31.035],"zbottom":50.625};
(function(){
var D=SP_DEPT;D.KP=KP;D.KD=KD;
/* ปรับข้อมูลเฟอร์นิเจอร์ให้ตรงรูปจริง */
(function(){var F=D.furn;
 F[11].t="mtable";F[11].n="โต๊ะประชุมสีขาว";F[11].h=.75;
 F[12].col="#b8a878";F[12].n="ตู้เหล็กสีกากี 2 บาน";
 var c=F[13];F.splice(13,1,{t:"cabinet",n:"ตู้กระจกสีเทา",h:1.8,x:c.x-c.w/4,z:c.z,w:c.w/2-.02,d:c.d,col:"#8a8f98",glass:1},{t:"cabinet",n:"ตู้กระจกสีเทา",h:1.8,x:c.x+c.w/4,z:c.z,w:c.w/2-.02,d:c.d,col:"#8a8f98",glass:1});
 F.forEach(function(f){if(f.t==="fridge"){f.old=1}if(f.t==="bin"){f.col="#c0392b"}});
})();
/* เหลือกำแพงเฉพาะ ห้องเก็บอะไหล่ และ ห้องออฟฟิศ (ห้องโต๊ะทำงาน) */
D.walls=[[1.905,0.075,8.7,0.075],[1.905,9.315,8.7,9.315],[1.905,0.075,1.905,9.315,[[7.545,9.3]]],[8.7,0.075,8.7,9.315],
 [1.755,41.025,8.7,41.025],[1.755,48.915,8.7,48.915],[1.755,41.025,1.755,48.915,[[41.985,43.68]]],[8.7,41.025,8.7,48.915]];
function mat(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.82,metalness:.04},o||{}))}
function hex(c){return typeof c==="string"?parseInt(c.slice(1),16):c}
function label(txt,col,sz){var c=document.createElement("canvas");c.width=512;c.height=96;var x=c.getContext("2d");x.font="700 46px 'Noto Sans Thai','Segoe UI',sans-serif";x.textAlign="center";x.textBaseline="middle";
 x.lineWidth=8;x.strokeStyle="rgba(255,255,255,.95)";x.strokeText(txt,256,48);x.fillStyle=col||"#0b2150";x.fillText(txt,256,48);
 var s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true}));s.scale.set(sz||4,(sz||4)*96/512,1);s.renderOrder=5;return s}
function bx(g,w,h,d,x,y,z,c,o){var m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,o));m.position.set(x,y,z);var tr=o&&o.transparent;m.castShadow=!tr;m.receiveShadow=true;g.add(m);return m}
function cv(w,h,fn){var c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"),w,h);return c}
function tex(c,rx,ry){var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx||1,ry||1);t.anisotropy=8;return t}
var rnd=(function(s){return function(){s=(s*16807)%2147483647;return s/2147483647}})(7);
var TILE=cv(256,256,function(x,w,h){x.fillStyle="#9d9d98";x.fillRect(0,0,w,h);
 for(var i=0;i<26;i++){var g=x.createRadialGradient(rnd()*w,rnd()*h,2,rnd()*w,rnd()*h,30+rnd()*60);var a=rnd()*.09,d=rnd()<.5;g.addColorStop(0,d?"rgba(60,60,55,"+a+")":"rgba(255,255,250,"+a+")");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,w,h)}
 for(var i=0;i<2600;i++){x.fillStyle="rgba("+(rnd()<.5?"40,40,38":"255,255,250")+","+rnd()*.14+")";x.fillRect(rnd()*w,rnd()*h,1+rnd()*1.5,1+rnd()*1.5)}
 x.strokeStyle="rgba(55,55,52,.55)";x.lineWidth=2;x.strokeRect(0,0,w,h)});
var WOOD=cv(256,256,function(x,w,h){x.fillStyle="#c79a68";x.fillRect(0,0,w,h);for(var i=0;i<90;i++){x.strokeStyle="rgba("+(90+rnd()*40|0)+","+(55+rnd()*20|0)+",25,"+(.08+rnd()*.16)+")";x.lineWidth=.6+rnd()*1.6;var y=rnd()*h;x.beginPath();x.moveTo(0,y);for(var k=0;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+i)*2.2);x.stroke()}});
var STEELT=cv(128,128,function(x,w,h){x.fillStyle="#b8c0cc";x.fillRect(0,0,w,h);for(var i=0;i<300;i++){x.fillStyle="rgba(255,255,255,"+(rnd()*.08)+")";x.fillRect(rnd()*w,rnd()*h,1,rnd()*30)}});
var POSTT={};
function postTex(h){var k=Math.round(h*10);if(POSTT[k])return POSTT[k];var t=tex(cv(32,32,function(x,w,h){x.fillStyle="#1f6fd1";x.fillRect(0,0,w,h);x.fillStyle="#0e3f82";x.fillRect(10,10,12,12);x.fillStyle="rgba(255,255,255,.22)";x.fillRect(0,0,3,h)}),1,h/.07);return POSTT[k]=t}
D.shelfY=function(r,s){return Math.max(0,(Math.min(s,r.n)-1))*(r.h/r.n)+.08};
function strutZY(g,x,y1,z1,y2,z2,t,c){var L=Math.hypot(y2-y1,z2-z1),m=bx(g,t,L,t*.6,x,(y1+y2)/2,(z1+z2)/2,c);m.rotation.x=Math.atan2(z2-z1,y2-y1);return m}
function wall(g,x1,z1,x2,z2,gaps,H){H=H||3.2*KD;
 var horiz=Math.abs(z1-z2)<1e-6,a=horiz?x1:z1,b=horiz?x2:z2,fix=horiz?z1:x1,segs=[],cur=Math.min(a,b),end=Math.max(a,b);
 (gaps||[]).slice().sort(function(p,q){return p[0]-q[0]}).forEach(function(q){if(q[0]>cur)segs.push([cur,q[0]]);cur=q[1]});if(end>cur)segs.push([cur,end]);
 segs.forEach(function(s){var L=s[1]-s[0],cx=horiz?(s[0]+s[1])/2:fix,cz=horiz?fix:(s[0]+s[1])/2;
  bx(g,horiz?L:.14,H,horiz?.14:L,cx,H/2,cz,0xf0e2b4,{transparent:true,opacity:H<2?.6:.5,depthWrite:false});
  bx(g,horiz?L:.17,.12,horiz?.17:L,cx,.06,cz,0xd8c88f);
  bx(g,horiz?L:.16,.06,horiz?.16:L,cx,H,cz,0x64748b)})}
var BND=D.bounds;
function frontSign(r){var cx=(BND[0]+BND[2])/2,cz=(BND[1]+BND[3])/2;return r.w>=r.d?(r.z<cz?1:-1):(r.x<cx?1:-1)}
// ===== ชั้นวาง: เชลเหล็ก (ฟ้า-ส้ม) / ตู้เหล็ก / ตู้กระจก / ตู้เปิดโล่ง =====
D.rackBuild=function(g,k,r,pick){
 var nm=(D.rackNames&&D.rackNames[k])||"เซลเหล็ก",kind=/กระจก/.test(nm)?"glass":/ไม่มีประตู/.test(nm)?"open":/ประตู|ตู้/.test(nm)?"cab":"steel";
 var L=Math.max(r.w,r.d),S=Math.min(r.w,r.d),h=r.h,grp=new THREE.Group();grp.position.set(r.x,0,r.z);
 grp.rotation.y=r.w>=r.d?(frontSign(r)>0?0:Math.PI):(frontSign(r)>0?Math.PI/2:-Math.PI/2);g.add(grp);
 function board(n,w,t,d,col,o){var y=D.shelfY(r,n),m=bx(grp,w,t,d,0,y-t/2,0,col,o);m.userData.surf="ชั้นวาง "+k+" ชั้นที่ "+n;m.userData.rack=k;m.userData.level=n;pick.push(m);return m}
 var n;
 if(kind==="steel"){
  var pt=postTex(h),pm=mat(0xffffff,{map:pt,roughness:.5,metalness:.25}),nseg=Math.max(1,Math.ceil(L/1.8)),px=[];
  for(var i=0;i<=nseg;i++)px.push(-L/2+.03+i*(L-.06)/nseg);
  px.forEach(function(x){[-1,1].forEach(function(sz){var p=new THREE.Mesh(new THREE.BoxGeometry(.055,h,.055),pm);p.position.set(x,h/2,sz*(S/2-.03));p.castShadow=true;p.receiveShadow=true;grp.add(p);
   bx(grp,.08,.012,.08,x,.006,sz*(S/2-.03),0x1f2937)})});
  for(n=1;n<=r.n;n++){var y=D.shelfY(r,n);board(n,L-.02,.03,S-.02,0xf4902f);
   [-1,1].forEach(function(sz){bx(grp,L-.02,.075,.035,0,y-.07,sz*(S/2-.02),0xe8691b);bx(grp,L-.02,.02,.05,0,y+.004,sz*(S/2-.02),0xf6a24f)})}
  [-1,1].forEach(function(sz){bx(grp,L-.02,.075,.035,0,h-.03,sz*(S/2-.02),0xe8691b)});
  [-1,1].forEach(function(sx){var x=sx*(L/2-.03);
   strutZY(grp,x,.12,-S/2+.04,h-.12,S/2-.04,.035,0x1f6fd1);
   bx(grp,.03,.03,S-.07,x,h*.42,0,0x1f6fd1);bx(grp,.03,.03,S-.07,x,h-.06,0,0x1f6fd1)});
 }else if(kind==="cab"){
  var bc=k==="C3"?0xd8d1b8:0x8d97a3,dc=k==="C3"?0xe2dcc6:0x9aa4af;
  bx(grp,L,h,.016,0,h/2,-S/2+.008,bc);bx(grp,.016,h,S,-L/2+.008,h/2,0,bc);bx(grp,.016,h,S,L/2-.008,h/2,0,bc);
  bx(grp,L,.025,S,0,h-.0125,0,0x8696a9);bx(grp,L,.05,S,0,.025,0,0x6b7a8d);
  for(n=1;n<=r.n;n++)if(D.shelfY(r,n)>.1)board(n,L-.034,.016,S-.02,0xb7c3d1);else board(n,L-.034,.016,S-.02,0xb7c3d1);
  var dn=L>.6?2:1,dw=L/dn;
  for(var q=0;q<dn;q++){var cx=-L/2+dw*(q+.5);
   bx(grp,dw-.012,h-.07,.016,cx,h/2+.01,S/2-.008,dc,{roughness:.6,metalness:.1,transparent:true,opacity:.32,depthWrite:false});
   bx(grp,dw-.012,.025,.02,cx,h-.04,S/2-.008,0x7d8da0);bx(grp,dw-.012,.025,.02,cx,.06,S/2-.008,0x7d8da0);
   var hx=dn===2?(q===0?L/2*0+dw/2-.07:-dw/2+.07):0.12;bx(grp,.025,.2,.03,cx+(dn===2?(q===0?dw/2-.07:-dw/2+.07):.12),h*.52,S/2+.015,0x1e293b)}
 }else if(kind==="glass"){
  var gl={transparent:true,opacity:.16,depthWrite:false};
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){bx(grp,.035,h,.035,q[0]*(L/2-.018),h/2,q[1]*(S/2-.018),0xa5a894)});
  bx(grp,L,h,.01,0,h/2,-S/2+.005,0xbfe0ff,gl);bx(grp,L,h,.01,0,h/2,S/2-.005,0xbfe0ff,gl);bx(grp,.01,h,S,-L/2+.005,h/2,0,0xbfe0ff,gl);bx(grp,.01,h,S,L/2-.005,h/2,0,0xbfe0ff,gl);
  bx(grp,L,.04,S,0,h-.02,0,0xa5a894);bx(grp,L,.06,S,0,.03,0,0xa5a894);
  for(n=1;n<=r.n;n++)board(n,L-.04,.014,S-.04,0xcfe6fa,{transparent:true,opacity:.6,depthWrite:false});
  bx(grp,.025,.25,.03,0,h*.5,S/2+.015,0x1e293b);
 }else{
  var oc=0x9aa4b4;
  bx(grp,L,h,.015,0,h/2,-S/2+.0075,oc);bx(grp,.02,h,S,-L/2+.01,h/2,0,oc);bx(grp,.02,h,S,L/2-.01,h/2,0,oc);bx(grp,L,.03,S,0,h-.015,0,0x7e8899);
  for(n=1;n<=r.n;n++)board(n,L-.04,.02,S-.01,0xb4bccb);
  bx(grp,L,.1,.02,0,.05,S/2-.01,0x7e8899);
 }
 D.rackExtra(grp,k,r,kind,L,S,h);grp.userData.k=k;D._sg.push(grp);
 var c=cv(256,96,function(x,w,h){x.fillStyle="rgba(11,33,80,.92)";x.beginPath();x.roundRect?x.roundRect(8,8,240,80,22):x.rect(8,8,240,80);x.fill();x.fillStyle="#fff";x.font="700 54px 'Segoe UI',sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(k,128,50)});
 var s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true}));s.scale.set(.62,.23,1);s.position.set(r.x,r.h+.4,r.z);s.renderOrder=6;g.add(s)};
// ===== ของตกแต่งในห้องเก็บอะไหล่ (กล่องพลาสติก ลังกระดาษ ขวดตัวอย่าง) ให้ใกล้ของจริง — ไม่ใช่จุดคลิก =====
D.xray=function(on,except){(D._sg||[]).forEach(function(grp){if(on&&except&&grp.userData.k===except)return;grp.traverse(function(m){var mt=m.material;if(!mt||!mt.userData)return;
 if(on){if(!mt.userData.xo)mt.userData.xo=[mt.opacity,mt.transparent,mt.depthWrite];mt.transparent=true;mt.opacity=Math.min(mt.userData.xo[0],.16);mt.depthWrite=false}
 else if(mt.userData.xo){mt.opacity=mt.userData.xo[0];mt.transparent=mt.userData.xo[1];mt.depthWrite=mt.userData.xo[2];mt.userData.xo=null}mt.needsUpdate=true})})};
D.rackTheta=function(r){return r.w>=r.d?(frontSign(r)>0?0:Math.PI):(frontSign(r)>0?Math.PI/2:-Math.PI/2)};
D.rackExtra=function(){};
// ===== โมเดล 3D ของอะไหล่ (สร้างด้วยโค้ด วางฐานที่ y=0, ยาวตามแกน x) =====
D.model=function(t){
 var g=new THREE.Group();function M(c,o){return mat(c,Object.assign({roughness:.55,metalness:.15},o||{}))}
 function cyl(r1,r2,h,c,o,ax){var m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,20),M(c,o));if(ax==="x")m.rotation.z=Math.PI/2;if(ax==="z")m.rotation.x=Math.PI/2;g.add(m);return m}
 function box(w,h,d,x,y,z,c,o){var m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(c,o));m.position.set(x,y,z);g.add(m);return m}
 function tor(R,r,x,y,z,c,o,rot){var m=new THREE.Mesh(new THREE.TorusGeometry(R,r,8,28),M(c,o));m.position.set(x,y,z);if(rot)m.rotation.x=rot;g.add(m);return m}
 if(t==="motor"||t==="gear"){
  if(t==="motor"){var b=cyl(.17,.17,.36,0x2f6fb3,{metalness:.35},"x");b.position.set(0,.2,0);
   for(var i=-2;i<=2;i++){var f=cyl(.185,.185,.018,0x25598f,{metalness:.35},"x");f.position.set(i*.07,.2,0)}
   var c1=cyl(.14,.14,.08,0x6b7280,{metalness:.6},"x");c1.position.set(.22,.2,0);var sh=cyl(.025,.025,.14,0xcbd5e1,{metalness:.8},"x");sh.position.set(.33,.2,0);
   var c2=cyl(.15,.15,.06,0x1f2937,{},"x");c2.position.set(-.21,.2,0);box(.14,.07,.12,0,.4,0,0x1f2937);box(.3,.03,.28,0,.015,0,0x374151);}
  else{var gb=box(.24,.3,.26,-.22,.17,0,0x4b5563,{metalness:.4});var mo=cyl(.12,.12,.28,0x1d4ed8,{metalness:.35},"x");mo.position.set(.05,.17,0);
   var oc=cyl(.07,.07,.05,0x9ca3af,{metalness:.6},"z");oc.position.set(-.22,.17,.15);var os=cyl(.025,.025,.1,0xcbd5e1,{metalness:.8},"z");os.position.set(-.22,.17,.2);box(.5,.025,.28,-.05,.0125,0,0x374151);box(.1,.07,.1,.05,.33,0,0x1f2937);}
 }else if(t==="cable"){
  for(var i2=0;i2<4;i2++)tor(.17,.034,0,.05+i2*.065,0,0xd2691e,{roughness:.6},Math.PI/2);
  box(.06,.2,.03,.17,.15,0,0x111827);cyl(.012,.012,.2,0xd2691e,{},"x").position.set(.27,.1,.05)
 }else if(t==="cablebox"){
  var bn=box(.42,.16,.3,0,.08,0,0x1f55c9,{roughness:.55});box(.38,.012,.26,0,.16,0,0x0b1d45);
  tor(.09,.022,-.08,.18,0,0xd2691e,{},Math.PI/2);tor(.09,.022,-.08,.21,0,0xd2691e,{},Math.PI/2);tor(.075,.02,.11,.19,.02,0x9bc53d,{},Math.PI/2);tor(.06,.018,.11,.22,.02,0x111827,{},Math.PI/2)
 }else if(t==="belt"){
  var r1=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.09,40,1,true),M(0x1f2937,{roughness:.8,side:THREE.DoubleSide}));r1.position.y=.06;g.add(r1);
  var r2=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.09,40,1,true),M(0x111827,{roughness:.8,side:THREE.DoubleSide}));r2.position.y=.06;g.add(r2);
  var r3=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.09,40,1,true),M(0xf2c500,{roughness:.8,side:THREE.DoubleSide}));r3.scale.set(1,.12,1);r3.position.y=.1;g.add(r3);
  var rt=new THREE.Mesh(new THREE.TorusGeometry(.215,.012,6,40),M(0x2b2f36));rt.rotation.x=Math.PI/2;rt.position.y=.108;g.add(rt)
 }else if(t==="bearing"){
  [[.1,.045,.0],[.075,.03,.052]].forEach(function(q,i){var pts=[new THREE.Vector2(q[1],0),new THREE.Vector2(q[0],0),new THREE.Vector2(q[0],.048),new THREE.Vector2(q[1],.048),new THREE.Vector2(q[1],0)],m=new THREE.Mesh(new THREE.LatheGeometry(pts,28),M(0xd1d5db,{metalness:.85,roughness:.25,side:THREE.DoubleSide}));m.position.set(i?.0:0,q[2],0);g.add(m)});
  box(.16,.012,.2,.19,.006,0,0xe5e7eb);
 }else if(t==="board"){
  box(.3,.014,.2,0,.03,0,0x1f7a3a,{roughness:.5});box(.025,.04,.2,-.14,.045,0,0x111827);
  [[.05,.05],[-.05,.04],[.09,-.05],[-.08,-.05]].forEach(function(p,i){box(.05+i%2*.02,.014,.04,p[0],.044,p[1],0x111827)});
  box(.3,.006,.012,0,.037,.095,0xe3b341,{metalness:.8});cyl(.012,.012,.03,0x9ca3af,{metalness:.6}).position.set(.1,.052,.05);box(.34,.02,.04,0,.01,.1,0x374151);box(.34,.02,.04,0,.01,-.1,0x374151)
 }else if(t==="valve"){
  var cb=cyl(.04,.04,.34,0xcbd5e1,{metalness:.8,roughness:.25},"x");cb.position.set(0,.06,0);var e1=cyl(.048,.048,.04,0x2563eb,{},"x");e1.position.set(.17,.06,0);var e2=cyl(.048,.048,.04,0x2563eb,{},"x");e2.position.set(-.17,.06,0);
  var rd=cyl(.012,.012,.14,0xe5e7eb,{metalness:.9},"x");rd.position.set(.26,.06,0);box(.1,.06,.08,-.02,.13,0,0x111827);box(.04,.025,.04,-.1,.1,.03,0x9ca3af,{metalness:.7});box(.3,.02,.06,0,.01,0,0x374151)
 }else if(t==="sensor"){
  var sc=cyl(.022,.022,.13,0xc9a227,{metalness:.7},"x");sc.position.set(0,.06,0);var tip=cyl(.02,.02,.012,0x2563eb,{},"x");tip.position.set(.07,.06,0);var nt=cyl(.026,.026,.012,0x9ca3af,{metalness:.7},"x");nt.position.set(-.02,.06,0);
  var cc=new THREE.Mesh(new THREE.TorusGeometry(.07,.006,6,20,Math.PI*1.4),M(0x111827));cc.position.set(-.1,.06,0);cc.rotation.set(0,0,Math.PI*.3);g.add(cc);box(.06,.03,.03,-.18,.045,.0,0x111827)
 }else if(t==="pump"){
  var vb=cyl(.12,.12,.12,0x2563eb,{metalness:.3});vb.position.set(.03,.14,0);var vc=cyl(.14,.14,.05,0x6b7280,{metalness:.5},"z");vc.position.set(.03,.14,.1);
  var pi=cyl(.03,.03,.2,0x9ca3af,{metalness:.6},"x");pi.position.set(.14,.14,.0);var mt=cyl(.09,.09,.22,0x1d4ed8,{metalness:.3},"x");mt.position.set(-.16,.14,0);box(.46,.025,.26,0,.0125,0,0x374151);box(.08,.06,.08,-.13,.26,0,0x1f2937)
 }else if(t==="bin"){
  box(.38,.14,.26,0,.07,0,0x1f55c9);box(.34,.012,.22,0,.14,0,0x0b1d45);
  for(var i3=0;i3<5;i3++){var pc=cyl(.022,.022,.05+i3%2*.02,0xb8bcc2,{metalness:.7});pc.position.set(-.12+i3*.06,.17,(i3%2?.04:-.04))}box(.07,.04,.05,.1,.16,.05,0x111827)
 }else{
  box(.32,.2,.26,0,.1,0,0xc8a26a,{roughness:.9});box(.07,.002,.26,0,.2,0,0xe7d6b0);box(.07,.1,.002,0,.15,.131,0xe7d6b0);
 }
 g.traverse(function(m){if(m.isMesh){m.castShadow=true;m.receiveShadow=true}});return g};
D.inkjet=function(g,f,surf){
 var t=bx(g,f.w,.05,f.d,f.x,f.h-.025,f.z,0x1f55c9,{roughness:.5});surf(t,"บนโต๊ะเครื่องพ่นวันที่");
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){bx(g,.045,f.h-.05,.045,f.x+q[0]*(f.w/2-.04),(f.h-.05)/2,f.z+q[1]*(f.d/2-.04),0x1f55c9)});
 bx(g,.38,.55,.3,f.x,f.h+.275,f.z,0x9ea3a8,{metalness:.4,roughness:.45});bx(g,.2,.15,.012,f.x,f.h+.42,f.z+.153,0x8fb2d9);bx(g,.3,.1,.012,f.x,f.h+.3,f.z+.153,0x5b6f8a);
 bx(g,.3,.1,.012,f.x,f.h+.12,f.z+.153,0xf2c500);
 for(var i=0;i<7;i++)bx(g,.3,.012,.3,f.x-.2,.18+i*.04,f.z-.45,0xc8a26a,{roughness:.9});
 bx(g,.3,.2,.3,f.x-.2,.09,f.z-.45,0xf2c500,{roughness:.8})};
// ===== โต๊ะเหล็กทำงาน (ตู้ลิ้นชัก 2 ข้าง ลิ้นชักกลาง ขาเรียว) =====
D.desk=function(g,f,surf){
 var L=Math.max(f.w,f.d),S=Math.min(f.w,f.d),h=f.h,grp=new THREE.Group(),best=1e9,tg=null,cx=(BND[0]+BND[2])/2,cz=(BND[1]+BND[3])/2;
 D.furn.forEach(function(q){if(q.t!=="stool")return;var d=Math.hypot(q.x-f.x,q.z-f.z);if(d<best){best=d;tg=q}});
 var sgn;if(f.w>=f.d){sgn=((tg?tg.z:cz)>=f.z)?1:-1;grp.rotation.y=sgn>0?0:Math.PI}else{sgn=((tg?tg.x:cx)>=f.x)?1:-1;grp.rotation.y=sgn>0?Math.PI/2:-Math.PI/2}
 grp.position.set(f.x,0,f.z);g.add(grp);
 var off=f.z>26,body=off?0x74787f:0xe9ecf0,dark=0x3b3a40,topC=off?0x7f8c78:0xf4f5f7,legH=.1,bodyH=h-.035-legH,pw=Math.min(.42,L*.3);
 var top=bx(grp,L,.035,S,0,h-.0175,0,topC,off?{roughness:.12,metalness:.1,transparent:true,opacity:.82}:{roughness:.5});surf(top,"บน"+f.n);
 if(!off){bx(grp,L*.92,.5,.025,0,h+.25,-S/2+.02,0xffffff,{roughness:.3});bx(grp,L*.92+.03,.03,.03,0,h+.5,-S/2+.02,0x9aa1ab);bx(grp,L*.92+.03,.03,.03,0,h+.01,-S/2+.02,0x9aa1ab)}
 bx(grp,L+.014,.014,S+.014,0,h-.042,0,0x6f7467,{roughness:.5});
 [-1,1].forEach(function(sx){var x=sx*(L/2-pw/2-.02);
  bx(grp,pw,bodyH,S-.05,x,legH+bodyH/2,-.005,body,{roughness:.55,metalness:.25});
  var dh=(bodyH-.06)/3;for(var i=0;i<3;i++){var y=legH+bodyH-.03-dh*(i+.5);
   bx(grp,pw-.03,dh-.02,.012,x,y,S/2-.02,i===2?0x978f99:0x9a929c,{roughness:.5,metalness:.25});
   bx(grp,pw*.55,.022,.016,x,y+dh/2-.03,S/2-.012,dark);if(i===1)bx(grp,.014,.014,.014,x+pw*.28,y,S/2-.01,0xe5e7eb,{metalness:.8})}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var lg=new THREE.Mesh(new THREE.CylinderGeometry(.022,.016,legH,10),mat(0x7c7480,{metalness:.3}));lg.position.set(x+q[0]*(pw/2-.04),legH/2,q[1]*(S/2-.06));lg.castShadow=true;grp.add(lg)})});
 var cw=L-2*pw-.08;if(cw>.1){bx(grp,cw,.07,S-.08,0,h-.035-.035,-.005,body,{roughness:.55,metalness:.25});bx(grp,cw-.04,.045,.012,0,h-.035-.035,S/2-.045,0x9a929c);bx(grp,.014,.014,.014,0,h-.035-.035,S/2-.036,0xe5e7eb,{metalness:.8});
  bx(grp,cw,bodyH-.07,.012,0,legH+(bodyH-.07)/2,-S/2+.045,0x7b7380);bx(grp,cw,.03,.03,0,.16,S/2-.12,dark)}};
// ===== โต๊ะช่างเฟรมเหล็กสีเขียว ท็อปไม้ ชั้นล่าง ปากกาจับชิ้นงาน (ตามรูป) =====
D.wbench=function(g,f,surf,woodM){
 var L=Math.max(f.w,f.d),S=Math.min(f.w,f.d),h=f.h,grp=new THREE.Group(),green=0x7fa08c,gdark=0x5f8470,tk=.04,legW=.05,fh=.1;
 grp.position.set(f.x,0,f.z);if(f.w<f.d)grp.rotation.y=Math.PI/2;g.add(grp);
 var top=new THREE.Mesh(new THREE.BoxGeometry(L,tk,S),woodM);top.position.set(0,h-tk/2,0);top.castShadow=top.receiveShadow=true;grp.add(top);surf(top,"บน"+f.n);
 /* ขอบเหล็กรอบท็อป */
 bx(grp,L+.02,.035,.03,0,h-tk/2,S/2+.005,gdark,{metalness:.3});bx(grp,L+.02,.035,.03,0,h-tk/2,-S/2-.005,gdark,{metalness:.3});
 bx(grp,.03,.035,S,L/2+.005,h-tk/2,0,gdark,{metalness:.3});bx(grp,.03,.035,S,-L/2-.005,h-tk/2,0,gdark,{metalness:.3});
 /* โครงใต้ท็อป + ขา */
 var ay=h-tk-.03;bx(grp,L-.08,.06,.04,0,ay,S/2-.07,green,{metalness:.3});bx(grp,L-.08,.06,.04,0,ay,-S/2+.07,green,{metalness:.3});
 bx(grp,.04,.06,S-.14,L/2-.07,ay,0,green,{metalness:.3});bx(grp,.04,.06,S-.14,-L/2+.07,ay,0,green,{metalness:.3});
 var lh=h-tk-fh;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var x=q[0]*(L/2-.07),z=q[1]*(S/2-.07);
  bx(grp,legW,lh,legW,x,fh+lh/2,z,green,{metalness:.3,roughness:.5});
  var ft=new THREE.Mesh(new THREE.CylinderGeometry(.03,.035,.03,14),mat(0x9ca3af,{metalness:.7,roughness:.35}));ft.position.set(x,.075,z);ft.castShadow=true;grp.add(ft);
  var bs=new THREE.Mesh(new THREE.CylinderGeometry(.045,.05,.03,14),mat(0x4b5563,{roughness:.8}));bs.position.set(x,.015,z);grp.add(bs)});
 /* ชั้นล่าง */
 bx(grp,L-.1,.02,S-.1,0,.24,0,green,{metalness:.3,roughness:.55});
 bx(grp,L-.1,.045,.015,0,.255,S/2-.06,gdark);bx(grp,L-.1,.045,.015,0,.255,-S/2+.06,gdark);
 [-1,1].forEach(function(sx){bx(grp,legW*.7,.03,S-.14,sx*(L/2-.07),.24,0,gdark)});
 /* ปากกาจับชิ้นงาน (ปลายซ้าย ขอบหน้า) */
 var vx=-L/2+.16,vz=S/2-.02,vy=h;
 bx(grp,.2,.05,.16,vx,vy+.025,vz-.09,0x374151,{metalness:.6,roughness:.4});
 bx(grp,.17,.09,.035,vx,vy+.095,vz-.15,0x1f2937,{metalness:.6,roughness:.35});
 bx(grp,.17,.09,.04,vx,vy+.095,vz-.02,0x2b3440,{metalness:.6,roughness:.35});
 var sc=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.2,10),mat(0x9ca3af,{metalness:.8,roughness:.3}));sc.rotation.x=Math.PI/2;sc.position.set(vx,vy+.07,vz+.07);grp.add(sc);
 var hd=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.12,8),mat(0x9ca3af,{metalness:.8}));hd.rotation.z=Math.PI/2;hd.position.set(vx,vy+.07,vz+.17);grp.add(hd);
 bx(grp,.02,.02,.02,vx-.06,vy+.07,vz+.17,0x111827);bx(grp,.02,.02,.02,vx+.06,vy+.07,vz+.17,0x111827)};
// ===== ตู้เล็ก 2 ชั้น (ตู้เหล็ก 2 บานซ้อน) =====
// ===== ตู้ลิ้นชักพลาสติกใส 5 แถว × 10 ชั้น (ตามรูปตู้จริง) =====
D.drawerGeom=function(f){var m=.035,iw=f.w-2*m,ih=f.h-.05-m,cw=iw/f.cols,ch=ih/f.rows;return{m:m,cw:cw,ch:ch,y0:f.h-m}};
// ตำแหน่งหน้าลิ้นชัก (แถว c = ซ้าย→ขวา มองจากด้านหน้า, ชั้น r = บน→ล่าง) คืน {x,y,z,nz} nz=ทิศด้านหน้าตู้
D.drawerPos=function(f,c,r){var G=D.drawerGeom(f),fc=f.face===-1?-1:1,lx=-f.w/2+G.m+(c-.5)*G.cw,y=G.y0-(r-.5)*G.ch;return{x:f.x+fc*lx,y:y,z:f.z+fc*f.d/2,nz:fc,cw:G.cw,ch:G.ch}};
D.furnById=function(id){return(D.furn||[]).filter(function(f){return f.id===id})[0]};
D.drawers=function(g,f,surf,pick){
 var w=f.w,d=f.d,h=f.h,G=D.drawerGeom(f),grp=new THREE.Group(),fc=f.face===-1?-1:1;grp.position.set(f.x,0,f.z);grp.rotation.y=fc===1?0:Math.PI;g.add(grp);
 var body=0xe9edf1;
 bx(grp,w,h-.05,d,0,.05+(h-.05)/2,0,body,{roughness:.55,metalness:.15});
 bx(grp,w-.04,.05,d-.04,0,.025,0,0xcfd6de);
 var top=bx(grp,w+.02,.022,d+.02,0,h+.004,0,0xf1f4f7,{roughness:.5});surf(top,"บนตู้ลิ้นชัก");top.userData.dwf=f.id;
 // ลิ้นชักใส
 for(var c=1;c<=f.cols;c++)for(var r=1;r<=f.rows;r++){var P=D.drawerPos({x:0,z:0,w:w,d:d,h:h,cols:f.cols,rows:f.rows,face:1},c,r);
  var fw=G.cw-.012,fh=G.ch-.01,m=new THREE.Mesh(new THREE.BoxGeometry(fw,fh,d*.78),new THREE.MeshStandardMaterial({color:0xdde7ee,roughness:.2,metalness:0,transparent:true,opacity:.55,depthWrite:false}));
  m.position.set(P.x,P.y,d/2-d*.39+.004);m.userData.surf="ตู้ลิ้นชัก แถว "+c+" ชั้น "+r;m.userData.dw=[f.id,c,r];grp.add(m);pick.push(m);
  var hd=new THREE.Mesh(new THREE.BoxGeometry(fw*.42,fh*.28,.012),new THREE.MeshStandardMaterial({color:0xf5f8fa,roughness:.3,transparent:true,opacity:.8}));hd.position.set(P.x,P.y+fh*.18,d/2+.008);grp.add(hd);
  // ของในลิ้นชัก (สุ่มแบบคงที่ เพื่อให้ดูเหมือนของจริง)
  var seed=(c*13+r*7)%11;if(seed<6){var col=[0xc0392b,0x1e4fa8,0xd9dde2,0x1f2937,0x2e8b57,0xb8860b][seed%6],it=new THREE.Mesh(new THREE.BoxGeometry(fw*(.3+seed%3*.12),fh*.45,d*.3),new THREE.MeshStandardMaterial({color:col,roughness:.6}));it.position.set(P.x+((seed%3)-1)*fw*.2,P.y-fh*.18,d/2-d*.4);grp.add(it)}}
 // กล่องพลาสติกวางบนตู้ (เขียว/น้ำเงิน/เทา)
 var bins=[[-.34,0x2e9d46,.2],[-.34,0x2e9d46,.2,1],[-.13,0x1d4fd6,.2],[.07,0x1d4fd6,.2],[.27,0x9aa0a8,.2],[.42,0x9aa0a8,.14]];
 bins.forEach(function(b){bx(grp,b[2],.1,d*.85,b[0],h+.015+(b[3]?.1:0)+.05,0,b[1],{roughness:.5})})};
D.cab2=function(g,f,surf){
 var w=f.w,d=f.d,h=f.h,grp=new THREE.Group(),fc=f.face===-1?-1:1;grp.position.set(f.x,0,f.z);grp.rotation.y=fc===1?0:Math.PI;g.add(grp);
 var body=0xb4bfcc,door=0xcdd6e0,fy=.06;
 bx(grp,w,h-fy,d,0,fy+(h-fy)/2,0,body,{roughness:.55,metalness:.2});
 bx(grp,w-.06,fy,d-.06,0,fy/2,-.01,0x374151);
 var top=bx(grp,w+.02,.025,d+.02,0,h+.0,0,0x9aa5b4,{roughness:.5,metalness:.25});surf(top,"บน"+f.n);
 var ih=(h-fy-.06)/2;
 [0,1].forEach(function(i){var y=fy+.03+ih*(i+.5);
  bx(grp,w-.05,ih-.02,.014,0,y,d/2+.004,door,{roughness:.5,metalness:.15});
  bx(grp,w*.5,.022,.02,0,y+ih*.28,d/2+.02,0x1e293b);
  bx(grp,.025,.025,.012,w*.34,y-ih*.2,d/2+.014,0xe5e7eb,{metalness:.8});
  if(i===0)bx(grp,.03,.03,.012,-w*.34,y-ih*.2,d/2+.014,0xe5e7eb,{metalness:.8})})};
// ===== เครื่องกลึงตั้งโต๊ะ (ตามรูป: ตัวเครื่องสีน้ำเงิน หัวเครื่อง จับชิ้นงาน แท่นเลื่อน ท้ายแท่น โคมไฟ) =====
D.lathe=function(g,f,surf){
 var L=Math.max(f.w,f.d),S=Math.min(f.w,f.d),grp=new THREE.Group(),cx=(BND[0]+BND[2])/2,cz=(BND[1]+BND[3])/2,sgn;
 if(f.w>=f.d){sgn=f.z<cz?1:-1;grp.rotation.y=sgn>0?0:Math.PI}else{sgn=f.x<cx?1:-1;grp.rotation.y=sgn>0?Math.PI/2:-Math.PI/2}
 grp.position.set(f.x,0,f.z);g.add(grp);
 var blue=0x1f5fbf,blue2=0x174a97,steel=0xc4c9d0,dark=0x2b2f36,topY=.76,M={metalness:.45,roughness:.4};
 [-1,1].forEach(function(sx){var x=sx*(L/2-.2);bx(grp,.32,topY,S-.06,x,topY/2,0,blue,{roughness:.5,metalness:.25});
  bx(grp,.22,topY-.14,.012,x,topY/2,S/2-.027,blue2,{roughness:.5});bx(grp,.014,.12,.02,x+sx*-.06,topY/2,S/2-.02,0xe5e7eb,M);bx(grp,.34,.05,S-.04,x,.025,0,blue2)});
 bx(grp,L-.5,.5,.02,0,topY-.25,-S/2+.04,blue2);
 var top=bx(grp,L,.045,S,0,topY+.0225,0,blue,{roughness:.45,metalness:.3});surf(top,"บนเครื่องกลึง");bx(grp,L,.03,.03,0,topY+.03,S/2-.015,blue2);
 bx(grp,L,.3,.02,0,topY+.18,-S/2+.012,blue,{roughness:.5});bx(grp,L,.02,.05,0,topY+.34,-S/2+.03,blue2);
 var bedY=topY+.045,bed=bx(grp,L-.12,.09,S*.5,0,bedY+.045,.02,0xa9b0b9,M);
 [-1,1].forEach(function(q){bx(grp,L-.14,.022,.03,0,bedY+.1,.02+q*S*.17,0xe6e9ed,{metalness:.8,roughness:.25})});
 var hx=L/2-.3;bx(grp,.5,.42,S*.62,hx,bedY+.09+.21,-.02,0xd3d7dc,M);bx(grp,.5,.06,S*.62,hx,bedY+.09+.45,-.02,blue,{roughness:.5});
 var fz=-.02+S*.31;for(var i=0;i<6;i++){var d=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.012,16),mat(i===5?0xdc2626:i%2?0x1f2937:0x9aa1ab,M));d.rotation.x=Math.PI/2;d.position.set(hx-.12+(i%3)*.12,bedY+.09+.12+Math.floor(i/3)*.14,fz+.006);grp.add(d)}
 var ch=new THREE.Mesh(new THREE.CylinderGeometry(.085,.085,.09,24),mat(0xb8bec7,{metalness:.7,roughness:.3}));ch.rotation.z=Math.PI/2;ch.position.set(hx-.3,bedY+.09+.25,-.02);ch.castShadow=true;grp.add(ch);
 var cg=bx(grp,.26,.09,S*.5,0.05,bedY+.09+.045,.02,0x8f98a3,M);bx(grp,.16,.06,.16,.05,bedY+.09+.115,-.04,0x58606b,M);bx(grp,.045,.07,.045,.05,bedY+.09+.19,-.04,0xe5e7eb,M);
 var hw=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.02,24),mat(0x4b5563,M));hw.rotation.x=Math.PI/2;hw.position.set(.0,bedY+.1,S*.29+.04);grp.add(hw);var kn=bx(grp,.025,.025,.04,.0,bedY+.1,S*.29+.07,0xdc2626);
 var tx=-L/2+.28;bx(grp,.22,.18,.22,tx,bedY+.09+.09,.02,0x8f98a3,M);var ts=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.14,12),mat(0xd1d5db,M));ts.rotation.z=Math.PI/2;ts.position.set(tx+.16,bedY+.09+.12,.02);grp.add(ts);
 var lc=[[hx-.2,bedY+.55,-S/2+.1],[hx-.2,bedY+.85,-S/2+.1],[hx-.5,bedY+.95,-S/2+.2],[hx-.7,bedY+.78,-S/2+.3]];
 for(var q=0;q<lc.length-1;q++){var a=new THREE.Vector3().fromArray(lc[q]),b=new THREE.Vector3().fromArray(lc[q+1]),len=a.distanceTo(b),c=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,len,6),mat(dark));c.position.copy(a).add(b).multiplyScalar(.5);c.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());grp.add(c)}
 var lh=new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.1,12),mat(dark));lh.position.set(lc[3][0]-.02,lc[3][1]-.05,lc[3][2]+.02);lh.rotation.x=.4;grp.add(lh)};
// ===== โต๊ะประชุมขาว + เก้าอี้ดำ =====
D.mtable=function(g,f,surf){var L=f.w,S=f.d,h=f.h;
 var t=bx(g,L,.04,S,f.x,h-.02,f.z,0xf7f7f5,{roughness:.35});surf(t,"บน"+f.n);
 bx(g,L-.1,.05,S-.1,f.x,h-.065,f.z,0x6b7078);
 [-1,1].forEach(function(sx){bx(g,.06,h-.06,S-.2,f.x+sx*(L/2-.25),(h-.06)/2+.0,f.z,0x6b7078,{metalness:.4});bx(g,.06,.05,S-.1,f.x+sx*(L/2-.25),.1,f.z,0x6b7078);
  [-1,1].forEach(function(sz){var w=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.03,12),mat(0x111111));w.rotation.z=Math.PI/2;w.position.set(f.x+sx*(L/2-.25),.035,f.z+sz*(S/2-.1));g.add(w)})});
 [[-.7,-1],[0,-1],[.7,-1],[-.7,1],[0,1],[.7,1]].forEach(function(q){D.chair(g,f.x+q[0],f.z+q[1]*(S/2+.28),q[1]>0?Math.PI:0)})};
D.chair=function(g,x,z,ry){var c=new THREE.Group();c.position.set(x,0,z);c.rotation.y=ry||0;g.add(c);
 var blk=0x1a1b1e;bx(c,.42,.07,.42,0,.46,0,blk);bx(c,.4,.45,.06,0,.72,-.2,blk);
 var l=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.38,8),mat(0x555a62,{metalness:.6}));l.position.y=.24;c.add(l);
 for(var i=0;i<5;i++){var s=bx(c,.28,.02,.035,0,.05,0,0x2b2d31);s.position.set(Math.cos(i*1.2566)*.13,.05,Math.sin(i*1.2566)*.13);s.rotation.y=-i*1.2566}};
// ===== ของตกแต่ง/อุปกรณ์เสริมตามรูปจริง =====
function bxs(g,w,h,d,x,y,z,c,o){return bx(g,w*KD,h*KD,d*KD,x*KP,y*KD,z*KP,c,o)}
D.extra=function(g,surf){
 /* เส้นเหลืองกันพื้น: ขอบทางเดิน + ขอบห้องช่าง */
 [-1.5,-.08].forEach(function(x){bx(g,.08,.004,33.4*KP,x*KP,.016,16.9*KP,0xf0c419)});
 /* ล็อกเกอร์ครีม 1-24 ใกล้บันได (ผนังตะวันออก) */
 var lk=cv(64,64,function(x,w,h){x.fillStyle="#efe3bb";x.fillRect(0,0,w,h);x.strokeStyle="#9c9066";x.lineWidth=3;x.strokeRect(2,2,60,60);x.fillStyle="#6b6240";x.fillRect(8,30,4,10)});
 for(var r=0;r<4;r++)for(var c=0;c<6;c++){var n=r*6+c+1,t=new THREE.CanvasTexture(cv(64,64,function(x,w,h){x.drawImage(lk,0,0);x.fillStyle="#3b3a30";x.font="700 18px sans-serif";x.textAlign="center";x.fillText(String(n),32,22)}));t.wrapS=THREE.RepeatWrapping;t.repeat.x=-1;t.offset.x=1;
  var cr=mat(0xe9dcae),b=new THREE.Mesh(new THREE.BoxGeometry(.04*KD,.44*KD,.29*KD),[mat(0xffffff,{map:t,roughness:.6}),cr,cr,cr,cr,cr]);b.position.set(.45*KD,(.1+.45*r+.22)*KD,8.0*KP+(.3*c+.15)*KD);b.castShadow=true;g.add(b)}
 bx(g,.44*KD,1.84*KD,1.82*KD,.22*KD,.92*KD,8.0*KP+.9*KD,0xe3d7ab);
 /* ไมโครเวฟบนโต๊ะข้างตู้เย็น */
 bxs(g,.45,.27,.34,5.27,.75+.135,21.46,0xdadde2,{metalness:.3});bxs(g,.3,.2,.01,5.27-.05,.75+.135,21.46-.17,0x15171b);
 /* พัดลมตั้งพื้น 2 ตัว */
 [[4.7,14.6],[2.35,21.9]].forEach(function(p0){var p=[p0[0]*KP,p0[1]*KP],fg=new THREE.Group();fg.position.set(p[0],0,p[1]);fg.scale.setScalar(KD);g.add(fg);p=[0,0];var l=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1.0,8),mat(0x6b7280,{metalness:.5}));l.position.set(p[0],.55,p[1]);fg.add(l);
  var b=new THREE.Mesh(new THREE.CylinderGeometry(.17,.19,.03,16),mat(0x374151));b.position.set(p[0],.02,p[1]);fg.add(b);
  var h=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,20),mat(0x2f6fb3,{transparent:true,opacity:.7}));h.rotation.x=Math.PI/2;h.position.set(p[0],1.1,p[1]);fg.add(h)});
 /* ออฟฟิศ: ไวท์บอร์ด + บอร์ดบริหารรายวัน + ทีวี + แอร์ติดผนัง */
 bxs(g,1.6,1.0,.03,3.3,1.7,27.35+.08,0xffffff,{roughness:.3});bxs(g,1.66,.04,.04,3.3,2.2,27.35+.08,0x9aa1ab);
 var dm=cv(256,128,function(x,w,h){x.fillStyle="#f4f7fb";x.fillRect(0,0,w,h);x.fillStyle="#1d4ed8";x.fillRect(0,0,w,22);x.fillStyle="#fff";x.font="700 15px sans-serif";x.fillText("DAILY MANAGEMENT",8,16);x.strokeStyle="#64748b";for(var i=1;i<4;i++){x.strokeRect(6+i*60,30,52,88)}x.strokeRect(6,30,52,88)});
 var db=new THREE.Mesh(new THREE.BoxGeometry(.03*KD,.9*KD,1.8*KD),[mat(0xdddddd),mat(0xffffff,{map:new THREE.CanvasTexture(dm)}),mat(0xdddddd),mat(0xdddddd),mat(0xdddddd),mat(0xdddddd)]);db.position.set(1.17*KP+.08,1.6*KD,30.6*KP);g.add(db);
 bxs(g,.05,.55,.95,5.8-.06,1.9,30.0,0x111318,{roughness:.2});bxs(g,.01,.5,.9,5.8-.09,1.9,30.0,0x1f2a44,{roughness:.1});
 bxs(g,.2,.28,1.0,2.2,2.55,27.35+.12,0xf5f6f8);bxs(g,.19,.02,.9,2.2,2.43,27.35+.12,0xcfd3d8);
 /* ห้องช่างช่วงทางเดิน: จักรยาน 2 คัน + สามล้อสินค้าสีแดงใกล้ประตูออฟฟิศ */
 function bike(x,z,col){var gp=new THREE.Group();gp.position.set(x*KP,0,z*KP);gp.scale.setScalar(KD);gp.rotation.y=Math.PI/2;g.add(gp);
  [-.5,.5].forEach(function(dx){var w=new THREE.Mesh(new THREE.TorusGeometry(.33,.025,8,24),mat(0x111111));w.position.set(dx,.34,0);gp.add(w)});
  bx(gp,1.0,.03,.03,0,.6,0,col);bx(gp,.6,.03,.03,-.15,.45,0,col);bx(gp,.03,.5,.03,.15,.4,0,col);bx(gp,.2,.05,.1,-.25,.7,0,0x111111);bx(gp,.03,.03,.45,.5,.78,0,0x333333)}
 bike(-1.25,26.3,0x2563eb);bike(-1.25,27.0,0x16a34a);
 var tr=new THREE.Group();tr.position.set(-1.0*KP,0,30.5*KP);tr.scale.setScalar(KD);tr.rotation.y=Math.PI/2;g.add(tr);
 bx(tr,.9,.05,.9,.2,.3,0,0xc62828);bx(tr,.9,.3,.04,.2,.45,.43,0xc62828);bx(tr,.9,.3,.04,.2,.45,-.43,0xc62828);bx(tr,.04,.3,.9,.65,.45,0,0xc62828);bx(tr,.04,.3,.9,-.25,.45,0,0xc62828);
 [-.4,.4].forEach(function(z){var w=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.05,16),mat(0x111111));w.rotation.x=Math.PI/2;w.position.set(.25,.2,z);tr.add(w)});
 var fw=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.05,16),mat(0x111111));fw.rotation.x=Math.PI/2;fw.position.set(-.8,.2,0);tr.add(fw);bx(tr,.04,.6,.04,-.75,.6,0,0x444444);bx(tr,.03,.03,.5,-.75,.9,0,0x444444)};
// ===== ทั้งแผนก =====
D.build=function(THREE_,sc,racks){
 var g=new THREE.Group(),pick=[];sc.add(g);g.userData.pick=pick;
 function surf(m,n,ex){m.userData.surf=n;if(ex)Object.assign(m.userData,ex);pick.push(m);return m}
 D.floors.forEach(function(f,idx){var w=f[2]-f[0],d=f[3]-f[1],t=tex(TILE,w/2.5,d/2.5),m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat(0xffffff,{map:t,roughness:.95,metalness:0}));m.rotation.x=-Math.PI/2;m.position.set((f[0]+f[2])/2,.01+.002*idx,(f[1]+f[3])/2);m.receiveShadow=true;g.add(m);surf(m,"บนพื้น")});
 D.stairs.forEach(function(st){var steps=10,sl=st.x2-st.x1,dx=sl/steps,sd=st.z2-st.z1,zc=(st.z1+st.z2)/2;for(var i=0;i<steps;i++){var h=(i+1)*(.28*KD);bx(g,dx,h,sd-.1,st.x1+dx*(i+.5),h/2,zc,i%2?0x8e8e8a:0x9c9c97);bx(g,.03,.012,sd-.1,st.x1+dx*(i+1)-.015,h+.003,zc,0xd9b800)}
  [st.z1+.04,st.z2-.04].forEach(function(zz){for(var i=0;i<=steps;i+=2){var h=i*(.28*KD);bx(g,.04,.9+Math.max(h,(.28*KD)),.04,st.x1+dx*Math.min(i+.5,steps-.3),(.9+Math.max(h,(.28*KD)))/2,zz,0x6b7280,{metalness:.5})}
   var len=Math.hypot(sl,steps*(.28*KD)),r=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,len,8),mat(0x8b95a3,{metalness:.7,roughness:.3}));r.position.set(st.x1+sl/2,(.28*KD)*steps/2+.95,zz);r.rotation.z=Math.PI/2-Math.atan2(steps*(.28*KD),sl);g.add(r)});
  var t=label(st.n,"#475569",3);t.position.set((st.x1+st.x2)/2,3.9*KD,zc);g.add(t)});
 D.walls.forEach(function(w){wall(g,w[0],w[1],w[2],w[3],w[4],w[5])});
 D.doors.forEach(function(d){bx(g,.3,.03,d[2]-d[1],d[0],.04,(d[1]+d[2])/2,0x16a34a)});
 var woodM=mat(0xffffff,{map:tex(WOOD,1,1),roughness:.6}),steelM=mat(0xffffff,{map:tex(STEELT,2,2),roughness:.4,metalness:.5});
 D.furn.forEach(function(f){var t=f.t;
  if(t==="table"){D.desk(g,f,surf)}
  else if(t==="bench"){var top=f.h,m=new THREE.Mesh(new THREE.BoxGeometry(f.w,.05,f.d),mat(0x1c1d21,{roughness:.45,metalness:.25}));m.position.set(f.x,top-.025,f.z);m.castShadow=m.receiveShadow=true;g.add(m);surf(m,"บน"+f.n);
   [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){bx(g,.06,top-.05,.06,f.x+q[0]*(f.w/2-.06),(top-.05)/2,f.z+q[1]*(f.d/2-.06),0x2a5d9f)});
   bx(g,f.w-.1,.03,f.d-.1,f.x,.22,f.z,0x6b7a90)}
  else if(t==="mtable"){D.mtable(g,f,surf)}
  else if(t==="wbench"){D.wbench(g,f,surf,woodM)}
  else if(t==="cab2"){D.cab2(g,f,surf)}
  else if(t==="drawers"){D.drawers(g,f,surf,pick)}
  else if(t==="inkjet"){D.inkjet(g,f,surf)}
  else if(t==="stool"){var grp=new THREE.Group();grp.position.set(f.x,0,f.z);g.add(grp);
   var seat=new THREE.Mesh(new THREE.CylinderGeometry(f.r*.62,f.r*.58,.07,24),mat(0x1f2937,{roughness:.9}));seat.position.y=f.h;seat.castShadow=true;grp.add(seat);
   var bk=bx(grp,f.r*1.1,.32,.05,0,f.h+.28,-f.r*.55,0x1f2937);
   var l=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,f.h-.05,10),mat(0x94a3b8,{metalness:.6}));l.position.y=(f.h-.05)/2+.04;grp.add(l);
   for(var i=0;i<5;i++){var sp=bx(grp,f.r*.9,.025,.04,0,.05,0,0x64748b);sp.position.set(Math.cos(i*1.2566)*f.r*.4,.05,Math.sin(i*1.2566)*f.r*.4);sp.rotation.y=-i*1.2566}}
  else if(t==="belt"){var tr=new THREE.Mesh(new THREE.TorusGeometry(f.r*.72,f.r*.28,12,28),mat(0x1f2937,{roughness:.95}));tr.rotation.x=Math.PI/2;tr.position.set(f.x,f.r*.3,f.z);tr.castShadow=true;g.add(tr)}
  else if(t==="cabinet"){var sx=(f.w<f.d)?(f.x<(BND[0]+BND[2])/2?1:-1):0,sz=(f.w<f.d)?0:(f.z<(BND[1]+BND[3])/2?1:-1);
   var cc=f.col?hex(f.col):0xb4bfcc,m=bx(g,f.w,f.h,f.d,f.x,f.h/2,f.z,cc);surf(m,"บนตู้");
   var fw=f.w<f.d?f.d:f.w,ox=sx*(f.w/2+.006),oz=sz*(f.d/2+.006),n2=fw>.9?2:1;
   for(var q=0;q<n2;q++){var off=(q+.5)/n2*fw-fw/2;
    var pn=f.w<f.d?bx(g,.012,f.h-.08,fw/n2-.03,f.x+ox,f.h/2,f.z+off,f.glass?0xcfe8ff:cc):bx(g,fw/n2-.03,f.h-.08,.012,f.x+off,f.h/2,f.z+oz,f.glass?0xcfe8ff:cc,f.glass?{transparent:true,opacity:.4}:null);
    if(f.w<f.d)bx(g,.03,.22,.03,f.x+sx*(f.w/2+.02),f.h*.5,f.z+off+(q?.12:-.12)*(fw/n2>.4?1:.4),0x1e293b);else bx(g,.03,.22,.03,f.x+off+(q?-.12:.12),f.h*.5,f.z+sz*(f.d/2+.02),0x1e293b)}}
  else if(t==="column"){bx(g,f.w,f.h,f.d,f.x,f.h/2,f.z,0xf2e6bd);bx(g,f.w+.02,1.3,f.d+.02,f.x,.65,f.z,0xf0c419)}
  else if(t==="fridge"){var m=bx(g,f.w,f.h,f.d,f.x,f.h/2,f.z,(f.old?0xe6dfc8:0xeef2f6),{roughness:.3,metalness:.2});surf(m,"บนตู้เย็น");bx(g,f.w-.02,.015,.01,f.x,f.h*.62,f.z+f.d/2+.003,0x94a3b8);bx(g,.04,.5,.04,f.x-f.w/2+.1,f.h*.78,f.z+f.d/2+.03,0x64748b);bx(g,.04,.4,.04,f.x-f.w/2+.1,f.h*.35,f.z+f.d/2+.03,0x64748b)}
  else if(t==="bin"){bx(g,f.w,f.h,f.d,f.x,f.h/2,f.z,0xc0392b);bx(g,f.w+.04,.05,f.d+.04,f.x,f.h,f.z,0x962d22)}
  else if(t==="dispenser"){bx(g,f.w,f.h,f.d,f.x,f.h/2,f.z,0xe2e8f0,{roughness:.3});bx(g,f.w*.7,.3,f.d*.5,f.x,f.h*.66,f.z,0x3b82f6,{transparent:true,opacity:.75});bx(g,.06,.06,.04,f.x,f.h*.5,f.z+f.d/2,0x1e293b)}
  else if(t==="lathe"){D.lathe(g,f,surf)}
  else {bx(g,f.w,f.h*.8,f.d,f.x,f.h*.4,f.z,f.col?hex(f.col):0x5b6b82,{metalness:.35,roughness:.5});var m=bx(g,f.w*.92,f.h*.2,f.d*.92,f.x,f.h*.9,f.z,0xcbd5e1,{metalness:.3});surf(m,"บน"+(f.n||"เครื่องจักร"));bx(g,.1,.3,.1,f.x+f.w*.3,f.h+.15,f.z,0xef4444)}});
 D.extra(g,surf);
 D._sg=[];Object.keys(racks).forEach(function(k){D.rackBuild(g,k,racks[k],pick)});
 D.labels.forEach(function(l){var t=label(l[0],l[4],l[5]);t.position.set(l[1],l[2],l[3]);g.add(t)});
 return g};
// ===== หาเส้นทาง: เดินตามทางเดิน/ช่องทางเดินในห้อง (Dijkstra) =====
function nearestOnEdge(p,a,b){var dx=b[0]-a[0],dz=b[1]-a[1],L=dx*dx+dz*dz,t=L?((p[0]-a[0])*dx+(p[1]-a[1])*dz)/L:0;t=Math.max(0,Math.min(1,t));return{t:t,pt:[a[0]+dx*t,a[1]+dz*t]}}
D.routeTo=function(c,rect){var N=D.nodes,best=null;
 D.edges.forEach(function(e){var o=nearestOnEdge(c,N[e[0]],N[e[1]]),d=Math.hypot(o.pt[0]-c[0],o.pt[1]-c[1]);if(!best||d<best.d)best={d:d,e:e,t:o.t,pt:o.pt}});
 if(!best)return null;
 var dist={},prev={},todo=Object.keys(N);todo.forEach(function(k){dist[k]=1e9});dist.E=0;
 var adj={};D.edges.forEach(function(e){(adj[e[0]]=adj[e[0]]||[]).push(e[1]);(adj[e[1]]=adj[e[1]]||[]).push(e[0])});
 while(todo.length){todo.sort(function(a,b){return dist[a]-dist[b]});var u=todo.shift();if(dist[u]>=1e9)break;(adj[u]||[]).forEach(function(v){var w=Math.hypot(N[u][0]-N[v][0],N[u][1]-N[v][1]);if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;prev[v]=u}})}
 var a=best.e[0],b=best.e[1],da=dist[a]+Math.hypot(N[a][0]-best.pt[0],N[a][1]-best.pt[1]),db=dist[b]+Math.hypot(N[b][0]-best.pt[0],N[b][1]-best.pt[1]),s=da<=db?a:b,path=[];
 for(var n=s;n;n=prev[n])path.unshift(N[n]);
 path.push(best.pt);
 if(rect)path.push([Math.max(rect[0],Math.min(rect[2],best.pt[0])),Math.max(rect[1],Math.min(rect[3],best.pt[1]))]);else path.push(c);
 return path.map(function(q){return[q[0],.15,q[1]]})};
// ===== เส้นนำทางแบบ A* บนกริด: เลี่ยงกำแพง/ตู้/ชั้นวาง ไม่ทะลุโมเดล =====
D.pathTo=function(tgt,racks){
 var col=D.colliders(racks),B=D.bounds,R=.3,S=.1,x0=B[0]-.5,z0=B[1]-.5,W=Math.ceil((B[2]-B[0]+1.5)/S),H=Math.ceil((B[3]-B[1]+2.2)/S);
 function blk(x,z){for(var k=0;k<col.length;k++){var c=col[k],qx=Math.max(c[0],Math.min(c[2],x)),qz=Math.max(c[1],Math.min(c[3],z));if(Math.hypot(x-qx,z-qz)<R)return true}return false}
 var g=new Uint8Array(W*H);for(var j=0;j<H;j++)for(var i=0;i<W;i++)g[j*W+i]=blk(x0+(i+.5)*S,z0+(j+.5)*S)?1:0;
 function cell(p){return[Math.max(0,Math.min(W-1,Math.floor((p[0]-x0)/S))),Math.max(0,Math.min(H-1,Math.floor((p[1]-z0)/S)))]}
 function near(c){if(!g[c[1]*W+c[0]])return c;for(var r=1;r<80;r++){var b=null,bd=1e9;for(var dj=-r;dj<=r;dj++)for(var di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;var a=c[0]+di,e=c[1]+dj;if(a<0||e<0||a>=W||e>=H||g[e*W+a])continue;var d=di*di+dj*dj;if(d<bd){bd=d;b=[a,e]}}if(b)return b}return c}
 var st=D.entry,s=near(cell([st[0],st[1]-.8])),t=near(cell(tgt)),N=W*H,TURN=12;
 // A* แบบเดินตรงตามแกน (ซ้าย/ขวา/หน้า/หลัง) มีค่าปรับเมื่อเลี้ยว => เส้นตรง เลี้ยวฉาก ไม่เอียง
 var gs=new Float32Array(N*4).fill(1e9),pv=new Int32Array(N*4).fill(-1),hp=[],DX=[1,-1,0,0],DZ=[0,0,1,-1];
 function push(f,n){hp.push([f,n]);var k=hp.length-1;while(k>0){var p=(k-1)>>1;if(hp[p][0]<=hp[k][0])break;var q=hp[p];hp[p]=hp[k];hp[k]=q;k=p}}
 function pop(){var top=hp[0],last=hp.pop();if(hp.length){hp[0]=last;var k=0;for(;;){var l=2*k+1,r=l+1,m=k;if(l<hp.length&&hp[l][0]<hp[m][0])m=l;if(r<hp.length&&hp[r][0]<hp[m][0])m=r;if(m===k)break;var q=hp[m];hp[m]=hp[k];hp[k]=q;k=m}}return top}
 var si=s[1]*W+s[0];for(var d0=0;d0<4;d0++){gs[si*4+d0]=0;push(Math.abs(s[0]-t[0])+Math.abs(s[1]-t[1]),si*4+d0)}
 var end=-1,ti=t[1]*W+t[0];
 while(hp.length){var cur=pop()[1],cc=cur>>2,cd=cur&3;if(cc===ti){end=cur;break}
  var cx=cc%W,cz=(cc-cx)/W,base=gs[cur];
  for(var d=0;d<4;d++){var a=cx+DX[d],e=cz+DZ[d];if(a<0||e<0||a>=W||e>=H||g[e*W+a])continue;var ns=(e*W+a)*4+d,ng=base+1+(d!==cd&&cc!==si?TURN:0);
   if(ng<gs[ns]){gs[ns]=ng;pv[ns]=cur;push(ng+Math.abs(a-t[0])+Math.abs(e-t[1]),ns)}}}
 if(end<0)return null;
 var cells=[];for(var n=end;n>=0;n=pv[n]){var c2=n>>2,nx=c2%W;cells.unshift([nx,(c2-nx)/W])}
 // รวมจุดที่เรียงเป็นเส้นเดียวกัน เหลือเฉพาะมุมเลี้ยว
 var cor=[cells[0]];for(var k=1;k<cells.length-1;k++){var p0=cells[k-1],p1=cells[k],p2=cells[k+1];if((p1[0]-p0[0])*(p2[1]-p1[1])-(p1[1]-p0[1])*(p2[0]-p1[0])!==0)cor.push(p1)}
 cor.push(cells[cells.length-1]);
 function seg(a,b){var dx=Math.sign(b[0]-a[0]),dz=Math.sign(b[1]-a[1]),x=a[0],z=a[1];while(true){if(g[z*W+x])return false;if(x===b[0]&&z===b[1])return true;x+=dx;z+=dz}}
 // ลดจำนวนมุมเลี้ยว: ลองต่อด้วยรูปตัว L (ฉากเสมอ) ข้ามหลายมุม
 var out=[cor[0]],ia=0;
 while(ia<cor.length-1){var jb=cor.length-1,done=false;
  for(;jb>ia;jb--){var A=cor[ia],Bq=cor[jb];
   if(A[0]===Bq[0]||A[1]===Bq[1]){if(seg(A,Bq)){out.push(Bq);done=true;break}continue}
   var m1=[Bq[0],A[1]],m2=[A[0],Bq[1]];
   if(seg(A,m1)&&seg(m1,Bq)){out.push(m1,Bq);done=true;break}
   if(seg(A,m2)&&seg(m2,Bq)){out.push(m2,Bq);done=true;break}}
  if(!done){out.push(cor[ia+1]);jb=ia+1}ia=jb}
 // ลบจุดซ้ำ/จุดตรงกลางที่อยู่แนวเดียวกัน
 var fin=[];out.forEach(function(p){var l=fin.length;if(l&&fin[l-1][0]===p[0]&&fin[l-1][1]===p[1])return;if(l>1){var a=fin[l-2],b=fin[l-1];if((b[0]-a[0])*(p[1]-b[1])-(b[1]-a[1])*(p[0]-b[0])===0)fin.pop()}fin.push(p)});
 return fin.map(function(q){return[x0+(q[0]+.5)*S,.15,z0+(q[1]+.5)*S]})};
D.route=function(key,racks){var r=racks[key];return r?D.pathTo([r.x,r.z],racks):null};
D.colliders=function(racks){var c=[];
 D.walls.forEach(function(w){var horiz=Math.abs(w[1]-w[3])<1e-6,a=horiz?w[0]:w[1],b=horiz?w[2]:w[3],fix=horiz?w[1]:w[0],cur=Math.min(a,b),end=Math.max(a,b),segs=[];
  (w[4]||[]).slice().sort(function(p,q){return p[0]-q[0]}).forEach(function(q){if(q[0]>cur)segs.push([cur,q[0]]);cur=q[1]});if(end>cur)segs.push([cur,end]);
  segs.forEach(function(s){c.push(horiz?[s[0],fix-.08,s[1],fix+.08]:[fix-.08,s[0],fix+.08,s[1]])})});
 D.furn.forEach(function(f){if(!f.w||!f.d||f.t==="belt")return;c.push([f.x-f.w/2,f.z-f.d/2,f.x+f.w/2,f.z+f.d/2])});
 D.stairs.forEach(function(st){c.push([st.x1,st.z1,st.x2,st.z2])});
 Object.keys(racks).forEach(function(k){var r=racks[k];c.push([r.x-r.w/2,r.z-r.d/2,r.x+r.w/2,r.z+r.d/2])});return c};
window.spDept=D;
})();
