/* icons.js — แทนอีโมจิทั้งเว็บด้วยไอคอนเส้น (SVG) สไตล์มืออาชีพ ทำงานอัตโนมัติกับข้อความที่สร้างทีหลังด้วย */
(function(){
var P={
home:'<path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/>',
compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.5-4.5"/>',
clip:'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
chart:'<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
users:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M16 4a4 4 0 0 1 0 8M22 21v-1a6 6 0 0 0-4-5.6"/>',
print:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
okc:'<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
check:'<path d="M20 6 9 17l-5-5"/>',
sq:'<rect x="4" y="4" width="16" height="16" rx="2"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
refresh:'<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0 0 20.5 15"/>',
save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
plug:'<path d="M12 22v-5M9 8V2M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/>',
zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
blocks:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/>',
factory:'<path d="M2 20h20"/><path d="M4 20V10l6 4v-4l6 4V4h4v16"/>',
cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
drop:'<path d="M12 2.7s7 7.3 7 12.3a7 7 0 0 1-14 0c0-5 7-12.3 7-12.3z"/>',
image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
cloud:'<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
radio:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor"/>',
flask:'<path d="M9 2h6M10 2v6L4 20a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-12V2"/>',
magnet:'<path d="M6 15a6 6 0 0 0 12 0V3h-4v12a2 2 0 0 1-4 0V3H6z"/><path d="M6 8h4M14 8h4"/>',
nut:'<path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/><circle cx="12" cy="12" r="3"/>',
battery:'<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/>',
monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
tag:'<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1"/>',
eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><path d="M3 3l18 18"/>',
map:'<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
spark:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
ruler:'<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
archive:'<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
down:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
up:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
mega:'<path d="M3 11v2a1 1 0 0 0 1 1h3l8 5V5L7 10H4a1 1 0 0 0-1 1z"/><path d="M19 8a5 5 0 0 1 0 8"/>',
trash:'<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
bot:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 14h.01M15 14h.01"/><circle cx="12" cy="3" r="1"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
walk:'<circle cx="12" cy="4.5" r="1.8"/><path d="M12 7v7M9 22l3-8 3 8M8 11l4-1 4 1"/>',
move:'<path d="m5 9-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
x:'<path d="M18 6 6 18M6 6l12 12"/>',
thumb:'<path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.5l-2.3 8a2 2 0 0 1-1.9 1.5H7V10l4.1-7.3a1 1 0 0 1 .9-.5 2.5 2.5 0 0 1 2.5 2.5z"/>',
tool:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
target:'<circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/>',
sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
fire:'<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-9-1 2-2 3-3 3 0-3-2-5-3-6-1 5-4 7-4 12a7 7 0 0 0 7 7z"/>',
file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
filet:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
chdn:'<path d="m6 9 6 6 6-6"/>',
chrt:'<path d="m9 6 6 6-6 6"/>',
clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
full:'<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>'
};
var D={"#ef4444":"🔴🟥","#22c55e":"🟢🟩","#eab308":"🟡","#3b82f6":"🔵🟦","#92400e":"🟤🟫","#a855f7":"🟪","#1f2937":"⚫"};
var M={
"🏠":"home","🧭":"compass","🔍":"search","🔎":"search","🔭":"search","📋":"clip","📝":"pen","✏":"pen","✎":"pen","📍":"pin","📌":"pin",
"🔧":"wrench","🛠":"wrench","📷":"camera","🗓":"cal","📅":"cal","📊":"chart","💬":"msg","👤":"user","👥":"users","🖨":"print",
"📦":"box","✅":"okc","✓":"check","✔":"check","☑":"check","☐":"sq","⚙":"gear","🔄":"refresh","💾":"save","🔌":"plug","⚡":"zap",
"🧩":"blocks","🏭":"factory","🛒":"cart","🛍":"cart","💧":"drop","🚰":"drop","🖼":"image","☁":"cloud","📚":"book","🔘":"radio",
"🧪":"flask","🧲":"magnet","🔩":"nut","🔋":"battery","🖥":"monitor","➕":"plus","🏷":"tag","👻":"eye","👁":"eye","🙈":"eyeoff",
"🗺":"map","✨":"spark","📐":"ruler","📏":"ruler","🗄":"archive","⚠":"alert","📥":"down","⬇":"down","⬆":"up","🔔":"bell","✉":"mail",
"📣":"mega","🗑":"trash","🤖":"bot","🦾":"bot","🛡":"shield","🔒":"lock","🚶":"walk","✋":"move","❌":"x","✕":"x","✖":"x",
"👍":"thumb","🧰":"tool","📡":"target","🛰":"target","🧵":"box","🎚":"sliders","🎛":"sliders","🔥":"fire","📄":"file","📜":"filet",
"🔻":"chdn","🔜":"chrt","🕘":"clock","⛶":"full","🔲":"sq"};
Object.keys(D).forEach(function(c){D[c].match(/./gu).forEach(function(e){M[e]="dot:"+c})});
M["⚪"]="dot:#e5e7eb";M["👋"]="";
var keys=Object.keys(M).sort(function(a,b){return b.length-a.length});
var RE=new RegExp("("+keys.map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("|")+")\\uFE0F?","gu");
var st=document.createElement("style");
st.textContent=".ic{width:1.15em;height:1.15em;display:inline-block;vertical-align:-.2em;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex:none}.ic.dot{stroke:none;width:.8em;height:.8em;vertical-align:-.05em}";
(document.head||document.documentElement).appendChild(st);
function svg(k){var m=M[k];if(m===undefined)return null;if(m==="")return"";
if(m.indexOf("dot:")===0)return'<svg class="ic dot" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="'+m.slice(4)+'"'+(m==="dot:#e5e7eb"?' stroke="#9ca3af" style="stroke-width:2"':"")+'/></svg>';
return'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+P[m]+'</svg>'}
function strip(s){return s.replace(RE,"").replace(/^\s+/,"")}
var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,NOSCRIPT:1,SVG:1,CANVAS:1};
function txt(n){var v=n.nodeValue;if(!v)return;RE.lastIndex=0;if(!RE.test(v))return;var p=n.parentNode;if(!p||SKIP[(p.nodeName||"").toUpperCase()]||(p.closest&&p.closest("[data-noic]")))return;
if(p.nodeName==="OPTION"){return}
var h=v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(RE,function(a,k){var s=svg(k);return s===null?a:s});
var t=document.createElement("template");t.innerHTML=h;p.replaceChild(t.content,n)}
function attrs(e){["title","placeholder","aria-label","alt"].forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(v){RE.lastIndex=0;if(RE.test(v))e.setAttribute(a,strip(v))}})}
function walk(r){if(r.nodeType===3){txt(r);return}if(r.nodeType!==1)return;var nm=r.nodeName.toUpperCase();if(nm==="OPTION"){RE.lastIndex=0;if(RE.test(r.text))r.text=strip(r.text);return}
if(SKIP[nm]||r.hasAttribute("data-noic"))return;attrs(r);
var c=r.firstChild,nx;while(c){nx=c.nextSibling;walk(c);c=nx}}
var busy=false;
var mo=new MutationObserver(function(ms){if(busy)return;busy=true;try{ms.forEach(function(m){if(m.type==="characterData"){walk(m.target)}else if(m.type==="attributes"){attrs(m.target)}else m.addedNodes.forEach(walk)})}finally{busy=false}});
function start(){walk(document.documentElement);mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["title","placeholder"]});if(RE.test(document.title)){RE.lastIndex=0;document.title=strip(document.title)}}
start();
document.addEventListener("DOMContentLoaded",function(){walk(document.documentElement);RE.lastIndex=0;document.title=strip(document.title)});
window.spIcon=function(s){return String(s).replace(RE,function(a,k){var v=svg(k);return v===null?a:v})};
})();
