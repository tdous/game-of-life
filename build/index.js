!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class n{constructor(t){return this.bindTo(t)}bindTo(t){return this.cv=document.getElementById(t),this.cx=this.cv.getContext("2d"),this.setupCanvas(),this}setupCanvas(){const t=window.getComputedStyle(this.cv);this.cv.setAttribute("width",t.width),this.cv.setAttribute("height",t.height),this.w=parseInt(t.width),this.h=parseInt(t.height),this.rt=this.cv.getBoundingClientRect()}wipe(){this.cx.clearRect(0,0,this.w,this.h)}}var s,r=function(){function t(t){this.gridSize=t,this.liveCells=[],this.setCellLive=function(t,e,i){t[i]=t[i]||[],t[i][e]=1}}return t.prototype.getCellState=function(t,e){for(var i=this.liveCells[e]&&this.liveCells[e][t],n=0,s=-1;s<=1;s++)for(var r=-1;r<=1;r++)if(0!==s||0!==r){var a=e+s,o=t+r;a<0?a=this.gridSize-1:a>=this.gridSize&&(a=0),o<0?o=this.gridSize-1:o>=this.gridSize&&(o=0),this.liveCells[a]&&this.liveCells[a][o]&&n++}return{isAlive:i,numNeighbours:n}},t.prototype.iterate=function(){for(var t=[],e=0;e<this.gridSize;e++)for(var i=0;i<this.gridSize;i++){var n=this.getCellState(i,e);(n.isAlive&&n.numNeighbours>=2&&n.numNeighbours<=3||!n.isAlive&&3===n.numNeighbours)&&this.setCellLive(t,i,e)}this.liveCells=t},t.prototype.setCellState=function(t,e,i){for(var n=[],s=0;s<this.gridSize;s++)if(this.liveCells[s]||s===e){n[s]=this.liveCells[s]||[];for(var r=0;r<this.gridSize;r++)s===e&&r===t?i?this.setCellLive(n,r,s):n[s]&&delete n[s][r]:this.liveCells[s]&&this.liveCells[s][r]&&this.setCellLive(n,r,s)}this.liveCells=n},t}();!function(t){t[t.f=0]="f",t[t.s=1]="s",t[t.fs=2]="fs",t[t.sf=3]="sf"}(s||(s={}));const a=(t,e,i,n,s,r)=>{t.beginPath(),t.rect(e,i,n,s),((t,e)=>{switch(e){case"f":t.fill();break;case"s":t.stroke();break;case"fs":t.fill(),t.stroke();break;case"sf":t.stroke(),t.fill()}})(t,r)};var o,l=function(t,e,i){t.cx.fillStyle="#DDD",t.wipe();for(var n=0;n<e;n++)for(var s=0;s<e;s++)switch(!0){case n%2==0&&s%2==0:case n%2!=0&&s%2!=0:a(t.cx,s*i,n*i,i,i,"f")}},u=function(t,e,i){for(var n in t.cx.fillStyle="#484",t.wipe(),e)for(var s in e[n])a(t.cx,parseInt(s)*i,parseInt(n)*i,i,i,"f")},c={glider:[[,,1],[1,,1],[,1,1]],lightweight:[[,1,1],[1,1,1,1],[1,1,,1,1],[,,1,1]],mediumweight:[[,1,1,1],[1,1,1,1,1],[1,1,1,,1,1],[,,,1,1]],heavyweight:[[,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,,1,1],[,,,,1,1]],pulsar:[[,,1,1,1,,,,1,1,1],[],[1,,,,,1,,1,,,,,1],[1,,,,,1,,1,,,,,1],[1,,,,,1,,1,,,,,1],[,,1,1,1,,,,1,1,1],[],[,,1,1,1,,,,1,1,1],[1,,,,,1,,1,,,,,1],[1,,,,,1,,1,,,,,1],[1,,,,,1,,1,,,,,1],[],[,,1,1,1,,,,1,1,1]],rpentomino:[[,1,1],[1,1],[,1]],gospargun:[[,,,,,,,,,,,,,,,,,,,,,,,,1],[,,,,,,,,,,,,,,,,,,,,,,1,,1],[,,,,,,,,,,,,1,1,,,,,,,1,1,,,,,,,,,,,,,1,1],[,,,,,,,,,,,1,,,,1,,,,,1,1,,,,,,,,,,,,,1,1],[1,1,,,,,,,,,1,,,,,,1,,,,1,1],[1,1,,,,,,,,,1,,,,1,,1,1,,,,,1,,1],[,,,,,,,,,,1,,,,,,1,,,,,,,,1],[,,,,,,,,,,,1,,,,1],[,,,,,,,,,,,,1,1]]},f=0,h=0,d=!1,v=150,g=20,m=0,p=0,b=0,T=new r(g),C=document.getElementById("btn-toggle-sim"),k=document.getElementById("txt-grid-size"),w=document.getElementById("txt-interval"),y=new n("g-o-l-bg"),S=new n("g-o-l"),I=new class{constructor(){this.animate=!1,this.frameReqId=0,this.frameTasks=[],this.lastFrameTaskId=0,this.loop=(t=0)=>{const e=this.frameTasks.length;for(let i=0;i<e;i++)this.frameTasks[i].fn(t);this.frameReqId=requestAnimationFrame(this.loop)},this.addTasks=this.addTasks.bind(this)}addTask(t){return this.addTasks([t])[0]}addTasks(t){const e=[];return 0==t.length?e:(t.forEach(t=>{this.frameTasks.push({id:this.lastFrameTaskId,fn:t}),e.push(this.lastFrameTaskId),this.lastFrameTaskId++}),e)}deleteTask(t){this.frameTasks=this.frameTasks.filter(e=>e.id!==t)}start(t){this.animate||(this.animate=!0,this.loop())}stop(){cancelAnimationFrame(this.frameReqId),this.animate=!1}};k.value=g.toString(),w.value=v.toString(),o=S.w/g,C.onclick=function(){d?j():M()},k.onkeyup=function(t){clearTimeout(b),b=setTimeout((function(){var e=parseInt(t.target.value);e!==g&&(g=e,o=S.w/g,T.gridSize=g,l(y,g,o))}),1e3)},w.onkeyup=function(t){clearTimeout(b),b=setTimeout((function(){v=t.target.value}),1e3)};for(var x=document.getElementsByClassName("btn-preset"),z=0;z<x.length;z++){x[z].onclick=function(t){var e,i;T.liveCells=(e=t.currentTarget.id.replace("preset-",""),(i=t.currentTarget.dataset.pad?parseInt(t.currentTarget.dataset.pad):null)?function(t,e){for(var i=[],n=e+t.length,s=0;s<n;s++){var r=[];r.length=e,t[s-e],i=s<e?i.concat([r]):i.concat([r.concat(t[s-e])])}return i}(c[e],i):c[e]),u(S,T.liveCells,o)}}window.onblur=function(){j()};var A=function(t){if(0!==h){var e=Math.floor((t.clientX-S.rt.left)/o),i=Math.floor((t.clientY-S.rt.top)/o);if(e!==m||i!==p||h!==f){m=e,p=i;var n=h<0?1:0;T.setCellState(e,i,n),u(S,T.liveCells,o)}f=h}};S.cv.addEventListener("contextmenu",(function(t){return t.preventDefault()})),S.cv.onmousedown=function(t){h=0===t.button?-1:1,A(t)},S.cv.onmousemove=A,window.onmouseup=function(){return h=0};var E=0,M=function(){I.start(),C.innerHTML="PAUSE",d=!0},j=function(){I.stop(),C.innerHTML="RUN",d=!1};l(y,g,o),I.addTask((function(t){void 0===t&&(t=0),t-E>=v&&(T.iterate(),u(S,T.liveCells,o),E=t)}))}]);
//# sourceMappingURL=index.js.map