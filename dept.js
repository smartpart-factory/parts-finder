/* ===== โมเดล 3 มิติแผนก ชั้น 1 (ต่อตามลูกศรทางเดิน: ทางเข้าอยู่ล่างสุดของหน้า 1 → เดินขึ้นไปหน้า 2 → หน้า 3 อยู่เหนือสุด) =====
 หน่วยเป็นเมตร: x = ซ้าย→ขวา, z = เหนือ→ใต้ (z มาก = ใต้) ประมาณจากสัดส่วนในภาพ (โต๊ะยาว ~1.6 ม.) แก้ตัวเลขได้โดยตรง
 walls=[x1,z1,x2,z2,ช่องประตู[[z1,z2]],ความสูง]  floors=[x1,z1,x2,z2,สี]  doors=[x,z1,z2,ชื่อ]  labels=[ข้อความ,x,y,z,สี,ขนาด]
 furn: t=ชนิด table stool column machine lathe bin bench dispenser belt fridge   ชั้นวาง/ตู้เก็บอะไหล่อยู่ใน SP_RACKS (data.js) */
var KP=1.5,KD=1.25;
var SP_DEPT={"bounds":[-2.4,0.0,8.85,50.625],"entry":[-1.2,49.5],"walls":[[-2.4,0.0,8.7,0.0],[-2.4,50.63,8.7,50.63],[-2.4,0.0,-2.4,50.63],[8.7,0.0,8.7,50.63],[0.0,0.0,0.0,50.63,[],1.25],[1.755,35.01,8.7,35.01],[1.755,41.025,8.7,41.025],[1.755,48.915,8.7,48.915],[1.755,35.01,1.755,48.915,[[41.985,43.68]]],[6.255,48.915,6.255,50.625],[1.905,0.075,8.7,0.075],[1.905,9.315,8.7,9.315],[1.905,0.075,1.905,9.315,[[7.545,9.3]]],[2.895,9.315,2.895,11.4]],"floors":[[-2.4,0.0,0.0,50.63,"#c9d1de"],[0.0,0.0,8.7,50.63,"#e3e8f0"],[1.755,35.01,8.7,41.025,"#b4bccb"],[1.905,0.075,8.7,9.315,"#eaeff7"],[2.895,9.315,8.7,11.4,"#b8c2d3"],[6.255,48.915,8.7,50.625,"#b8c2d3"]],"stairs":[{"x1":2.895,"z1":9.315,"x2":8.7,"z2":11.4,"n":"บันไดไปชั้น 2"},{"x1":6.255,"z1":48.915,"x2":8.7,"z2":50.625,"n":"บันไดไปชั้น 1"}],"doors":[[1.905,7.545,9.3,"ประตูเลื่อน"],[1.755,41.985,43.68,"ประตูคู่"]],"labels":[["ห้องเก็บอะไหล่",4.755,5.75,4.575,"#1d4ed8",5.0],["ห้องช่าง",4.35,5.75,17.85,"#1d4ed8",3.75],["แผนกอื่น",5.25,4.0,38.0175,"#7c2d12",3.75],["พื้นที่โต๊ะนั่ง",4.8,3.25,32.98,"#1d4ed8",3.75],["ห้องโต๊ะทำงาน",5.25,4.25,44.97,"#1d4ed8",4.25],["ทางเดิน",-1.2,1.5,6.0,"#475569",2.75],["ทางเดิน",-1.2,1.5,22.5,"#475569",2.75],["ทางเดิน",-1.2,1.5,39.0,"#475569",2.75],["ทางเข้า",-1.2,1.625,48.3,"#15803d",2.5]],"shell":{"C1":"cab","C2":"cab","C3":"cab","C4":"cab","C5":"cab","K1":"cab","G1":"glass"},"furn":[{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.28,"z":31.86,"w":0.6875,"d":1.3},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.905,"z":32.19,"w":0.7,"d":1.3125},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.865,"z":34.38,"w":1.3125,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":4.725,"z":34.365,"w":1.3125,"d":0.6875},{"t":"table","n":"โต๊ะ","h":0.9375,"x":6.57,"z":34.395,"w":1.3125,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.535,"z":44.715,"w":1.1875,"d":0.6875},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.505,"z":46.23,"w":1.1375,"d":0.7},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.49,"z":47.625,"w":1.1125,"d":0.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.92,"z":44.265,"w":1.275,"d":0.775},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.965,"z":45.87,"w":1.2,"d":0.8125},{"t":"table","n":"โต๊ะ","h":0.9375,"x":8.01,"z":47.25,"w":1.1625,"d":0.65},{"t":"bench","n":"โต๊ะใหญ่","h":0.9375,"x":4.935,"z":42.105,"w":2.8125,"d":0.9375},{"t":"cabinet","n":"ตู้","h":2.25,"x":8.295,"z":42.39,"w":0.725,"d":1.4625},{"t":"cabinet","n":"ตู้","h":2.25,"x":4.92,"z":48.48,"w":2.1125,"d":0.7125},{"t":"fridge","n":"ตู้เย็น","h":2.125,"x":8.13,"z":34.125,"w":0.6125,"d":0.6},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.195,"z":31.755,"r":0.275},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.975,"z":32.13,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.775,"z":33.45,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":4.785,"z":33.42,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.48,"z":33.465,"r":0.2875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.415,"z":45.435,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.355,"z":46.905,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":2.385,"z":48.285,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.115,"z":45.015,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.115,"z":46.575,"r":0.1875},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":8.13,"z":47.865,"r":0.1875},{"t":"machine","n":"เครื่องจักรขนาดเล็ก","h":1.25,"x":7.215,"z":16.155,"w":1.8375,"d":0.85,"col":"#2f6fb3"},{"t":"lathe","n":"เครื่องกลึง","h":1.5,"x":2.25,"z":15.735,"w":0.9625,"d":1.75},{"t":"bin","n":"ถังขยะ","h":1.0,"x":2.055,"z":20.01,"w":0.7375,"d":0.5625},{"t":"bin","n":"ถังขยะ","h":1.0,"x":2.055,"z":20.685,"w":0.7375,"d":0.5625},{"t":"wbench","n":"โต๊ะทำงานช่าง (มีปากกาจับชิ้นงาน)","h":1.0625,"x":4.8,"z":20.745,"w":1.125,"d":2.25},{"t":"inkjet","n":"เครื่องพ่นวันที่ (Videojet)","h":1.0625,"x":2.4,"z":1.35,"w":0.625,"d":0.625},{"t":"drawers","n":"ตู้ลิ้นชัก 5×10","id":"DRW1","cols":5,"rows":10,"h":1.075,"x":5.04,"z":27.225,"w":1.1875,"d":0.5,"face":1},{"t":"bench","n":"โต๊ะ/เครื่อง","h":1.125,"x":5.04,"z":25.98,"w":1.7375,"d":1.1625},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.83,"z":24.555,"w":0.825,"d":2.2625},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.31,"z":28.275,"w":0.9875,"d":1.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":2.295,"z":30.12,"w":1.0,"d":1.525},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.845,"z":28.245,"w":0.9875,"d":1.5375},{"t":"table","n":"โต๊ะ","h":0.9375,"x":7.845,"z":30.105,"w":0.9875,"d":1.5},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":5.085,"z":24.465,"r":0.4},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.855,"z":24.435,"r":0.3625},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.57,"z":28.185,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":3.555,"z":30.0,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.585,"z":28.35,"r":0.3375},{"t":"stool","n":"เก้าอี้","h":0.5625,"x":6.585,"z":30.165,"r":0.3375},{"t":"column","n":"เสา","h":4.0,"x":1.965,"z":26.865,"w":0.4375,"d":0.7625},{"t":"column","n":"เสา","h":4.0,"x":7.965,"z":26.715,"w":0.6625,"d":0.6625},{"t":"dispenser","n":"ตู้กดน้ำ","h":1.375,"x":2.73,"z":26.79,"w":0.6875,"d":0.6875}],"rackNames":{"S1":"เซลเหล็กวางของ 3 ชั้น","S2":"เซลเหล็กวางของ 3 ชั้น","C1":"ตู้เหล็ก HEAVY 2 ประตู 8 ชั้น","C2":"ตู้เหล็ก 2 ประตู 5 ชั้น (กล่องพลาสติก)","C3":"ตู้เหล็กสีเขียวขี้ม้า 2 ประตู 4 ชั้น","C4":"ตู้เหล็กสีครีม 2 ประตู 4 ชั้น","C5":"ตู้เหล็ก HEAVY 2 ประตู 8 ชั้น","G1":"ตู้กระจก","L1":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L2":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L3":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","L4":"ตู้เหล็ก 2 ชั้น ไม่มีประตู","W1":"เซลเหล็ก 4 ชั้น","W2":"เซลเหล็ก 4 ชั้น","K1":"ตู้เหล็กบานเลื่อน 2 ชั้น"},"nodes":{"E":[-1.2,49.5],"Se":[0.825,49.5],"r0":[0.75,24.15],"D":[1.905,8.43],"Sd":[0.825,8.43],"Di":[2.46,8.43],"a":[2.46,8.22],"b":[5.145,8.22],"c":[5.145,1.275],"d":[7.38,1.275],"e":[7.38,8.22],"f":[2.46,1.275],"r1":[0.75,12.15],"r2":[3.45,12.15],"r3":[5.85,12.15],"r4":[5.85,14.4],"r5":[5.85,16.05]},"edges":[["E","Se"],["Se","r0"],["r0","r1"],["r1","Sd"],["Sd","D"],["D","Di"],["Di","a"],["a","b"],["b","c"],["c","d"],["d","e"],["b","e"],["a","f"],["f","c"],["r1","r2"],["r2","r3"],["r3","r4"],["r4","r5"]],"seams":[11.4,31.035],"zbottom":50.625};
(function(){
var D=SP_DEPT;D.KP=KP;D.KD=KD;
/* ปรับข้อมูลเฟอร์นิเจอร์ให้ตรงรูปจริง */
(function(){var F=D.furn;
 F[11].t="mtable";F[11].n="โต๊ะประชุมสีขาว";F[11].h=.75;
 F[12].col="#b8a878";F[12].n="ตู้เหล็กสีกากี 2 บาน";
 var c=F[13];F.splice(13,1,{t:"cabinet",n:"ตู้กระจกสีเทา",h:1.8,x:c.x-c.w/4,z:c.z,w:c.w/2-.02,d:c.d,col:"#8a8f98",glass:1},{t:"cabinet",n:"ตู้กระจกสีเทา",h:1.8,x:c.x+c.w/4,z:c.z,w:c.w/2-.02,d:c.d,col:"#8a8f98",glass:1});
 F.forEach(function(f){if(f.t==="fridge"){f.old=1}if(f.t==="bin"){f.col="#c0392b"}});
})();
/* ลิ้นชักของโต๊ะ: สร้าง "ลิ้นชักเสมือน" ต่อโต๊ะ 1 ชุด (แถว1 = ลิ้นชักกลาง, แถว2 = ลิ้นชัก 3 ชั้นด้านขวา) ให้วางอะไหล่ได้เหมือนตู้ลิ้นชัก */
D.faceRot=function(f){return f.rot!=null?f.rot:(f.face===-1?Math.PI:0)};
D.deskInfo=function(f){if(f._i)return f._i;
 var L=Math.max(f.w,f.d),S=Math.min(f.w,f.d),h=f.h,best=1e9,tg=null,cx=(D.bounds[0]+D.bounds[2])/2,cz=(D.bounds[1]+D.bounds[3])/2,rot,sgn;
 D.furn.forEach(function(q){if(q.t!=="stool")return;var d=Math.hypot(q.x-f.x,q.z-f.z);if(d<best){best=d;tg=q}});
 if(f.w>=f.d){sgn=((tg?tg.z:cz)>=f.z)?1:-1;rot=sgn>0?0:Math.PI}else{sgn=((tg?tg.x:cx)>=f.x)?1:-1;rot=sgn>0?Math.PI/2:-Math.PI/2}
 var legH=.1;return f._i={nw:!!f.nw,L:L,S:S,h:h,rot:rot,legH:legH,bodyH:h-.035-legH,pw:Math.min(.42,L*.3),off:f.z>26}};
D.deskRows=function(I){var tot=I.bodyH-.08,fr=[.22,.3,.48],y=I.legH+I.bodyH-.03,out=[];fr.forEach(function(k){var hh=tot*k;out.push({y:y-hh/2,h:hh-.016});y-=hh+.01});return out};
(function(){var k=0,add=[];D.furn.forEach(function(f){if(f.t!=="table")return;f.did="DSK"+(++k);if(k===9||k===10)f.nw=1;var I=D.deskInfo(f),rr=Math.abs(Math.sin(I.rot))>.5;
 add.push({t:"deskdw",id:f.did,n:"โต๊ะ (ลิ้นชัก)",cols:I.nw?2:3,rows:3,x:f.x,z:f.z,h:f.h,w:rr?I.S:I.L,d:rr?I.L:I.S,rot:I.rot,I:I})});
 add.forEach(function(a){D.furn.push(a)})})();
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
  var wm=bx(g,horiz?L:.14,H,horiz?.14:L,cx,H/2,cz,0xf0e2b4,{transparent:true,opacity:H<2?.6:.5,depthWrite:false});wm.userData.surf="ผนัง";wm.userData.wall=1;if(g.userData.pick)g.userData.pick.push(wm);
  bx(g,horiz?L:.17,.12,horiz?.17:L,cx,.06,cz,0xd8c88f);
  bx(g,horiz?L:.16,.06,horiz?.16:L,cx,H,cz,0x64748b)})}
var BND=D.bounds;
function frontSign(r){var cx=(BND[0]+BND[2])/2,cz=(BND[1]+BND[3])/2;return r.w>=r.d?(r.z<cz?1:-1):(r.x<cx?1:-1)}
// ===== ชั้นวาง: เชลเหล็ก (ฟ้า-ส้ม) / ตู้เหล็ก / ตู้กระจก / ตู้เปิดโล่ง =====
D.rackBuild=function(g,k,r,pick){
 var nm=(D.rackNames&&D.rackNames[k])||"เซลเหล็ก",kind=/กระจก/.test(nm)?"glass":/บานเลื่อน/.test(nm)?"slide":/ไม่มีประตู/.test(nm)?"open":/ประตู|ตู้/.test(nm)?"cab":"steel";
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
  /* ตู้ C1–C5 ตามรูปจริง: [สีตัวตู้, สีบาน, ชนิด, สีชั้น] */
  var CS=({C1:[0x4a4f56,0x5b6169,"heavy",0x6c727a],C5:[0x4a4f56,0x5b6169,"heavy",0x6c727a],C4:[0xd8d2bb,0xe4dec9,"num",0xe6e0c8],C3:[0xc9caad,0xb9ba9c,"num2",0xd2d3b7],C2:[0x9aa3ad,0xaab3bc,"bin",0xb4bcc6]})[k]||[0x8d97a3,0x9aa4af,"",0xb7c3d1],bc=CS[0],dc=CS[1],ck=CS[2];
  bx(grp,L,h,.016,0,h/2,-S/2+.008,bc);bx(grp,.016,h,S,-L/2+.008,h/2,0,bc);bx(grp,.016,h,S,L/2-.008,h/2,0,bc);
  bx(grp,L,.025,S,0,h-.0125,0,bc);bx(grp,L,.05,S,0,.025,0,ck==="heavy"?0x3a3e44:0x6b7a8d);
  for(n=1;n<=r.n;n++){var by2=D.shelfY(r,n);board(n,L-.034,.016,S-.02,CS[3]);
   if(ck==="num"||ck==="num2"){var nl=ck==="num"?5:6;for(var j=0;j<nl;j++)if(by2>.2)bx(grp,.05,.024,.004,-L/2+.1+j*(L-.2)/(nl-1),by2-.026,S/2-.012,ck==="num"?0x1d4ed8:0x111827)}}
  if(ck==="heavy"){bx(grp,.2,.05,.008,-L/2+.3,h-.07,S/2+.002,0xffffff);bx(grp,.18,.034,.01,-L/2+.3,h-.07,S/2+.004,0xdc2626)}
  var dn=L>.6?2:1,dw=L/dn;
  for(var q=0;q<dn;q++){var cx=-L/2+dw*(q+.5);
   bx(grp,dw-.012,h-.07,.016,cx,h/2+.01,S/2-.008,dc,{roughness:.6,metalness:.1,transparent:true,opacity:.3,depthWrite:false});
   bx(grp,dw-.012,.025,.02,cx,h-.04,S/2-.008,0x7d8da0);bx(grp,dw-.012,.025,.02,cx,.06,S/2-.008,0x7d8da0);
   bx(grp,.025,.2,.03,cx+(dn===2?(q===0?dw/2-.07:-dw/2+.07):.12),h*.52,S/2+.015,0x1e293b)}
 }else if(kind==="slide"){
  var sc=0x8b8d7c,dcl=0xb3b49c,by=.1+(h-.1)/2;
  bx(grp,L,h-.1,.018,0,by,-S/2+.009,sc);bx(grp,.018,h-.1,S,-L/2+.009,by,0,sc);bx(grp,.018,h-.1,S,L/2-.009,by,0,sc);
  bx(grp,L,.035,S,0,h-.0175,0,0x7c7e6f);bx(grp,L-.06,.1,S-.06,0,.05,0,0x6f7164);
  for(n=1;n<=r.n;n++)board(n,L-.04,.016,S-.03,0xa4a591);
  var dwd=(L-.06)/2+.03,dhh=h-.2,dy=.12+dhh/2;
  bx(grp,dwd,dhh,.014,-L/2+.03+dwd/2,dy,S/2-.006,dcl,{roughness:.6,transparent:true,opacity:.4,depthWrite:false});
  bx(grp,dwd,dhh,.014,L/2-.03-dwd/2,dy,S/2-.026,dcl,{roughness:.6,transparent:true,opacity:.4,depthWrite:false});
  bx(grp,.035,.11,.018,-L/2+.085,h*.5,S/2+.006,0xeeeadb);bx(grp,.035,.11,.018,L/2-.085,h*.5,S/2-.014,0xeeeadb);bx(grp,.03,.08,.018,.015,h*.5,S/2+.006,0xf4f4ee);bx(grp,.008,dhh,.012,.0,dy,S/2+.004,0x7c7e6f);
  bx(grp,.12,.03,.01,-L/2+.2,h-.04,S/2+.004,0xffffff);
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
// ===== โมเดลอะไหล่ชุดใหม่ (ตามรูปถ่ายจริง) — ใช้กับ D.model: คืน true เมื่อสร้างสำเร็จ =====
D.modelX=function(t,g,box,cyl,tor,M){
 var TC=D._tc||(D._tc={}),PI=Math.PI;
 function tex(k,cw,ch,fn){if(TC[k])return TC[k];var c=document.createElement("canvas");c.width=cw;c.height=ch;fn(c.getContext("2d"),cw,ch);var tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return TC[k]=tx}
 function pl(w,h,tx,x,y,z,face,rot){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:tx,transparent:true,roughness:.6,metalness:.05,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));m.position.set(x,y,z);m.rotation.order="YXZ";
  if(face==="y"){m.rotation.x=-PI/2;if(rot)m.rotation.y=rot}else if(face==="x"){m.rotation.y=PI/2}else{if(rot)m.rotation.z=rot}g.add(m);return m}
 function cy(r1,r2,h,x,y,z,c,o,ax){var m=cyl(r1,r2,h,c,o,ax);m.position.set(x,y,z);return m}
 function hx(r,h,x,y,z,c,o){var m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,6),M(c,o));m.position.set(x,y,z);g.add(m);return m}
 function sp(r,x,y,z,c,o){var m=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),M(c,o));m.position.set(x,y,z);g.add(m);return m}
 function bx(w,h,d,x,y,z,c,o,ry,rz){var m=box(w,h,d,x,y,z,c,o);if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;return m}
 function tube(pts,r,c,o,seg){var cv=new THREE.CatmullRomCurve3(pts.map(function(p){return new THREE.Vector3(p[0],p[1],p[2])}));var m=new THREE.Mesh(new THREE.TubeGeometry(cv,seg||40,r,6,false),M(c,o));g.add(m);return m}
 function helix(x0,x1,y,z,R,r,n,c){var pts=[],N=n*12;for(var i=0;i<=N;i++){var a=i/12*PI*2;pts.push([x0+(x1-x0)*i/N,y+Math.sin(a)*R,z+Math.cos(a)*R])}return tube(pts,r,c,{metalness:.8,roughness:.35},N*2)}
 function txt(ctx,s,x,y,size,col,w,al){ctx.fillStyle=col||"#111";ctx.font=(w||"700")+" "+size+"px Arial,sans-serif";ctx.textAlign=al||"center";ctx.textBaseline="middle";ctx.fillText(s,x,y)}
 var STEEL=0xc9ced3,DARK=0x15171b,BRASS=0xc9a143;
 if(t==="ranger"){
  /* Spectra Ranger — คอมพิวเตอร์อุตสาหกรรมแร็ค (วางตั้ง): แผงหน้าครีม ฝาตะแกรงดำ + ปุ่มทองเหลือง ประตูมีกุญแจและหน้าต่างมีคานทแยง */
  var CR=0xd9d6cc,CO={roughness:.6,metalness:.2};
  bx(.178,.33,.27,-.0,.2,-.015,CR,CO);bx(.19,.34,.007,0,.2,.1535,CR,CO);
  bx(.205,.012,.007,0,.378,.1535,CR,CO);bx(.205,.012,.007,0,.022,.1535,CR,CO);
  [-.07,-.035,.035,.07].forEach(function(x){bx(.011,.005,.002,x,.378,.1575,0x2a2a2a);bx(.011,.005,.002,x,.022,.1575,0x2a2a2a)});
  bx(.107,.154,.004,.023,.274,.158,0x15171b);
  pl(.1,.147,tex("rg_fan",256,360,function(c,w,h){c.fillStyle="#0e0f12";c.fillRect(0,0,w,h);for(var j=0;j<20;j++)for(var i=0;i<14;i++){c.fillStyle="#9a958a";c.beginPath();c.arc(12+i*17.5+(j%2)*8,12+j*17.5,5.2,0,7);c.fill()}}),.023,.274,.1602,"z");
  cy(.0055,.0055,.009,.067,.349,.1615,0xc2a04a,{metalness:.7,roughness:.35},"z");cy(.0055,.0055,.009,.055,.2,.1615,0xc2a04a,{metalness:.7,roughness:.35},"z");
  bx(.02,.05,.002,-.043,.327,.1585,0xb9bcc0);pl(.019,.049,tex("rg_sp",64,160,function(c,w,h){c.fillStyle="#c4c7cb";c.fillRect(0,0,w,h);c.save();c.translate(w/2,h/2);c.rotate(-PI/2);txt(c,"spectra",0,0,34,"#202327","800");c.restore()}),-.043,.327,.1598,"z");
  cy(.0027,.0027,.003,-.056,.318,.1565,0x22c55e,{emissive:0x16a34a,emissiveIntensity:.9},"z");cy(.0027,.0027,.003,-.056,.304,.1565,0x7f1d1d,{emissive:0xdc2626,emissiveIntensity:.3},"z");
  pl(.011,.036,tex("rg_ph",44,150,function(c,w,h){c.save();c.translate(w/2,h/2);c.rotate(-PI/2);txt(c,"POWER H.D.D",0,0,22,"#222","600");c.restore()}),-.047,.31,.1581,"z");
  bx(.011,.0065,.004,-.049,.248,.1585,0x1b1b1b);bx(.011,.0065,.004,-.037,.248,.1585,0x1b1b1b);bx(.009,.002,.0044,-.049,.2485,.1585,0x9ca3af,{metalness:.7});bx(.009,.002,.0044,-.037,.2485,.1585,0x9ca3af,{metalness:.7});
  bx(.052,.015,.002,-.052,.221,.1585,0x4a4a4e);pl(.05,.013,tex("rg_rg",200,52,function(c,w,h){c.fillStyle="#3e3e42";c.fillRect(0,0,w,h);txt(c,"Ranger",w/2,h/2+2,40,"#f3f3f3","800")}),-.052,.221,.1599,"z");
  bx(.122,.158,.012,.004,.108,.16,CR,CO);bx(.079,.106,.002,.004,.097,.1665,0x2a1a1c,{roughness:.2,metalness:.35});bx(.072,.098,.001,.004,.097,.1673,0x5a3a38,{roughness:.3});
  var tri=new THREE.Shape();tri.moveTo(-.04,-.053);tri.lineTo(-.04,.002);tri.lineTo(.03,-.053);tri.lineTo(-.04,-.053);var tm=new THREE.Mesh(new THREE.ShapeGeometry(tri),M(CR,CO));tm.position.set(.004,.097,.1676);g.add(tm);
  var dg=bx(.098,.014,.0025,.0035,.1,.1678,CR,CO);dg.rotation.z=-.62;
  bx(.014,.016,.004,.0005,.2,.1665,CR,CO);cy(.0075,.0075,.012,.0005,.18,.1675,0xb9bec4,{metalness:.9,roughness:.25},"z");bx(.0015,.006,.002,.0005,.18,.1738,0x222);
  bx(.016,.034,.001,-.062,.172,.1664,0xf4f4f2);pl(.014,.03,tex("rg_bc",40,90,function(c,w,h){c.fillStyle="#fff";c.fillRect(0,0,w,h);for(var i=0;i<30;i++){c.fillStyle="#111";c.fillRect(3+i*1.1,5,(i*7%3)+.6,60)}}),-.062,.172,.1672,"z");
  cy(.003,.003,.003,.058,.052,.1675,0x6b6b6b,{metalness:.7},"z")
  return true}
 if(t==="magarm"){
  /* แขนจับยึด (Magic arm): แกนโครเมียมกลาง + ปุ่มดำ + ก้านสองข้างต่างความยาว ปลายเป็นก้านลูกบอลสีดำ + สตั๊ดเกลียว */
  var CH={metalness:.92,roughness:.18};
  cy(.021,.021,.034,0,.04,0,0xd7dce0,CH);cy(.0095,.0095,.024,0,.069,0,0xcfd4d8,CH);cy(.012,.012,.006,0,.058,0,0x1a1a1a,{metalness:.2});
  var kn=cy(.026,.026,.011,0,.0845,0,0x151515,{metalness:.1,roughness:.5});for(var q=0;q<5;q++){var a=q*PI*2/5,l=cy(.012,.012,.011,Math.cos(a)*.019,.0845,Math.sin(a)*.019,0x151515,{metalness:.1,roughness:.5})}
  cy(.006,.006,.17,-.105,.05,-.012,0xdfe3e6,CH,"x");cy(.006,.006,.11,.075,.03,.012,0xdfe3e6,CH,"x");
  cy(.012,.012,.01,-.018,.05,-.012,0xc8cdd1,CH,"x");cy(.012,.012,.01,.018,.03,.012,0xc8cdd1,CH,"x");
  cy(.0185,.03,.075,-.215,.05,-.012,0x181a1d,{metalness:.2,roughness:.5},"x");sp(.0295,-.252,.05,-.012,0x181a1d,{metalness:.2,roughness:.45});
  cy(.0135,.02,.05,.14,.03,.012,0x181a1d,{metalness:.2,roughness:.5},"x");sp(.0195,.164,.03,.012,0x181a1d,{metalness:.2,roughness:.45});
  cy(.0045,.0045,.03,-.248,.085,-.012,0xd7dce0,CH);hx(.0085,.007,-.248,.073,-.012,0xc3c8cc,CH);
  cy(.0045,.0045,.03,.162,.065,.012,0xd7dce0,CH);hx(.0085,.007,.162,.053,.012,0xc3c8cc,CH);
  return true}
 if(t==="intcam"||t==="intcamb"){
  /* การ์ด INT CAM K190801: แผ่นเขียว ขั้วต่อเขียว แผงโลหะ 4 คอนเน็กเตอร์กลม DVI 2 ช่อง DB9+สายแพ ตัวต้านทานขาว ตัวเก็บประจุแดง */
  var S=.000241,X=function(p){return (p-705)*S},Z=function(p){return (p-992)*S},BY=.0016,GC=0x1f6b3a;
  bx(.2,.0016,.317,0,.0008,0,GC,{roughness:.5,metalness:.05});
  function tb(px0,px1,py0,py1,n,hor){var cx=X((px0+px1)/2),cz=Z((py0+py1)/2),w=(px1-px0)*S,d=(py1-py0)*S;bx(w,.012,d,cx,BY+.006,cz,0x2fa24f,{roughness:.55});for(var i=0;i<n;i++){var f=(i+.5)/n,sx=hor?X(px0)+w*f:cx,sz=hor?cz:Z(py0)+d*f;bx(hor?w/n*.7:w*.45,.004,hor?d*.45:d/n*.7,sx,BY+.014,sz,0x14301a);}}
  tb(530,905,385,470,10,true);tb(320,405,1325,1600,7,false);tb(440,830,1560,1650,9,true);
  bx(.042,.003,.158,X(785),BY+.0015,Z(965),0xb8bdc2,{metalness:.8,roughness:.35});
  [770,890,1020,1135].forEach(function(py){cy(.0125,.0125,.012,X(790),BY+.009,Z(py),0xbfc4c8,{metalness:.85,roughness:.3});cy(.009,.009,.003,X(790),BY+.0155,Z(py),0x18191c,{});for(var k=0;k<8;k++){var a=k*PI/4;cy(.0008,.0008,.002,X(790)+Math.cos(a)*.005,BY+.017,Z(py)+Math.sin(a)*.005,0x888,{})}});
  [[680,950],[990,1260]].forEach(function(r,i){var cx=X(935),cz=Z((r[0]+r[1])/2);bx(.034,.011,.064,cx,BY+.0075,cz,0xe7e3d4,{roughness:.6});bx(.027,.006,.056,cx,BY+.013,cz,0xb5bac0,{metalness:.8,roughness:.3});bx(.015,.0025,.045,cx,BY+.0165,cz,0xdfe3e6,{});for(var q=0;q<3;q++)bx(.002,.002,.045,cx-.004+q*.004,BY+.0175,cz,0x222);});
  pl(.012,.036,tex("ic_dvil",30,90,function(c,w,h){c.fillStyle="#fff";c.fillRect(0,0,w,h);c.save();c.translate(w/2,h/2);c.rotate(-PI/2);txt(c,"INTCAM1",0,0,16,"#111","700");c.restore()}),X(940),BY+.0185,Z(1125),"y");
  bx(.047,.012,.017,X(490),BY+.008,Z(725),0xe8e4d6,{roughness:.8});
  cy(.011,.011,.022,X(380),BY+.012,Z(620),0x1b1b1d);cy(.0125,.0125,.019,X(470),BY+.0105,Z(830),0x2a2a2e);cy(.011,.011,.017,X(535),BY+.009,Z(810),0x202024);cy(.011,.011,.017,X(595),BY+.009,Z(805),0x202024);cy(.02,.02,.022,X(390),BY+.012,Z(1270),0x18181a);
  bx(.033,.015,.014,X(400),BY+.008,Z(1090),0xc0262d,{roughness:.5});
  [[505,640],[600,650],[470,760],[560,760],[530,1180],[520,1000],[420,950]].forEach(function(p,i){bx(.014+(i%3)*.003,.004,.012,X(p[0]),BY+.003,Z(p[1]),0x16171a)});bx(.05,.004,.022,X(525),BY+.0035,Z(1160),0x16171a);
  [[555,1300],[555,1385],[710,1380]].forEach(function(p){bx(.009,.007,.006,X(p[0]),BY+.0045,Z(p[1]),0xd69a2c,{roughness:.5})});
  [[375,385],[1090,440],[1060,1620],[310,1635]].forEach(function(p){cy(.006,.006,.002,X(p[0]),BY+.0016,Z(p[1]),0xcfd3d6,{metalness:.8});cy(.003,.003,.0025,X(p[0]),BY+.0017,Z(p[1]),0x555,{})});
  [[915,1090,400,480],[915,1090,480,560]].forEach(function(r,i){bx(.034,.01,.016,X((r[0]+r[1])/2),BY+.006,Z(440+i*60),0x1a1a1d);});bx(.016,.01,.016,X(1040),BY+.006,Z(520),0x1a1a1d);
  bx(.05,.014,.04,X(980),BY+.007,Z(1425),0x1b1b1e,{roughness:.4});bx(.04,.008,.03,X(925),BY+.01,Z(1440),0x111);
  
  var rb=bx(.07,.0007,.017,X(1160),BY+.0045,Z(1435),0xd8d8d3,{roughness:.8});rb.rotation.y=-.28;bx(.026,.0007,.017,X(1130),BY+.0045,Z(1405),0xe8a6c0,{roughness:.8});
  tube([[X(345),BY+.004,Z(330)],[X(440),BY+.018,Z(520)],[X(560),BY+.02,Z(610)],[X(760),BY+.018,Z(650)]],.0016,0xb9c63a,{roughness:.6});cy(.008,.008,.007,X(350),BY+.006,Z(320),0x2358d6,{});cy(.0065,.0065,.007,X(760),BY+.018,Z(650),0x2358d6,{});
  cy(.0035,.0035,.022,X(430),BY+.015,Z(520),0xf1efe6,{},"z");
  pl(.052,.01,tex("ic_lbl",260,50,function(c,w,h){c.fillStyle="#d6d9c8";c.fillRect(0,0,w,h);txt(c,"INT CAM   K190801",w/2,h/2,26,"#1b1b1b","700")}),X(970),BY+.0012,Z(1625),"y");
  bx(.014,.0007,.04,X(825),BY+.0013,Z(1405),0xf4f4f4);pl(.012,.038,tex("ic_cvm",40,120,function(c,w,h){c.fillStyle="#fff";c.fillRect(0,0,w,h);c.save();c.translate(w/2,h/2);c.rotate(-PI/2);txt(c,"CV-M10",0,0,34,"#222","700");c.restore()}),X(825),BY+.0018,Z(1405),"y");
  if(t==="intcamb"){
   var bg=new THREE.Mesh(new THREE.BoxGeometry(.222,.018,.342),new THREE.MeshStandardMaterial({color:0x7d838c,metalness:.9,roughness:.22,transparent:true,opacity:.42,depthWrite:false}));bg.position.set(0,.009,0);g.add(bg);
   bx(.222,.0025,.012,0,.0175,-.165,0x8c929b,{metalness:.9,roughness:.3});bx(.012,.0025,.342,-.105,.0175,0,0x8c929b,{metalness:.9,roughness:.3});bx(.012,.0025,.342,.105,.0175,0,0x8c929b,{metalness:.9,roughness:.3});
   pl(.12,.09,tex("ic_hand",300,230,function(c,w,h){c.clearRect(0,0,w,h);c.save();c.translate(w/2,h/2);c.rotate(-1.12);c.strokeStyle="#2a78ff";c.fillStyle="#2a78ff";c.font="700 46px 'Comic Sans MS',cursive,Arial";c.textAlign="center";c.textBaseline="middle";c.fillText("INT CAM",0,-16);c.fillText("K190 ..",0,34);c.restore()}),.03,.0193,.0,"y");
   pl(.07,.02,tex("ic_esd",280,80,function(c,w,h){c.clearRect(0,0,w,h);txt(c,"ESD SHIELDING BAG",w/2,26,24,"#222","700");txt(c,"CAUTION  ELECTROSTATIC SENSITIVE DEVICE",w/2,56,15,"#333","600")}),0,.0195,.07,"y",PI)
  }
  return true}
 if(t==="rollarm"){
  /* แขนลูกกลิ้ง (กลไกสวิตช์/ไกด์): ตัวเหล็กดำ มีรูเกลียว 3 รู ปลอกทองเหลือง คันโยกพร้อมลูกกลิ้งโพลียูรีเทนสีเหลือง */
  bx(.14,.018,.045,0,.009,0,0x303033,{metalness:.65,roughness:.5});bx(.12,.012,.01,-.005,.006,.0275,0x3a3a3d,{metalness:.65,roughness:.5});
  [-.04,0,.04].forEach(function(x){cy(.0032,.0032,.0012,x,.0187,.016,0x0a0a0a,{})});
  bx(.07,.002,.004,-.015,.0188,-.006,0x5a5a5e,{metalness:.5},.0,.02);
  var bs=tor(.0115,.0042,-.048,.0185,-.005,BRASS,{metalness:.8,roughness:.3},PI/2);bs.rotation.x=PI/2;cy(.0085,.0085,.004,-.048,.0195,-.005,0x1b1b1d,{metalness:.5});
  bx(.06,.009,.03,-.052,.0125,-.035,DARK,{metalness:.55},.0);bx(.04,.008,.034,-.054,.02,-.062,0x202023,{metalness:.55},.0);
  bx(.045,.006,.045,.052,.005,.0,0x252527,{metalness:.5});
  cy(.0305,.0305,.021,-.055,.0245,-.075,0xf0c81a,{roughness:.55,metalness:.02});cy(.0205,.0205,.023,-.055,.0245,-.075,0xc9ced3,{metalness:.85,roughness:.3});hx(.0115,.008,-.055,.0345,-.075,0x3a3a3d,{metalness:.6});
  cy(.004,.004,.003,-.0,-.0,0,0x888,{});
  return true}
 if(t==="fitting"){
  /* ข้อต่อหัวต่อสีดำ + แหวนปรับสีขาว (ปลายท่อ/นิปเปิล มีเกลียวและแป้นหกเหลี่ยม) */
  cy(.045,.045,.008,0,.004,0,0xe9e6df,{roughness:.8,metalness:.02});for(var kk=0;kk<24;kk++){var ka=kk*PI/12;bx(.0035,.0066,.0045,Math.cos(ka)*.0455,.0045,Math.sin(ka)*.0455,0xcfccc2,{roughness:.9},-ka)}
  cy(.037,.039,.036,0,.026,0,0x16171a,{roughness:.45,metalness:.45});cy(.024,.024,.002,0,.0445,.003,0x0d0d0f,{});
  bx(.012,.012,.02,.01,.03,.034,0x08090b,{});hx(.0195,.012,0,.05,0,0x1e1f23,{metalness:.65,roughness:.4});cy(.0125,.0125,.016,0,.062,0,0x2a2b2f,{metalness:.7,roughness:.35});
  for(var th=0;th<4;th++)cy(.0132,.0132,.0014,0,.056+th*.0032,0,0x17181b,{metalness:.7});cy(.0092,.0092,.03,0,.083,0,0x111215,{metalness:.5,roughness:.4});cy(.0042,.0042,.0025,0,.0985,0,0x000,{});
  return true}

 if(t==="mobo"){
  /* เมนบอร์ดเซิร์ฟเวอร์ Supermicro X7DBE: LGA771 สองซ็อกเก็ต DIMM 8 ช่อง PCI-X 6 ช่อง ฮีตซิงก์สี่ก้อน ขั้วพอร์ตด้านล่าง */
  var K=.000255,X=function(p){return (p-1080)*K},Z=function(p){return (p-725)*K},Y0=.0017;
  bx(.306,.0017,.31,0,.00085,0,0x2b6a3d,{roughness:.5,metalness:.05});
  function slot(px,py0,py1,w,c){var cz=Z((py0+py1)/2);bx(w,.01,(py1-py0)*K,X(px),Y0+.005,cz,c,{roughness:.6});bx(w*.4,.002,(py1-py0)*K*.9,X(px),Y0+.0105,cz,0x1a1a1a,{})}
  for(var d=0;d<8;d++){slot(517+d*43,640,1180,.0075,0x15161a);bx(.006,.012,.004,X(517+d*43),Y0+.006,Z(630),0xe7e1d0,{});bx(.006,.012,.004,X(517+d*43),Y0+.006,Z(1190),0xe7e1d0,{})}
  [0,1].forEach(function(d){bx(.0035,.03,.13,X(517+d*43),Y0+.016,Z(910),0x0e0f12,{});for(var c=0;c<6;c++)bx(.0045,.012,.012,X(517+d*43),Y0+.018,Z(740+c*38),0x1f2024,{})});
  [[640,430,1],[940,430,0]].forEach(function(s){var cx=X(s[0]),cz=Z(s[1]);bx(.054,.009,.054,cx,Y0+.0045,cz,0xb4b8bd,{metalness:.8,roughness:.3});
   if(s[2]){bx(.04,.004,.04,cx,Y0+.011,cz,0xb59f6b,{metalness:.5,roughness:.6});bx(.034,.0006,.034,cx,Y0+.0132,cz,0x9a8758,{});}
   else{bx(.046,.006,.046,cx,Y0+.012,cz,0x141414,{});pl(.036,.026,tex("mb_warn",144,104,function(c,w,h){c.fillStyle="#f4f4f2";c.fillRect(0,0,w,h/2);txt(c,"HCRT293",w/2,16,22,"#111","700");txt(c,"1112004",w/2,38,18,"#111","600");c.fillStyle="#f2c200";c.fillRect(0,h/2,w,h/2);txt(c,"WARNING!",w/2,h*.75,22,"#c0151c","800")}),cx,Y0+.0153,cz+.002,"y")}
   [[-.026,-.026],[.026,-.026],[-.026,.026],[.026,.026]].forEach(function(o){bx(.004,.01,.004,cx+o[0],Y0+.005,cz+o[1],0xd8dadd,{metalness:.8})})});
  function hs(px,py,w,d,h,n,al){var cx=X(px),cz=Z(py);bx(w,.003,d,cx,Y0+.0015,cz,0xc4c8cc,{metalness:.8,roughness:.3});for(var i=0;i<n;i++){var f=(i+.5)/n;if(al==="z")bx(w/n*.55,h,d*.98,cx-w/2+w*f,Y0+.003+h/2,cz,0xc4c8cc,{metalness:.85,roughness:.28});else bx(w*.98,h,d/n*.55,cx,Y0+.003+h/2,cz-d/2+d*f,0xc4c8cc,{metalness:.85,roughness:.28})}}
  hs(965,690,.05,.047,.016,10,"z");hs(1150,250,.027,.085,.014,6,"z");hs(1230,250,.027,.085,.014,6,"z");hs(1230,575,.038,.05,.014,9,"z");hs(1450,560,.044,.05,.014,9,"z");
  [1160,1225,1295,1385,1455,1550].forEach(function(px,i){slot(px,665,1170,.01,0xebe6d5)});slot(1100,810,1235,.008,0x14151a);
  bx(.046,.012,.011,X(1190),Y0+.006,Z(140),0x2457c4,{roughness:.55});bx(.046,.01,.012,X(1190),Y0+.005,Z(190),0x15161a,{});
  [210,275,340,410,480,550].forEach(function(py,i){bx(.025,.009,.011,X(1550),Y0+.0045,Z(py),0x16171a,{roughness:.5})});
  bx(.016,.011,.034,X(460),Y0+.0055,Z(830),0xe8e2cf,{});bx(.012,.011,.016,X(490),Y0+.0055,Z(215),0xe8e2cf,{});
  for(var cc=0;cc<5;cc++){var tq=tor(.0075,.0038,X(900),Y0+.0075,Z(965+cc*45),0xd88c2a,{roughness:.5,metalness:.3},PI/2);}
  for(var vv=0;vv<10;vv++)bx(.012,.009,.011,X(560+vv*46),Y0+.0045,Z(245),0x6f6c52,{roughness:.6,metalness:.3});
  function capc(px,py,c){cy(.0042,.0042,.01,X(px),Y0+.005,Z(py),c||0x6a3f93,{roughness:.4,metalness:.3})}
  for(var a1=0;a1<10;a1++)capc(490,300+a1*30);for(var a2=0;a2<7;a2++){capc(1010,380+a2*36);capc(1070,380+a2*36,0x7a7f86)}for(var a3=0;a3<6;a3++){capc(800,120+a3*20,0x7a7f86);capc(1090,880+a3*50,0x2a2a2e)}
  for(var a4=0;a4<8;a4++){capc(1210+a4*50,1100,0x2a2a2e)}
  bx(.03,.013,.012,X(640),Y0+.0065,Z(1285),0x2f8f9a,{roughness:.4});bx(.03,.012,.012,X(775),Y0+.006,Z(1305),0x2b6ad1,{roughness:.4});
  cy(.0105,.0105,.004,X(780),Y0+.0025,Z(1245),0xcfd3d6,{metalness:.85,roughness:.3});[900,985].forEach(function(px){bx(.016,.014,.017,X(px),Y0+.007,Z(1295),0xc4c8cc,{metalness:.8,roughness:.35})});
  bx(.016,.02,.02,X(445),Y0+.01,Z(1285),0xb4b8bd,{metalness:.8});bx(.013,.006,.013,X(1210),Y0+.003,Z(1225),0x15161a);bx(.018,.004,.018,X(1450),Y0+.002,Z(1215),0x15161a);bx(.022,.004,.022,X(1545),Y0+.002,Z(1175),0x15161a);
  bx(.032,.002,.012,X(660),Y0+.001,Z(560),0xe8e8e0,{});
  return true}
 if(t==="lens"){
  /* เลนส์ C-mount (โฟกัสระยะ 0.3–1 m, ไดอะแฟรม C/16/8/4): เกลียวเงิน แหวนโลหะ ตัวดำสเกลขาว ฮูดดำ */
  var ST=function(k,txts){return tex(k,512,64,function(c,w,h){c.fillStyle="#0e0f11";c.fillRect(0,0,w,h);txts.forEach(function(s,i){txt(c,s,230+i*55,32,26,"#e8e8e6","600")})})};
  function ring(r,h,y,k,txts){var mt=[new THREE.MeshStandardMaterial({map:ST(k,txts),roughness:.5,metalness:.3}),M(0x15161a,{}),M(0x15161a,{})];var m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,40),mt);m.position.y=y;m.rotation.y=-PI/2;g.add(m)}
  cy(.0125,.0125,.008,0,.004,0,0xc9ced3,{metalness:.85,roughness:.3});cy(.0165,.0165,.009,0,.0125,0,0xc6cbd0,{metalness:.85,roughness:.28});
  ring(.0155,.012,.0215,"ln_a",["C","16","8","4"]);cy(.0148,.0148,.002,0,.0285,0,0xaab0b5,{metalness:.9});ring(.0158,.017,.039,"ln_b",["0.3","0.4","0.5","0.7","1"]);
  cy(.0172,.0172,.01,0,.0525,0,0x16171a,{roughness:.5,metalness:.2});for(var nn=0;nn<10;nn++){var na=nn*PI/5;bx(.0028,.011,.004,Math.cos(na)*.0174,.0525,Math.sin(na)*.0174,0x0d0d0f,{},-na)}
  cy(.0135,.0135,.001,0,.0576,0,0x1b2230,{metalness:.5,roughness:.1});
  return true}
 if(t==="sewmv"){
  /* SEW Eurodrive (อินเวอร์เตอร์เล็กสีแดง V2): ตัวแดง ฝาบนมีพอร์ต X44 X45 X46 ช่องระบายอากาศ ฉลากเหลือง แผ่นยึดเงิน */
  var RD=0xc9302a,RO={roughness:.45,metalness:.1};
  bx(.285,.003,.115,0,.0015,0,0xb9bec3,{metalness:.5,roughness:.4});[[-.13,-.035],[-.13,.035]].forEach(function(p){cy(.005,.005,.004,p[0],.003,p[1],0x555,{})});bx(.012,.004,.022,-.145,.003,0,0x555,{});
  bx(.235,.092,.09,.006,.049,0,RD,RO);bx(.11,.02,.075,.05,.105,0,RD,RO);bx(.05,.012,.055,.09,.116,0,0xd13a33,RO);
  bx(.018,.014,.017,.09,.123,.002,0x18191c,{roughness:.35});bx(.014,.0012,.012,.09,.1305,.002,0xdcdad5,{});for(var rp=0;rp<6;rp++)bx(.0012,.0008,.006,.0845+rp*.0022,.131,.002,0xc9a143,{metalness:.8});
  bx(.026,.003,.016,.06,.1155,.006,0x2a1210,{});cy(.0085,.0085,.006,.03,.109,-.012,0xb02620,RO);cy(.0035,.0035,.007,.03,.1085,-.012,0x15161a,{});
  [["X44",.095],["X45",.075],["X46",.06]].forEach(function(s,i){pl(.012,.006,tex("sw_"+s[0],60,30,function(c,w,h){c.clearRect(0,0,w,h);txt(c,s[0],w/2,h/2,24,"#f4f1ea","700")}),s[1],.1235,-.03,"y")});
  bx(.07,.003,.06,-.04,.0955,0,0xd1352f,RO);bx(.06,.0006,.03,-.04,.09,.0,0xf0f0ee,{});pl(.05,.026,tex("sw_v2",200,104,function(c,w,h){c.fillStyle="#f2f2f0";c.fillRect(0,0,w,h);txt(c,"V2",w/2,h/2+4,86,"#1a1a1a","800")}),-.04,.0975,0,"y");
  cy(.0035,.0035,.002,-.01,.0975,.028,0x55321f,{});
  [[0,.19],[1,.205]].forEach(function(r){});
  bx(.03,.02,.034,-.095,.014,.0,0x1a1a1d,{roughness:.5});bx(.035,.0018,.02,-.11,.049,.0455,0xb9bec3,{metalness:.5});
  for(var vc=0;vc<3;vc++)for(var vr=0;vr<9;vr++)bx(.011,.0022,.002,-.07+vc*.015,.025+vr*.007,.0455,0x1a0c0b,{});
  bx(.07,.058,.001,.05,.058,.0455,0xe0e2e4,{});pl(.068,.056,tex("sw_lbl",272,224,function(c,w,h){c.fillStyle="#e4e6e8";c.fillRect(0,0,w,h);c.fillStyle="#1b1b1b";c.font="700 22px Arial";c.fillText("SEW",14,32);c.fillText("EURODRIVE",14,60);c.font="600 14px Arial";for(var l=0;l<8;l++)c.fillText("———  ———  ——",14,92+l*16)}),.05,.058,.0462,"z");
  bx(.014,.05,.001,.095,.058,.0462,0xe9c43a,{});
  return true}
 if(t==="sewdrive"){
  /* SEW MOVIDRIVE + การ์ด DEH11B: ตัวโลหะเทา ฝาแดงยาว (MOVIDRIVE®) ช่องดำด้านขวามี D-sub X14/X15 ตัวต่อขั้วดำด้านล่าง ขายึดเงิน */
  bx(.30,.07,.105,0,.045,0,0x969b9f,{metalness:.55,roughness:.45});
  bx(.30,.004,.12,0,.008,0,0xb9bec3,{metalness:.6,roughness:.4});bx(.05,.003,.17,-.155,.008,0,0xb9bec3,{metalness:.6,roughness:.4});[-.03,.03].forEach(function(z){bx(.012,.004,.006,-.17,.01,z*1.6,0x444,{})});
  for(var vr=0;vr<12;vr++)bx(.003,.003,.003,0,0,0,0,{});
  for(var s1=0;s1<9;s1++)bx(.07,.0015,.003,-.035,.026+s1*.0057,.0535,0x111214,{});
  bx(.285,.026,.058,.007,.093,-.02,0xd0342c,RO={roughness:.4,metalness:.1});bx(.05,.008,.058,.145,.108,-.02,0xdc3c33,{roughness:.4});
  bx(.04,.012,.03,.115,.108,-.02,0xc02a23,{roughness:.4});
  pl(.19,.021,tex("sd_cap",760,84,function(c,w,h){c.fillStyle="#d0342c";c.fillRect(0,0,w,h);txt(c,"MOVIDRIVE®",w-40,h/2+2,50,"#2a0b09","800","right")}),-.02,.1066,-.02,"y");
  bx(.28,.05,.048,.015,.075,.0345,0x14151a,{roughness:.5,metalness:.35});bx(.28,.03,.002,.015,.075,.0585,0x1a1b21,{});
  [[.09,0xd6c98a,"X14",.034],[.135,0xb8bcc0,"X15",.034]].forEach(function(s,i){bx(.03,.01,.016,s[0],.101,.034,s[1],{metalness:.75,roughness:.3});bx(.022,.003,.009,s[0],.1065,.034,0x1b1b1b,{});pl(.012,.006,tex("sd_"+s[2],60,30,function(c,w,h){c.clearRect(0,0,w,h);txt(c,s[2],w/2,h/2,24,"#cfcfcf","700")}),s[0],.1006,.052,"y");});
  pl(.03,.008,tex("sd_deh",120,32,function(c,w,h){c.clearRect(0,0,w,h);txt(c,"DEH11B",w/2,h/2,26,"#e4e4e4","700")}),.062,.1006,.034,"y");
  bx(.04,.02,.034,-.12,.022,.0,0x18191c,{roughness:.5});for(var tt=0;tt<6;tt++)bx(.003,.004,.004,-.133+tt*.0053,.034,.0,0xb9bec3,{metalness:.7});
  tor(.009,.0013,-.092,.045,.054,0xf0efe8,{roughness:.6},PI/2);
  return true}
 if(t==="jaicam"){
  /* กล้อง JAI CV-M10SX + เลนส์: ตัวดำ ฝาบนมีป้ายแนะนำสกรู 4 ตัวมุม ป้าย CE ท้ายเครื่อง เลนส์ริบ ฮูดหน้า */
  bx(.058,.03,.045,0,.015,0,0x131417,{roughness:.55,metalness:.3});
  bx(.0585,.001,.0452,0,.0302,0,0x1b1c20,{});
  [[-.022,-.0195],[-.022,.0195],[.022,-.0195],[.022,.0195]].forEach(function(p){cy(.003,.003,.0018,p[0],.0306,p[1],0xc1c5ca,{metalness:.85,roughness:.3})});
  pl(.04,.03,tex("jai_lbl",320,240,function(c,w,h){c.fillStyle="#ececea";c.fillRect(0,0,w,h);c.fillStyle="#181818";c.font="700 16px Arial";c.textAlign="left";c.fillText("⚠ Important Notice to",10,22);c.fillText("Camera Fixing Screws",10,44);c.strokeStyle="#222";c.lineWidth=2;c.strokeRect(20,60,150,110);c.fillRect(30,100,70,50);c.beginPath();c.moveTo(210,70);c.lineTo(210,150);c.stroke();c.font="600 15px Arial";c.fillText("max",225,95);c.fillText("5mm",225,115);c.fillText("Camera Chassis",20,200);c.fillText("Camera Fixing Screw",150,200);c.fillText("カメラ取付ネジに関する注意",10,230)}),-.004,.0306,0,"y",PI/2);
  pl(.016,.02,tex("jai_ce",64,80,function(c,w,h){c.fillStyle="#ececea";c.fillRect(0,0,w,h);txt(c,"CE",w/2,24,24,"#111","800");txt(c,"CV-M10SX",w/2,56,11,"#111","700")}),.023,.0306,.0,"y",PI/2);
  cy(.0185,.0185,.014,-.035,.015,0,0x1a1b1e,{roughness:.5,metalness:.4},"x");
  cy(.0165,.0165,.04,-.062,.015,0,0x17181b,{roughness:.55,metalness:.35},"x");for(var rb=0;rb<9;rb++)cy(.0168,.0168,.0022,-.045-rb*.0045,.015,0,0x0f1012,{},"x");
  cy(.0165,.0165,.012,-.088,.015,0,0x1b1c20,{metalness:.4},"x");cy(.0125,.0125,.004,-.0955,.015,0,0x0a0e14,{roughness:.1,metalness:.6},"x");cy(.0175,.0175,.003,-.0925,.015,0,0x101113,{},"x");
  bx(.006,.004,.004,-.075,.032,0,0xc9ced3,{metalness:.8});
  return true}
 if(t==="bluecam"){
  /* กล้อง/หัวตรวจมุมฉากสีน้ำเงินอโนไดซ์ S/N 00255: ท่อกลมยาว แหวนทองเหลืองมีเลข ข้อศอกขวางด้านหลัง ขั้วต่อกลมดำพร้อมฝาครอบ */
  var BL=0x1f45c2,BO={metalness:.55,roughness:.38};
  cy(.037,.037,.145,-.02,.044,0,BL,BO,"x");cy(.0385,.0385,.012,.065,.044,0,BL,BO,"x");var bm=[new THREE.MeshStandardMaterial({map:tex("bc_sn",512,64,function(c,w,h){c.fillStyle="#b7a982";c.fillRect(0,0,w,h);txt(c,"S/N   00255",256,34,34,"#2a2a22","700")}),metalness:.6,roughness:.45}),M(0xb7a982,{metalness:.7}),M(0xb7a982,{metalness:.7})];var bb=new THREE.Mesh(new THREE.CylinderGeometry(.0378,.0378,.008,40),bm);bb.rotation.z=PI/2;bb.rotation.x=-PI/2;bb.position.set(.032,.044,0);g.add(bb);
  bx(.07,.075,.075,.1,.044,0,BL,BO);cy(.0375,.0375,.075,.1,.044,0,BL,BO,"z");sp(.0375,.1,.044,-.0375,BL,BO);
  cy(.03,.03,.002,-.092,.044,0,0x2a1740,{metalness:.5,roughness:.1},"x");cy(.0345,.0345,.004,-.0925,.044,0,0x9aa3ad,{metalness:.85,roughness:.3},"x");
  bx(.034,.004,.034,.015,.014,-.045,BL,BO);bx(.034,.004,.034,.015,.074,-.045,BL,BO);bx(.034,.058,.01,.015,.044,-.0455,BL,BO);[-.008,.008].forEach(function(z){cy(.0032,.0032,.012,.0,.044,-.0455,0x0d1840,{},"z")});
  cy(.0165,.0165,.02,.113,.086,.0,0x15161a,{roughness:.55,metalness:.3});cy(.019,.019,.018,.113,.103,0,0x1d1e22,{roughness:.5,metalness:.35});for(var cq=0;cq<12;cq++){var ca=cq*PI/6;bx(.004,.018,.003,.113+Math.cos(ca)*.0195,.103,Math.sin(ca)*.0195,0x0d0e10,{},-ca)}
  cy(.014,.014,.012,.113,.114,0,0x0e0f11,{});bx(.002,.002,.03,.125,.12,.02,0x2a2a2a,{});tube([[.126,.118,.0],[.14,.104,.015],[.15,.09,.04]],.002,0x2a2a2a,{roughness:.7});
  return true}
 if(t==="smps"){
  /* พาวเวอร์ซัพพลายแบบเปิด (+5V ADJ): ฝาตะแกรงเงินเจาะรู เห็นแผงเหลืองข้างใน บล็อกขั้วสกรูหน้า ป้าย L N ⏚ -V +V COM +5V ไฟ LED เขียว */
  bx(.16,.002,.101,0,.001,0,0xd4b341,{roughness:.55});bx(.16,.038,.092,0,.021,-.004,0xc3c6c9,{metalness:.65,roughness:.4});
  pl(.158,.09,tex("sp_perf",640,360,function(c,w,h){c.fillStyle="#b8bbbe";c.fillRect(0,0,w,h);for(var j=0;j<20;j++)for(var i=0;i<36;i++){var rr=Math.sin(i*1.3+j*.9);c.fillStyle=rr>.55?"#d8b640":rr>0?"#2a2c2f":rr>-.5?"#5b5a4a":"#8a8f95";c.beginPath();c.arc(10+i*17.6,10+j*17.6,6.2,0,7);c.fill()}}),0,.0402,-.004,"y");
  bx(.17,.014,.028,0,.016,.052,0x17181b,{roughness:.55});for(var sx=0;sx<7;sx++){cy(.0068,.0068,.003,-.066+sx*.022,.0245,.052,0xc8ccd0,{metalness:.8,roughness:.3});bx(.0085,.0008,.0008,-.066+sx*.022,.026,.052,0x222);}
  bx(.17,.004,.005,0,.0255,.0385,0x14151a,{});
  pl(.168,.016,tex("sp_lab",840,80,function(c,w,h){c.fillStyle="#d2d5d8";c.fillRect(0,0,w,h);["L","N","⏚","-V","+V","COM","+5V"].forEach(function(s,i){txt(c,s,70+i*118,38,34,"#1a1a1a","700")});c.fillStyle="#1a1a1a";c.fillRect(790,8,2,64);c.fillRect(0,0,w,3)}),0,.0268,.07,"y");
  cy(.0045,.0045,.002,.067,.0175,.07,0x39e06b,{emissive:0x22c55e,emissiveIntensity:.7},"z");cy(.0055,.0055,.004,.07,.0185,.036,0xe8e8e4,{roughness:.6});bx(.0035,.001,.0015,.07,.021,.036,0x333);
  bx(.03,.002,.03,-.085,.0035,.04,0xb8bcc0,{metalness:.7});cy(.0035,.0035,.003,-.088,.0035,.04,0x444,{});
  return true}
 if(t==="collet"){
  /* คอลเล็ต ER (สปริงคอลเล็ต): ลำตัวเรียวมีร่องผ่าสลับหน้า-หลัง แหวนร่องที่คอ รูตรงกลาง */
  var CC=0x4a4b4f,CO2={metalness:.7,roughness:.45};
  cy(.0092,.0118,.034,0,.0118,0,CC,CO2,"x");cy(.0125,.0125,.003,-.0165,.0118,0,0x3a3b3e,CO2,"x");cy(.0118,.0118,.0025,.0148,.0118,0,0x6a6b6f,CO2,"x");
  cy(.0058,.0058,.0018,-.0176,.0118,0,0x070707,{},"x");cy(.0058,.0058,.0018,.0166,.0118,0,0x070707,{},"x");
  for(var i=0;i<12;i++){var a=i*PI/6,s=i%2?1:-1;var gp=new THREE.Group();gp.position.set(s>0?-.0035:.0035,.0118,0);gp.rotation.x=a;var sl=new THREE.Mesh(new THREE.BoxGeometry(.021,.0016,.0018),M(0x050505,{}));sl.position.set(0,.0103,0);gp.add(sl);g.add(gp)}
  return true}
 if(t==="kebf5"){
  /* อินเวอร์เตอร์ KEB F5: ตัวครีม แผงควบคุมบนมีจอ LED 4 หลักและปุ่ม START/STOP แถบแดงเฉียง โลโก้ KEB ฐานโลหะเงินมีป้าย F5 */
  var CM=0xe3dfd0,CMO={roughness:.62,metalness:.05};
  bx(.2,.02,.15,0,.027,0,0xaeb1b4,{metalness:.7,roughness:.4});
  bx(.215,.014,.17,0,.009,0,0x9a9ea2,{metalness:.7,roughness:.4});bx(.075,.034,.002,-.0,.02,.086,0xc9ccd0,{metalness:.6});
  pl(.073,.032,tex("kb_lbl",292,128,function(c,w,h){c.fillStyle="#cfd2d6";c.fillRect(0,0,w,h);c.fillStyle="#111";c.font="italic 800 56px Arial";c.fillText("F5",14,60);c.font="600 12px Arial";for(var l=0;l<6;l++)c.fillText("———  ——————  ———",100,22+l*17)}),0,.02,.0872,"z");
  bx(.2,.085,.148,0,.075,0,CM,CMO);bx(.2,.004,.15,0,.1195,0,0xf0ede0,CMO);for(var v=0;v<8;v++)bx(.0015,.05,.002,-.1006,.07,-.06+v*.017,0x6b6a60,{});
  bx(.115,.034,.082,-.018,.138,-.01,CM,CMO);bx(.12,.003,.088,-.018,.1565,-.01,0xece8d9,CMO);bx(.12,.012,.01,-.018,.128,.034,CM,CMO);
  pl(.118,.084,tex("kb_top",472,336,function(c,w,h){c.fillStyle="#ebe8da";c.fillRect(0,0,w,h);c.fillStyle="#2a2a2c";c.fillRect(34,38,150,76);c.fillStyle="#181818";c.fillRect(40,44,138,64);c.fillStyle="#d8252b";c.font="700 56px 'Courier New',monospace";c.textAlign="center";c.textBaseline="middle";c.fillText("2.88",110,78);["FUNC.","ENTER"].forEach(function(s,i){c.fillStyle="#222";c.font="700 15px Arial";c.fillText(s,64+i*0,140+i*84);});c.fillStyle="#c9cbc3";[[218,60],[218,114],[170,196],[250,196]].forEach(function(p){c.fillRect(p[0],p[1],40,34)});c.fillStyle="#2fa04f";c.fillRect(214,106,48,12);c.fillStyle="#d8252b";c.fillRect(278,106,48,12);txt(c,"START",238,100,13,"#222");txt(c,"STOP",302,100,13,"#222");txt(c,"SPEED",240,58,13,"#222");txt(c,"F/R",270,230,13,"#222");c.fillStyle="#1d1d1f";c.fillRect(380,60,50,56);c.fillStyle="#c8c9c0";c.fillRect(388,70,34,18);txt(c,"X6B",405,140,14,"#222");c.fillStyle="#d8252b";[0,1,2,3].forEach(function(i){c.save();c.translate(340+i*26,300);c.rotate(-.85);c.fillRect(-9,-120,10,240);c.restore()})}),-.018,.1583,-.01,"y");
  pl(.032,.013,tex("kb_logo",128,52,function(c,w,h){c.fillStyle="#d8252b";c.fillRect(0,0,w,h);txt(c,"KEB",w/2,h/2+2,40,"#fff","800")}),.038,.1583,-.034,"y");
  return true}
 if(t==="slide"){
  /* ชุดกลไกสไลด์ + สปริง: โครงหล่อเทาครีมรูปตัว C เพลาโครเมียมพร้อมน็อตล็อก แกนไกด์สองแกน บล็อกดำ สปริงคู่แผ่นดำ แคลมป์ดำพร้อมแผ่นสีน้ำเงิน */
  var AL=0xd5d1c4,AO={roughness:.7,metalness:.25},CH2={metalness:.92,roughness:.18};
  bx(.26,.05,.015,.0,.033,-.037,AL,AO);bx(.052,.05,.088,.115,.033,0,AL,AO);bx(.07,.05,.082,-.1,.033,-.003,AL,AO);
  bx(.05,.036,.014,-.02,.033,-.0475,AL,AO);[-.012,.0,.012].forEach(function(x){cy(.0028,.0028,.002,-.02+x*1.8,.033,-.0556,0x888,{},"z");});
  cy(.0115,.0115,.1,.205,.033,0,0xd7dbde,CH2,"x");cy(.0195,.0195,.012,.14,.033,0,0x6b6054,{metalness:.6,roughness:.55},"x");cy(.0175,.0175,.008,.152,.033,0,0x80766a,{metalness:.6},"x");
  cy(.0058,.0058,.15,.0,.044,.018,0xcfd3d6,CH2,"x");cy(.0058,.0058,.15,.0,.022,.018,0xcfd3d6,CH2,"x");
  bx(.1,.034,.04,.0,.033,.015,0x0f1115,{roughness:.3,metalness:.3});bx(.1,.002,.01,.0,.051,.015,0x2a2d34,{});
  bx(.2,.045,.004,.0,.033,.0375,0x101216,{roughness:.35,metalness:.4});helix(.095,-.09,.033,.05,.0105,.0017,18,0xb9b2a8);
  cy(.0035,.0035,.2,.0,.033,.05,0xcfd3d6,CH2,"x");cy(.0135,.0135,.006,.1,.033,.05,0x2b2b2e,{metalness:.5},"x");cy(.0135,.0135,.006,-.098,.033,.05,0x2b2b2e,{metalness:.5},"x");
  bx(.075,.045,.062,-.175,.033,.0,0x14161a,{roughness:.4,metalness:.5});bx(.03,.012,.07,-.14,.005,.0,0x2c3190,{roughness:.4,metalness:.4});
  bx(.05,.004,.05,-.175,.057,.0,0x25282e,{metalness:.5});cy(.007,.007,.004,-.175,.0595,.0,0x0a0a0b,{});[-.012,.012].forEach(function(z){cy(.0035,.0035,.004,-.19,.0595,z,0x0a0a0b,{})});
  bx(.04,.02,.012,-.215,.033,.0,0x15171b,{roughness:.4,metalness:.5});cy(.0125,.0125,.016,-.215,.05,.0,0x24262b,{metalness:.6},"x");
  return true}
 return false};
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
 }else if(t==="fender"){
  var fs=new THREE.Shape();fs.moveTo(.34,0);fs.absarc(0,0,.34,0,Math.PI/2,false);fs.lineTo(0,.2);fs.absarc(0,0,.2,Math.PI/2,0,true);fs.lineTo(.34,0);
  var fg=new THREE.ExtrudeGeometry(fs,{depth:.02,bevelEnabled:false}),fm=new THREE.Mesh(fg,M(0x3a3d44,{roughness:.6}));fm.rotation.x=-Math.PI/2;fm.position.set(-.17,.015,.17);g.add(fm);
  var fw=new THREE.Mesh(fg,M(0xffffff,{transparent:true,opacity:.22,roughness:.15,depthWrite:false}));fw.rotation.x=-Math.PI/2;fw.scale.set(1.03,1.03,2);fw.position.set(-.175,.012,.175);g.add(fw)
 }else if(t==="gearbox"){
  box(.2,.2,.16,-.08,.11,-.02,0x6b7280,{metalness:.5});var gg=cyl(.1,.1,.06,0x15181d,{metalness:.5},"z");gg.position.set(.04,.14,.07);
  var fl=cyl(.075,.075,.035,0xcdd3da,{metalness:.85,roughness:.25},"z");fl.position.set(.1,.07,.12);var ho=cyl(.03,.03,.04,0x2b2f36,{},"z");ho.position.set(.1,.07,.14);
  var pu=cyl(.075,.075,.07,0x0f1115,{},"z");pu.position.set(-.16,.075,.12);box(.38,.012,.28,0,.006,0,0xe5e7eb);box(.34,.2,.26,0,.1,0,0xffffff,{transparent:true,opacity:.16,depthWrite:false,roughness:.15})
 }else if(t==="hbelt"||t==="hbeltb"){
  var big=t==="hbeltb",PL=big?.58:.4,NB=big?6:4;
  box(.09,.09,.015,0,0,.008,0x6b7280,{metalness:.5,roughness:.5});box(.045,.045,PL,0,0,PL/2,0x9ca3af,{metalness:.7,roughness:.35});box(.05,.05,.012,0,0,PL,0x6b7280,{metalness:.5});
  for(var hb=0;hb<NB;hb++){var hz=.06+hb*((PL-.12)/Math.max(1,NB-1)),hr=(big?.11:.075)+(hb%3)*(big?.02:.012),hc=(big?hb%2:hb===1)?0xb91c1c:0x15181d,lp=tor(hr,.014,0,-hr*1.9+.022,hz,hc,{roughness:.85},0);lp.scale.set(1,2.1,1)}
  box(.07,.04,.004,.0,-.17,PL*.5,0xf3f4f6,{roughness:.8}).rotation.y=0
 }else if(t==="hcoil"){
  box(.09,.09,.015,0,0,.008,0x6b7280,{metalness:.5,roughness:.5});box(.045,.045,.34,0,0,.17,0x9ca3af,{metalness:.7,roughness:.35});
  for(var hq=0;hq<5;hq++){var cl=tor(.1,.018,0,-.09,.05+hq*.055,hq%2?0xea580c:0x1d4ed8,{roughness:.7},0);cl.scale.set(1,1.5,1)}
 }else if(t==="bracket"){
  box(.05,.26,.03,-.06,.14,0,0x3fcf7a,{roughness:.5});box(.16,.04,.03,.01,.02,0,0x3fcf7a,{roughness:.5});box(.1,.05,.04,-.14,.2,.0,0x3b3d44,{metalness:.5});
  cyl(.07,.07,.22,0xefe6c8,{roughness:.9},"x").position.set(.07,.075,-.04);box(.34,.14,.14,0,.07,0,0xffffff,{transparent:true,opacity:.16,depthWrite:false,roughness:.15})
 }else if(t==="beltbag"){
  box(.42,.01,.3,0,.005,0,0xffffff,{transparent:true,opacity:.2,depthWrite:false,roughness:.1});box(.42,.012,.02,0,.012,.14,0x9ca3af);
  for(var bi=0;bi<5;bi++){var bt=tor(.12+bi*.012,.012,-.07,.012+bi*.006,0,bi===4?0x1f2937:0xe8ecef,{roughness:.7},Math.PI/2);bt.scale.set(1.2,1,1)}
  for(var bj=0;bj<4;bj++){var bu=tor(.09+bj*.01,.012,.08,.012+bj*.006,.02,0xe8ecef,{roughness:.7},Math.PI/2)}
 }else if(t==="fiber"){
  box(.44,.008,.3,0,.004,0,0xffffff,{transparent:true,opacity:.2,depthWrite:false,roughness:.1});
  for(var fi=0;fi<3;fi++){var ft2=tor(.12+fi*.01,.005,0,.01+fi*.008,0,0xcfd5dc,{metalness:.85,roughness:.3},Math.PI/2);ft2.scale.set(1.3,1,1)}
  box(.07,.004,.06,.0,.032,0,0xffffff);box(.02,.015,.02,.2,.012,-.1,0x22c55e);box(.012,.012,.02,.19,.012,-.11,0xdc2626)
 }else if(t==="dcmotor"){
  var dm=cyl(.07,.07,.3,0x1b1f27,{metalness:.35},"x");dm.position.set(0,.09,0);var ec=cyl(.075,.075,.035,0xc3c8cf,{metalness:.8,roughness:.3},"x");ec.position.set(.15,.09,0);var ec2=cyl(.075,.075,.035,0xc3c8cf,{metalness:.8,roughness:.3},"x");ec2.position.set(-.15,.09,0);
  box(.06,.1,.1,-.04,.17,.0,0xb8bec6,{metalness:.7});box(.1,.05,.03,.02,.09,.07,0xeeeeee);var gh=cyl(.04,.04,.12,0xd5dae0,{metalness:.8},"x");gh.position.set(.22,.09,0);
  var dw2=cyl(.095,.095,.34,0xffffff,{transparent:true,opacity:.16,depthWrite:false,roughness:.15},"x");dw2.position.set(.02,.09,0)
 }else if(t==="micro"){
  box(.2,.14,.12,0,.07,0,0x14161b,{roughness:.6});box(.07,.05,.12,-.07,.16,0,0x14161b);box(.12,.012,.12,.02,.146,0,0xd6dbe1,{metalness:.8,roughness:.3});
  var mc=cyl(.045,.045,.12,0xd9dde2,{metalness:.8,roughness:.3});mc.position.set(.02,.21,0);var mk=cyl(.05,.05,.04,0xc9ced4,{metalness:.8,roughness:.4});mk.position.set(.02,.3,0);var mk2=cyl(.052,.052,.03,0xb9bec5,{metalness:.8,roughness:.4});mk2.position.set(.02,.255,0);
  cyl(.012,.012,.03,0xd6dbe1,{metalness:.8}).position.set(.02,.335,0);cyl(.025,.025,.03,0x6b7280,{metalness:.7},"z").position.set(.02,.06,.075)
 }else if(t==="roller"){
  var ro=cyl(.11,.11,.09,0x4f5238,{roughness:.9});ro.position.y=.045;var rf=cyl(.09,.09,.02,0x1b1d22,{metalness:.5});rf.position.y=.095;var rh=cyl(.055,.055,.05,0x15171b,{metalness:.5});rh.position.y=.12;var rb=cyl(.03,.03,.052,0x050608,{});rb.position.y=.122;
  for(var rk=0;rk<3;rk++){var ra=rk*2.1,rs=cyl(.008,.008,.004,0x9ca3af,{metalness:.8});rs.position.set(Math.cos(ra)*.075,.106,Math.sin(ra)*.075)}
 }else if(t==="vgear"){
  var vm=cyl(.085,.085,.2,0xa9b2ba,{metalness:.3});vm.position.set(0,.13,0);for(var vf=0;vf<6;vf++){var va=vf*Math.PI/3+.3;box(.012,.19,.04,Math.cos(va)*.09,.13,Math.sin(va)*.09,0xbac2c9,{metalness:.3}).rotation.y=-va}
  cyl(.1,.1,.04,0x9aa3ab,{metalness:.4}).position.set(0,.01,0);cyl(.115,.115,.03,0x9aa3ab,{metalness:.4}).position.set(0,.245,0);box(.17,.13,.17,0,.325,0,0xa9b2ba,{metalness:.35});cyl(.12,.12,.025,0xb7bec5,{metalness:.5}).position.set(0,.405,0);
  box(.1,.11,.09,.12,.17,0,0xb7bec5);cyl(.04,.04,.07,0x4b5563,{metalness:.6}).position.set(0,.45,0);cyl(.12,.12,.52,0xffffff,{transparent:true,opacity:.14,depthWrite:false,roughness:.15}).position.set(.01,.26,0)
 }else if(t==="disc"){
  var dc=cyl(.12,.12,.008,0xf3efc9,{roughness:.8});dc.position.y=.004;var dh2=cyl(.014,.014,.01,0x3b1d12,{});dh2.position.y=.005
 }else if(t==="shaft"){
  var s1=cyl(.017,.017,.2,0xd1d5db,{metalness:.9,roughness:.25},"x");s1.position.set(.08,.02,0);var s2=cyl(.019,.019,.1,0xc3c8cf,{metalness:.9,roughness:.3},"x");s2.position.set(-.07,.02,0);
  for(var sp=0;sp<8;sp++){var sg=sp*Math.PI/4;box(.1,.004,.004,-.07,.02+Math.sin(sg)*.019,Math.cos(sg)*.019,0x9ca3af,{metalness:.8})}
  for(var th=0;th<4;th++)cyl(.0175,.0175,.004,0x9ca3af,{metalness:.9},"x").position.set(.185+th*.007,.02,0)
 }else if(t==="sensorcable"){
  var ca=new THREE.Mesh(new THREE.TorusGeometry(.12,.008,8,24,Math.PI),M(0x15171b,{roughness:.7}));ca.position.set(0,.02,0);ca.rotation.x=-Math.PI/2;ca.rotation.z=0;g.add(ca);
  var k1=cyl(.018,.018,.05,0xd0d4d9,{metalness:.9,roughness:.3},"x");k1.position.set(-.12,.02,0);cyl(.012,.012,.04,0x15171b,{},"x").position.set(-.15,.02,0);
  var bn=cyl(.02,.02,.025,0xc9a227,{metalness:.8,roughness:.3},"x");bn.position.set(.12,.02,0);var cb2=cyl(.024,.024,.09,0xd9e4cd,{roughness:.8},"x");cb2.position.set(.18,.024,0);cyl(.0245,.0245,.01,0xf0d419,{},"x").position.set(.225,.024,0)
 }else if(t==="dinpsu"){
  /* Mean Well DR-120-24 วางนอนหงายหน้าแผ่นป้าย: ยาวตามแกน x · ปลายซ้าย=ฝาระบายอากาศ+ขั้ว L/N/PE · ปลายขวา=ขั้ว +V/-V */
  var ctx_=function(w,h,fn){var c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"),w,h);var q=new THREE.CanvasTexture(c);q.anisotropy=8;return q};var PL=.1252,PT=.1,PW=.0855;
  box(PL,PT,PW,0,PT/2,0,0x9ea5ad,{metalness:.25,roughness:.55});
  box(PL-.002,.003,PW-.002,0,PT+.0015,0,0xc3cad2,{metalness:.1,roughness:.55});
  var vt=ctx_(512,256,function(x,w,h){x.fillStyle="#2b2c2f";x.fillRect(0,0,w,h);x.fillStyle="#070708";for(var r=0;r<9;r++)for(var c=0;c<18;c++){var px=14+c*28+(r%2?14:0),py=14+r*28;x.beginPath();for(var k=0;k<6;k++){var an=Math.PI/3*k+Math.PI/6;x.lineTo(px+9*Math.cos(an),py+9*Math.sin(an))}x.closePath();x.fill()}});
  var vp=new THREE.Mesh(new THREE.PlaneGeometry(PW-.004,PT-.004),new THREE.MeshStandardMaterial({map:vt,roughness:.6,metalness:.2}));vp.rotation.y=-Math.PI/2;vp.position.set(-PL/2-.0006,PT/2,0);g.add(vp);
  var vt2=new THREE.Mesh(new THREE.PlaneGeometry(.026,PW-.004),new THREE.MeshStandardMaterial({map:vt,roughness:.6,metalness:.2}));vt2.rotation.x=-Math.PI/2;vt2.position.set(-PL/2+.0135,PT+.0035,0);g.add(vt2);
  box(.006,.012,.04,-PL/2-.002,.014,0,0xdfe2e5,{roughness:.6});
  var lb=ctx_(1024,700,function(x,w,h){x.fillStyle="#bcc4cc";x.fillRect(0,0,w,h);x.fillStyle="#222";x.textBaseline="middle";
   x.fillStyle="#d3242b";x.fillRect(330,70,110,80);x.fillStyle="#fff";x.font="bold 40px Arial";x.textAlign="center";x.fillText("MW",385,110);x.font="14px Arial";x.fillStyle="#222";x.fillText("MEAN WELL",385,170);
   x.font="bold 54px Arial";x.fillStyle="#2a2d31";x.fillText("DR-120-24",730,200);
   x.font="22px Arial";x.textAlign="left";x.fillText("INPUT: 100-120VAC  3.3A",520,300);x.fillText("200-240VAC  2.0A",520,332);x.fillText("OUTPUT: 24V  5.0A",520,380);
   x.font="bold 26px Arial";x.fillText("CE",150,160);x.font="18px Arial";x.fillText("MADE IN TAIWAN",120,520);
   x.fillStyle="#111";x.fillRect(250,235,48,92);x.fillStyle="#555";x.fillRect(258,262,32,28);x.font="14px Arial";x.fillStyle="#222";x.fillText("115VAC",216,345);x.fillText("230VAC",216,222);
   x.font="bold 26px Arial";x.fillText("⏚   N    L",100,600);x.fillText("+V +V -V -V",800,560);x.beginPath();x.arc(940,420,7,0,7);x.fillStyle="#6f9a38";x.fill()});
  var lp=new THREE.Mesh(new THREE.PlaneGeometry(PL-.004,PW-.004),new THREE.MeshBasicMaterial({map:lb,transparent:true}));lp.rotation.x=-Math.PI/2;lp.position.set(0,PT+.0036,0);g.add(lp);
  var GR=0x2a7d3e;
  box(.022,.018,.04,-.043,PT+.009,0,GR,{roughness:.55});box(.004,.011,.034,-.055,PT+.008,0,0x15351d,{});
  for(var q1=-1;q1<=1;q1++){cyl(.0045,.0045,.003,0xb6bcc2,{metalness:.5,roughness:.4},"y").position.set(-.043,PT+.0195,q1*.0125)}
  box(.016,.016,.052,.0555,PT+.008,0,GR,{roughness:.55});box(.004,.01,.046,.0635,PT+.008,0,0x15351d,{});
  for(var q2=0;q2<4;q2++){cyl(.0042,.0042,.003,0xb6bcc2,{metalness:.5,roughness:.4},"y").position.set(.0555,PT+.0175,-.018+q2*.012)}
  box(.012,.004,.012,-.06,.006,.0,0xdfe2e5,{roughness:.6});
}else if(t==="rackmod"){
  /* โมดูลแร็ค Precitec M4 (ตลับอลูมิเนียม แผงหน้า + ฝาเจาะรู + มือจับ) หน้าแผงอยู่ด้าน +z */
  box(.06,.13,.25,0,.075,-.01,0xdfe3e7,{metalness:.15,roughness:.4});box(.07,.15,.006,0,.075,.12,0xdadde0,{metalness:.15,roughness:.35});
  box(.05,.06,.002,0,.1,.124,0xf1f2f4);box(.012,.012,.003,.016,.092,.126,0x111827);
  for(var r1=0;r1<8;r1++)for(var r2=0;r2<3;r2++)cyl(.004,.004,.004,0x1f2937,{},"y").position.set(-.015+r2*.015,.141,-.1+r1*.022);
  box(.016,.018,.014,.018,.07,.13,0xb7bcc2,{metalness:.15});box(.018,.02,.012,.012,.045,.13,0x62c370,{emissive:0x1f7a30,emissiveIntensity:.5});
  box(.03,.012,.02,0,.015,.133,0xaeb4ba,{metalness:.15});
  [[-.03,.005],[.03,.005],[-.03,.145],[.03,.145]].forEach(function(p){cyl(.006,.006,.012,0xd5d8dc,{metalness:.15,roughness:.25},"z").position.set(p[0]*.8,p[1]+.005,.128)})
 }else if(t==="tcpmod"){
  /* โมดูล TCP.I (แผงหน้ามีปุ่มหมุนสองลูก สวิตช์ ขั้วแดง/น้ำเงิน คอนเน็กเตอร์ ฝาตาข่าย) */
  box(.2,.07,.3,0,.04,-.04,0xdfe3e7,{metalness:.15,roughness:.45});for(var t1=0;t1<9;t1++)for(var t2=0;t2<6;t2++)cyl(.004,.004,.003,0x1f2937,{},"y").position.set(-.08+t2*.032,.076,-.16+t1*.03);
  box(.21,.075,.006,0,.04,.115,0xdadde0,{metalness:.15,roughness:.35});
  [-.065,.065].forEach(function(x){cyl(.018,.018,.026,0x1a1a1a,{},"z").position.set(x,.04,.13);cyl(.022,.022,.012,0xc9ced3,{metalness:.15,roughness:.25},"z").position.set(x,.04,.122)});
  [-.03,.03].forEach(function(x){cyl(.007,.007,.012,0x2563eb,{},"z").position.set(x,.06,.123);cyl(.007,.007,.012,0xdc2626,{},"z").position.set(x*.5,.06,.123);cyl(.005,.005,.02,0xcfd3d8,{metalness:.15},"z").position.set(x,.025,.125)});
  [-.095,.095].forEach(function(x){cyl(.011,.011,.02,0x9aa0a6,{metalness:.8},"z").position.set(x,.04,.125)});
  cyl(.01,.01,.07,0xc9ced3,{metalness:.15,roughness:.25},"z").position.set(-.085,.01,.15)
 }else if(t==="rackcase"){
  /* เครื่องควบคุมแบบแร็ค (WSIO) ห่อพลาสติกใส — ตัวเครื่องเทา แผงหน้าหลายโมดูล จอ ขั้วเขียว สวิตช์แดง ด้ามจับสองข้าง */
  box(.46,.18,.4,0,.1,0,0xb4bac1,{metalness:.15,roughness:.5});box(.46,.14,.006,0,.1,.2,0xd9dbde,{metalness:.15});
  box(.2,.1,.004,-.06,.105,.205,0x1b1f27,{roughness:.2,metalness:.15});box(.045,.13,.004,.07,.1,.205,0xc9ccd0);
  box(.04,.1,.005,.12,.1,.206,0xcdd0d4);for(var w1=0;w1<8;w1++)box(.006,.005,.004,.108,.14-w1*.012,.209,0x1f9d55);box(.02,.02,.004,.125,.06,.21,0x1f9d55);
  box(.05,.045,.006,.18,.12,.207,0x1a1a1a);box(.05,.04,.006,.18,.07,.207,0x1a1a1a);box(.05,.04,.006,.205,.1,.207,0xc0262d);
  box(.02,.18,.05,-.24,.1,.17,0x2b2f36,{metalness:.4});box(.02,.18,.05,.24,.1,.17,0x2b2f36,{metalness:.4});box(.46,.012,.4,0,.016,0,0x3b3f46);
  box(.5,.22,.44,0,.11,0,0xffffff,{transparent:true,opacity:.14,depthWrite:false,roughness:.1})
 }else if(D.modelX(t,g,box,cyl,tor,M)){g.traverse(function(m){if(m.isMesh){[].concat(m.material).forEach(function(q){if(q&&q.metalness>.45)q.metalness=.45;if(q&&q.roughness<.3)q.roughness=.3})}})
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
// ===== โต๊ะเหล็กทำงาน (ตามรูปโต๊ะจริง: ท็อปกระจกขอบเขียวขี้ม้า · ลิ้นชักกลาง · ตู้ลิ้นชัก 3 ชั้นด้านขวา · ขาท่อเหล็กด้านซ้าย เปิดช่องวางเข่า) =====
D.plate=function(txt,w,h,bg,fg){var c=document.createElement("canvas");c.width=256;c.height=Math.max(32,Math.round(256*h/w));var x=c.getContext("2d");x.fillStyle=bg||"#f1ede2";x.fillRect(0,0,c.width,c.height);x.strokeStyle="#8a8374";x.lineWidth=3;x.strokeRect(1.5,1.5,c.width-3,c.height-3);x.fillStyle=fg||"#2b2a28";x.font="700 "+Math.round(c.height*.62)+"px 'Noto Sans Thai','Segoe UI',sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(txt,c.width/2,c.height/2+1);
 var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));return m};
D.desk=function(g,f,surf){(D.deskInfo(f).nw?D.deskNew:D.deskOld)(g,f,surf)};
D.deskNew=function(g,f,surf){
 var I=D.deskInfo(f),L=I.L,S=I.S,h=f.h,grp=new THREE.Group(),off=I.off,pw=I.pw,legH=I.legH,bodyH=I.bodyH,
  body=off?0xcdbfa8:0xe3e6ea,bodyD=off?0xb0a38c:0xc5cad1,rim=off?0x7f8c6a:0xcfd3d8,steel=off?0x8a8f96:0x9aa1ab,dark=0x2f2e33,silver=0xdfe3e8;
 grp.rotation.y=I.rot;grp.position.set(f.x,0,f.z);g.add(grp);
 var id=f.did,DW=function(c,r){return[id,c,r]};
 /* ท็อป: แผ่นรองสีเขียวขี้ม้า + กระจกใส + ขอบมนสีเขียวขี้ม้า */
 bx(grp,L,.02,S,0,h-.03-.005,0,off?0x9aa38a:0xf0f1f3,{roughness:.6});
 var top=bx(grp,L-.03,.014,S-.03,0,h-.007,0,0xdfeee6,{roughness:.08,metalness:.1,transparent:true,opacity:.5});surf(top,"บน"+f.n,{dwf:id});
 bx(grp,L,.034,.03,0,h-.017,S/2-.015,rim,{roughness:.45});bx(grp,L,.034,.03,0,h-.017,-S/2+.015,rim,{roughness:.45});
 bx(grp,.03,.034,S-.06,L/2-.015,h-.017,0,rim,{roughness:.45});bx(grp,.03,.034,S-.06,-L/2+.015,h-.017,0,rim,{roughness:.45});
 if(!off){bx(grp,L*.92,.5,.025,0,h+.25,-S/2+.02,0xffffff,{roughness:.3});bx(grp,L*.92+.03,.03,.03,0,h+.5,-S/2+.02,0x9aa1ab);bx(grp,L*.92+.03,.03,.03,0,h+.01,-S/2+.02,0x9aa1ab)}
 /* ตู้ลิ้นชัก 3 ชั้น (ด้านขวา เมื่อนั่งหน้าโต๊ะ) */
 var px=L/2-pw/2-.02,zf=S/2-.025;
 bx(grp,pw,bodyH,S-.05,px,legH+bodyH/2,-.005,body,{roughness:.55,metalness:.25});
 bx(grp,pw+.012,.016,S-.04,px,legH+.008,-.005,bodyD,{metalness:.2});
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var lg=new THREE.Mesh(new THREE.CylinderGeometry(.022,.016,legH,10),mat(0x6f6a73,{metalness:.3}));lg.position.set(px+q[0]*(pw/2-.04),legH/2,q[1]*(S/2-.06));lg.castShadow=true;grp.add(lg)});
 var RW=D.deskRows(I),names=["เครื่องเขียน","เอกสาร","ของใช้ส่วนตัว"];
 RW.forEach(function(R,i){var fr=bx(grp,pw-.03,R.h,.014,px,R.y,zf+.004,i===2?bodyD:body,{roughness:.5,metalness:.25});surf(fr,"ลิ้นชักโต๊ะ ชั้น "+(i+1),{dw:DW(2,i+1)});
  bx(grp,pw*.45,.018,.016,px,R.y+R.h/2-.026,zf+.016,dark);
  if(i===1){var lk=new THREE.Mesh(new THREE.CylinderGeometry(.011,.011,.01,12),mat(silver,{metalness:.85,roughness:.25}));lk.rotation.x=Math.PI/2;lk.position.set(px+pw*.3,R.y,zf+.014);grp.add(lk)}
  var pl=D.plate(names[i],pw*.62,.035);pl.position.set(px,R.y-R.h/2+.032,zf+.0125);grp.add(pl)});
 /* ลิ้นชักกลาง (ลิ้นชักดินสอ มีกุญแจ) */
 var cl=-L/2+.1,cr=L/2-pw-.04,cwid=cr-cl,cx0=(cl+cr)/2;
 if(cwid>.15){var cf=bx(grp,cwid-.02,.06,.014,cx0,h-.035-.04,zf+.004,body,{roughness:.5,metalness:.25});surf(cf,"ลิ้นชักกลางโต๊ะ",{dw:DW(1,1)});
  bx(grp,cwid-.02,.035,S-.08,cx0,h-.035-.04,-.005,bodyD,{roughness:.6});
  bx(grp,cwid*.34,.016,.016,cx0,h-.035-.052,zf+.016,dark);var lk2=new THREE.Mesh(new THREE.CylinderGeometry(.011,.011,.01,12),mat(silver,{metalness:.85,roughness:.25}));lk2.rotation.x=Math.PI/2;lk2.position.set(cx0+cwid*.36,h-.035-.032,zf+.014);grp.add(lk2);
  var pl2=D.plate("ของใช้ส่วนตัว",Math.min(.2,cwid*.4),.03);pl2.position.set(cx0-cwid*.28,h-.035-.04,zf+.0125);grp.add(pl2);
  /* แผงหลังโต๊ะ + รางวางเท้า */
  bx(grp,cwid,bodyH-.2,.012,cx0,legH+(bodyH-.2)/2+.1,-S/2+.045,body,{roughness:.55,metalness:.2});
  var fr2=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,cwid,10),mat(steel,{metalness:.7,roughness:.3}));fr2.rotation.z=Math.PI/2;fr2.position.set(cx0,.16,S/2-.12);grp.add(fr2)}
 /* ขาท่อเหล็กด้านซ้าย */
 var lx=-L/2+.05;
 [-1,1].forEach(function(q){var t=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,h-.035,12),mat(steel,{metalness:.75,roughness:.3}));t.position.set(lx,(h-.035)/2,q*(S/2-.06));t.castShadow=true;grp.add(t);
  bx(grp,.05,.012,.07,lx,.006,q*(S/2-.06),0x3b3a40)});
 var cb=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,S-.12,10),mat(steel,{metalness:.75,roughness:.3}));cb.rotation.x=Math.PI/2;cb.position.set(lx,.14,0);grp.add(cb);
 var cb2=cb.clone();cb2.position.set(lx,h-.06,0);grp.add(cb2)};
D.deskOld=function(g,f,surf){
 var I=D.deskInfo(f),L=I.L,S=I.S,h=f.h,grp=new THREE.Group(),off=I.off,body=off?0x74787f:0xe9ecf0,dark=0x3b3a40,topC=off?0x7f8c78:0xf4f5f7,legH=I.legH,bodyH=I.bodyH,pw=I.pw,id=f.did;
 grp.rotation.y=I.rot;grp.position.set(f.x,0,f.z);g.add(grp);
 var top=bx(grp,L,.035,S,0,h-.0175,0,topC,off?{roughness:.12,metalness:.1,transparent:true,opacity:.82}:{roughness:.5});surf(top,"บน"+f.n,{dwf:id});
 if(!off){bx(grp,L*.92,.5,.025,0,h+.25,-S/2+.02,0xffffff,{roughness:.3});bx(grp,L*.92+.03,.03,.03,0,h+.5,-S/2+.02,0x9aa1ab);bx(grp,L*.92+.03,.03,.03,0,h+.01,-S/2+.02,0x9aa1ab)}
 bx(grp,L+.014,.014,S+.014,0,h-.042,0,0x6f7467,{roughness:.5});
 [-1,1].forEach(function(sx){var x=sx*(L/2-pw/2-.02);
  bx(grp,pw,bodyH,S-.05,x,legH+bodyH/2,-.005,body,{roughness:.55,metalness:.25});
  var dh=(bodyH-.06)/3;for(var i=0;i<3;i++){var y=legH+bodyH-.03-dh*(i+.5);
   var fr=bx(grp,pw-.03,dh-.02,.012,x,y,S/2-.02,i===2?0x978f99:0x9a929c,{roughness:.5,metalness:.25});surf(fr,"ลิ้นชักโต๊ะ",{dw:[id,sx<0?1:3,i+1]});
   bx(grp,pw*.55,.022,.016,x,y+dh/2-.03,S/2-.012,dark);if(i===1)bx(grp,.014,.014,.014,x+pw*.28,y,S/2-.01,0xe5e7eb,{metalness:.8})}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var lg=new THREE.Mesh(new THREE.CylinderGeometry(.022,.016,legH,10),mat(0x7c7480,{metalness:.3}));lg.position.set(x+q[0]*(pw/2-.04),legH/2,q[1]*(S/2-.06));lg.castShadow=true;grp.add(lg)})});
 var cw=L-2*pw-.08;if(cw>.1){bx(grp,cw,.07,S-.08,0,h-.035-.035,-.005,body,{roughness:.55,metalness:.25});var cf=bx(grp,cw-.04,.045,.012,0,h-.035-.035,S/2-.045,0x9a929c);surf(cf,"ลิ้นชักกลางโต๊ะ",{dw:[id,2,1]});bx(grp,.014,.014,.014,0,h-.035-.035,S/2-.036,0xe5e7eb,{metalness:.8});
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
D.drawerPos=function(f,c,r){
 if(f.t==="deskdw"){var I=f.I,th=f.rot,lx,y,cw,ch,zl=I.S/2+.025;
  if(!I.nw){if(c===2){lx=0;y=I.h-.07;cw=I.L-2*I.pw-.12;ch=.045}else{var dh=(I.bodyH-.06)/3;lx=(c===1?-1:1)*(I.L/2-I.pw/2-.02);y=I.legH+I.bodyH-.03-dh*(r-.5);cw=I.pw-.03;ch=dh-.02}}
  else if(c===2){var R=D.deskRows(I)[r-1]||D.deskRows(I)[0];lx=I.L/2-I.pw/2-.02;y=R.y;cw=I.pw-.03;ch=R.h}
  else{lx=(.06-I.pw)/2;y=I.h-.035-.04;cw=I.L-I.pw-.14-.02;ch=.06}
  var sn=Math.sin(th),co=Math.cos(th),q=function(v){return Math.round(v*1e6)/1e6};
  return{x:q(f.x+lx*co+zl*sn),y:y,z:q(f.z-lx*sn+zl*co),nx:q(sn),nz:q(co),rot:th,cw:cw,ch:ch}}
 var G=D.drawerGeom(f),fc=f.face===-1?-1:1,lx=-f.w/2+G.m+(c-.5)*G.cw,y=G.y0-(r-.5)*G.ch;return{x:f.x+fc*lx,y:y,z:f.z+fc*f.d/2,nx:0,nz:fc,rot:fc===1?0:Math.PI,cw:G.cw,ch:G.ch}};
D.drawerValid=function(f,c,r){return f.t!=="deskdw"?true:(f.I.nw?(c===2||(c===1&&r===1)):(c!==2||r===1))};
D.furnById=function(id){return(D.furn||[]).filter(function(f){return f.id===id})[0]};
D.drawers=function(g,f,surf,pick){
 var w=f.w,d=f.d,h=f.h,G=D.drawerGeom(f),grp=new THREE.Group(),fc=f.face===-1?-1:1;grp.position.set(f.x,0,f.z);grp.rotation.y=fc===1?0:Math.PI;g.add(grp);
 var body=0xe9edf1;
 bx(grp,w,h-.05,d,0,.05+(h-.05)/2,0,body,{roughness:.55,metalness:.15});
 bx(grp,w-.04,.05,d-.04,0,.025,0,0xcfd6de);
 var top=bx(grp,w+.02,.022,d+.02,0,h+.004,0,0xf1f4f7,{roughness:.5});surf(top,"บนตู้ลิ้นชัก");top.userData.dwf=f.id;
 var tp=new THREE.Mesh(new THREE.BoxGeometry(w+.02,.3,d+.02),new THREE.MeshBasicMaterial({visible:false}));tp.position.set(0,h+.16,0);tp.visible=false;grp.add(tp);surf(tp,"บนตู้ลิ้นชัก",{dwf:f.id,dwtop:1});
 // ลิ้นชักใส
 for(var c=1;c<=f.cols;c++)for(var r=1;r<=f.rows;r++){var P=D.drawerPos({x:0,z:0,w:w,d:d,h:h,cols:f.cols,rows:f.rows,face:1},c,r);
  var fw=G.cw-.012,fh=G.ch-.01,m=new THREE.Mesh(new THREE.BoxGeometry(fw,fh,d*.78),new THREE.MeshStandardMaterial({color:0xdde7ee,roughness:.2,metalness:0,transparent:true,opacity:.55,depthWrite:false}));
  m.position.set(P.x,P.y,d/2-d*.39+.004);m.userData.surf="ตู้ลิ้นชัก แถว "+c+" ชั้น "+r;m.userData.dw=[f.id,c,r];grp.add(m);pick.push(m);
  var hd=new THREE.Mesh(new THREE.BoxGeometry(fw*.42,fh*.28,.012),new THREE.MeshStandardMaterial({color:0xf5f8fa,roughness:.3,transparent:true,opacity:.8}));hd.position.set(P.x,P.y+fh*.18,d/2+.008);grp.add(hd);
  // ของในลิ้นชัก (สุ่มแบบคงที่ เพื่อให้ดูเหมือนของจริง)
  var seed=(c*13+r*7)%11;if(seed<6){var col=[0xc0392b,0x1e4fa8,0xd9dde2,0x1f2937,0x2e8b57,0xb8860b][seed%6],it=new THREE.Mesh(new THREE.BoxGeometry(fw*(.3+seed%3*.12),fh*.45,d*.3),new THREE.MeshStandardMaterial({color:col,roughness:.6}));it.position.set(P.x+((seed%3)-1)*fw*.2,P.y-fh*.18,d/2-d*.4);grp.add(it)}}
 };
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
  else if(t==="deskdw"){}
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
 D.furn.forEach(function(f){if(!f.w||!f.d||f.t==="belt"||f.t==="deskdw")return;c.push([f.x-f.w/2,f.z-f.d/2,f.x+f.w/2,f.z+f.d/2])});
 D.stairs.forEach(function(st){c.push([st.x1,st.z1,st.x2,st.z2])});
 Object.keys(racks).forEach(function(k){var r=racks[k];c.push([r.x-r.w/2,r.z-r.d/2,r.x+r.w/2,r.z+r.d/2])});return c};
window.spDept=D;
})();
