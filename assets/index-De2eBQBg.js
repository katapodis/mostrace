(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{ctx=null;master=null;oscs=[];engineGain=null;filter=null;squealGain=null;windGain=null;windFilter=null;rumbleGain=null;drive=null;intakeGain=null;intakeFilter=null;enabled=!0;unlocker=null;unlockMobile(){let e=navigator.audioSession;if(e)try{e.type=`playback`}catch{}if((/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&typeof Audio<`u`){if(!this.unlocker){let e=new Audio(t());e.loop=!0,e.setAttribute(`playsinline`,``),this.unlocker=e}this.unlocker.paused&&this.unlocker.play().catch(()=>void 0)}}start(){if(this.unlockMobile(),this.ctx)this.ctx.state!==`running`&&this.ctx.resume().catch(()=>void 0);else try{let e=new AudioContext;e.state!==`running`&&e.resume().catch(()=>void 0),this.ctx=e;let t=e.createGain();t.gain.value=0,t.connect(e.destination),this.master=t;let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=900,n.Q.value=1.2;let r=e.createGain();r.gain.value=.2,n.connect(r).connect(t),this.filter=n,this.engineGain=r;let i=[0,.22,1,.2,.62,.12,.4,.08,.26,.05,.16,.03,.1,0,.06,0,.04],a=new Float32Array(i.length),o=Float32Array.from(i),s=e.createPeriodicWave(a,o),c=e.createWaveShaper(),l=new Float32Array(257);for(let e=0;e<257;e++){let t=(e-128)/128;l[e]=Math.tanh(2.2*t)}c.curve=l,c.connect(n);let u=e.createGain();u.gain.value=.5,u.connect(c),this.drive=u;for(let t of[0,7]){let n=e.createOscillator();n.setPeriodicWave(s),n.detune.value=t;let r=e.createGain();r.gain.value=.5,n.connect(r).connect(u),n.start(),this.oscs.push(n)}let d=e.createBuffer(1,e.sampleRate*2,e.sampleRate),f=d.getChannelData(0);for(let e=0;e<f.length;e++)f[e]=Math.random()*2-1;let p=()=>{let t=e.createBufferSource();return t.buffer=d,t.loop=!0,t.start(),t},m=e.createBiquadFilter();m.type=`bandpass`,m.frequency.value=1250,m.Q.value=5;let h=e.createGain();h.gain.value=0,p().connect(m).connect(h).connect(t),this.squealGain=h;let g=e.createBiquadFilter();g.type=`lowpass`,g.frequency.value=300;let _=e.createGain();_.gain.value=0,p().connect(g).connect(_).connect(t),this.windGain=_,this.windFilter=g;let v=e.createBiquadFilter();v.type=`bandpass`,v.frequency.value=500,v.Q.value=1.4;let y=e.createGain();y.gain.value=0,p().connect(v).connect(y).connect(t),this.intakeGain=y,this.intakeFilter=v;let b=e.createBiquadFilter();b.type=`lowpass`,b.frequency.value=140;let x=e.createGain();x.gain.value=0,p().connect(b).connect(x).connect(t),this.rumbleGain=x}catch{this.ctx=null}}update(e,t,n,r,i,a){let o=this.ctx;if(!o||!this.master||!this.filter||!this.engineGain||!this.squealGain||!this.windGain||!this.windFilter||!this.rumbleGain)return;let s=o.currentTime,c=.04;this.master.gain.setTargetAtTime(a&&this.enabled?.55:0,s,.08);let l=e/60;for(let e of this.oscs)e.frequency.setTargetAtTime(l,s,c);let u=.25+t*.75;this.drive&&this.drive.gain.setTargetAtTime(.35+u*.9,s,c),this.filter.frequency.setTargetAtTime(350+u*1900+e*.42,s,c),this.engineGain.gain.setTargetAtTime(.12+u*.22+e/6600*.1,s,c),this.intakeGain&&this.intakeFilter&&(this.intakeGain.gain.setTargetAtTime(e/6600*t*.16,s,c),this.intakeFilter.frequency.setTargetAtTime(300+e*.22,s,c));let d=Math.max(0,Math.min(1,(r-.95)*1.6))*Math.min(1,n/8);this.squealGain.gain.setTargetAtTime(d*.22,s,.06),this.windGain.gain.setTargetAtTime(Math.min(.3,(n/50)**2*.3),s,.1),this.windFilter.frequency.setTargetAtTime(250+n*22,s,.1),this.rumbleGain.gain.setTargetAtTime(i*Math.min(1,n/10)*.7,s,.04)}};function t(){let e=new Uint8Array(844),t=new DataView(e.buffer),n=(t,n)=>{for(let r=0;r<n.length;r++)e[t+r]=n.charCodeAt(r)};n(0,`RIFF`),t.setUint32(4,836,!0),n(8,`WAVE`),n(12,`fmt `),t.setUint32(16,16,!0),t.setUint16(20,1,!0),t.setUint16(22,1,!0),t.setUint32(24,8e3,!0),t.setUint32(28,8e3,!0),t.setUint16(32,1,!0),t.setUint16(34,8,!0),n(36,`data`),t.setUint32(40,800,!0),e.fill(128,44);let r=``;for(let t of e)r+=String.fromCharCode(t);return`data:audio/wav;base64,${btoa(r)}`}var n=4,r=class{samples=[];lastT=-1/0;sample(e,t,n,r){e-this.lastT<.099999999||(this.lastT=e,this.samples.push(Math.round(e*1e3)/1e3,Math.round(t*100)/100,Math.round(n*100)/100,Math.round(r*1e3)/1e3))}reset(){this.samples=[],this.lastT=-1/0}data(){return this.samples.slice()}};function i(e,t){let r=Math.floor(e.length/n);if(r===0||t<e[0]||t>e[(r-1)*n])return null;let i=0,a=r-1;for(;a-i>1;){let r=i+a>>1;e[r*n]<=t?i=r:a=r}let o=i*n,s=a*n,c=e[s]-e[o],l=c>0?(t-e[o])/c:0,u=e[s+3]-e[o+3];for(;u>Math.PI;)u-=2*Math.PI;for(;u<-Math.PI;)u+=2*Math.PI;return{x:e[o+1]+(e[s+1]-e[o+1])*l,z:e[o+2]+(e[s+2]-e[o+2])*l,yaw:e[o+3]+u*l}}var a=`mostrace.car.v1`,o={massEmpty:[700,1600],gear:[.5,5],finalDrive:[2.5,6],wheelRadius:[.24,.36],mu:[.8,1.8]};function s(e,[t,n]){return typeof e==`number`&&Number.isFinite(e)&&e>=t&&e<=n}function c(e){let t={};if(typeof e!=`object`||!e||Array.isArray(e))return t;let n=e;if(s(n.massEmpty,o.massEmpty)&&(t.massEmpty=n.massEmpty),s(n.finalDrive,o.finalDrive)&&(t.finalDrive=n.finalDrive),s(n.wheelRadius,o.wheelRadius)&&(t.wheelRadius=n.wheelRadius),s(n.mu,o.mu)&&(t.mu=n.mu),Array.isArray(n.gears)&&n.gears.length===5&&n.gears.every(e=>s(e,o.gear))){let e=n.gears;e.every((t,n)=>n===0||t<e[n-1])&&(t.gears=e.slice())}return t}function l(e,t){t.massEmpty!==void 0&&(e.massEmpty=t.massEmpty),t.gears!==void 0&&(e.gears=t.gears.slice()),t.finalDrive!==void 0&&(e.finalDrive=t.finalDrive),t.wheelRadius!==void 0&&(e.wheelRadius=t.wheelRadius),t.mu!==void 0&&(e.tyre.mu=t.mu)}function u(){try{if(typeof localStorage>`u`)return{};let e=localStorage.getItem(a);return e?c(JSON.parse(e)):{}}catch{return{}}}function d(e){try{localStorage.setItem(a,JSON.stringify(c(e)))}catch{}}function f(){try{localStorage.removeItem(a)}catch{}}var p={massEmpty:1045,fuelCapacity:50,fuelDensity:.745,wheelbase:2.575,frontWeightFraction:.61,trackWidth:1.47,cgHeight:.5,yawInertia:1650,wheelRadius:.288,wheelInertia:.9,engineInertia:.12,cdA:.74,rollingResistance:.014,gears:[3.462,1.87,1.241,.97,.81],finalDrive:4.41,drivetrainEfficiency:.9,torqueCurve:[[800,85],[1e3,95],[2e3,112],[3e3,122],[4e3,129],[4300,130],[5e3,123],[5600,112.5],[6e3,104],[6400,95],[6600,90]],idleRpm:850,redlineRpm:6400,limiterRpm:6600,shiftTime:.28,maxSteerAngle:32*Math.PI/180,brakeTorqueMax:4600,brakeFrontBias:.8,handbrakeTorqueMax:2400,frontRollStiffnessShare:.6,bsfc:275,tyre:{mu:1.38,nominalLoad:2700,loadSensitivity:.05,peakSlipAngle:8*Math.PI/180,peakSlipRatio:.11,shape:1.4,wearRate:3e-8,maxWearGripLoss:.12,tempOptimalLow:75,tempOptimalHigh:100,coldGripLoss:.12,heatCapacity:8e3,slipHeatShare:.6,rollingHeat:.005,coolingBase:12,coolingPerSpeed:.45},ambientTemp:22,brake:{heatCapacity:2600,coolingBase:5,coolingPerSpeed:.9,fadeStart:620,fadeEnd:880,fadeMin:.55}},m={massEmpty:p.massEmpty,gears:p.gears.slice(),finalDrive:p.finalDrive,wheelRadius:p.wheelRadius,mu:p.tyre.mu};l(p,u());var h=9.81,g=1.2,_=class{values;last=-1;constructor(e){this.values=Array(Math.ceil(e/10)).fill(0)}reset(){this.values.fill(0),this.last=-1}sample(e,t){let n=Math.min(this.values.length-1,Math.max(0,Math.floor(e/10)));if(!(n<this.last)){for(let e=this.last+1;e<=n;e++)this.values[e]=t;this.last=Math.max(this.last,n)}}complete(){return this.last>=this.values.length-2}data(){let e=this.values.slice();for(let t=Math.max(0,this.last+1);t<e.length;t++)e[t]=e[Math.max(0,this.last)]||0;return e}};function v(e,t,n,r){let i=Math.min(e.length,t.length),a=[...n].sort((e,t)=>e-t),o=[];for(let n=0;n<a.length;n++){let s=a[n],c=a[(n+1)%a.length],l=0,u=((c-s)%r+r)%r||r;for(let n=0;n<u;n+=10){let a=Math.floor(((s+n)%r+r)%r/10)%i,o=Math.max(e[a],3)/3.6,c=Math.max(t[a],3)/3.6,d=Math.min(10,u-n);l+=d/o-d/c}o.push({from:s,to:c,seconds:l})}return o}var y=10,b=[.3,.62],x=class{length;running=!1;best=null;last=null;bestSectors=null;bestTrace=null;sectors=[];laps=0;recordBest=!0;lapId=0;lapStart=0;prevS=null;prevT=0;checkpoint=0;sectorStart=0;trace=[];traceSize;constructor(e){this.length=e,this.traceSize=Math.ceil(e/y)+1}loadBest(e,t,n){this.best=e,this.bestTrace=t.length===this.traceSize?t.slice():null,this.bestSectors=n}clearBest(){this.best=null,this.bestTrace=null,this.bestSectors=null}current(e){return this.running?e-this.lapStart:0}resetSession(){this.restart(),this.last=null,this.laps=0}restart(){this.running=!1,this.prevS=null,this.checkpoint=0,this.sectors=[],this.trace=[]}delta(e,t){if(!this.running||!this.bestTrace)return null;let n=Math.max(0,Math.min(this.traceSize-1,e/y)),r=Math.min(this.traceSize-2,Math.floor(n)),i=this.bestTrace[r]+(this.bestTrace[r+1]-this.bestTrace[r])*(n-r);return t-this.lapStart-i}beginLap(e){this.running=!0,this.lapId++,this.lapStart=e,this.sectorStart=e,this.checkpoint=0,this.sectors=[],this.trace=[0]}update(e,t){let n=this.length,r=this.prevS,i=this.prevT;if(this.prevS=e,this.prevT=t,r===null)return null;let a=r>.75*n&&e<.25*n,o=r<.25*n&&e>.75*n,s=null;if(o)return this.running=!1,null;if(a){let a=e+(n-r),o=a>0?t-e/a*(t-i):t;if(this.running&&this.checkpoint===2){let e=o-this.lapStart,t=[this.sectors[0],this.sectors[1],o-this.sectorStart],n=this.best===null?null:e-this.best,r=this.recordBest&&(this.best===null||e<this.best);for(;this.trace.length<this.traceSize;)this.trace.push(e);r&&(this.best=e,this.bestTrace=this.trace.slice(0,this.traceSize),this.bestSectors=t),this.last=e,this.laps++,s={type:`lap`,time:e,isBest:r,sectors:t,delta:n}}return this.beginLap(o),s}if(!this.running)return null;let c=Math.floor(e/y);for(;this.trace.length<=c&&this.trace.length<this.traceSize;)this.trace.push(t-this.lapStart);if(this.checkpoint<2){let i=b[this.checkpoint]*n;if(r<i&&e>=i&&e-r<50){let e=this.checkpoint,n=t-this.sectorStart,r=this.bestSectors?this.bestSectors[e]:null;this.sectors.push(n),this.sectorStart=t,this.checkpoint++,s={type:`sector`,index:e,time:n,delta:r===null?null:n-r}}}return s}};function S(e){if(e===null||!Number.isFinite(e))return`–:––,–––`;let t=Math.floor(e/60);return`${t}:${(e-t*60).toFixed(3).padStart(6,`0`).replace(`.`,`,`)}`}function C(e){return e===null||!Number.isFinite(e)?``:`${e>=0?`+`:`−`}${Math.abs(e).toFixed(2).replace(`.`,`,`)}`}function w(e){let t=document.getElementById(e);if(!t)throw Error(`Chybí prvek #${e}`);return t}var T=9,E=4600,D=6250,O=class{root=w(`hud`);tCurrent=w(`t-current`);tDelta=w(`t-delta`);tLast=w(`t-last`);tBest=w(`t-best`);tLaps=w(`t-laps`);sectors=[w(`s1`),w(`s2`),w(`s3`)];toastEl=w(`toast`);warningEl=w(`warning`);noteEl=w(`note`);noteDist=w(`note-dist`);noteTarget=w(`note-target`);noteGear=w(`note-gear`);fuel=w(`fuel`);tyres=[w(`ty0`),w(`ty1`),w(`ty2`),w(`ty3`)];wear=w(`wear`);fuelLap=w(`fuel-lap`);brakes=w(`brakes`);stint=w(`stint`);lightsRow=w(`startlights`);lightDots=Array.from(w(`startlights`).children);cam=w(`cam`);device=w(`device`);ghost=w(`ghost-label`);lights=w(`lights`);lightEls=[];gear=w(`gear`);speed=w(`speed`);rpm=w(`rpm`);rpmFill=w(`rpm-fill`);barThrottle=w(`bar-throttle`);barBrake=w(`bar-brake`);handbrakeLamp=w(`handbrake`);steerDot=w(`steer-dot`);map=w(`minimap`);mapBase;mapScale;mapOx;mapOz;toastTimer=0;cornerTimer=0;cornerEl=w(`corner`);analysisEl=w(`analysis`);lastText=new Map;constructor(e){for(let e=0;e<T;e++){let t=document.createElement(`i`);t.className=e<4?`g`:e<7?`y`:`r`,this.lights.appendChild(t),this.lightEls.push(t)}let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of e.points)t=Math.min(t,a.x),n=Math.max(n,a.x),r=Math.min(r,a.z),i=Math.max(i,a.z);let a=this.map.width;this.mapScale=(a-32)/Math.max(n-t,i-r),this.mapOx=a/2-(t+n)/2*this.mapScale,this.mapOz=a/2-(r+i)/2*this.mapScale,this.mapBase=document.createElement(`canvas`),this.mapBase.width=this.mapBase.height=a;let o=this.mapBase.getContext(`2d`);o.strokeStyle=`rgba(255,255,255,0.85)`,o.lineWidth=3,o.lineJoin=`round`,o.beginPath(),e.points.forEach((e,t)=>{let n=e.x*this.mapScale+this.mapOx,r=e.z*this.mapScale+this.mapOz;t===0?o.moveTo(n,r):o.lineTo(n,r)}),o.closePath(),o.stroke();let s=e.points[0];o.fillStyle=`#e0202b`,o.fillRect(s.x*this.mapScale+this.mapOx-2,s.z*this.mapScale+this.mapOz-5,4,10)}setMirror(e){this.root.classList.toggle(`with-mirror`,e)}setVisible(e){this.root.classList.toggle(`hidden`,!e)}toast(e,t=2.5){this.toastEl.textContent=e,this.toastEl.classList.add(`show`),window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.classList.remove(`show`),t*1e3)}corner(e){let t=[`Zatáčka ${e.index+1}`];if(e.brakeEarlyBy!==null){let n=Math.round(e.brakeEarlyBy),r=Math.abs(n)<=8?`good`:`bad`;t.push(n===0?`<b class="good">brzda přesně</b>`:`brzda <b class="${r}">o ${Math.abs(n)} m ${n>0?`dřív`:`později`}</b>`)}let n=e.minKmh-e.targetKmh;t.push(`nejpomaleji <b class="${n>=-4?`good`:`bad`}">${Math.round(e.minKmh)} km/h</b> (cíl ${Math.round(e.targetKmh)})`),this.cornerEl.innerHTML=t.join(` · `),this.cornerEl.classList.add(`show`),window.clearTimeout(this.cornerTimer),this.cornerTimer=window.setTimeout(()=>this.cornerEl.classList.remove(`show`),4500)}speedGraph(e,t,n,r){let i=w(`speed-graph`),a=w(`speed-loss`);if(i.classList.toggle(`hidden`,e===null),!e){a.innerHTML=``;return}let o=i.getContext(`2d`);if(!o)return;let s=i.width,c=i.height,l=Math.ceil((Math.max(...t,...e)+5)/20)*20,u=e=>54+(s-54-10)*e/(t.length-1),d=e=>14+(c-14-30)*(1-e/l);o.clearRect(0,0,s,c),o.font=`18px -apple-system, Helvetica, Arial, sans-serif`,o.textBaseline=`middle`;for(let e=0;e<=l;e+=40)o.strokeStyle=`rgba(255,255,255,0.1)`,o.lineWidth=1,o.beginPath(),o.moveTo(54,d(e)),o.lineTo(s-10,d(e)),o.stroke(),o.fillStyle=`#9aa3ad`,o.textAlign=`right`,o.fillText(String(e),46,d(e));o.textAlign=`center`,n.forEach((e,t)=>{let n=u(e/10);o.strokeStyle=`rgba(255,255,255,0.18)`,o.beginPath(),o.moveTo(n,14),o.lineTo(n,c-30),o.stroke(),o.fillStyle=`#9aa3ad`,o.fillText(String(t+1),n,c-15)}),o.fillStyle=`rgba(255,77,77,0.28)`,o.beginPath();for(let e=0;e<t.length;e++)o.lineTo(u(e),d(t[e]));for(let n=t.length-1;n>=0;n--)o.lineTo(u(n),d(Math.min(e[n]??0,t[n])));o.closePath(),o.fill();let f=(e,t,n)=>{o.strokeStyle=t,o.lineWidth=n,o.lineJoin=`round`,o.beginPath(),e.forEach((e,t)=>t===0?o.moveTo(u(t),d(e)):o.lineTo(u(t),d(e))),o.stroke()};f(t,`rgba(255,255,255,0.55)`,2),f(e,`#ffc53d`,3),o.textAlign=`left`,o.fillStyle=`#ffc53d`,o.fillText(`tvé poslední kolo`,64,26),o.fillStyle=`rgba(255,255,255,0.7)`,o.fillText(`ideál (počítač)`,244,26);let p=v(e,t,n,r).map(e=>({...e,corner:n.indexOf(e.to)+1})).sort((e,t)=>t.seconds-e.seconds),m=p.reduce((e,t)=>e+t.seconds,0),h=e=>`${e>=0?`+`:`−`}${Math.abs(e).toFixed(2).replace(`.`,`,`)} s`,g=p.slice(0,3).filter(e=>e.seconds>.05).map(e=>`<span class="bad">zatáčka ${e.corner}: ${h(e.seconds)}</span>`).join(` · `);a.innerHTML=`<p>Rychlost v km/h po délce kola, čísla dole jsou zatáčky. Proti ideálu ${h(m)}${g?`; nejvíc ztrácíš na úseku před apexem: ${g}`:``}.</p>`}analysis(e,t,n=[]){let r=``;if(n.length>0){let e=[0,1,2].map(e=>Math.min(...n.map(t=>t.sectors[e]))),t=Math.min(...n.map(e=>e.time)),i=e=>e.toFixed(2).replace(`.`,`,`);r=`<h3>Kola této jízdy</h3><table><tr><th>Kolo</th><th>Čas</th><th>S1</th><th>S2</th><th>S3</th></tr>${n.slice(-8).map((r,a)=>{let o=n.length-Math.min(8,n.length)+a+1,s=r.sectors.map((t,n)=>`<td class="${t===e[n]?`good`:``}">${i(t)}</td>`).join(``);return`<tr><td>${o}</td><td class="${r.time===t?`good`:``}">${S(r.time)}</td>${s}</tr>`}).join(``)}</table><p>Součet nejlepších sektorů: ${S(e[0]+e[1]+e[2])}.</p>`}if(e.length===0){this.analysisEl.innerHTML=`${r}<p>Rozbor zatáček se objeví po projetí první brzdné zóny.</p>`;return}let i=e.map(e=>{let n=t[e.index],r=e.brakeEarlyBy===null?null:Math.round(e.brakeEarlyBy),i=r===null?`<td>bez brzdy</td>`:`<td class="${Math.abs(r)<=8?`good`:`bad`}">${r===0?`přesně`:`${Math.abs(r)} m ${r>0?`dřív`:`později`}`}</td>`,a=e.minKmh-e.targetKmh;return`<tr><td>${e.index+1} <small>(${Math.round(n.brakeS)} m)</small></td>${i}<td class="${a>=-4?`good`:`bad`}">${Math.round(e.minKmh)}</td><td>${Math.round(e.targetKmh)}</td><td>${n.gear}.</td></tr>`}).join(``);this.analysisEl.innerHTML=`${r}<h3 style="margin-top:14px">Rozbor zatáček</h3><table><tr><th>Zatáčka</th><th>Brzdný bod</th><th>Tvá min. km/h</th><th>Cíl</th><th>Stupeň</th></tr>${i}</table><p>Brzdný bod a cíl jsou z ideální stopy počítače. Čísla zatáček jsou pořadí brzdných zón, ne oficiální značení.</p>`}text(e,t){this.lastText.get(e)!==t&&(this.lastText.set(e,t),e.textContent=t)}update(e){this.text(this.speed,String(Math.round(e.speedKmh))),this.text(this.gear,String(e.gear)),this.gear.classList.toggle(`limit`,e.rpm>D),this.text(this.rpm,String(Math.round(e.rpm/10)*10)),this.rpmFill.style.width=`${Math.min(100,e.rpm/p.limiterRpm*100)}%`;let t=Math.round((e.rpm-E)/1650*T);this.lightEls.forEach((e,n)=>e.classList.toggle(`on`,n<t)),this.lights.classList.toggle(`shift`,e.rpm>D),this.barThrottle.style.height=`${e.throttle*100}%`,this.barBrake.style.height=`${e.brake*100}%`,this.handbrakeLamp.classList.toggle(`on`,e.handbrake),this.steerDot.style.left=`${50+e.steer*50}%`,this.text(this.tCurrent,e.running?S(e.current):`0:00,000`),this.text(this.tDelta,e.running?C(e.delta):``),this.tDelta.classList.toggle(`faster`,e.delta!==null&&e.delta<0),this.tDelta.classList.toggle(`slower`,e.delta!==null&&e.delta>=0),this.text(this.tLast,S(e.last)),this.text(this.tBest,S(e.best)),this.text(this.tLaps,String(e.laps)),this.sectors.forEach((t,n)=>{t.classList.toggle(`done`,n<e.sectorsDone&&!e.sectorBetter[n]),t.classList.toggle(`best`,n<e.sectorsDone&&e.sectorBetter[n]),t.classList.toggle(`active`,e.running&&n===e.sectorsDone)}),this.text(this.fuel,`${e.fuel.toFixed(1).replace(`.`,`,`)} l`),this.fuel.classList.toggle(`invalid`,e.fuel<5),this.tyres.forEach((t,n)=>{let r=e.tyreTemp[n];this.text(t,String(Math.round(r)));let i=r<55?`#58a6ff`:r<72?`#8fd3c0`:r<=102?`var(--green)`:r<=115?`var(--amber)`:`var(--red)`;t.style.background!==i&&(t.style.background=i)}),this.text(this.wear,`${Math.round(Math.max(...e.tyreWear)*100)} %`),this.text(this.brakes,`${Math.round(e.brakeTemp[0]/10)*10} / ${Math.round(e.brakeTemp[1]/10)*10}`),this.brakes.classList.toggle(`invalid`,e.brakeTemp[0]>620),e.fuelPerLap!==null&&e.fuelPerLap>.05?this.text(this.fuelLap,`${e.fuelPerLap.toFixed(2).replace(`.`,`,`)} l/kolo · ještě ${Math.floor(e.fuel/e.fuelPerLap)} kol`):this.text(this.fuelLap,`–`);let n=Math.floor(e.stintSeconds/60);if(this.text(this.stint,`${n}:${String(Math.floor(e.stintSeconds-n*60)).padStart(2,`0`)}`),this.lightsRow.classList.toggle(`hidden`,e.startLights===null),e.startLights!==null){let t=e.startLights;this.lightDots.forEach((e,n)=>e.classList.toggle(`on`,n<t))}this.text(this.cam,e.camera),this.text(this.device,e.device),this.text(this.ghost,e.ghost),this.noteEl.classList.toggle(`hidden`,e.note===null),e.note&&(this.noteEl.classList.toggle(`brake`,e.note.braking),this.text(this.noteDist,e.note.braking?`BRZDI`:`Brzda za ${Math.max(10,Math.round(e.note.distance/10)*10)} m`),this.text(this.noteTarget,`→ ${Math.round(e.note.targetKmh)} km/h`),this.text(this.noteGear,`${e.note.gear}. stupeň`)),this.text(this.warningEl,e.warning),this.warningEl.classList.toggle(`show`,e.warning!==``);let r=this.map.getContext(`2d`);if(r){r.clearRect(0,0,this.map.width,this.map.height),r.drawImage(this.mapBase,0,0),e.ghostX!==null&&e.ghostZ!==null&&(r.fillStyle=`#4fd2ff`,r.beginPath(),r.arc(e.ghostX*this.mapScale+this.mapOx,e.ghostZ*this.mapScale+this.mapOz,4,0,Math.PI*2),r.fill()),r.fillStyle=`#c9ced6`;for(let t=0;t+1<e.traffic.length;t+=2)r.beginPath(),r.arc(e.traffic[t]*this.mapScale+this.mapOx,e.traffic[t+1]*this.mapScale+this.mapOz,3.2,0,Math.PI*2),r.fill();r.fillStyle=`#ff3b30`,r.strokeStyle=`#fff`,r.lineWidth=1.5,r.beginPath(),r.arc(e.carX*this.mapScale+this.mapOx,e.carZ*this.mapScale+this.mapOz,5,0,Math.PI*2),r.fill(),r.stroke()}}},k=1/240,A=.1;function j(e,t,n){if(!Number.isFinite(t)||t<=0)return e;let r=e+Math.min(t,A);for(;r>=.004166666665666666;)n(),r-=k;return Math.max(0,r)}var ee=2*Math.PI/60;function M(e){let t=p.torqueCurve;if(e<=t[0][0])return t[0][1];for(let n=1;n<t.length;n++)if(e<=t[n][0]){let r=(e-t[n-1][0])/(t[n][0]-t[n-1][0]);return t[n-1][1]+(t[n][1]-t[n-1][1])*r}return t[t.length-1][1]}function N(e){return-(6+.0045*e)}function P(e,t){let n=Math.min(1,Math.max(0,t)),r=N(e);return e>=p.limiterRpm?r:r+(M(e)-r)*n}function F(e){return p.gears[e-1]*p.finalDrive}function te(e){return F(e)*p.drivetrainEfficiency}function ne(e,t){return e*F(t)/ee}function re(e){return e*ee}function ie(e){for(let t=1;t<=p.gears.length;t++)if(e/p.wheelRadius*F(t)*60/(2*Math.PI)<=5800)return t;return p.gears.length}function I(e,t){let n=e.length,r=e[(t%n+n)%n],i=e[((t+1)%n+n)%n];return(i.speed*i.speed-r.speed*r.speed)/(2*Math.max(.2,Math.hypot(i.x-r.x,i.z-r.z)))}function ae(e){let t=e.length,n=t=>I(e,t)<-2,r=0;for(;r<t&&n(r);)r++;let i=[],a=r;for(;a<r+t;){if(!n(a)){a++;continue}let o=a;for(;a<r+t&&n(a);)a++;let s=a;for(;s<r+2*t&&e[(s+1)%t].speed<e[s%t].speed;)s++;let c=e[o%t].speed,l=e[s%t].speed;c*3.6>=85&&(c-l)*3.6>=12&&i.push({brakeIndex:o%t,apexIndex:s%t,brakeS:e[o%t].s,apexS:e[s%t].s,fromKmh:c*3.6,targetKmh:l*3.6,gear:Math.max(2,ie(l))}),a=Math.max(a,s)}return i.sort((e,t)=>e.brakeS-t.brakeS)}function oe(e,t,n){let r=(e,t)=>((t-e)%n+n)%n,i=e[0],a=1/0;for(let n of e){let e=r(t,n.apexS);e<a&&(a=e,i=n)}let o=r(i.brakeS,i.apexS),s=a<=o;return{note:i,distance:s?0:a-o,braking:s}}var se=250,ce=40,le=class{notes;length;active=-1;brakeS=null;minKmh=1/0;prevS=null;results=[];constructor(e,t){this.notes=e,this.length=t}reset(){this.active=-1,this.prevS=null,this.results=[]}lapResults(){return this.results.slice()}ahead(e,t){return((t-e)%this.length+this.length)%this.length}update(e,t,n){let r=this.prevS;if(this.prevS=e,r!==null){let t=this.ahead(r,e);t>30&&t<this.length-5&&(this.active=-1)}if(this.active<0){for(let t=0;t<this.notes.length;t++){let n=this.ahead(e,this.notes[t].brakeS);if(n>0&&n<=se){this.active=t,this.brakeS=null,this.minKmh=1/0;break}}if(this.active<0)return null}let i=this.notes[this.active],a=this.ahead(i.apexS,e),o=a>this.length/2,s=this.ahead(e,i.brakeS),c=s>this.length/2||s===0;if(o&&n>.1&&this.brakeS===null&&(c||s<=150)&&(this.brakeS=e),c&&t<this.minKmh&&(this.minKmh=t),!o&&a>=ce){let e=null;if(this.brakeS!==null){let t=this.ahead(this.brakeS,i.brakeS);e=t>this.length/2?t-this.length:t}let n={index:this.active,brakeEarlyBy:e,minKmh:Number.isFinite(this.minKmh)?this.minKmh:t,targetKmh:i.targetKmh};return this.results.push(n),this.active=-1,n}return null}};function ue(e){switch(e){case`asphalt`:case`runoff`:return 1;case`kerb`:return .95;case`paint`:return .94;case`grass`:return .38;case`gravel`:return .4}}function de(e){switch(e){case`asphalt`:case`runoff`:return 0;case`kerb`:return .005;case`paint`:return 0;case`grass`:return .07;case`gravel`:return .3}}var fe=p.tyre.shape,pe=Math.tan(Math.PI/(2*fe));function me(e,t,n,r){if(n<=0)return{fx:0,fy:0};let i=t/p.tyre.peakSlipRatio,a=Math.tan(Math.max(-1.4,Math.min(1.4,e)))/Math.tan(p.tyre.peakSlipAngle),o=Math.hypot(i,a);if(o<1e-9)return{fx:0,fy:0};let s=1-p.tyre.loadSensitivity*Math.log2(n/p.tyre.nominalLoad),c=r*Math.max(.7,Math.min(1.12,s))*n*Math.sin(fe*Math.atan(pe*o));return{fx:c*i/o,fy:-c*a/o}}function he(e){let{tempOptimalLow:t,tempOptimalHigh:n,coldGripLoss:r}=p.tyre;if(e<t){let n=Math.min(1.3,(t-e)/(t-25));return 1-r*n*n}if(e>n){let t=(e-n)/45;return Math.max(.8,1-.15*t*t)}return 1}var ge={grade:0,loadScale:1},_e=p.trackWidth/2,ve=p.wheelbase*(1-p.frontWeightFraction),ye=p.wheelbase*p.frontWeightFraction,be=[ve,ve,-ye,-ye],xe=[-_e,_e,-_e,_e],L=2,Se=1.6,Ce=.1,we=.09,R=p.tyre.peakSlipRatio,Te=Math.tan(p.tyre.peakSlipAngle);function z(e,t,n){let r=p.massEmpty+p.fuelCapacity*p.fuelDensity,i=r*h*p.frontWeightFraction/2,a=r*h*(1-p.frontWeightFraction)/2;return{x:e,z:t,yaw:n,vx:0,vy:0,yawRate:0,wheelSpeed:[0,0,0,0],rpm:p.idleRpm,gear:1,shiftTimer:0,steerAngle:0,fuel:p.fuelCapacity,tyreWear:[0,0,0,0],tyreTemp:[85,85,85,85],brakeTemp:[120,90],wheelTravel:[0,0,0,0],slip:[0,0,0,0],load:[i,i,a,a],absFactor:[1,1,1,1],absActive:!1,accLong:0,accLat:0,gLong:0,gLat:0}}function B(e){return Math.hypot(e.vx,e.vy)}function Ee(e){return p.massEmpty+e.fuel*p.fuelDensity}function De(e,t,n){return e<t?t:e>n?n:e}function Oe(e,t,n){let r=t*h*p.frontWeightFraction*n/2,i=t*h*(1-p.frontWeightFraction)*n/2,a=t*e.accLong*p.cgHeight/p.wheelbase/2,o=t*e.accLat*p.cgHeight/p.trackWidth,s=o*p.frontRollStiffnessShare,c=o*(1-p.frontRollStiffnessShare);return[Math.max(0,r-a+s),Math.max(0,r-a-s),Math.max(0,i+a+c),Math.max(0,i+a-c)]}function ke(e,t,n,r,i=ge){let a=e.fuel>0?De(t.throttle,0,1):0,o=De(t.brake,0,1),s=De(t.handbrake??0,0,1),c=Ee(e),l=De(t.steer,-1,1)*p.maxSteerAngle;e.steerAngle+=De(l-e.steerAngle,-1.6*r,Se*r);let u=(e.wheelSpeed[0]+e.wheelSpeed[1])/2;e.shiftTimer>0?e.shiftTimer-=r:t.gearUp&&e.gear<p.gears.length?(e.gear++,e.shiftTimer=p.shiftTime):t.gearDown&&e.gear>1&&ne(Math.max(u,e.vx/p.wheelRadius),e.gear-1)<p.limiterRpm+200&&(e.gear--,e.shiftTimer=p.shiftTime);let d=ne(Math.max(0,u),e.gear),f=e.shiftTimer>0,m=p.idleRpm+a*2600,_=d<m,v=0,y=0,b,x=0;if(f)b=Math.max(p.idleRpm,e.rpm-2500*r);else if(_){b=Math.max(p.idleRpm,m);let t=a>.02?P(b,a):0;v=Math.max(0,t)*te(e.gear),x=Math.max(0,t)*re(b)}else{b=d;let t=P(b,a);v=t*(t>=0?te(e.gear):F(e.gear)),y=p.engineInertia*F(e.gear)**2/2,x=Math.max(0,t)*re(b)}e.rpm+=(b-e.rpm)*Math.min(1,r*30);let S=Oe(e,c,Math.max(.2,Math.min(1.8,i.loadScale)));for(let t=0;t<4;t++)n[t]===`kerb`&&(S[t]*=1+.28*Math.sin(e.wheelTravel[t]*(2*Math.PI/.9)));e.load=S;let C=e=>{let{fadeStart:t,fadeEnd:n,fadeMin:r}=p.brake;return e<=t?1:Math.max(r,1-(e-t)/(n-t)*(1-r))},w=[C(e.brakeTemp[0]),C(e.brakeTemp[1])],T=[0,0],E=Math.min(e.absFactor[0],e.absFactor[1]),D=Math.min(e.absFactor[2],e.absFactor[3]),O=[Math.min(e.absFactor[0],E+Ce),Math.min(e.absFactor[1],E+Ce),D,D],k=0,A=0,j=0,ee=!1,M=Math.cos(e.steerAngle),N=Math.sin(e.steerAngle),ie=B(e);for(let t=0;t<4;t++){let a=t<2,c=e.vx-e.yawRate*xe[t],l=e.vy+e.yawRate*be[t],u=a?c*M+l*N:c,d=a?-c*N+l*M:l,f=Math.max(Math.abs(u),L),m=Math.atan2(d,f),h=n[t],g=p.tyre.mu*(i.grip??1)*ue(h)*(1-p.tyre.maxWearGripLoss*e.tyreWear[t])*he(e.tyreTemp[t]),_=p.brakeTorqueMax*(a?p.brakeFrontBias:1-p.brakeFrontBias)/2,b=a?0:s*p.handbrakeTorqueMax/2,x=o*_*O[t]*w[+!a],C=b*w[1],E=a?v/2:0,D=p.wheelInertia+(a?y:0),P=e.wheelSpeed[t],F=p.wheelRadius,te=e=>{let n=(e*F-u)/f,i=me(m,n,S[t],g),a=x*De(e/.5,-1,1)+C*De(e/.02,-1,1);return D*(e-P)/r-E+a+i.fx*F},ne=Math.min(P,u/F)-60,re=Math.max(P,u/F)+60;for(let e=0;e<18;e++){let e=(ne+re)/2;te(e)>0?re=e:ne=e}let I=(ne+re)/2;e.wheelSpeed[t]=I;let ae=(I*F-u)/f,oe=me(m,ae,S[t],g);o>.01&&ie>2.5&&ae<(a?-.115:-.04)?(e.absFactor[t]=Math.max(.05,e.absFactor[t]-r*14),ee=!0):e.absFactor[t]=Math.min(1,e.absFactor[t]+r*5);let se=(p.rollingResistance+de(h))*S[t]*Math.tanh(u/.5),ce=oe.fx-se,le=a?ce*M-oe.fy*N:ce,fe=a?ce*N+oe.fy*M:oe.fy;k+=le,A+=fe,j+=be[t]*fe-xe[t]*le,e.wheelTravel[t]=(e.wheelTravel[t]+Math.abs(u)*r)%900,T[+!a]+=(x*Math.min(1,Math.abs(I)/.5)+C*Math.min(1,Math.abs(I)/.02))*Math.abs(I),e.slip[t]=Math.hypot(ae/R,Math.tan(m)/Te);let pe=Math.hypot(I*F-u,d),ge=Math.hypot(oe.fx,oe.fy)*pe;e.tyreWear[t]=Math.min(1,e.tyreWear[t]+p.tyre.wearRate*ge*r);let _e=p.tyre.slipHeatShare*ge+p.tyre.rollingHeat*S[t]*Math.abs(u),ve=(p.tyre.coolingBase+p.tyre.coolingPerSpeed*ie)*(e.tyreTemp[t]-(i.ambient??p.ambientTemp));e.tyreTemp[t]=Math.min(180,e.tyreTemp[t]+(_e-ve)/p.tyre.heatCapacity*r)}e.absActive=ee;for(let t=0;t<2;t++){let n=(p.brake.coolingBase+p.brake.coolingPerSpeed*ie)*(e.brakeTemp[t]-(i.ambient??p.ambientTemp));e.brakeTemp[t]=Math.min(1100,e.brakeTemp[t]+(T[t]/2-n)/p.brake.heatCapacity*r)}if(ie>.01){let t=.5*g*p.cdA*ie*ie;k-=t*e.vx/ie,A-=t*e.vy/ie}k-=c*h*i.grade;let I=k/c,ae=A/c;e.gLong=I,e.gLat=ae;let oe=Math.min(1,r/we);e.accLong+=(I-e.accLong)*oe,e.accLat+=(ae-e.accLat)*oe;let se=e.vx+(I+e.yawRate*e.vy)*r,ce=e.vy+(ae-e.yawRate*e.vx)*r;e.vx=se,e.vy=ce,e.yawRate+=j/p.yawInertia*r,e.yaw+=e.yawRate*r;let le=Math.cos(e.yaw),fe=Math.sin(e.yaw);e.x+=(e.vx*le-e.vy*fe)*r,e.z+=(e.vx*fe+e.vy*le)*r;let pe=x/1e3*p.bsfc/36e5/p.fuelDensity+.8/3600;e.fuel=Math.max(0,e.fuel-pe*r)}var Ae=[[104,245],[753,1107],[1137,1276],[1736,1871],[2170,2217],[2226,2355],[2542,2639],[3166,3343],[3382,3578]],je=[[158,222],[228,1011],[1054,1143],[1526,1615],[2388,2488],[2711,2734],[2739,2973]],Me=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,57,0,0,0,0,0,0,0,0,35,36,38,39,42,42,42,42,41,41,0,52,51,48,49,52,0,44,0,0,0,0,0,0,0,39,57,0,0,0,0,0,0,0,59,0,0,28,59,0,0,35,53,0,0,50,0,0,0,0,0,0,0,23,0,0,0,0,55,0,0,33,33,33,33,35,30,0,22,45,31,29,22,22,22,22,0,0,0,59,58,58,57,55,0,0,0,0,55,22,58,0,0,27,22,27,27,27,27,28,30,30,31,32,28,26,26,27,25,25,26,25,27,27,36,30,35,29,27,28,30,33,31,29,30,30,30,36,36,32,33,33,35,35,34,34,34,34,37,37,37,37,32,41,23,28,29,31,37,37,31,30,30,32,32,32,37,40,35,36,36,28,28,28,31,27,27,33,32,32,33,27,29,29,27,27,22,22,22,28,30,27,27,30,30,28,30,32,31,31,28,30,31,31,31,32,38,41,0,0,40,45,43,37,38,46,57,57,53,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,32,28,29,31,31,33,33,40,41,39,38,41,39,37,37,38,41,49,47,50,34,34,33,34,33,32,31,30,30,30,29,27,29,28,28,31,32,34,37,45,45,38,47,41,40,39,45,39,39,26,35,25,36,34,29,32,30,27,28,31,28,27,32,33,33,25,25,26,36,38,26,26,36,33,29,29,31,32,27,24,24,24,24,24,24,24,24,23,23,24,30,30,27,24,25,25,28,26,30,37,37,36,33,32,31,27,26,28,30,27,27,25,28,34,38,34,38,41,41,44,42,42,42,42,37,37,37,37,37,41,0,0,42,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,54,54,54,54,53,53,53,53,53,53,53,53,53,0,0,0,0,52,52,0,52,52,52,51,52,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Ne=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,0,0,0,0,0,0,0,0,0,29,29,29,29,0,0,0,0,0,28,0,0,28,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,0,0,26,26,26,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,43,44,0,34,31,32,32,33,36,44,45,45,45,46,45,41,42,0,44,43,43,42,44,0,0,43,41,34,30,0,22,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Pe=[4.5,4.55,4.6,4.67,4.72,4.79,4.85,4.89,4.89,4.87,4.84,4.86,4.92,4.98,5.1,5.22,5.29,5.25,5.16,5.04,4.93,4.85,4.93,5.07,5.29,5.51,5.73,5.91,6.07,6.2,6.35,6.54,6.71,6.84,6.94,6.93,6.84,6.69,6.54,6.4,6.27,6.16,6.11,6.07,6.05,6.02,6,6,6.08,6.34,6.59,6.84,7,7.12,7.21,7.16,7.01,6.82,6.69,6.64,6.66,6.73,6.8,6.85,6.92,6.94,6.94,6.9,6.82,6.75,6.68,6.59,6.51,6.43,6.37,6.34,6.3,6.26,6.25,6.26,6.3,6.34,6.41,6.51,6.62,6.73,6.79,6.82,6.79,6.73,6.68,6.65,6.6,6.55,6.54,6.56,6.6,6.64,6.68,6.73,6.8,6.88,6.95,7,7.03,7.04,7.04,7.01,6.98,6.94,6.9,6.81,6.77,6.73,6.73,6.74,6.74,6.74,6.76,6.76,6.74,6.69,6.57,6.46,6.35,6.24,6.14,6.1,6.09,6.12,6.16,6.2,6.23,6.23,6.2,6.16,6.09,5.98,5.87,5.72,5.6,5.49,5.38,5.32,5.27,5.21,5.17,5.13,5.09,5.05,5.01,4.96,4.93,4.89,4.85,4.84,4.84,4.84,4.91,4.98,5.05,5.09,5.1,5.06,4.98,4.87,4.76,4.66,4.59,4.56,4.56,4.61,4.69,4.8,4.92,5.07,5.23,5.37,5.5,5.58,5.62,5.63,5.6,5.59,5.62,5.66,5.72,5.79,5.87,5.96,6,6,6,6,6,6,6,6,6,5.96,5.86,5.71,5.57,5.42,5.27,5.13,5.01,4.95,4.91,4.87,4.83,4.79,4.73,4.68,4.64,4.6,4.59,4.6,4.61,4.63,4.7,4.76,4.79,4.8,4.8,4.8,4.78,4.71,4.63,4.56,4.49,4.41,4.34,4.29,4.26,4.25,4.28,4.3,4.34,4.41,4.5,4.63,4.78,4.92,5.08,5.23,5.34,5.41,5.41,5.41,5.35,5.3,5.29,5.27,5.32,5.4,5.48,5.58,5.66,5.72,5.76,5.73,5.69,5.65,5.61,5.57,5.54,5.5,5.5,5.49,5.45,5.4,5.25,5.08,4.9,4.72,4.56,4.59,4.69,4.91,5.05,5.09,5.11,5.15,5.01,4.79,4.57,4.5,4.5,4.5,4.5,4.51,4.51,4.51,4.51,4.48,4.46,4.46,4.46,4.49,4.6,4.75,4.95,5.11,5.26,5.38,5.49,5.51,5.52,5.57,5.68,5.79,5.9,5.99,6.05,6.05,6.01,5.92,5.83,5.73,5.68,5.68,5.73,5.78,5.87,5.98,6.12,6.26,6.4,6.51,6.55,6.46,6.33,6.17,5.99,5.88,5.86,5.93,6.1,6.25,6.4,6.51,6.51,6.45,6.34,6.23,6.16,6.09,6.05,6.02,6,6.03,6.07,6.12,6.15,6.15,6.1,6.02,5.88,5.73,5.57,5.43,5.3,5.21,5.15,5.15,5.25,5.36,5.47,5.62,5.76,5.9,5.99,6,6,6,6,5.99,5.95,5.85,5.74,5.63,5.54,5.46,5.43,5.46,5.57,5.72,5.89,6.05,6.2,6.31,6.38,6.41,6.4,6.33,6.26,6.18,6.11,6.07,6.1,6.16,6.23,6.26,6.29,6.29,6.29,6.23,6.13,6.07,6.04,5.97,5.93,5.91,5.93,6.01,6.03,6.07,6.21,6.35,6.45,6.59,6.74,6.88,7.04,7.17,7.26,7.29,7.2,7.05,6.9,6.74,6.55,6.4,6.27,6.2,6.16,6.13,6.07,5.99,5.96,6.03,6.26,6.51,6.77,7.07,7.35,7.6,7.7,7.68,7.59,7.45,7.27,7.09,6.88,6.67,6.5,6.45,6.52,6.63,6.74,6.88,7.04,7.15,7.16,7.12,7.12,7.12,7.12,7.14,7.15,7.15,7.12,7.04,6.93,6.82,6.71,6.59,6.52,6.48,6.46,6.49,6.52,6.58,6.68,6.79,6.9,7.01,7.08,7.16,7.26,7.33,7.37,7.4,7.4,7.4,7.37,7.29,7.2,7.09,6.95,6.81,6.7,6.62,6.55,6.5,6.48,6.48,6.5,6.54,6.6,6.67,6.74,6.79,6.78,6.7,6.59,6.45,6.27,6.04,5.79,5.6,5.46,5.35,5.24,5.2,5.22,5.31,5.42,5.55,5.66,5.81,5.92,6.03,6.08,6.12,6.12,6.1,6.07,6.08,6.13,6.24,6.4,6.51,6.62,6.69,6.67,6.62,6.54,6.42,6.35,6.28,6.25,6.25,6.23,6.2,6.2,6.21,6.27,6.39,6.54,6.71,6.88,6.99,7.06,7.06,7.01,6.93,6.82,6.72,6.6,6.49,6.38,6.24,6.1,5.99,5.87,5.77,5.72,5.68,5.65,5.65,5.63,5.63,5.66,5.66,5.65,5.67,5.68,5.71,5.74,5.75,5.72,5.68,5.59,5.49,5.4,5.33,5.3,5.42,5.57,5.72,5.87,6.03,6.18,6.25,6.25,6.26,6.29,6.32,6.32,6.35,6.38,6.42,6.46,6.5,6.55,6.62,6.66,6.7,6.74,6.75,6.75,6.75,6.75,6.75,6.75,6.75,6.75,6.74,6.74,6.73,6.69,6.65,6.61,6.54,6.48,6.38,6.33,6.29,6.23,6.17,6.13,6.1,6.08,6.04,6.01,6,6,5.99,5.98,5.94,5.9,5.85,5.77,5.71,5.63,5.6,5.56,5.52,5.51,5.47,5.43,5.4,5.35,5.31,5.27,5.25,5.25,5.24,5.2,5.16,5.12,5.08,5.01,4.94,4.92,4.9,4.87,4.84,4.81,4.77,4.73,4.65,4.6,4.56,4.52,4.5,4.51,4.51,4.51,4.51,4.51,4.51,4.51,4.47,4.45,4.45,4.45,4.45,4.45,4.45],Fe=[6.52,6.82,7.15,7.45,7.59,7.82,8.02,8.02,8.09,8.12,8.16,8.15,8.08,7.94,7.71,7.52,7.42,7.38,7.37,7.38,7.46,7.49,7.45,7.35,7.15,6.97,6.82,6.77,6.87,7.04,7.2,7.41,7.63,7.83,7.74,7.46,7.14,6.81,6.48,6.2,6.01,6.01,6.1,6.18,6.2,6.2,6.14,6.04,5.93,5.84,5.77,5.75,5.74,5.7,5.63,5.55,5.48,5.37,5.26,5.16,5.1,5.09,5.12,5.17,5.24,5.32,5.4,5.48,5.54,5.57,5.61,5.65,5.7,5.76,5.82,5.9,5.98,6.05,6.16,6.29,6.38,6.41,6.4,6.36,6.32,6.23,6.12,6.05,6.01,5.94,5.86,5.75,5.64,5.55,5.48,5.38,5.37,5.35,5.35,5.35,5.36,5.37,5.39,5.4,5.48,5.57,5.67,5.73,5.76,5.77,5.76,5.71,5.61,5.5,5.41,5.32,5.24,5.17,5.12,5.09,5.15,5.26,5.4,5.55,5.7,5.79,5.78,5.64,5.42,5.21,5.02,4.8,4.65,4.57,4.54,4.54,4.55,4.63,4.74,4.85,4.96,5.07,5.17,5.2,5.18,5.18,5.18,5.2,5.23,5.29,5.34,5.36,5.36,5.36,5.33,5.29,5.26,5.23,5.2,5.16,5.12,5.09,5.06,5.06,5.12,5.19,5.26,5.34,5.41,5.46,5.5,5.47,5.43,5.4,5.35,5.27,5.18,5.07,5,4.96,4.96,5.05,5.24,5.48,5.79,6.12,6.44,6.72,6.93,7.06,7.17,7.22,7.24,7.25,7.25,7.27,7.31,7.36,7.46,7.57,7.68,7.78,7.8,7.77,7.72,7.57,7.4,7.26,7.13,7.04,7.01,6.96,6.93,6.91,6.88,6.82,6.76,6.69,6.62,6.55,6.45,6.35,6.26,6.23,6.21,6.26,6.37,6.53,6.71,6.85,6.99,7.1,7.16,7.2,7.18,7.14,7.13,7.09,7.05,7.03,7,6.98,6.95,6.91,6.87,6.73,6.54,6.36,6.2,6.05,5.91,5.77,5.76,5.8,5.8,5.8,5.8,5.78,5.74,5.69,5.62,5.59,5.55,5.52,5.54,5.55,5.59,5.63,5.68,5.75,5.82,5.88,5.98,6.06,6.13,6.19,6.22,6.21,6.19,6.09,6.02,5.95,5.87,5.81,5.77,5.75,5.75,5.79,5.85,5.9,5.9,5.9,5.93,5.92,5.93,5.95,6.02,6.13,6.24,6.32,6.4,6.41,6.39,6.35,6.28,6.21,6.14,6.1,6.07,6.03,5.97,5.95,5.95,5.95,5.95,5.95,5.95,5.98,6,6,6,5.99,5.96,5.93,5.89,5.85,5.81,5.74,5.68,5.65,5.63,5.63,5.63,5.64,5.68,5.7,5.71,5.68,5.67,5.71,5.78,5.85,5.99,6.14,6.32,6.47,6.57,6.65,6.69,6.7,6.66,6.62,6.59,6.55,6.51,6.47,6.36,6.23,6.08,5.93,5.79,5.64,5.55,5.55,5.55,5.59,5.62,5.65,5.65,5.59,5.46,5.34,5.19,5.04,4.91,4.8,4.74,4.74,4.78,4.82,4.9,4.97,5.05,5.12,5.19,5.24,5.27,5.23,5.2,5.16,5.12,5.1,5.11,5.18,5.32,5.47,5.65,5.79,5.91,5.99,6.07,6.1,6.14,6.15,6.18,6.22,6.25,6.26,6.29,6.3,6.3,6.3,6.3,6.26,6.17,6.05,5.94,5.83,5.73,5.68,5.7,5.73,5.83,5.93,5.93,5.93,5.91,5.87,5.82,5.75,5.7,5.73,5.71,5.68,5.65,5.62,5.58,5.54,5.52,5.52,5.5,5.5,5.46,5.43,5.41,5.41,5.41,5.41,5.42,5.42,5.41,5.36,5.29,5.21,5.13,5.08,5.07,5.09,5.18,5.29,5.41,5.52,5.61,5.71,5.68,5.54,5.39,5.24,5.1,4.95,4.8,4.75,4.77,4.84,4.95,5.06,5.18,5.32,5.46,5.52,5.52,5.5,5.46,5.41,5.36,5.29,5.24,5.18,5.14,5.1,5.06,5.02,5.08,5.2,5.35,5.53,5.71,5.92,6.12,6.26,6.35,6.42,6.46,6.49,6.53,6.57,6.62,6.68,6.72,6.79,6.86,6.86,6.83,6.76,6.67,6.59,6.47,6.37,6.3,6.26,6.24,6.3,6.34,6.37,6.37,6.35,6.28,6.2,5.99,5.77,5.6,5.57,5.6,5.68,5.73,5.85,5.95,5.96,5.87,5.76,5.65,5.57,5.52,5.5,5.54,5.7,5.98,6.34,6.65,6.82,6.84,6.71,6.42,6.05,5.62,5.25,5.04,4.97,4.99,5,5,5.02,5.02,4.95,4.87,4.76,4.68,4.63,4.56,4.56,4.65,4.78,4.92,5.07,5.18,5.29,5.4,5.45,5.49,5.52,5.55,5.59,5.64,5.69,5.76,5.84,5.91,5.95,5.99,6,6,6,6,6,6,5.96,5.93,5.89,5.85,5.82,5.78,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.75,5.73,5.71,5.71,5.71,5.68,5.65,5.61,5.57,5.51,5.43,5.36,5.33,5.33,5.33,5.4,5.48,5.55,5.62,5.68,5.72,5.74,5.73,5.73,5.73,5.73,5.73,5.76,5.8,5.85,5.89,5.96,6.03,6.1,6.14,6.18,6.21,6.25,6.27,6.29,6.32,6.36,6.4,6.43,6.47,6.48,6.52,6.56,6.6,6.63,6.67,6.74,6.82,6.86,6.91,6.99,7.05,7.1,7.14,7.18,7.24,7.29,7.33,7.38,7.45,7.52,7.6,7.63,7.55,7.3,7.04,6.76,6.46,6.17,5.88,5.75,5.75,5.75,5.75,5.75,5.76,5.95,6.04,6.16],Ie=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,59,59,59,59,49,42,40,40,59,59,58,48,48,53,55,55,53,49,45,45,59,59,59,55,52,48,46,43,40,35,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,29,33,38,44,48,53,56,59,59,59,59,59,59,59,59,59,59,59,59,59,50,42,31,26,22,21,21,21,22,23,24,25,27,27,28,29,30,30,30,28,26,25,26,27,27,29,32,32,33,35,35,35,32,32,31,30,29,25,0,0,0,0,0,23,24,25,25,26,26,26,26,26,25,25,25,24,24,24,24,23,23,22,22,22,22,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,21,23,25,25,25,25,24,25,25,25,25,25,25,25,25,25,25,25,25,25,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,18,19,20,21,23,25,25,27,28,28,28,28,29,29,29,30,32,33,35,36,38,41,43,44,46,47,48,48,47,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,21,22,22,23,26,26,31,32,33,33,32,31,30,30,31,31,31,31,31,31,31,31,31,31,30,29,29,27,0,0,0,0,0,0,0,25,27,27,25,24,23,23,23,22,21,21,21,21,21,20,20,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Le=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,23,32,32,30,27,27,28,28,28,28,29,32,32,32,31,30,30,30,29,29,28,26,26,25,25,25,26,26,26,26,26,25,25,24,24,23,22,22,22,21,21,22,22,22,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,23,23,24,46,52,52,21,20,19,19,18,17,17,18,18,19,19,19,19,20,20,20,20,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,21,21,20,20,20,20,19,19,19,19,20,22,22,23,26,28,32,37,43,50,53,53,53,52,51,51,52,52,52,49,48,46,46,52,52,51,50,51,53,54,54,54,53,53,0,0,0,0,0,21,22,22,22,21,21,43,43,43,43,46,51,52,52,23,22,0,0,0,0,0,0,0,59,59,59,59,59,59,59,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59,59,59,59,59,59,59,59,17,17,20,23,25,28,31,32,33,33,33,33,32,32,32,32,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59,59,59,59,59,59,59,59,59,58,57,56,56,56,55,55,55,55,56,56,58,59,59,59,59,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59,59,59,59,52,51,49,0,0,0,0,0,0,25,25,25,27,27,28,28,28,27,27,27,27,27,28,28,27,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,19,19,19,18,17,17,18,19,20,21,21,22,24,24,24,24,23,23,22,22,22,22,23,23,23,24,26,26,26,26,26,26,26,26,26,26,26,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Re=[[93,112,3.8],[150,168,6.4],[1646,1728,2.5],[1795,1861,3.2],[2634,2652,3.8],[3137,3166,2.5],[3299,3309,2.5],[3494,3595,3]],ze=[[0,19,3.8],[90,101,2.5],[235,250,3],[2162,2184,2],[3353,3366,4.8],[3444,3469,4.2],[3471,3497,4.8],[3503,3513,4.1],[3520,3539,4.2],[3643,3748,2.5],[3757,3830,2],[3839,3871,8.9],[3877,3906,8.8],[3930,4125,9],[4140,4200,3]],Be=[[50.5194437,13.607791],[50.5200683,13.6019798],[50.5201559,13.601258],[50.5201923,13.6008968],[50.5202452,13.6007489],[50.5203381,13.6007092],[50.5204825,13.6007317],[50.5207103,13.6007904],[50.5207877,13.6007679],[50.5208328,13.6006942],[50.5208451,13.600588],[50.5208234,13.6003866],[50.5206897,13.5998184],[50.5205331,13.5990891],[50.5204518,13.5986154],[50.5204147,13.5981359],[50.5203642,13.5976462],[50.5202834,13.5972498],[50.5201958,13.5969146],[50.5200895,13.5965878],[50.5198677,13.5960683],[50.5195738,13.5955663],[50.5193965,13.5953326],[50.519213,13.5951314],[50.5188208,13.5947935],[50.5184956,13.5944939],[50.518296,13.5942993],[50.5181053,13.5940672],[50.5178529,13.5936282],[50.517738,13.5934258],[50.5175799,13.5933124],[50.5174542,13.5933138],[50.5173286,13.5933685],[50.5172016,13.5934708],[50.5171139,13.5935322],[50.5170243,13.5935515],[50.516903,13.5935213],[50.5168197,13.593449],[50.5167408,13.5933534],[50.5164573,13.5929595],[50.5163727,13.5928361],[50.5163406,13.592761],[50.5163225,13.5926777],[50.5163016,13.5925112],[50.51629,13.5923205],[50.5162771,13.5921088],[50.5162486,13.5918902],[50.5161867,13.5917191],[50.5160985,13.5915326],[50.5159798,13.5913418],[50.5158278,13.5910093],[50.5158138,13.5908678],[50.5158242,13.5907013],[50.5158634,13.5906032],[50.5159171,13.5905075],[50.5159935,13.5904406],[50.5160729,13.5904103],[50.5162191,13.5904365],[50.5163503,13.5905388],[50.5170986,13.5910651],[50.517245,13.5912063],[50.5173717,13.5913578],[50.517486,13.5915263],[50.5180973,13.5925889],[50.51825,13.5928498],[50.5182697,13.5928701],[50.5183643,13.5929676],[50.5185095,13.5930736],[50.5188521,13.5932685],[50.5193625,13.5935448],[50.5199277,13.5938538],[50.5202635,13.5940523],[50.5203355,13.5941164],[50.5203963,13.5942054],[50.520457,13.5943908],[50.5205059,13.5946526],[50.520646,13.5956113],[50.5208104,13.596678],[50.5209239,13.597421],[50.5209739,13.5976558],[50.5210506,13.5979534],[50.5212625,13.5985626],[50.5215164,13.5993203],[50.5216317,13.5996622],[50.5217313,13.5999577],[50.5217675,13.6000923],[50.5217839,13.6002451],[50.5217825,13.600465],[50.521751,13.6006533],[50.521692,13.6008383],[50.5215965,13.6009931],[50.5214877,13.6011161],[50.5211452,13.6014074],[50.5210445,13.6015323],[50.5209604,13.6016783],[50.5209,13.6018478],[50.5208562,13.6020537],[50.5208267,13.6022284],[50.5208244,13.6023987],[50.5208423,13.6025642],[50.5208762,13.6027758],[50.520943,13.6029634],[50.5211955,13.6036324],[50.5212381,13.6038132],[50.5212468,13.6040384],[50.5212016,13.6042492],[50.5209912,13.6047606],[50.5207312,13.605372],[50.5205768,13.6057391],[50.5204313,13.6061325],[50.5203859,13.6063438],[50.5203477,13.6065895],[50.5203322,13.6068299],[50.5203477,13.6076491],[50.5203582,13.6082522],[50.5203869,13.6090495],[50.5204457,13.6094668],[50.5205252,13.60987],[50.5206825,13.6106975],[50.5208496,13.6116206],[50.5209604,13.6122282],[50.5209834,13.6124384],[50.520976,13.6126308],[50.5209352,13.6128315],[50.5208988,13.6129297],[50.5208695,13.6130087],[50.5207755,13.6131523],[50.5206705,13.6132492],[50.5205522,13.6133015],[50.5203617,13.6133194],[50.5200165,13.6133221],[50.5196434,13.6133261],[50.5194911,13.6132765],[50.5193452,13.6131906],[50.5192342,13.6130676],[50.5191338,13.6129253],[50.5190502,13.6127428],[50.5189939,13.6125493],[50.5189521,13.6122568],[50.5189683,13.6119703],[50.519072,13.6110569]],Ve=[274.7,273.4,275.3,276.4,276.3,275.7,274.8,273.7,273.6,273.7,273.8,274.1,275,276.9,279.2,278.5,275.7,275.5,276,275.5,274.8,275.9,276.6,277.7,278.7,277.7,277.8,278,277.3,277.2,277.4,277.6,278,278.4,278.6,278.8,279,279,278.9,278.7,278.7,278.6,278.5,278.3,278.1,278,277.9,278,278.3,278.7,279.4,279.6,279.8,279.9,279.7,279.5,279.4,279.2,278.9,277.8,277.5,277.3,277.1,276.5,276.1,276,275.7,274.9,272.5,269.3,266.7,265.3,265.3,265.7,266.7,268,269.6,272.7,272.4,272.7,274,274.7,272.4,271.1,269.7,269.1,268.6,268.2,268,268.3,269.3,270.6,272.1,271.9,271.5,271.1,270.6,270.1,269.9,269.8,269.4,268.9,266.8,266.1,265.4,265.3,265.7,265.3,265.8,266.8,267.2,267.6,267.9,268,268,268.1,268.1,268.1,267.9,266.2,265.5,265.7,266,266.3,266.6,266.8,267.5,268.1,268.8,270.1,271.9,273.8,275.1,276.9,278.3,279.5,280.6,281.1,280.9,280,277.8],He=4212,Ue=6,We=.93;function Ge(){let e=Be.reduce((e,t)=>e+t[0],0)/Be.length,t=Be.reduce((e,t)=>e+t[1],0)/Be.length,n=111132.92-559.82*Math.cos(2*e*Math.PI/180),r=111412.84*Math.cos(e*Math.PI/180);return Be.map(([i,a],o)=>({x:(a-t)*r,z:-(i-e)*n,e:Ve[o]??Ve[0]}))}function Ke(e,t){let n=e.length,r=[],i=(e,t)=>Math.max(1e-6,Math.sqrt(Math.hypot(t.x-e.x,t.z-e.z)));for(let a=0;a<n;a++){let o=e[(a-1+n)%n],s=e[a],c=e[(a+1)%n],l=e[(a+2)%n],u=0+i(o,s),d=u+i(s,c),f=d+i(c,l);for(let e=0;e<t;e++){let n=u+(d-u)*e/t,i=(e,t,r,i)=>{let a=(n-r)/(i-r);return{x:e.x+(t.x-e.x)*a,z:e.z+(t.z-e.z)*a,e:0}},a=i(o,s,0,u),p=i(s,c,u,d),m=i(c,l,d,f),h=i(i(a,p,0,d),i(p,m,u,f),u,d);h.e=s.e+(c.e-s.e)*e/t,r.push(h)}}return r}function qe(e){let t=0;for(let n=0;n<e.length;n++){let r=e[(n+1)%e.length];t+=Math.hypot(r.x-e[n].x,r.z-e[n].z)}return t}function Je(e,t){let n=qe(e)/t,r=[],i=0,a=0,o=Math.hypot(e[1].x-e[0].x,e[1].z-e[0].z);for(let s=0;s<t;s++){let t=s*n;for(;a+o<t;){a+=o,i++;let t=e[i%e.length],n=e[(i+1)%e.length];o=Math.hypot(n.x-t.x,n.z-t.z)}let c=e[i%e.length],l=e[(i+1)%e.length],u=o>0?(t-a)/o:0;r.push({x:c.x+(l.x-c.x)*u,z:c.z+(l.z-c.z)*u,e:c.e+(l.e-c.e)*u})}return r}function Ye(e){for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e}function Xe(e,t){let n=e.length,r=e.map((t,r)=>{let i=e[(r-1+n)%n],a=e[(r+1)%n];return Math.atan2(a.z-i.z,a.x-i.x)});return{heading:r,curvature:e.map((e,i)=>Ye(r[(i+4)%n]-r[(i-4+n)%n])/(8*t))}}var Ze=.033;function Qe(e,t){let n=e.length,r=e.slice(),i=e=>e.map((r,i)=>(e[(i+1)%n]-e[(i-1+n)%n])/(2*t));for(let e=0;e<40;e++){let t=new Float64Array(3*n+1);for(let e=0;e<3*n;e++)t[e+1]=t[e]+r[e%n];if(r=r.map((e,r)=>(t[r+n+40+1]-t[r+n-40])/81),e>=2&&Math.max(...i(r).map(Math.abs))<=Ze)break}let a=Math.min(...r);return r=r.map(e=>e-a),{y:r,grade:i(r)}}function $e(e,t,n){let r=t/6,i=Math.floor(r)%e.length,a=(i+1)%e.length,o=a===0?(n-i*6)/6:1,s=Math.min(1,(r-Math.floor(r))/o),c=e[i]+(e[a]-e[i])*s;return Math.max(4.2,Math.min(8.5,c))}var et=null;function tt(){if(et)return et;let e=Ke(Ge(),24),t=He/qe(e),n=e.map(e=>({x:e.x*t,z:e.z*t,e:e.e})),r=He,i=Je(n,r),a=qe(i)/r,o=Xe(i,a).curvature,s=0,c=0,l=0;for(let e=0;e<2*r;e++)Math.abs(o[e%r])<1/500?(l++,l>s&&(s=l,c=e-l+1)):l=0;let u=(c+Math.round(s*We))%r;i=i.map((e,t)=>i[(t+u)%r]);let{heading:d,curvature:f}=Xe(i,a),{y:p,grade:m}=Qe(i.map(e=>e.e),a),h=i.map((e,t)=>({x:e.x,z:e.z,s:t*a,heading:d[t],curvature:f[t],y:p[t],grade:m[t],left:$e(Pe,t,r),right:$e(Fe,t,r)}));return et={length:a*r,halfWidth:Ue,points:h,step:a},et}function nt(e,t,n,r){let i=e.points,a=i.length,o=0,s=1/0,c=e=>{let r=i[(e%a+a)%a],c=(r.x-t)*(r.x-t)+(r.z-n)*(r.z-n);c<s&&(s=c,o=(e%a+a)%a)};if(r!==void 0)for(let e=r-40;e<=r+40;e++)c(e);if(r===void 0||s>3600){for(let e=0;e<a;e+=8)c(e);let e=o;for(let t=e-8;t<=e+8;t++)c(t)}let l=i[o],u=Math.cos(l.heading),d=Math.sin(l.heading),f=t-l.x,p=n-l.z,m=f*u+p*d,h=-f*d+p*u,g=l.s+m;return g<0&&(g+=e.length),g>=e.length&&(g-=e.length),{index:o,s:g,lateral:h}}var rt=1.2,it=15.3,at=15.5,ot=-118,st=50,ct=8.2,lt=8.7;function ut(e,t){let n=e.points.length,r=t>n/2?t-n:t;return r<-708||r>-118?null:Math.min(r+708,ot-r)}function dt(e,t){let n=ut(e,t);return n!==null&&n>=60}function ft(e,t,n,r){let i=[];if(r<=0)return t.barrierLeft[n]!==1/0&&i.push({face:-t.barrierLeft[n],dir:-1}),i;if(dt(e,n)){if(r<16.9/2)return[{face:ct,dir:1}];i.push({face:lt,dir:-1})}return t.barrierRight[n]!==1/0&&i.push({face:t.barrierRight[n],dir:1}),i}function pt(e,t){let n=ut(e,t);return n===null?null:n>=st?9:e.halfWidth+(9-e.halfWidth)*Math.max(0,(n-20)/30)}function mt(e,t,n){let r=pt(e,t);return r!==null&&n>=r&&n<=15.3}function ht(e,t,n){let r=e.length;for(let i=t;i<=n;i++)e[(i%r+r)%r]=1}function gt(e){let t=e.points.length,n=t=>Math.abs(e.points[t].curvature)>1/160,r=0;for(;r<t&&n(r);)r++;let i=[],a=r;for(;a<r+t;){if(!n(a%t)){a++;continue}let o=Math.sign(e.points[a%t].curvature),s=a,c=a,l=0;for(;a<r+t&&n(a%t)&&Math.sign(e.points[a%t].curvature)===o;)Math.abs(e.points[a%t].curvature)>Math.abs(e.points[c%t].curvature)&&(c=a),l+=Math.abs(e.points[a%t].curvature)*e.step,a++;l>=8*Math.PI/180&&i.push({start:s%t,end:(a-1)%t,apex:c%t,sign:o,angle:l})}return i}function _t(e){let t=e.points.length,n={kerbLeft:new Uint8Array(t),kerbRight:new Uint8Array(t),gravelLeft:new Uint8Array(t),gravelRight:new Uint8Array(t),runoffLeft:new Uint8Array(t),runoffRight:new Uint8Array(t),paintLeft:new Float32Array(t),paintRight:new Float32Array(t),barrierLeft:new Float32Array(t),barrierRight:new Float32Array(t)};for(let r of gt(e)){let i=r.sign>0?n.kerbRight:n.kerbLeft,a=r.sign>0?n.kerbLeft:n.kerbRight,o=Math.abs(e.points[r.apex].curvature),s=r.apex,c=r.apex;for(;s!==r.start&&Math.abs(e.points[(s-1+t)%t].curvature)>o*.6;)s=(s-1+t)%t;for(;c!==r.end&&Math.abs(e.points[(c+1)%t].curvature)>o*.6;)c=(c+1)%t;let l=((c-s)%t+t)%t;ht(i,s-5,s+l+5);let u=((r.end-r.apex)%t+t)%t;ht(a,r.apex+Math.round(u/2),r.apex+u+Math.min(45,15+Math.round(r.angle*25)))}for(let[e,t]of Ae)ht(n.gravelLeft,e,t-1);for(let[e,t]of je)ht(n.gravelRight,e,t-1);let r=0;for(let n=0;n<t;n++)Math.abs(e.points[n].curvature)>Math.abs(e.points[r].curvature)&&(r=n);let i=e.points[r].curvature>0?`Left`:`Right`;ht(n[`runoff${i}`],r-130,r+25);for(let e=r-130;e<=r+25;e++)n[`gravel${i}`][(e%t+t)%t]=0;for(let[e,r,i]of Re)for(let a=e;a<r;a++)n.paintLeft[a%t]=i;for(let[e,r,i]of ze)for(let a=e;a<r;a++)n.paintRight[a%t]=i;for(let r of[-1,1]){let i=r<0?n.gravelLeft:n.gravelRight,a=r<0?Ie:Le,o=r<0?Me:Ne,s=new Float32Array(t);for(let e=0;e<t;e++){let t=Math.floor(e/6),n=24,r=a[Math.min(a.length-1,t)];i[e]&&r>0&&(n=Math.max(n,Math.min(52,r+2)));let c=o[Math.min(o.length-1,t)];c>0&&!(i[e]&&r>0)&&(n=Math.max(16,Math.min(n,c-3))),s[e]=n}let c=new Float32Array(t);for(let e=0;e<t;e++){let n=0;for(let r=-15;r<=15;r+=3)n=Math.max(n,s[((e+r)%t+t)%t]);c[e]=n}let l=r<0?n.barrierLeft:n.barrierRight;for(let n=0;n<t;n++){let i=0;for(let e=-12;e<=12;e+=2)i+=c[((n+e)%t+t)%t];let a=i/13,o=e.points[n],s=o.x-Math.sin(o.heading)*a*r,u=o.z+Math.cos(o.heading)*a*r,d=nt(e,s,u),f=e.points[d.index];l[n]=Math.hypot(f.x-s,f.z-u)>a-1.5?a:1/0}}for(let r=0;r<t;r++)pt(e,r)!==null&&(n.barrierRight[r]=at,n.gravelRight[r]=0,n.paintRight[r]=Math.min(n.paintRight[r],Math.max(0,pt(e,r)-e.points[r].right-.2)),dt(e,r)&&(n.paintRight[r]=Math.min(n.paintRight[r],Math.max(0,ct-e.points[r].right-.1))));return n}function vt(e,t,n,r){let i=r>0,a=e.points[n],o=Math.abs(r)-(i?a.right:a.left);return o<=0||mt(e,n,r)?`asphalt`:o<=1.2&&(i?t.kerbRight:t.kerbLeft)[n]?`kerb`:(i?t.runoffRight:t.runoffLeft)[n]?`runoff`:o<=(i?t.paintRight:t.paintLeft)[n]?`paint`:o>=3&&(i?t.gravelRight:t.gravelLeft)[n]?`gravel`:`grass`}var yt=p.trackWidth/2,bt=p.wheelbase*(1-p.frontWeightFraction),xt=-p.wheelbase*p.frontWeightFraction,St=[bt,bt,xt,xt],Ct=[-yt,yt,-yt,yt];function wt(e,t,n,r){let i=nt(e,n.x,n.z,r),a=Math.cos(n.yaw),o=Math.sin(n.yaw),s=[],c=0;for(let r=0;r<4;r++){let l=nt(e,n.x+St[r]*a-Ct[r]*o,n.z+St[r]*o+Ct[r]*a,i.index),u=vt(e,t,l.index,l.lateral);s.push(u),(u===`grass`||u===`gravel`||u===`runoff`||u===`paint`)&&c++}let l=e.points.length,u=e.points[i.index],d=e.points[(i.index+1)%l],f=e.points[(i.index-1+l)%l],p=Math.cos(n.yaw-u.heading),m=n.vx*Math.cos(n.yaw-u.heading)-n.vy*Math.sin(n.yaw-u.heading),g=(d.grade-f.grade)/(2*e.step),_=i.s-u.s;return _>e.length/2&&(_-=e.length),_<-e.length/2&&(_+=e.length),{env:{grade:u.grade*p,loadScale:1+m*m*g/h},y:u.y+u.grade*_,surfaces:s,index:i.index,s:i.s,lateral:i.lateral,wheelsOff:c}}function Tt(e,t,n,r,i=1,a={}){let o=t.length,s=B(e),c=t[(r+Math.round(5+s*.32))%o],l=a.offset??0,u=c.x-Math.sin(c.heading)*l-e.x,d=c.z+Math.cos(c.heading)*l-e.z,f=Math.cos(e.yaw),m=Math.sin(e.yaw),h=u*f+d*m,g=-u*m+d*f,_=h*h+g*g,v=Math.atan(2*p.wheelbase*g/Math.max(_,1)),y=Math.max(-1,Math.min(1,v/p.maxSteerAngle)),b=t[r%o].speed*i,x=t[(r+Math.round(s*.12))%o].speed*i,S=Math.min(b,x,a.speedCap??1/0),C=S-s,w=0,T=0;C>-.3?w=Math.max(0,Math.min(1,.35+C*.9)):T=Math.max(0,Math.min(1,-C*.45)),S<1&&(w=0,T=Math.max(T,.35)),Math.max(e.slip[0],e.slip[1])>1.15&&(w*=.5);let E=e.shiftTimer<=0,D=E&&e.rpm>6250&&e.gear<p.gears.length,O=e.gear>1?p.gears[e.gear-2]/p.gears[e.gear-1]:1,k=E&&e.gear>1&&e.rpm*O<5600&&(T>0||e.rpm<3600);return{steer:y,throttle:w,brake:T,gearUp:D,gearDown:k}}function Et(e,t,n=1.02,r,i=1){let a=_t(e),o=t.length-400,s=t[o],c=z(s.x,s.z,s.heading);c.vx=s.speed*.9,c.gear=4;for(let e=0;e<4;e++)c.wheelSpeed[e]=c.vx/p.wheelRadius;let l=1/240,u=wt(e,a,c,o),d=u.s,f=0,m=-1,h=0,g=0,_=1/0;for(;f<400;){if(ke(c,Tt(c,t,e,u.index,n),u.surfaces,l,{...u.env,grip:i}),f+=l,u=wt(e,a,c,u.index),d>e.length*.9&&u.s<e.length*.1){let t=u.s/(u.s+(e.length-d)),n=f-t*l;if(m<0)m=n;else return{lapTime:n-m,maxOffTrack:h,topSpeed:g,minSpeed:_}}if(d=u.s,m>=0){r?.(f-m,c),u.wheelsOff>h&&(h=u.wheelsOff);let e=B(c);e>g&&(g=e),e<_&&(_=e)}}return{lapTime:1/0,maxOffTrack:4,topSpeed:g,minSpeed:_}}var Dt=`mostrace.v2`;function Ot(e){return e===`wet`?`${Dt}.wet`:Dt}function kt(){try{return typeof localStorage>`u`?null:localStorage}catch{return null}}function At(e){return Array.isArray(e)&&e.every(e=>typeof e==`number`&&Number.isFinite(e))}function jt(e=kt(),t=`dry`){if(!e)return null;try{let n=e.getItem(Ot(t));if(!n)return null;let r=JSON.parse(n);if(typeof r!=`object`||!r)return null;let i=r;return typeof i.time!=`number`||!Number.isFinite(i.time)||i.time<=0||!At(i.sectors)||i.sectors.length!==3||!At(i.trace)||!At(i.ghost)||i.ghost.length%4!=0?null:{time:i.time,sectors:[i.sectors[0],i.sectors[1],i.sectors[2]],trace:i.trace,ghost:i.ghost}}catch{return null}}function Mt(e,t=kt(),n=`dry`){if(t)try{t.setItem(Ot(n),JSON.stringify(e))}catch{}}function Nt(e=kt(),t=`dry`){try{e?.removeItem(Ot(t))}catch{}}var Pt=8,Ft=7,It=2.6;function Lt(e,t){return{index:e.points.length-Math.round((Pt+t*Ft)/e.step),lateral:t%2==0?-2.6:It}}function Rt(e,t){return Math.max(1,Math.min(t+1,Math.floor(e)))}function zt(e,t,n){let r=Rt(t,n)-1,i=[];for(let t=0;t<=n;t++)t!==r&&i.push(Lt(e,t));return{player:Lt(e,r),others:i}}var Bt=4.14,Vt=1.76;function Ht(e,t){let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>30)return!1;let i=Math.cos(e.yaw),a=Math.sin(e.yaw),o=n*i+r*a,s=-n*a+r*i,c=Bt-Math.abs(o),l=Vt-Math.abs(s);if(c<=0||l<=0)return!1;let u,d,f;if(l<c){let e=s>=0?1:-1;u=-a*e,d=i*e,f=l}else{let e=o>=0?1:-1;u=i*e,d=a*e,f=c}e.x-=u*f/2,e.z-=d*f/2,t.x+=u*f/2,t.z+=d*f/2;let p=e=>{let t=Math.cos(e.yaw),n=Math.sin(e.yaw);return[e.vx*t-e.vy*n,e.vx*n+e.vy*t]},[m,h]=p(e),[g,_]=p(t),v=(g-m)*u+(_-h)*d;if(v<0){let n=(e,t,n)=>{let r=Math.cos(e.yaw),i=Math.sin(e.yaw);e.vx=t*r+n*i,e.vy=-t*i+n*r};n(e,m+u*v/2,h+d*v/2),n(t,g-u*v/2,_-d*v/2)}return!0}var Ut=[2056127,15909376,16053492,1875018,2763310,15231511,8011712,1221560],Wt=[.9,.95,.86,.98,.92,.88,.96,.84],Gt=130,Kt=.25,qt=3.2,Jt=2.8,Yt=class{track;surfaces;cars=[];collisions=0;playerHit=!1;playerAlongSpeed=0;playerHint;contactCooldown=0;constructor(e,t){this.track=e,this.surfaces=t}reset(e,t,n,r=Wt){this.cars=[],this.collisions=0,this.playerHint=void 0;let i=t.length;for(let a=0;a<e;a++){let o=z(0,0,0);this.cars.push({state:o,contact:wt(this.track,this.surfaces,o),pace:r[a%r.length],offset:0,color:Ut[a%Ut.length],braking:!1,stuckTime:0,launchDelay:0}),this.place(a,t,n+Math.round((a+1)*i/(e+1)))}}resetGrid(e,t,n=Wt){this.reset(e.length,t,0,n),e.forEach((e,n)=>{let r=this.track.points[e.index],i=this.cars[n];i.state=z(r.x-Math.sin(r.heading)*e.lateral,r.z+Math.cos(r.heading)*e.lateral,r.heading),i.offset=e.lateral-t[e.index].lateral,i.stuckTime=0,i.launchDelay=.2+n*Kt,i.contact=wt(this.track,this.surfaces,i.state)})}place(e,t,n){let r=t.length,i=t[(n%r+r)%r],a=this.cars[e],o=z(i.x,i.z,i.heading);o.vx=i.speed*a.pace*.95;for(let e=0;e<4;e++)o.wheelSpeed[e]=o.vx/p.wheelRadius;o.gear=o.vx>38?5:o.vx>30?4:o.vx>20?3:2,a.state=o,a.offset=0,a.stuckTime=0,a.contact=wt(this.track,this.surfaces,o)}freeIndexAhead(e,t,n,r){let i=this.track.points.length,a=t;for(let t=0;t<20;t++){let t=(a%i+i)%i*this.track.step,o=e=>{let n=this.ahead(t,e);return n<30||n>this.track.length-30};if(!(this.cars.some(t=>t!==e&&o(t.contact.s))||r&&o(n)))break;a+=50}return a}ahead(e,t){let n=this.track.length;return((t-e)%n+n)%n}step(e,t,n,r){let i=this.track.halfWidth,a=t.length;this.playerHit=!1,this.contactCooldown=Math.max(0,this.contactCooldown-e);let o=nt(this.track,n.x,n.z,this.playerHint);this.playerHint=o.index;let s=Math.abs(o.lateral)<i+12,c=this.track.points[o.index].heading,l=Math.cos(n.yaw),u=Math.sin(n.yaw);this.playerAlongSpeed=(n.vx*l-n.vy*u)*Math.cos(c)+(n.vx*u+n.vy*l)*Math.sin(c);for(let n of this.cars){let i=n.contact;if(n.launchDelay>0){n.launchDelay-=e,n.braking=!0,ke(n.state,{steer:0,throttle:0,brake:1,gearUp:!1,gearDown:!1},i.surfaces,e,{...i.env,grip:r.grip,ambient:r.ambient});continue}let c=B(n.state),l=t[i.index%a].speed*n.pace,u=[],d=!1,f=(e,t,n)=>{let r=this.ahead(i.s,e);(r<14||r>this.track.length-12)&&(d=!0),r>.5&&r<Gt&&u.push({gap:r,lat:t,speed:n})};for(let e of this.cars)e!==n&&f(e.contact.s,e.contact.lateral,B(e.state));s&&f(o.s,o.lateral,this.playerAlongSpeed);let p=1/0,m=d?n.offset:0,h=this.track.points[i.index],g=Math.min(h.left,h.right)-1.1,_=e=>t[(i.index+Math.round(e.gap/this.track.step))%a].lateral,v=null;for(let e of u)(!v||e.gap<v.gap)&&(v=e);if(v&&v.gap<55&&l>v.speed+1.5){let e=_(v),t=e+n.offset;if(Math.abs(t-v.lat)>=Jt)m=n.offset;else{let n=g-v.lat,r=v.lat+g,i=Math.abs(t-v.lat)>1.2?Math.sign(t-v.lat):n>r?1:-1;(i>0?n:r)<Jt&&(i=-i),m=Math.max(-g,Math.min(g,v.lat+i*qt))-e}}for(let e of u){let t=_(e),r=Math.min(t+n.offset,t+m)-2.6999999999999997,i=Math.max(t+n.offset,t+m)+2.6999999999999997;if(e.lat<r||e.lat>i)continue;let a=c-e.speed,o=a>0?a*a/12:0;if(e.gap<12.14+o){let t=e.gap>8.14?3:0;p=Math.min(p,Math.max(t,e.speed-.5))}}let y=1.6*e;n.offset+=Math.max(-y,Math.min(y,m-n.offset));let b=n.pace*(Math.abs(n.offset)>.5?.93:1),x=Tt(n.state,t,this.track,i.index,b,{offset:n.offset,speedCap:p});n.braking=x.brake>.05,ke(n.state,x,i.surfaces,e,{...i.env,grip:r.grip,ambient:r.ambient}),n.contact=wt(this.track,this.surfaces,n.state,i.index),n.stuckTime=n.contact.wheelsOff===4||c<2?n.stuckTime+e:0,n.stuckTime>4&&n.contact.wheelsOff===4&&!d?this.place(this.cars.indexOf(n),t,this.freeIndexAhead(n,n.contact.index,o.s,s)):n.stuckTime>9&&this.place(this.cars.indexOf(n),t,this.freeIndexAhead(n,n.contact.index+150,o.s,s))}let d=!1;for(let e=0;e<this.cars.length;e++){for(let t=e+1;t<this.cars.length;t++)Ht(this.cars[e].state,this.cars[t].state)&&(d=!0);s&&Ht(n,this.cars[e].state)&&(d=!0,this.playerHit=!0)}d&&this.contactCooldown===0&&(this.collisions++,this.contactCooldown=1)}},Xt=.06;function Zt(e,t,n=1){let r=Math.min(1,Math.abs(e));if(r<Xt)return 0;let i=(r-Xt)/.94,a=Math.max(.2,Math.min(.85,.6/n**1.5)),o=(1-a)*i+a*i*i*i,s=Math.max(t,1),c=Math.min(p.maxSteerAngle,(.035+3*p.wheelbase*h/(s*s))*n);return Math.sign(e)*o*(c/p.maxSteerAngle)}function Qt(e,t,n,r,i){let a=Math.abs(t)>Math.abs(e)&&Math.sign(t)===Math.sign(e||t)?r:i,o=t-e,s=a*n;return Math.abs(o)<=s?t:e+Math.sign(o)*s}function $t(e,t,n){let r=(t[0]+t[1])/2;return ne(Math.max(0,r,e/p.wheelRadius),n)}function en(e,t,n){let r=t<p.gears.length&&e>6250;if(r||t<=1)return{up:r,down:!1};let i=e*p.gears[t-2]/p.gears[t-1],a;return a=t===2?e<1500:n.throttle>.7?i<5400:n.braking?i<5600:e<2200,{up:r,down:a}}var tn={KeyR:`reset`,KeyC:`camera`,KeyP:`pause`,Escape:`pause`,KeyL:`line`,KeyG:`ghost`},nn=[[3,`camera`],[9,`pause`],[8,`reset`],[1,`line`],[12,`ghost`],[0,`start`]],rn=[5,0],an=[4],on=2,sn=[`KeyE`,`KeyX`,`ShiftLeft`,`ShiftRight`],cn=[`KeyQ`,`KeyZ`,`KeyY`],ln=class{getGamepads;device=`keyboard`;sensitivity=1;keys=new Set;pending=new Set;gearUpQueued=!1;gearDownQueued=!1;prevPadButtons=[];kbSteer=0;kbThrottle=0;kbBrake=0;kbHandbrake=0;pad=null;touch=null;touchThrottle=0;touchBrake=0;constructor(e){this.getGamepads=e}attach(e){let t=e=>e.target instanceof HTMLElement&&[`INPUT`,`SELECT`,`TEXTAREA`].includes(e.target.tagName);e.addEventListener(`keydown`,e=>{t(e)||((e.code.startsWith(`Arrow`)||e.code===`Space`)&&e.preventDefault(),this.keyDown(e.code))}),e.addEventListener(`keyup`,e=>this.keyUp(e.code)),e.addEventListener(`blur`,()=>this.keys.clear())}keyDown(e){if(this.keys.has(e))return;this.keys.add(e);let t=tn[e];t&&this.pending.add(t),sn.includes(e)&&(this.gearUpQueued=!0),cn.includes(e)&&(this.gearDownQueued=!0)}keyUp(e){this.keys.delete(e)}clearPending(){this.pending.clear(),this.gearUpQueued=!1,this.gearDownQueued=!1}consumeAction(e){return this.pending.delete(e)}anyKey(){return this.keys.size>0||this.prevPadButtons.some(Boolean)}rumble(e,t=e){let n=this.pad?.vibrationActuator?.playEffect;if(!n||this.device!==`gamepad`)return;let r=Math.max(0,Math.min(1,e)),i=Math.max(0,Math.min(1,t));r<.02&&i<.02||n.call(this.pad?.vibrationActuator,`dual-rumble`,{duration:60,strongMagnitude:r,weakMagnitude:i}).catch(()=>void 0)}readPad(){try{for(let e of this.getGamepads())if(e&&e.connected&&e.buttons.length>=8)return e}catch{}return null}down(...e){return e.some(e=>this.keys.has(e))}update(e,t){let n=this.readPad();this.pad=n,this.device=n?`gamepad`:`keyboard`;let r=+!!this.down(`ArrowRight`,`KeyD`)-!!this.down(`ArrowLeft`,`KeyA`);this.kbSteer=Qt(this.kbSteer,r,e,2.2,5),this.kbThrottle=Qt(this.kbThrottle,+!!this.down(`ArrowUp`,`KeyW`),e,4,8),this.kbBrake=Qt(this.kbBrake,+!!this.down(`ArrowDown`,`KeyS`),e,5,10),this.kbHandbrake=Qt(this.kbHandbrake,+!!this.down(`Space`),e,12,30);let i=this.kbSteer,a=this.kbThrottle,o=this.kbBrake,s=this.kbHandbrake,c=this.gearUpQueued,l=this.gearDownQueued;if(this.gearUpQueued=!1,this.gearDownQueued=!1,n){let e=n.buttons.map(e=>e.pressed),t=t=>!!e[t]&&!this.prevPadButtons[t];Math.abs(n.axes[0]??0)>Math.abs(i)&&(i=n.axes[0]??0),a=Math.max(a,n.buttons[7]?.value??0),o=Math.max(o,n.buttons[6]?.value??0),e[on]&&(s=1),rn.some(t)&&(c=!0),an.some(t)&&(l=!0);for(let[e,n]of nn)t(e)&&this.pending.add(n);this.prevPadButtons=e}else this.prevPadButtons=[];return this.touch?.active?(this.device=`touch`,this.touchThrottle=Qt(this.touchThrottle,this.touch.throttle,e,4,8),this.touchBrake=Qt(this.touchBrake,this.touch.brake,e,5,10),Math.abs(this.touch.steer)>Math.abs(i)&&(i=this.touch.steer),a=Math.max(a,this.touchThrottle),o=Math.max(o,this.touchBrake)):(this.touchThrottle=0,this.touchBrake=0),{steer:Zt(i,t,this.sensitivity),throttle:a,brake:o,handbrake:s,gearUp:c,gearDown:l}}};function un(e,t){if(!Number.isFinite(e))return 0;let n=(t%360+360)%360;if(n!==90&&n!==270)return 0;let r=(n===90?1:-1)*Math.sin(e*Math.PI/180)/Math.sin(28*Math.PI/180);return Math.max(-1,Math.min(1,r))}function dn(){return typeof window<`u`&&window.matchMedia(`(pointer: coarse)`).matches&&`ontouchstart`in window}function fn(){let e=screen.orientation?.angle;if(typeof e==`number`)return e;let t=window.orientation;return typeof t==`number`?t:0}var pn=class{active=!1;steer=0;throttle=0;brake=0;tiltAvailable=!1;gasFingers=new Set;brakeFingers=new Set;constructor(e,t){this.bindPad(e,this.gasFingers,e=>this.throttle=+!!e),this.bindPad(t,this.brakeFingers,e=>this.brake=+!!e),window.addEventListener(`deviceorientation`,e=>{if(e.beta===null)return;this.tiltAvailable=!0;let t=un(e.beta,fn());this.steer+=(t-this.steer)*.35})}bindPad(e,t,n){let r=()=>{n(t.size>0),e.classList.toggle(`pressed`,t.size>0)};e.addEventListener(`pointerdown`,n=>{n.preventDefault(),e.setPointerCapture(n.pointerId),t.add(n.pointerId),r()});let i=e=>{t.delete(e.pointerId),r()};e.addEventListener(`pointerup`,i),e.addEventListener(`pointercancel`,i),e.addEventListener(`lostpointercapture`,i)}releaseAll(){this.gasFingers.clear(),this.brakeFingers.clear(),this.throttle=0,this.brake=0}enable(){this.active=!0;let e=document.documentElement;!document.fullscreenElement&&e.requestFullscreen&&e.requestFullscreen({navigationUI:`hide`}).then(()=>screen.orientation?.lock?.(`landscape`)).catch(()=>void 0);let t=window.DeviceOrientationEvent?.requestPermission;return t?t().then(e=>e===`granted`).catch(()=>!1):Promise.resolve(!0)}},mn=`attached`,hn=1e3,gn=1001,_n=1002,vn=1003,yn=1004,bn=1005,xn=1006,Sn=1007,Cn=1008,wn=1009,Tn=1010,En=1011,Dn=1012,On=1013,kn=1014,An=1015,jn=1016,Mn=1017,Nn=1018,Pn=1020,Fn=35902,In=35899,Ln=1021,Rn=1022,zn=1023,Bn=1026,Vn=1027,Hn=1028,Un=1029,Wn=1030,Gn=1031,Kn=1033,qn=33776,Jn=33777,Yn=33778,Xn=33779,Zn=35840,Qn=35841,$n=35842,er=35843,tr=36196,nr=37492,rr=37496,ir=37488,ar=37489,or=37490,sr=37491,cr=37808,lr=37809,ur=37810,dr=37811,fr=37812,pr=37813,mr=37814,hr=37815,gr=37816,_r=37817,vr=37818,yr=37819,br=37820,xr=37821,Sr=36492,Cr=36494,wr=36495,Tr=36283,Er=36284,Dr=36285,Or=36286,kr=2300,Ar=2301,jr=2302,Mr=2303,Nr=2400,Pr=2401,Fr=2402,Ir=2500,Lr=3200,Rr=`srgb`,zr=`srgb-linear`,Br=`linear`,Vr=`srgb`,Hr=7680,Ur=35044,Wr=2e3;function Gr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Kr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qr(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Jr(){let e=qr(`canvas`);return e.style.display=`block`,e}var Yr={};function Xr(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Zr(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function V(...e){e=Zr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function H(...e){e=Zr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qr(...e){let t=e.join(` `);t in Yr||(Yr[t]=!0,V(...e))}function $r(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ei={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ni=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ri=1234567,ii=Math.PI/180,ai=180/Math.PI;function oi(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ni[e&255]+ni[e>>8&255]+ni[e>>16&255]+ni[e>>24&255]+`-`+ni[t&255]+ni[t>>8&255]+`-`+ni[t>>16&15|64]+ni[t>>24&255]+`-`+ni[n&63|128]+ni[n>>8&255]+`-`+ni[n>>16&255]+ni[n>>24&255]+ni[r&255]+ni[r>>8&255]+ni[r>>16&255]+ni[r>>24&255]).toLowerCase()}function si(e,t,n){return Math.max(t,Math.min(n,e))}function ci(e,t){return(e%t+t)%t}function li(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ui(e,t,n){return e===t?0:(n-e)/(t-e)}function di(e,t,n){return(1-n)*e+n*t}function fi(e,t,n,r){return di(e,t,1-Math.exp(-n*r))}function pi(e,t=1){return t-Math.abs(ci(e,t*2)-t)}function mi(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function hi(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function gi(e,t){return e+Math.floor(Math.random()*(t-e+1))}function _i(e,t){return e+Math.random()*(t-e)}function vi(e){return e*(.5-Math.random())}function yi(e){e!==void 0&&(ri=e);let t=ri+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bi(e){return e*ii}function xi(e){return e*ai}function Si(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Ci(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function wi(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ti(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:V(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ei(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Di(e,t){if(t.constructor===Float32Array)return e;let n=Ei(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Oi(e,t){if(t.constructor===Float32Array)return e;let n=Ei(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var ki={DEG2RAD:ii,RAD2DEG:ai,generateUUID:oi,clamp:si,euclideanModulo:ci,mapLinear:li,inverseLerp:ui,lerp:di,damp:fi,pingpong:pi,smoothstep:mi,smootherstep:hi,randInt:gi,randFloat:_i,randFloatSpread:vi,seededRandom:yi,degToRad:bi,radToDeg:xi,isPowerOfTwo:Si,ceilPowerOfTwo:Ci,floorPowerOfTwo:wi,setQuaternionFromProperEuler:Ti,normalize:Oi,denormalize:Di},U=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=si(this.x,e.x,t.x),this.y=si(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=si(this.x,e,t),this.y=si(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(si(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(si(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ai=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:V(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(si(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mi.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mi.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=si(this.x,e.x,t.x),this.y=si(this.y,e.y,t.y),this.z=si(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=si(this.x,e,t),this.y=si(this.y,e,t),this.z=si(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(si(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ji.copy(this).projectOnVector(e),this.sub(ji)}reflect(e){return this.sub(ji.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(si(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ji=new W,Mi=new Ai,G=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ni.makeScale(e,t)),this}rotate(e){return Qr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ni.makeRotation(-e)),this}translate(e,t){return Qr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ni.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ni=new G,Pi=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fi=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ii(){let e={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ri(e.r),e.g=Ri(e.g),e.b=Ri(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zi(e.r),e.g=zi(e.g),e.b=zi(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Br:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[zr]:{primaries:t,whitePoint:r,transfer:Br,toXYZ:Pi,fromXYZ:Fi,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Rr},outputColorSpaceConfig:{drawingBufferColorSpace:Rr}},[Rr]:{primaries:t,whitePoint:r,transfer:Vr,toXYZ:Pi,fromXYZ:Fi,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Rr}}}),e}var Li=Ii();function Ri(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zi(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Bi,Vi=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bi===void 0&&(Bi=qr(`canvas`)),Bi.width=e.width,Bi.height=e.height;let t=Bi.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Bi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=qr(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ri(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ri(t[e]/255)*255):t[e]=Ri(t[e]);return{data:t,width:e.width,height:e.height}}return V(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Hi=0,Ui=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hi++}),this.uuid=oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wi(r[t].image)):e.push(Wi(r[t]))}else e=Wi(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wi(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vi.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(V(`Texture: Unable to serialize Texture.`),{})}var Gi=0,Ki=new W,qi=class e extends ti{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=gn,i=gn,a=xn,o=Cn,s=zn,c=wn,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gi++}),this.uuid=oi(),this.name=``,this.source=new Ui(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ki).x}get height(){return this.source.getSize(Ki).y}get depth(){return this.source.getSize(Ki).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){V(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hn:e.x-=Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case _n:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case hn:e.y-=Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case _n:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qi.DEFAULT_IMAGE=null,qi.DEFAULT_MAPPING=300,qi.DEFAULT_ANISOTROPY=1;var Ji=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=si(this.x,e.x,t.x),this.y=si(this.y,e.y,t.y),this.z=si(this.z,e.z,t.z),this.w=si(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=si(this.x,e,t),this.y=si(this.y,e,t),this.z=si(this.z,e,t),this.w=si(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(si(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yi=class extends ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ji(0,0,e,t),this.scissorTest=!1,this.viewport=new Ji(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new qi({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ui(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xi=class extends Yi{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zi=class extends qi{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qi=class extends qi{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},K=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$i.setFromMatrixColumn(e,0).length(),i=1/$i.setFromMatrixColumn(e,1).length(),a=1/$i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ta,e,na)}lookAt(e,t,n){let r=this.elements;return aa.subVectors(e,t),aa.lengthSq()===0&&(aa.z=1),aa.normalize(),ra.crossVectors(n,aa),ra.lengthSq()===0&&(Math.abs(n.z)===1?aa.x+=1e-4:aa.z+=1e-4,aa.normalize(),ra.crossVectors(n,aa)),ra.normalize(),ia.crossVectors(aa,ra),r[0]=ra.x,r[4]=ia.x,r[8]=aa.x,r[1]=ra.y,r[5]=ia.y,r[9]=aa.y,r[2]=ra.z,r[6]=ia.z,r[10]=aa.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],P=r[11],F=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*ee+c*F,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*ee+f*F,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*ee+g*F,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*ee+b*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$i.set(r[0],r[1],r[2]).length(),o=$i.set(r[4],r[5],r[6]).length(),s=$i.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ea.copy(this);let c=1/a,l=1/o,u=1/s;return ea.elements[0]*=c,ea.elements[1]*=c,ea.elements[2]*=c,ea.elements[4]*=l,ea.elements[5]*=l,ea.elements[6]*=l,ea.elements[8]*=u,ea.elements[9]*=u,ea.elements[10]*=u,t.setFromRotationMatrix(ea),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Wr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Wr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$i=new W,ea=new K,ta=new W(0,0,0),na=new W(1,1,1),ra=new W,ia=new W,aa=new W,oa=new K,sa=new Ai,ca=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(si(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-si(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(si(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-si(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(si(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-si(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:V(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return oa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(oa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sa.setFromEuler(this),this.setFromQuaternion(sa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ca.DEFAULT_ORDER=`XYZ`;var la=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},ua=0,da=new W,fa=new Ai,pa=new K,ma=new W,ha=new W,ga=new W,_a=new Ai,va=new W(1,0,0),ya=new W(0,1,0),ba=new W(0,0,1),xa={type:`added`},Sa={type:`removed`},Ca={type:`childadded`,child:null},wa={type:`childremoved`,child:null},Ta=class e extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ua++}),this.uuid=oi(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new ca,r=new Ai,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new K},normalMatrix:{value:new G}}),this.matrix=new K,this.matrixWorld=new K,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new la,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fa.setFromAxisAngle(e,t),this.quaternion.multiply(fa),this}rotateOnWorldAxis(e,t){return fa.setFromAxisAngle(e,t),this.quaternion.premultiply(fa),this}rotateX(e){return this.rotateOnAxis(va,e)}rotateY(e){return this.rotateOnAxis(ya,e)}rotateZ(e){return this.rotateOnAxis(ba,e)}translateOnAxis(e,t){return da.copy(e).applyQuaternion(this.quaternion),this.position.add(da.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(va,e)}translateY(e){return this.translateOnAxis(ya,e)}translateZ(e){return this.translateOnAxis(ba,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ma.copy(e):ma.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(ha,ma,this.up):pa.lookAt(ma,ha,this.up),this.quaternion.setFromRotationMatrix(pa),r&&(pa.extractRotation(r.matrixWorld),fa.setFromRotationMatrix(pa),this.quaternion.premultiply(fa.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(H(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xa),Ca.child=e,this.dispatchEvent(Ca),Ca.child=null):H(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sa),wa.child=e,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pa.multiply(e.parent.matrixWorld)),e.applyMatrix4(pa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xa),Ca.child=e,this.dispatchEvent(Ca),Ca.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,e,ga),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,_a,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Ta.DEFAULT_UP=new W(0,1,0),Ta.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ta.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ea=class extends Ta{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Da={type:`move`},Oa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ea,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ea,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ea,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Da)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ea;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ka={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Aa={h:0,s:0,l:0},ja={h:0,s:0,l:0};function Ma(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Li.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Li.workingColorSpace){return this.r=e,this.g=t,this.b=n,Li.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Li.workingColorSpace){if(e=ci(e,1),t=si(t,0,1),n=si(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ma(i,r,e+1/3),this.g=Ma(i,r,e),this.b=Ma(i,r,e-1/3)}return Li.colorSpaceToWorking(this,r),this}setStyle(e,t=Rr){function n(t){t!==void 0&&parseFloat(t)<1&&V(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:V(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);V(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rr){let n=ka[e.toLowerCase()];return n===void 0?V(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rr){return Li.workingToColorSpace(Na.copy(this),e),Math.round(si(Na.r*255,0,255))*65536+Math.round(si(Na.g*255,0,255))*256+Math.round(si(Na.b*255,0,255))}getHexString(e=Rr){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Li.workingColorSpace){Li.workingToColorSpace(Na.copy(this),t);let n=Na.r,r=Na.g,i=Na.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Li.workingColorSpace){return Li.workingToColorSpace(Na.copy(this),t),e.r=Na.r,e.g=Na.g,e.b=Na.b,e}getStyle(e=Rr){Li.workingToColorSpace(Na.copy(this),e);let t=Na.r,n=Na.g,r=Na.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Aa),this.setHSL(Aa.h+e,Aa.s+t,Aa.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Aa),e.getHSL(ja);let n=di(Aa.h,ja.h,t),r=di(Aa.s,ja.s,t),i=di(Aa.l,ja.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Na=new q;q.NAMES=ka;var Pa=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new q(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fa=class extends Ta{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ca,this.environmentIntensity=1,this.environmentRotation=new ca,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ia=new W,La=new W,Ra=new W,za=new W,Ba=new W,Va=new W,Ha=new W,Ua=new W,Wa=new W,Ga=new W,Ka=new Ji,qa=new Ji,Ja=new Ji,Ya=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ia.subVectors(e,t),r.cross(Ia);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ia.subVectors(r,t),La.subVectors(n,t),Ra.subVectors(e,t);let a=Ia.dot(Ia),o=Ia.dot(La),s=Ia.dot(Ra),c=La.dot(La),l=La.dot(Ra),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,za)!==null&&za.x>=0&&za.y>=0&&za.x+za.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,za)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,za.x),s.addScaledVector(a,za.y),s.addScaledVector(o,za.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ka.setScalar(0),qa.setScalar(0),Ja.setScalar(0),Ka.fromBufferAttribute(e,t),qa.fromBufferAttribute(e,n),Ja.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ka,i.x),a.addScaledVector(qa,i.y),a.addScaledVector(Ja,i.z),a}static isFrontFacing(e,t,n,r){return Ia.subVectors(n,t),La.subVectors(e,t),Ia.cross(La).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ia.subVectors(this.c,this.b),La.subVectors(this.a,this.b),Ia.cross(La).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ba.subVectors(r,n),Va.subVectors(i,n),Ua.subVectors(e,n);let s=Ba.dot(Ua),c=Va.dot(Ua);if(s<=0&&c<=0)return t.copy(n);Wa.subVectors(e,r);let l=Ba.dot(Wa),u=Va.dot(Wa);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Ba,a);Ga.subVectors(e,i);let f=Ba.dot(Ga),p=Va.dot(Ga);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Va,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Ha.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Ha,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ba,a).addScaledVector(Va,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xa=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qa.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qa.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Qa.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Qa):Qa.fromBufferAttribute(r,t),Qa.applyMatrix4(e.matrixWorld),this.expandByPoint(Qa);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),$a.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),$a.copy(e.boundingBox)),$a.applyMatrix4(e.matrixWorld),this.union($a)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qa),Qa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oo),so.subVectors(this.max,oo),eo.subVectors(e.a,oo),to.subVectors(e.b,oo),no.subVectors(e.c,oo),ro.subVectors(to,eo),io.subVectors(no,to),ao.subVectors(eo,no);let t=[0,-ro.z,ro.y,0,-io.z,io.y,0,-ao.z,ao.y,ro.z,0,-ro.x,io.z,0,-io.x,ao.z,0,-ao.x,-ro.y,ro.x,0,-io.y,io.x,0,-ao.y,ao.x,0];return!uo(t,eo,to,no,so)||(t=[1,0,0,0,1,0,0,0,1],!uo(t,eo,to,no,so))?!1:(co.crossVectors(ro,io),t=[co.x,co.y,co.z],uo(t,eo,to,no,so))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Za[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Za[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Za[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Za[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Za[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Za[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Za[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Za[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Za)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Za=[new W,new W,new W,new W,new W,new W,new W,new W],Qa=new W,$a=new Xa,eo=new W,to=new W,no=new W,ro=new W,io=new W,ao=new W,oo=new W,so=new W,co=new W,lo=new W;function uo(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){lo.fromArray(e,a);let o=i.x*Math.abs(lo.x)+i.y*Math.abs(lo.y)+i.z*Math.abs(lo.z),s=t.dot(lo),c=n.dot(lo),l=r.dot(lo);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var fo=po();function po(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function mo(e){Math.abs(e)>65504&&V(`DataUtils.toHalfFloat(): Value out of range.`),e=si(e,-65504,65504),fo.floatView[0]=e;let t=fo.uint32View[0],n=t>>23&511;return fo.baseTable[n]+((t&8388607)>>fo.shiftTable[n])}function ho(e){let t=e>>10;return fo.uint32View[0]=fo.mantissaTable[fo.offsetTable[t]+(e&1023)]+fo.exponentTable[t],fo.floatView[0]}var go=class{static toHalfFloat(e){return mo(e)}static fromHalfFloat(e){return ho(e)}},_o=new W,vo=new U,yo=0,bo=class extends ti{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yo++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ur,this.updateRanges=[],this.gpuType=An,this.version=0,this._normalizationScale=e===void 0?void 0:Ei(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vo.fromBufferAttribute(this,t),vo.applyMatrix3(e),this.setXY(t,vo.x,vo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_o.fromBufferAttribute(this,t),_o.applyMatrix3(e),this.setXYZ(t,_o.x,_o.y,_o.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_o.fromBufferAttribute(this,t),_o.applyMatrix4(e),this.setXYZ(t,_o.x,_o.y,_o.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_o.fromBufferAttribute(this,t),_o.applyNormalMatrix(e),this.setXYZ(t,_o.x,_o.y,_o.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_o.fromBufferAttribute(this,t),_o.transformDirection(e),this.setXYZ(t,_o.x,_o.y,_o.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Di(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Oi(e,this.array):Math.round(e*t)}},xo=class extends bo{constructor(e,t,n){super(new Uint16Array(e),t,n)}},So=class extends bo{constructor(e,t,n){super(new Uint32Array(e),t,n)}},J=class extends bo{constructor(e,t,n){super(new Float32Array(e),t,n)}},Co=new Xa,wo=new W,To=new W,Eo=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Co.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wo.subVectors(e,this.center);let t=wo.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(wo,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(To.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wo.copy(e.center).add(To)),this.expandByPoint(wo.copy(e.center).sub(To))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Do=0,Oo=new K,ko=new Ta,Ao=new W,jo=new Xa,Mo=new Xa,No=new W,Po=class e extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Do++}),this.uuid=oi(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Gr(e)?So:xo)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Oo.makeRotationFromQuaternion(e),this.applyMatrix4(Oo),this}rotateX(e){return Oo.makeRotationX(e),this.applyMatrix4(Oo),this}rotateY(e){return Oo.makeRotationY(e),this.applyMatrix4(Oo),this}rotateZ(e){return Oo.makeRotationZ(e),this.applyMatrix4(Oo),this}translate(e,t,n){return Oo.makeTranslation(e,t,n),this.applyMatrix4(Oo),this}scale(e,t,n){return Oo.makeScale(e,t,n),this.applyMatrix4(Oo),this}lookAt(e){return ko.lookAt(e),ko.updateMatrix(),this.applyMatrix4(ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ao).negate(),this.translate(Ao.x,Ao.y,Ao.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new J(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&V(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)H(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];jo.setFromBufferAttribute(n),this.morphTargetsRelative?(No.addVectors(this.boundingBox.min,jo.min),this.boundingBox.expandByPoint(No),No.addVectors(this.boundingBox.max,jo.max),this.boundingBox.expandByPoint(No)):(this.boundingBox.expandByPoint(jo.min),this.boundingBox.expandByPoint(jo.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&H(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Eo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)H(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(jo.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Mo.setFromBufferAttribute(n),this.morphTargetsRelative?(No.addVectors(jo.min,Mo.min),jo.expandByPoint(No),No.addVectors(jo.max,Mo.max),jo.expandByPoint(No)):(jo.expandByPoint(Mo.min),jo.expandByPoint(Mo.max))}jo.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)No.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(No));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)No.fromBufferAttribute(a,t),o&&(Ao.fromBufferAttribute(e,t),No.add(Ao)),r=Math.max(r,n.distanceToSquared(No))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&H(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){H(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new bo(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let l=new W,u=new W,d=new W,f=new U,p=new U,m=new U,h=new W,g=new W;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new W,b=new W,x=new W,S=new W;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new bo(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)No.fromBufferAttribute(e,t),No.normalize(),e.setXYZ(t,No.x,No.y,No.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new bo(a,r,i)}if(this.index===null)return V(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Fo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ur,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Io(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Io(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Io(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=oi()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var Lo=new W,Ro=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:Ei(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lo.fromBufferAttribute(this,t),Lo.applyMatrix4(e),this.setXYZ(t,Lo.x,Lo.y,Lo.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lo.fromBufferAttribute(this,t),Lo.applyNormalMatrix(e),this.setXYZ(t,Lo.x,Lo.y,Lo.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lo.fromBufferAttribute(this,t),Lo.transformDirection(e),this.setXYZ(t,Lo.x,Lo.y,Lo.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Xr(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new bo(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xr(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?Di(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Oi(e,this.data.array):Math.round(e*t)}},zo=new W,Bo=new W,Vo=new G,Ho=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=zo.subVectors(n,t).cross(Bo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(zo),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vo.getNormalMatrix(e),r=this.coplanarPoint(zo).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Uo=0,Wo=class extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uo++}),this.uuid=oi(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){V(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ho().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Go=new W,Ko=new W,qo=new W,Jo=new W,Yo=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Go)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Go.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Go.copy(this.origin).addScaledVector(this.direction,t),Go.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ko.copy(e).add(t).multiplyScalar(.5),qo.copy(t).sub(e).normalize(),Jo.copy(this.origin).sub(Ko);let i=e.distanceTo(t)*.5,a=-this.direction.dot(qo),o=Jo.dot(this.direction),s=-Jo.dot(qo),c=Jo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ko).addScaledVector(qo,d),f}intersectSphere(e,t){if(e.radius<0)return null;Go.subVectors(e.center,this.origin);let n=Go.dot(this.direction),r=Go.dot(Go)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Go)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let N=S/w,P=C/w,F=1/w,te=T-N*D,ne=E-P*D,re=O-N*A,ie=k-P*A,I=j-N*M,ae=ee-P*M,oe=I*ie-ae*re,se=te*ae-ne*I,ce=re*ne-ie*te;if(r){if(oe<0||se<0||ce<0)return null}else if((oe<0||se<0||ce<0)&&(oe>0||se>0||ce>0))return null;let le=oe+se+ce;if(le===0)return null;let ue=F*(oe*D+se*A+ce*M);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xo=class extends Wo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ca,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zo=new K,Qo=new Yo,$o=new Eo,es=new W,ts=new W,ns=new W,rs=new W,is=new W,as=new W,os=new W,ss=new W,Y=class extends Ta{constructor(e=new Po,t=new Xo){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){as.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(is.fromBufferAttribute(s,e),a?as.addScaledVector(is,r):as.addScaledVector(is.sub(t),r))}t.add(as)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$o.copy(n.boundingSphere),$o.applyMatrix4(i),Qo.copy(e.ray).recast(e.near),$o.containsPoint(Qo.origin)===!1&&(Qo.intersectSphere($o,es)===null||Qo.origin.distanceToSquared(es)>(e.far-e.near)**2)||(Zo.copy(i).invert(),Qo.copy(e.ray).applyMatrix4(Zo),(n.boundingBox===null||Qo.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Qo)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ls(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ls(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ls(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ls(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function cs(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ss.copy(s),ss.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ss);return l<n.near||l>n.far?null:{distance:l,point:ss.clone(),object:e}}function ls(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ts),e.getVertexPosition(c,ns),e.getVertexPosition(l,rs);let u=cs(e,t,n,r,ts,ns,rs,os);if(u){let e=new W;Ya.getBarycoord(os,ts,ns,rs,e),i&&(u.uv=Ya.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=Ya.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=Ya.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};Ya.getNormal(ts,ns,rs,t.normal),u.face=t,u.barycoord=e}return u}var us=new Ji,ds=new Ji,fs=new Ji,ps=new Ji,ms=new K,hs=new W,gs=new Eo,_s=new K,vs=new Yo,ys=class extends Y{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=mn,this.bindMatrix=new K,this.bindMatrixInverse=new K,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xa),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,hs),this.boundingBox.expandByPoint(hs)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Eo),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,hs),this.boundingSphere.expandByPoint(hs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gs.copy(this.boundingSphere),gs.applyMatrix4(r),e.ray.intersectsSphere(gs)!==!1&&(_s.copy(r).invert(),vs.copy(e.ray).applyMatrix4(_s),(this.boundingBox===null||vs.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,vs)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ji,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():V(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;ds.fromBufferAttribute(r.attributes.skinIndex,e),fs.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(us.copy(t),t.set(0,0,0,0)):(us.set(t.x,t.y,t.z,1),t.set(0,0,0)),us.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=fs.getComponent(e);if(r!==0){let i=ds.getComponent(e);ms.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(ps.copy(us).applyMatrix4(ms),r)}}return t.isVector4&&(t.w=us.w),t.applyMatrix4(this.bindMatrixInverse)}},bs=class extends Ta{constructor(){super(),this.isBone=!0,this.type=`Bone`}},xs=class extends qi{constructor(e=null,t=1,n=1,r,i,a,o,s,c=vn,l=vn,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ss=new K,Cs=new K,ws=class e{constructor(e=[],t=[]){this.uuid=oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){V(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new K)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new K;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Cs;Ss.multiplyMatrices(i,t[r]),Ss.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new xs(t,e,e,zn,An);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(V(`Skeleton: No bone found with UUID:`,r),i=new bs),this.bones.push(i),this.boneInverses.push(new K().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Ts=class extends bo{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Es=new K,Ds=new K,Os=[],ks=new Xa,As=new K,js=new Y,Ms=new Eo,Ns=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ts(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,As)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xa),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),ks.copy(e.boundingBox).applyMatrix4(Es),this.boundingBox.union(ks)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Eo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),Ms.copy(e.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(Ms)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(n),e.ray.intersectsSphere(Ms)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Es),Ds.multiplyMatrices(n,Es),js.matrixWorld=Ds,js.raycast(e,Os);for(let e=0,n=Os.length;e<n;e++){let n=Os[e];n.instanceId=i,n.object=this,t.push(n)}Os.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ts(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new xs(new Float32Array(r*this.count),r,this.count,Hn,An));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ps=new Eo,Fs=new U(.5,.5),Is=new W,Ls=class{constructor(e=new Ho,t=new Ho,n=new Ho,r=new Ho,i=new Ho,a=new Ho){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(e){return Ps.center.set(0,0,0),Ps.radius=.7071067811865476+Fs.distanceTo(e.center),Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Is.x=r.normal.x>0?e.max.x:e.min.x,Is.y=r.normal.y>0?e.max.y:e.min.y,Is.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Is)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Rs=new K,zs=class e{constructor(){this.coordinateSystem=Wr,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Rs.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Ls),n[e].setFromProjectionMatrix(Rs,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Ls),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Bs=class extends Wo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Vs=new W,Hs=new W,Us=new K,Ws=new Yo,Gs=new Eo,Ks=new W,qs=new W,Js=class extends Ta{constructor(e=new Po,t=new Bs){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Vs.fromBufferAttribute(t,e-1),Hs.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Vs.distanceTo(Hs);e.setAttribute(`lineDistance`,new J(n,1))}else V(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),Gs.radius+=i,e.ray.intersectsSphere(Gs)===!1)return;Us.copy(r).invert(),Ws.copy(e.ray).applyMatrix4(Us);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Ys(this,e,Ws,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Ys(this,e,Ws,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Ys(this,e,Ws,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Ys(this,e,Ws,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ys(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Vs.fromBufferAttribute(s,i),Hs.fromBufferAttribute(s,a),n.distanceSqToSegment(Vs,Hs,Ks,qs)>r)return;Ks.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ks);if(!(c<t.near||c>t.far))return{distance:c,point:qs.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Xs=new W,Zs=new W,Qs=class extends Js{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Xs.fromBufferAttribute(t,e),Zs.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Xs.distanceTo(Zs);e.setAttribute(`lineDistance`,new J(n,1))}else V(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},$s=class extends Js{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},ec=class extends Wo{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},tc=new K,nc=new Yo,rc=new Eo,ic=new W,ac=class extends Ta{constructor(e=new Po,t=new ec){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rc.copy(n.boundingSphere),rc.applyMatrix4(r),rc.radius+=i,e.ray.intersectsSphere(rc)===!1)return;tc.copy(r).invert(),nc.copy(e.ray).applyMatrix4(tc);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ic.fromBufferAttribute(l,n),oc(ic,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ic.fromBufferAttribute(l,a),oc(ic,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function oc(e,t,n,r,i,a,o){let s=nc.distanceSqToPoint(e);if(s<n){let n=new W;nc.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var sc=class extends qi{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},cc=class extends qi{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},lc=class extends qi{constructor(e,t,n=kn,r,i,a,o=vn,s=vn,c,l=Bn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ui(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},uc=class extends lc{constructor(e,t=kn,n=301,r,i,a=vn,o=vn,s,c=Bn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},dc=class extends qi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},fc=class e extends Po{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},pc=class e extends Po{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new W,g=new W;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new J(o,3)),this.setAttribute(`normal`,new J(s,3)),this.setAttribute(`uv`,new J(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},mc=class e extends Po{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new W,l=new U;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`normal`,new J(o,3)),this.setAttribute(`uv`,new J(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},hc=class e extends Po{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new J(u,3)),this.setAttribute(`normal`,new J(d,3)),this.setAttribute(`uv`,new J(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},gc=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){V(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new U:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new W,r=[],i=[],a=[],o=new W,s=new K;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(si(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(si(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},_c=class extends gc{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new U){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},vc=class extends _c{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function yc(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var bc=new W,xc=new W,Sc=new yc,Cc=new yc,wc=new yc,Tc=class extends gc{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(xc.subVectors(r[0],r[1]).add(r[0]),c=xc);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(bc.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=bc),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Sc.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Cc.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),wc.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Sc.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Cc.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),wc.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Sc.calc(s),Cc.calc(s),wc.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ec(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Dc(e,t){let n=1-e;return n*n*t}function Oc(e,t){return 2*(1-e)*e*t}function kc(e,t){return e*e*t}function Ac(e,t,n,r){return Dc(e,t)+Oc(e,n)+kc(e,r)}function jc(e,t){let n=1-e;return n*n*n*t}function Mc(e,t){let n=1-e;return 3*n*n*e*t}function Nc(e,t){return 3*(1-e)*e*e*t}function Pc(e,t){return e*e*e*t}function Fc(e,t,n,r,i){return jc(e,t)+Mc(e,n)+Nc(e,r)+Pc(e,i)}var Ic=class extends gc{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Fc(e,r.x,i.x,a.x,o.x),Fc(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Lc=class extends gc{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Fc(e,r.x,i.x,a.x,o.x),Fc(e,r.y,i.y,a.y,o.y),Fc(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Rc=class extends gc{constructor(e=new U,t=new U){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zc=class extends gc{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bc=class extends gc{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Ac(e,r.x,i.x,a.x),Ac(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vc=class extends gc{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Ac(e,r.x,i.x,a.x),Ac(e,r.y,i.y,a.y),Ac(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Hc=class extends gc{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new U){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Ec(o,s.x,c.x,l.x,u.x),Ec(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this}},Uc=Object.freeze({__proto__:null,ArcCurve:vc,CatmullRomCurve3:Tc,CubicBezierCurve:Ic,CubicBezierCurve3:Lc,EllipseCurve:_c,LineCurve:Rc,LineCurve3:zc,QuadraticBezierCurve:Bc,QuadraticBezierCurve3:Vc,SplineCurve:Hc}),Wc=class extends gc{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Uc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Uc[n.type]().fromJSON(n))}return this.cacheLengths=null,this}},Gc=class extends Wc{constructor(e){super(),this.type=`Path`,this.currentPoint=new U,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Rc(this.currentPoint.clone(),new U(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Bc(this.currentPoint.clone(),new U(e,t),new U(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Ic(this.currentPoint.clone(),new U(e,t),new U(n,r),new U(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Hc([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new _c(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Kc=class extends Gc{constructor(e){super(e),this.uuid=oi(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Gc().fromJSON(n))}return this}};function qc(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Jc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=tl(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Xc(a,o,n,s,c,l,0),o}function Jc(e,t,n,r,i){let a;if(i===Tl(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Sl(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Sl(i/r|0,e[i],e[i+1],a);return a&&ml(a,a.next)&&(Cl(a),a=a.next),a}function Yc(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(ml(n,n.next)||pl(n.prev,n,n.next)===0)){if(Cl(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Xc(e,t,n,r,i,a,o){if(!e)return;!o&&a&&ol(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Qc(e,r,i,a):Zc(e))t.push(c.i,e.i,l.i),Cl(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=$c(Yc(e),t),Xc(e,t,n,r,i,a,2)):o===2&&el(e,t,n,r,i,a):Xc(Yc(e),t,n,r,i,a,1);break}}}function Zc(e){let t=e.prev,n=e,r=e.next;if(pl(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&dl(i,s,a,c,o,l,m.x,m.y)&&pl(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Qc(e,t,n,r){let i=e.prev,a=e,o=e.next;if(pl(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=cl(p,m,t,n,r),v=cl(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&dl(s,u,c,d,l,f,y.x,y.y)&&pl(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&dl(s,u,c,d,l,f,b.x,b.y)&&pl(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&dl(s,u,c,d,l,f,y.x,y.y)&&pl(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&dl(s,u,c,d,l,f,b.x,b.y)&&pl(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function $c(e,t){let n=e;do{let r=n.prev,i=n.next.next;!ml(r,i)&&hl(r,n,n.next,i)&&yl(r,i)&&yl(i,r)&&(t.push(r.i,n.i,i.i),Cl(n),Cl(n.next),n=e=i),n=n.next}while(n!==e);return Yc(n)}function el(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&fl(o,e)){let s=xl(o,e);o=Yc(o,o.next),s=Yc(s,s.next),Xc(o,t,n,r,i,a,0),Xc(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function tl(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Jc(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ll(o))}i.sort(nl);for(let e=0;e<i.length;e++)n=rl(i[e],n);return n}function nl(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function rl(e,t){let n=il(e,t);if(!n)return t;let r=xl(n,e);return Yc(r,r.next),Yc(n,n.next)}function il(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(ml(e,n))return n;do{if(ml(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&ul(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);yl(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&al(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function al(e,t){return pl(e.prev,e,t.prev)<0&&pl(t.next,e,e.next)<0}function ol(e,t,n,r){let i=e;do i.z===0&&(i.z=cl(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,sl(i)}function sl(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function cl(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ll(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ul(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function dl(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&ul(e,t,n,r,i,a,o,s)}function fl(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!vl(e,t)&&(yl(e,t)&&yl(t,e)&&bl(e,t)&&(pl(e.prev,e,t.prev)||pl(e,t.prev,t))||ml(e,t)&&pl(e.prev,e,e.next)>0&&pl(t.prev,t,t.next)>0)}function pl(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ml(e,t){return e.x===t.x&&e.y===t.y}function hl(e,t,n,r){let i=_l(pl(e,t,n)),a=_l(pl(e,t,r)),o=_l(pl(n,r,e)),s=_l(pl(n,r,t));return!!(i!==a&&o!==s||i===0&&gl(e,n,t)||a===0&&gl(e,r,t)||o===0&&gl(n,e,r)||s===0&&gl(n,t,r))}function gl(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function _l(e){return e>0?1:e<0?-1:0}function vl(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&hl(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function yl(e,t){return pl(e.prev,e,e.next)<0?pl(e,t,e.next)>=0&&pl(e,e.prev,t)>=0:pl(e,t,e.prev)<0||pl(e,e.next,t)<0}function bl(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function xl(e,t){let n=wl(e.i,e.x,e.y),r=wl(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Sl(e,t,n,r){let i=wl(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Cl(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function wl(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Tl(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var El=class{static triangulate(e,t,n=2){return qc(e,t,n)}},Dl=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Ol(e),kl(n,e);let a=e.length;t.forEach(Ol);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,kl(n,t[e]);let o=El.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Ol(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function kl(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Al=class e extends Po{constructor(e=new Kc([new U(.5,.5),new U(-.5,.5),new U(-.5,-.5),new U(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new J(r,3)),this.setAttribute(`uv`,new J(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?jl:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new W,b=new W,x=new W}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Dl.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Dl.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||H(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new U(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new U(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let ee=[],M,N=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];M=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),M[e]=A(t[e],t[r],t[i]);ee.push(M),N=N.concat(M)}let P;if(p===0)P=Dl.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);I(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];M=ee[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],M[e],a);I(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}P=Dl.triangulateShape(e,t)}let F=P.length,te=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],N[e],te):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),I(x.x,x.y,x.z)):I(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],N[t],te):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),I(x.x,x.y,x.z)):I(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);I(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];M=ee[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],M[e],r);_?I(i.x,i.y+g[s-1].y,g[s-1].x+n):I(i.x,i.y,c+n)}}}ne(),re();function ne(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<F;e++){let n=P[e];ae(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<F;e++){let n=P[e];ae(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<F;e++){let t=P[e];ae(t[2],t[1],t[0])}for(let e=0;e<F;e++){let t=P[e];ae(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function re(){let e=r.length/3,t=0;ie(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ie(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ie(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);oe(t+r+n,t+i+n,t+i+a,t+r+a)}}}function I(e,t,n){a.push(e),a.push(t),a.push(n)}function ae(e,t,i){se(e),se(t),se(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ce(o[0]),ce(o[1]),ce(o[2])}function oe(e,t,i,a){se(e),se(t),se(a),se(t),se(i),se(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ce(s[0]),ce(s[1]),ce(s[3]),ce(s[1]),ce(s[2]),ce(s[3])}function se(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ce(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ml(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Uc[i.type]().fromJSON(i)),new e(r,t.options)}},jl={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new U(a,o),new U(s,c),new U(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new U(o,1-c),new U(l,1-d),new U(f,1-m),new U(h,1-_)]:[new U(s,1-c),new U(u,1-d),new U(p,1-m),new U(g,1-_)]}};function Ml(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Nl=class e extends Po{constructor(e=[new U(0,-.5),new U(.5,0),new U(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=si(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new W,d=new U,f=new W,p=new W,m=new W,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`uv`,new J(o,2)),this.setAttribute(`normal`,new J(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Pl=class e extends Po{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Fl=class e extends Po{constructor(e=new Kc([new U(0,.5),new U(-.5,-.5),new U(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new J(r,3)),this.setAttribute(`normal`,new J(i,3)),this.setAttribute(`uv`,new J(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Dl.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Dl.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Dl.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Il(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Il(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Ll=class e extends Po{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Rl=class e extends Po{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function zl(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Vl(i))i.isRenderTargetTexture?(V(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Vl(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Bl(e){let t={};for(let n=0;n<e.length;n++){let r=zl(e[n]);for(let e in r)t[e]=r[e]}return t}function Vl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Hl(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ul(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Li.workingColorSpace}var Wl={clone:zl,merge:Bl},Gl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ql=class extends Wo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gl,this.fragmentShader=Kl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zl(e.uniforms),this.uniformsGroups=Hl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ji().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new K().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Jl=class extends ql{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},X=class extends Wo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ca,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Yl=class extends X{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new U(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return si(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Qr(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Qr(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Xl=class extends Wo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ca,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zl=class extends Wo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Lr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ql=class extends Wo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function $l(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function eu(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function tu(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function nu(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function ru(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var iu=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},au=class extends iu{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nr,endingEnd:Nr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pr:i=e,o=2*t-n;break;case Fr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Pr:a=e,s=2*n-t;break;case Fr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ou=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},su=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},cu=class extends iu{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=du(n,t,g,y,r);i[p]=lu(x,o,_,b,m)}return i}};function lu(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function uu(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function du(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=lu(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=uu(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var fu=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=$l(t,this.TimeBufferType),this.values=$l(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$l(e.times,Array),values:$l(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),eu(e.settings)&&(n.settings={inTangents:$l(e.settings.inTangents,Array),outTangents:$l(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new su(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ou(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new au(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new cu(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case Ar:t=this.InterpolantFactoryMethodLinear;break;case jr:t=this.InterpolantFactoryMethodSmooth;break;case Mr:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return V(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return Ar;case this.InterpolantFactoryMethodSmooth:return jr;case this.InterpolantFactoryMethodBezier:return Mr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;eu(this.settings)&&(pu(this.settings.inTangents,e),pu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;eu(this.settings)&&(mu(this.settings.inTangents,e),mu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(H(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(H(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){H(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){H(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Kr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){H(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===jr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,eu(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function pu(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function mu(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}fu.prototype.ValueTypeName=``,fu.prototype.TimeBufferType=Float32Array,fu.prototype.ValueBufferType=Float32Array,fu.prototype.DefaultInterpolation=Ar;var hu=class extends fu{constructor(e,t,n){super(e,t,n)}};hu.prototype.ValueTypeName=`bool`,hu.prototype.ValueBufferType=Array,hu.prototype.DefaultInterpolation=kr,hu.prototype.InterpolantFactoryMethodLinear=void 0,hu.prototype.InterpolantFactoryMethodSmooth=void 0;var gu=class extends fu{constructor(e,t,n,r){super(e,t,n,r)}};gu.prototype.ValueTypeName=`color`;var _u=class extends fu{constructor(e,t,n,r){super(e,t,n,r)}};_u.prototype.ValueTypeName=`number`;var vu=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ai.slerpFlat(i,0,a,c-o,a,c,s);return i}},yu=class extends fu{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new vu(this.times,this.values,this.getValueSize(),e)}};yu.prototype.ValueTypeName=`quaternion`,yu.prototype.InterpolantFactoryMethodSmooth=void 0;var bu=class extends fu{constructor(e,t,n){super(e,t,n)}};bu.prototype.ValueTypeName=`string`,bu.prototype.ValueBufferType=Array,bu.prototype.DefaultInterpolation=kr,bu.prototype.InterpolantFactoryMethodLinear=void 0,bu.prototype.InterpolantFactoryMethodSmooth=void 0;var xu=class extends fu{constructor(e,t,n,r){super(e,t,n,r)}};xu.prototype.ValueTypeName=`vector`;var Su=class{constructor(e=``,t=-1,n=[],r=Ir){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=oi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(wu(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(fu.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=tu(o);o=nu(o,1,c),s=nu(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new _u(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Cu(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return _u;case`vector`:case`vector2`:case`vector3`:case`vector4`:return xu;case`color`:return gu;case`quaternion`:return yu;case`bool`:case`boolean`:return hu;case`string`:return bu}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function wu(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=Cu(e.type);if(e.times===void 0){let t=[],n=[];ru(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),eu(e.settings)&&(n.settings={inTangents:$l(e.settings.inTangents,Float32Array),outTangents:$l(e.settings.outTangents,Float32Array)}),n}var Tu={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Eu(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Eu(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Eu(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Du=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ou=class{constructor(e){this.manager=e===void 0?Du:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Ou.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var ku={},Au=class extends Error{constructor(e,t){super(e),this.response=t}},ju=class extends Ou{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Tu.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(ku[e]!==void 0){ku[e].push({onLoad:t,onProgress:n,onError:r});return}ku[e]=[],ku[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&V(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=ku[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new Au(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Tu.add(`file:${e}`,t);let n=ku[e];delete ku[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=ku[e];if(n===void 0)throw this.manager.itemError(e),t;delete ku[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Mu=new WeakMap,Nu=class extends Ou{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Tu.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Mu.get(a);e===void 0&&(e=[],Mu.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=qr(`img`);function s(){l(),t&&t(this);let n=Mu.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Mu.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Tu.remove(`image:${e}`);let n=Mu.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Mu.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Tu.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},Pu=class extends Ou{constructor(e){super(e)}load(e,t,n,r){let i=this,a=new xs,o=new ju(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setResponseType(`arraybuffer`),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(i.withCredentials),o.load(e,function(e){let n;try{n=i.parse(e)}catch(e){r===void 0?H(e):r(e);return}i._applyTexData(a,n),t&&t(a,n)},n,r),a}createDataTexture(e){let t=new xs;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image===void 0?t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data):e.image=t.image,e.wrapS=t.wrapS===void 0?gn:t.wrapS,e.wrapT=t.wrapT===void 0?gn:t.wrapT,e.magFilter=t.magFilter===void 0?xn:t.magFilter,e.minFilter=t.minFilter===void 0?xn:t.minFilter,e.anisotropy=t.anisotropy===void 0?1:t.anisotropy,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Cn),t.mipmapCount===1&&(e.minFilter=xn),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},Fu=class extends Ou{constructor(e){super(e)}load(e,t,n,r){let i=new qi,a=new Nu(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Iu=class extends Ta{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Lu=class extends Iu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ta.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ru=new K,zu=new W,Bu=new W,Vu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new K,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new Ji(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;zu.setFromMatrixPosition(e.matrixWorld),t.position.copy(zu),Bu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ru.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ru,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ru)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Hu=new W,Uu=new Ai,Wu=new W,Gu=class extends Ta{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new K,this.projectionMatrix=new K,this.projectionMatrixInverse=new K,this.coordinateSystem=Wr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hu,Uu,Wu),Wu.x===1&&Wu.y===1&&Wu.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hu,Uu,Wu.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hu,Uu,Wu),Wu.x===1&&Wu.y===1&&Wu.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hu,Uu,Wu.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ku=new W,qu=new U,Ju=new U,Yu=class extends Gu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ai*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ii*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ai*2*Math.atan(Math.tan(ii*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ku.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ku.x,Ku.y).multiplyScalar(-e/Ku.z),Ku.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ku.x,Ku.y).multiplyScalar(-e/Ku.z)}getViewSize(e,t){return this.getViewBounds(e,qu,Ju),t.subVectors(Ju,qu)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ii*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Xu=class extends Vu{constructor(){super(new Yu(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ai*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Zu=class extends Iu{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Ta.DEFAULT_UP),this.updateMatrix(),this.target=new Ta,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Xu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Qu=class extends Vu{constructor(){super(new Yu(90,1,.5,500)),this.isPointLightShadow=!0}},$u=class extends Iu{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Qu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ed=class extends Gu{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},td=class extends Vu{constructor(){super(new ed(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},nd=class extends Iu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ta.DEFAULT_UP),this.updateMatrix(),this.target=new Ta,this.shadow=new td}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},rd=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},id=new WeakMap,ad=class extends Ou{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&V(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&V(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Tu.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{id.has(a)===!0?(r&&r(id.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!==`anonymous`?`include`:`same-origin`,o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign({},i.options,{colorSpaceConversion:`none`}))}).then(function(n){return Tu.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),id.set(s,t),Tu.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});Tu.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},od=-90,sd=1,cd=class extends Ta{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Yu(od,sd,e,t);r.layers=this.layers,this.add(r);let i=new Yu(od,sd,e,t);i.layers=this.layers,this.add(i);let a=new Yu(od,sd,e,t);a.layers=this.layers,this.add(a);let o=new Yu(od,sd,e,t);o.layers=this.layers,this.add(o);let s=new Yu(od,sd,e,t);s.layers=this.layers,this.add(s);let c=new Yu(od,sd,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ld=class extends Yu{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},ud=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=dd.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function dd(){this._document.hidden===!1&&this.reset()}var fd=`\\[\\]\\.:\\/`,pd=RegExp(`[\\[\\]\\.:\\/]`,`g`),md=`[^\\[\\]\\.:\\/]`,hd=`[^`+fd.replace(`\\.`,``)+`]`,gd=`((?:WC+[\\/:])*)`.replace(`WC`,md),_d=`(WCOD+)?`.replace(`WCOD`,hd),vd=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,md),yd=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,md),bd=RegExp(`^`+gd+_d+vd+yd+`$`),xd=[`material`,`materials`,`bones`,`map`],Sd=class{constructor(e,t,n){let r=n||Cd.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Cd=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(pd,``)}static parseTrackName(e){let t=bd.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);xd.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){V(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){H(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){H(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){H(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){H(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){H(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;H(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Cd.Composite=Sd,Cd.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Cd.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Cd.prototype.GetterByBindingType=[Cd.prototype._getValue_direct,Cd.prototype._getValue_array,Cd.prototype._getValue_arrayElement,Cd.prototype._getValue_toArray],Cd.prototype.SetterByBindingTypeAndVersioning=[[Cd.prototype._setValue_direct,Cd.prototype._setValue_direct_setNeedsUpdate,Cd.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Cd.prototype._setValue_array,Cd.prototype._setValue_array_setNeedsUpdate,Cd.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Cd.prototype._setValue_arrayElement,Cd.prototype._setValue_arrayElement_setNeedsUpdate,Cd.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Cd.prototype._setValue_fromArray,Cd.prototype._setValue_fromArray_setNeedsUpdate,Cd.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function wd(e,t,n,r){let i=Td(r);switch(n){case Ln:return e*t;case Hn:return e*t/i.components*i.byteLength;case Un:return e*t/i.components*i.byteLength;case Wn:return e*t*2/i.components*i.byteLength;case Gn:return e*t*2/i.components*i.byteLength;case Rn:return e*t*3/i.components*i.byteLength;case zn:return e*t*4/i.components*i.byteLength;case Kn:return e*t*4/i.components*i.byteLength;case qn:case Jn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yn:case Xn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qn:case er:return Math.max(e,16)*Math.max(t,8)/4;case Zn:case $n:return Math.max(e,8)*Math.max(t,8)/2;case tr:case nr:case ir:case ar:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case rr:case or:case sr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lr:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ur:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case dr:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case fr:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case pr:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case mr:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case hr:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case gr:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case _r:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case vr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case yr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case br:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case xr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Sr:case Cr:case wr:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Tr:case Er:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Dr:case Or:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Td(e){switch(e){case wn:case Tn:return{byteLength:1,components:1};case Dn:case En:case jn:return{byteLength:2,components:1};case Mn:case Nn:return{byteLength:2,components:4};case kn:case On:case An:return{byteLength:4,components:1};case Fn:case In:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?V(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ed(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Dd(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Od={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},kd={basic:{uniforms:Bl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:Od.meshbasic_vert,fragmentShader:Od.meshbasic_frag},lambert:{uniforms:Bl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Od.meshlambert_vert,fragmentShader:Od.meshlambert_frag},phong:{uniforms:Bl([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Od.meshphong_vert,fragmentShader:Od.meshphong_frag},standard:{uniforms:Bl([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Od.meshphysical_vert,fragmentShader:Od.meshphysical_frag},toon:{uniforms:Bl([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new q(0)}}]),vertexShader:Od.meshtoon_vert,fragmentShader:Od.meshtoon_frag},matcap:{uniforms:Bl([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:Od.meshmatcap_vert,fragmentShader:Od.meshmatcap_frag},points:{uniforms:Bl([Z.points,Z.fog]),vertexShader:Od.points_vert,fragmentShader:Od.points_frag},dashed:{uniforms:Bl([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Od.linedashed_vert,fragmentShader:Od.linedashed_frag},depth:{uniforms:Bl([Z.common,Z.displacementmap]),vertexShader:Od.depth_vert,fragmentShader:Od.depth_frag},normal:{uniforms:Bl([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:Od.meshnormal_vert,fragmentShader:Od.meshnormal_frag},sprite:{uniforms:Bl([Z.sprite,Z.fog]),vertexShader:Od.sprite_vert,fragmentShader:Od.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Od.background_vert,fragmentShader:Od.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Od.backgroundCube_vert,fragmentShader:Od.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Od.cube_vert,fragmentShader:Od.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Od.equirect_vert,fragmentShader:Od.equirect_frag},distance:{uniforms:Bl([Z.common,Z.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Od.distance_vert,fragmentShader:Od.distance_frag},shadow:{uniforms:Bl([Z.lights,Z.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Od.shadow_vert,fragmentShader:Od.shadow_frag}};kd.physical={uniforms:Bl([kd.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Od.meshphysical_vert,fragmentShader:Od.meshphysical_frag};var Ad={r:0,b:0,g:0},jd=new K,Md=new G;Md.set(-1,0,0,0,1,0,0,0,1);function Nd(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Y(new fc(1,1,1),new ql({name:`BackgroundCubeMaterial`,uniforms:zl(kd.backgroundCube.uniforms),vertexShader:kd.backgroundCube.vertexShader,fragmentShader:kd.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jd.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Md),l.material.toneMapped=Li.getTransfer(i.colorSpace)!==Vr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new Pl(2,2),new ql({name:`BackgroundMaterial`,uniforms:zl(kd.background.uniforms),vertexShader:kd.background.vertexShader,fragmentShader:kd.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Li.getTransfer(i.colorSpace)!==Vr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ad,Ul(e)),n.buffers.color.setClear(Ad.r,Ad.g,Ad.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Pd(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Fd(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Id(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(V(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&V(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&V(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ld(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ho,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Rd=class extends Xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new sc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fc(5,5,5),i=new ql({name:`CubemapFromEquirect`,uniforms:zl(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=xn),new cd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},zd=256,Bd=3,Vd=20,Hd=256,Ud=16,Wd=3,Gd=new W,Kd=new q,qd=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new cd(1,10,null),this._boxMesh=new Y(new fc(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Gd}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Kd));let h=new cd(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(zd,wi(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?zd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Jd(e,!1,!1),n=Math.log2(e)-Bd;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Jd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=ef()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=$d()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Xd(),this._integrationMaterial=Zd());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Ud);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Wd)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Hd*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Qd());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Jd(e,t,n){return new Rd(e,{minFilter:Cn,generateMipmaps:t,type:jn,colorSpace:zr,depthBuffer:n})}function Yd(e,t,n){return new ql({name:e,uniforms:t,vertexShader:Od.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Xd(){return Yd(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Hd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Zd(){return Yd(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ud}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qd(){return Yd(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Vd}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function $d(){return Yd(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ef(){return Yd(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function tf(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Rd(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new qd(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new qd(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function nf(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qr(`WebGLRenderer: `+e+` extension not supported.`),t}}}function rf(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?So:xo)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function af(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function of(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:H(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function sf(e,t,n){let r=new WeakMap,i=new Ji;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zi(h,p,m,u);g.type=An,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function cf(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var lf={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function uf(e,t,n,r,i,a){let o=new Xi(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Po;u.setAttribute(`position`,new J([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new J([0,2,0,0,2,0],2));let d=new Jl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Y(u,d),p=new ed(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Xi(t,n,{type:jn,depthBuffer:!1,stencilBuffer:!1}),c=new Xi(t,n,{type:jn,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new lc(t,n),a===!0&&(l.format=Vn,l.type=Pn)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Li.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=lf[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var df=new qi,ff=new lc(1,1),pf=new uc(1),mf=new Zi,hf=new Qi,gf=new sc,_f=[],vf=[],yf=new Float32Array(16),bf=new Float32Array(9),xf=new Float32Array(4);function Sf(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=_f[i];if(a===void 0&&(a=new Float32Array(i),_f[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Cf(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function wf(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Tf(e,t){let n=vf[t];n===void 0&&(n=new Int32Array(t),vf[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ef(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Df(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cf(n,t))return;e.uniform2fv(this.addr,t),wf(n,t)}}function Of(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Cf(n,t))return;e.uniform3fv(this.addr,t),wf(n,t)}}function kf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cf(n,t))return;e.uniform4fv(this.addr,t),wf(n,t)}}function Af(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cf(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),wf(n,t)}else{if(Cf(n,r))return;xf.set(r),e.uniformMatrix2fv(this.addr,!1,xf),wf(n,r)}}function jf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cf(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),wf(n,t)}else{if(Cf(n,r))return;bf.set(r),e.uniformMatrix3fv(this.addr,!1,bf),wf(n,r)}}function Mf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cf(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),wf(n,t)}else{if(Cf(n,r))return;yf.set(r),e.uniformMatrix4fv(this.addr,!1,yf),wf(n,r)}}function Nf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Pf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cf(n,t))return;e.uniform2iv(this.addr,t),wf(n,t)}}function Ff(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cf(n,t))return;e.uniform3iv(this.addr,t),wf(n,t)}}function If(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cf(n,t))return;e.uniform4iv(this.addr,t),wf(n,t)}}function Lf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Rf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cf(n,t))return;e.uniform2uiv(this.addr,t),wf(n,t)}}function zf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cf(n,t))return;e.uniform3uiv(this.addr,t),wf(n,t)}}function Bf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cf(n,t))return;e.uniform4uiv(this.addr,t),wf(n,t)}}function Vf(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Hf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Vf(ff):df,n.setTexture2D(t||a,i)}function Uf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||hf,i)}function Wf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Vf(pf):gf,n.setTextureCube(t||a,i)}function Gf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||mf,i)}function Kf(e){switch(e){case 5126:return Ef;case 35664:return Df;case 35665:return Of;case 35666:return kf;case 35674:return Af;case 35675:return jf;case 35676:return Mf;case 5124:case 35670:return Nf;case 35667:case 35671:return Pf;case 35668:case 35672:return Ff;case 35669:case 35673:return If;case 5125:return Lf;case 36294:return Rf;case 36295:return zf;case 36296:return Bf;case 35678:case 36198:case 36298:case 36306:case 35682:return Hf;case 35679:case 36299:case 36307:return Uf;case 35680:case 36300:case 36308:case 36293:return Wf;case 36289:case 36303:case 36311:case 36292:return Gf}}function qf(e,t){e.uniform1fv(this.addr,t)}function Jf(e,t){let n=Sf(t,this.size,2);e.uniform2fv(this.addr,n)}function Yf(e,t){let n=Sf(t,this.size,3);e.uniform3fv(this.addr,n)}function Xf(e,t){let n=Sf(t,this.size,4);e.uniform4fv(this.addr,n)}function Zf(e,t){let n=Sf(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Qf(e,t){let n=Sf(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $f(e,t){let n=Sf(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ep(e,t){e.uniform1iv(this.addr,t)}function tp(e,t){e.uniform2iv(this.addr,t)}function np(e,t){e.uniform3iv(this.addr,t)}function rp(e,t){e.uniform4iv(this.addr,t)}function ip(e,t){e.uniform1uiv(this.addr,t)}function ap(e,t){e.uniform2uiv(this.addr,t)}function op(e,t){e.uniform3uiv(this.addr,t)}function sp(e,t){e.uniform4uiv(this.addr,t)}function cp(e,t,n){let r=this.cache,i=t.length,a=Tf(n,i);Cf(r,a)||(e.uniform1iv(this.addr,a),wf(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Vf(ff):df;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function lp(e,t,n){let r=this.cache,i=t.length,a=Tf(n,i);Cf(r,a)||(e.uniform1iv(this.addr,a),wf(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||hf,a[e])}function up(e,t,n){let r=this.cache,i=t.length,a=Tf(n,i);Cf(r,a)||(e.uniform1iv(this.addr,a),wf(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Vf(pf):gf;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function dp(e,t,n){let r=this.cache,i=t.length,a=Tf(n,i);Cf(r,a)||(e.uniform1iv(this.addr,a),wf(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||mf,a[e])}function fp(e){switch(e){case 5126:return qf;case 35664:return Jf;case 35665:return Yf;case 35666:return Xf;case 35674:return Zf;case 35675:return Qf;case 35676:return $f;case 5124:case 35670:return ep;case 35667:case 35671:return tp;case 35668:case 35672:return np;case 35669:case 35673:return rp;case 5125:return ip;case 36294:return ap;case 36295:return op;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return lp;case 35680:case 36300:case 36308:case 36293:return up;case 36289:case 36303:case 36311:case 36292:return dp}}var pp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kf(t.type)}},mp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fp(t.type)}},hp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},gp=/(\w+)(\])?(\[|\.)?/g;function _p(e,t){e.seq.push(t),e.map[t.id]=t}function vp(e,t,n){let r=e.name,i=r.length;for(gp.lastIndex=0;;){let a=gp.exec(r),o=gp.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){_p(n,l===void 0?new pp(s,e,t):new mp(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new hp(s),_p(n,e)),n=e}}}var yp=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);vp(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function bp(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var xp=37297,Sp=0;function Cp(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var wp=new G;function Tp(e){Li._getMatrix(wp,Li.workingColorSpace,e);let t=`mat3( ${wp.elements.map(e=>e.toFixed(4))} )`;switch(Li.getTransfer(e)){case Br:return[t,`LinearTransferOETF`];case Vr:return[t,`sRGBTransferOETF`];default:return V(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ep(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Cp(e.getShaderSource(t),r)}return i}function Dp(e,t){let n=Tp(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Op={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function kp(e,t){let n=Op[t];return n===void 0?(V(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ap=new W;function jp(){return Li.getLuminanceCoefficients(Ap),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ap.x.toFixed(4)}, ${Ap.y.toFixed(4)}, ${Ap.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Mp(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fp).join(`
`)}function Np(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Pp(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fp(e){return e!==``}function Ip(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Lp(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rp=/^[ \t]*#include +<([\w\d./]+)>/gm;function zp(e){return e.replace(Rp,Bp)}function Bp(e,t){let n=Od[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return zp(n)}var Vp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hp(e){return e.replace(Vp,Up)}function Up(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Wp(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Gp={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Kp(e){return Gp[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var qp={302:`ENVMAP_MODE_REFRACTION`};function Jp(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:qp[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yp={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xp(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yp[e.combine]||`ENVMAP_BLENDING_NONE`}function Zp(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Kp(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Jp(n),d=Xp(n),f=Mp(n),p=Np(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fp).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fp).join(`
`),g.length>0&&(g+=`
`)):(h=[Wp(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fp).join(`
`),g=[Wp(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Od.tonemapping_pars_fragment,n.toneMapping===0?``:kp(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Od.colorspace_pars_fragment,Dp(`linearToOutputTexel`,n.outputColorSpace),jp(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fp).join(`
`)),o=zp(o),o=Ip(o,n),o=Lp(o,n),s=zp(s),s=Ip(s,n),s=Lp(s,n),o=Hp(o),s=Hp(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=bp(i,i.VERTEX_SHADER,v),x=bp(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Ep(i,b,`vertex`),n=Ep(i,x,`fragment`);H(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):V(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new yp(i,m),w=Pp(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,xp)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Sp++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Qp=0,$p=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new em(e),t.set(e,n)),n}},em=class{constructor(e){this.id=Qp++,this.code=e,this.usedTimes=0}};function tm(e){return e===1030||e===37490||e===36285}function nm(e,t,n,r,i,a){let o=new la,s=new $p,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&V(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=kd[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,N=!!i.map,P=!!i.matcap,F=!!b,te=F&&b.isPMREMTexture===!0,ne=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,I=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,se=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.diffuseRoughness>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,me=i.iridescence>0,he=i.sheen>0,ge=i.transmission>0,_e=le&&!!i.anisotropyMap,ve=ue&&!!i.clearcoatMap,ye=ue&&!!i.clearcoatNormalMap,be=ue&&!!i.clearcoatRoughnessMap,xe=de&&!!i.diffuseRoughnessMap,L=me&&!!i.iridescenceMap,Se=me&&!!i.iridescenceThicknessMap,Ce=he&&!!i.sheenColorMap,we=he&&!!i.sheenRoughnessMap,R=!!i.specularMap,Te=!!i.specularColorMap,z=!!i.specularIntensityMap,B=ge&&!!i.transmissionMap,Ee=ge&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne=te?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Pe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Li.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:P,envMap:F,envMapMode:F&&b.mapping,envMapPMREM:te,envMapMaxLod:te?Ne.length-1:null,envMapSize:te?Ne[0].width:null,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:I,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:I&&i.normalMapType===1,normalMapTangentSpace:I&&i.normalMapType===0,packedNormalMap:I&&i.normalMapType===0&&tm(i.normalMap.format),metalnessMap:se,roughnessMap:ce,anisotropy:le,anisotropyMap:_e,clearcoat:ue,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,diffuseRoughness:de,diffuseRoughnessMap:xe,dispersion:fe,retroreflection:pe,iridescence:me,iridescenceMap:L,iridescenceThicknessMap:Se,sheen:he,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:R,specularColorMap:Te,specularIntensityMap:z,transmission:ge,transmissionMap:B,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:N&&p(i.map.channel),aoMapUv:ne&&p(i.aoMap.channel),lightMapUv:re&&p(i.lightMap.channel),bumpMapUv:ie&&p(i.bumpMap.channel),normalMapUv:I&&p(i.normalMap.channel),displacementMapUv:ae&&p(i.displacementMap.channel),emissiveMapUv:oe&&p(i.emissiveMap.channel),metalnessMapUv:se&&p(i.metalnessMap.channel),roughnessMapUv:ce&&p(i.roughnessMap.channel),anisotropyMapUv:_e&&p(i.anisotropyMap.channel),clearcoatMapUv:ve&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:xe&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:L&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(i.sheenRoughnessMap.channel),specularMapUv:R&&p(i.specularMap.channel),specularColorMapUv:Te&&p(i.specularColorMap.channel),specularIntensityMapUv:z&&p(i.specularIntensityMap.channel),transmissionMapUv:B&&p(i.transmissionMap.channel),thicknessMapUv:Ee&&p(i.thicknessMap.channel),alphaMapUv:Oe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(I||le),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(N||Oe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&I===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&Li.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Li.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=kd[t];n=Wl.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Zp(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function rm(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function im(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function am(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function om(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||im),r.length>1&&r.sort(t||am),i.length>1&&i.sort(t||am)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function sm(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new om,e.set(t,[i])):n>=r.length?(i=new om,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function cm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new q};break;case`SpotLight`:n={position:new W,direction:new W,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function lm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var um=0;function dm(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function fm(e){let t=new cm,n=lm(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new K,o=new K;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(dm);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=um++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function pm(e){let t=new fm(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function mm(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new pm(e),t.set(n,[a])):r>=i.length?(a=new pm(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var hm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_m=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],vm=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],ym=new K,bm=new W,xm=new W;function Sm(e,t,n){let r=new Ls,i=new U,a=new U,o=new Ji,s=new Zl,c=new Ql,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ql({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:hm,fragmentShader:gm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Po;m.setAttribute(`position`,new bo(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(V(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){V(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){V(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Xi(i.x,i.y,{format:Wn,type:jn,minFilter:xn,magFilter:xn,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new lc(i.x,i.y,An),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Bn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=vn,d.map.depthTexture.magFilter=vn}else l.isPointLight?(d.map=new Rd(i.x),d.map.depthTexture=new uc(i.x,kn)):(d.map=new Xi(i.x,i.y),d.map.depthTexture=new lc(i.x,i.y,kn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Bn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=xn,d.map.depthTexture.magFilter=xn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=vn,d.map.depthTexture.magFilter=vn);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),bm.setFromMatrixPosition(l.matrixWorld),e.position.copy(bm),xm.copy(e.position),xm.add(_m[t]),e.up.copy(vm[t]),e.lookAt(xm),e.updateMatrixWorld(),n.makeTranslation(-bm.x,-bm.y,-bm.z),ym.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(ym,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xi(i.x,i.y,{format:Wn,type:jn}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Cm(e,t){function n(){let t=!1,n=new Ji,r=null,i=new Ji(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ei[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(P)[1]),M=N>=1);let F=null,te={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new Ji().fromArray(ne),I=new Ji().fromArray(re);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),se(e.CULL_FACE),me(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(se(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:H(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:H(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:H(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:H(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(se(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?se(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+ee-1),F!==t&&(e.activeTexture(t),F=t)}function L(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+ee-1:F);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function Se(){let t=te[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function R(){try{e.texSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function je(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Me(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function Ne(t){I.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),I.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Fe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,te={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ie.set(0,0,e.canvas.width,e.canvas.height),I.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:L,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:Oe,texImage3D:ke,pixelStorei:je,getParameter:Ae,updateUBOMapping:Pe,uniformBlockBinding:Fe,texStorage2D:Ee,texStorage3D:De,texSubImage2D:R,texSubImage3D:Te,compressedTexSubImage2D:z,compressedTexSubImage3D:B,scissor:Me,viewport:Ne,reset:Ie}}function wm(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):qr(`canvas`)}function v(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),V(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&V(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];V(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||V(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Br:Li.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,V(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),ee(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),N(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function ee(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function N(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let P=0;function F(){P=0}function te(){return P}function ne(e){P=e}function re(){let e=P;return e>=i.maxTextures&&V(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),P+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function I(t,i){let a=r.get(t);if(t.isVideoTexture&&z(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)V(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)V(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function oe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[hn]:e.REPEAT,[gn]:e.CLAMP_TO_EDGE,[_n]:e.MIRRORED_REPEAT},le={[vn]:e.NEAREST,[yn]:e.NEAREST_MIPMAP_NEAREST,[bn]:e.NEAREST_MIPMAP_LINEAR,[xn]:e.LINEAR,[Sn]:e.LINEAR_MIPMAP_NEAREST,[Cn]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&V(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ie(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function me(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=pe(n.start,r.width,4),c=pe(t.start,r.width,4);n.start<=i+1&&a===c&&pe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=fe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Li.getPrimaries(Li.workingColorSpace),r=o.colorSpace===``?null:Li.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=B(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);de(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===Vn,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&me(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=wd(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=wd(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=Ee(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,o,s){if(o.image.length!==6)return;let c=fe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Li.getPrimaries(Li.workingColorSpace),r=o.colorSpace===``?null:Li.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=B(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);de(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===Vn,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,R(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?se(i.depthTexture,0):I(i.depthTexture,0);let u=c.__webglTexture,d=R(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function be(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ye(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?ye(i.__webglFramebuffer[0],t,0):ye(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ve(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&be(t)}function L(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Te(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=R(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),de(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),de(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),de(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&be(t)}function Se(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Ce=[];function we(t){if(t.samples>0){if(Te(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ce.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function R(e){return Math.min(i.maxSamples,e.samples)}function Te(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function z(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function B(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Li.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&V(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):H(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=re,this.resetTextureUnits=F,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=I,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=xe,this.setupRenderTarget=L,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Te,this.dispose=j}function Tm(e,t){function n(n,r=``){let i,a=Li.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Om=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new dc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ql({vertexShader:Em,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Pl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},km=class extends ti{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Om,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new U,C=null,w=null,T=new Yu;T.viewport=new Ji;let E=new Yu;E.viewport=new Ji;let D=[T,E],O=new ld,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Oa,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Oa,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Oa,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Vn:Bn,a=_.stencil?Pn:kn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Xi(d.textureWidth,d.textureHeight,{format:zn,type:wn,depthTexture:new lc(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xi(f.framebufferWidth,f.framebufferHeight,{format:zn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ne.setContext(r),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function N(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;N(O,i);for(let e=0;e<a.length;e++)N(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),P(e,O,i)};function P(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ai*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let F=null;function te(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Yu,o.layers.enable(n),o.viewport=new Ji,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new dc,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}F&&F(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ne=new Ed;ne.setAnimationLoop(te),this.setAnimationLoop=function(e){F=e},this.dispose=function(){}}},Am=new K,jm=new G;jm.set(-1,0,0,0,1,0,0,0,1);function Mm(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ul(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Am.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(jm),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Nm(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?V(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):V(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Pm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fm=null;function Im(){return Fm===null&&(Fm=new xs(Pm,16,16,Wn,jn),Fm.name=`DFG_LUT`,Fm.minFilter=xn,Fm.magFilter=xn,Fm.wrapS=gn,Fm.wrapT=gn,Fm.generateMipmaps=!1,Fm.needsUpdate=!0),Fm}var Lm=class{constructor(e={}){let{canvas:t=Jr(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=wn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Kn,Gn,Un]),g=new Set([wn,kn,Dn,Pn,Mn,Nn]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Rr;let j=0,ee=0,M=null,N=-1,P=null,F=new Ji,te=new Ji,ne=null,re=new q(0),ie=0,I=t.width,ae=t.height,oe=1,se=null,ce=null,le=new Ji(0,0,I,ae),ue=new Ji(0,0,I,ae),de=!1,fe=new Ls,pe=new zs,me=!1,he=!1,ge=new K,_e=new W,ve=new Ji,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function xe(){return M===null?oe:1}let L=n;function Se(e,n){return t.getContext(e,n)}let Ce,we,R,Te,z,B,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,Ge,!1),t.addEventListener(`webglcontextrestored`,Ke,!1),t.addEventListener(`webglcontextcreationerror`,qe,!1),L===null){let t=`webgl2`;if(L=Se(t,e),L===null)throw Se(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ue()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,qe,!1),H(`WebGLRenderer: `+e.message),e}function Ue(){Ce=new nf(L),Ce.init(),Be=new Tm(L,Ce),we=new Id(L,Ce,e,Be),R=new Cm(L,Ce),we.reversedDepthBuffer&&d&&R.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),Te=new of(L),z=new rm,B=new wm(L,Ce,R,z,we,Be,Te),Ee=new tf(T),De=new Dd(L),Ve=new Pd(L,De),Oe=new rf(L,De,Te,Ve),ke=new cf(L,Oe,De,Ve,Te),Le=new sf(L,we,B),Pe=new Ld(z),Ae=new nm(T,Ee,Ce,we,Ve,Pe),je=new Mm(T,z),Me=new sm,Ne=new mm(Ce),Ie=new Nd(T,Ee,R,ke,p,s),Fe=new Sm(T,ke,we),He=new Nm(L,Te,we,R),Re=new Fd(L,Ce,Te),ze=new af(L,Ce,Te),Te.programs=Ae.programs,T.capabilities=we,T.extensions=Ce,T.properties=z,T.renderLists=Me,T.shadowMap=Fe,T.state=R,T.info=Te}m!==1009&&(w=new uf(m,t.width,t.height,o,r,i));let We=new km(T,L);this.xr=We,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(e){e!==void 0&&(oe=e,this.setSize(I,ae,!1))},this.getSize=function(e){return e.set(I,ae)},this.setSize=function(e,n,r=!0){We.isPresenting?V(`WebGLRenderer: Can't change size while VR device is presenting.`):(I=e,ae=n,t.width=Math.floor(e*oe),t.height=Math.floor(n*oe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(I*oe,ae*oe).floor()},this.setDrawingBufferSize=function(e,n,r){I=e,ae=n,oe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)H(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){V(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(F)},this.getViewport=function(e){return e.copy(le)},this.setViewport=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),R.viewport(F.copy(le).multiplyScalar(xe()).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),R.scissor(te.copy(ue).multiplyScalar(xe()).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){R.setScissorTest(de=e)},this.setOpaqueSort=function(e){se=e},this.setTransparentSort=function(e){ce=e},this.getClearColor=function(e){return e.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ie.getClearColor(),r=Ie.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,qe,!1),Ie.dispose(),Me.dispose(),Ne.dispose(),B.dispose(),z.dispose(),Ee.dispose(),ke.dispose(),Oe.dispose(),Ve.dispose(),He.dispose(),Ae.dispose(),We.dispose(),We.removeEventListener(`sessionstart`,et),We.removeEventListener(`sessionend`,tt),nt.stop()};function Ge(e){e.preventDefault(),Xr(`WebGLRenderer: Context Lost.`),E=!0}function Ke(){Xr(`WebGLRenderer: Context Restored.`),E=!1;let e=Te.autoReset,t=Fe.enabled,n=Fe.autoUpdate,r=Fe.needsUpdate,i=Fe.type;Ue(),Te.autoReset=e,Fe.enabled=t,Fe.autoUpdate=n,Fe.needsUpdate=r,Fe.type=i}function qe(e){H(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Je(e){let t=e.target;t.removeEventListener(`dispose`,Je),Ye(t)}function Ye(e){Xe(e),z.remove(e)}function Xe(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){Ae.releaseProgram(e)}),e.isShaderMaterial&&Ae.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ye);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=pt(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Oe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ve.setup(i,r,s,n,c);let h,g=Re;if(c!==null&&(h=De.get(c),g=ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*xe()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*xe()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Ce.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?De.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ze(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),me===!0&&Pe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,lt(e,t,r),e.side=0,e.needsUpdate=!0,lt(e,t,r),e.side=2):lt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ne.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),he=this.localClippingEnabled,me=Pe.init(this.clippingPlanes,he),me===!0&&Pe.setGlobalState(this.clippingPlanes,t),D!==null&&Fe.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Ze(o,n,t,e),r.add(o)}else Ze(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ce.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Qe=null;function $e(e){Qe&&Qe(e)}function et(){nt.stop()}function tt(){nt.start()}let nt=new Ed;nt.setAnimationLoop($e),typeof self<`u`&&nt.setContext(self),this.setAnimationLoop=function(e){Qe=e,We.setAnimationLoop(e),e===null?nt.stop():nt.start()},We.addEventListener(`sessionstart`,et),We.addEventListener(`sessionend`,tt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){H(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=We.enabled===!0&&We.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(t),t=We.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Ne.get(e,C.length),x.init(t),x.state.textureUnits=B.getTextureUnits(),C.push(x),ge.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?pe.setFromArrayCamera(t):fe.setFromProjectionMatrix(ge,Wr,t.reversedDepth),he=this.localClippingEnabled,me=Pe.init(this.clippingPlanes,he),b=Me.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,We.enabled===!0&&We.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&rt(e,t,-1/0,T.sortObjects)}rt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(se,ce),be=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,be&&Ie.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),me===!0&&Pe.beginShadows();let i=x.state.shadowsArray;if(Fe.render(i,e,t),me===!0&&Pe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];at(n,r,e,a)}be&&Ie.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];it(b,e,n,n.viewport)}}else r.length>0&&at(n,r,e,t),be&&Ie.render(e),it(b,e,t)}M!==null&&ee===0&&(B.updateMultisampleRenderTarget(M),B.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ve.resetDefaultState(),N=-1,P=null,C.pop(),C.length>0?(x=C[C.length-1],B.setTextureUnits(x.state.textureUnits),me===!0&&Pe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function rt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ve.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ge);let i=ke.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ve.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ke.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ve.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ve.copy(e.boundingSphere.center)),ve.applyMatrix4(e.matrixWorld).applyMatrix4(ge)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ve.z,s,t)}}else a.visible&&b.push(e,i,a,n,ve.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)rt(i[e],t,n,r)}function it(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),me===!0&&Pe.setGlobalState(T.clippingPlanes,n),r&&R.viewport(F.copy(r)),i.length>0&&ot(i,t,n),a.length>0&&ot(a,t,n),o.length>0&&ot(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function at(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ce.has(`EXT_color_buffer_half_float`)||Ce.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Xi(1,1,{generateMipmaps:!0,type:e?jn:wn,minFilter:Cn,samples:Math.max(4,we.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Li.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||F;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(re),ie=T.getClearAlpha(),ie<1&&T.setClearColor(16777215,.5),T.clear(),be&&Ie.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),me===!0&&Pe.setGlobalState(T.clippingPlanes,r),ot(e,n,r),B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a),Ce.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,st(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(re,ie),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ot(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&st(o,t,n,s,l,c)}}function st(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ct(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function lt(e,t,n){t.isScene!==!0&&(t=ye);let r=z.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ae.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ae.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ee.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Je),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=Ae.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ae.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Pe.uniform),ft(e,s),r.needsLights=ht(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=ct(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function ut(e,t,n,r,i){let a=z.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=lt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=yp.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t,n,r,i){t.isScene!==!0&&(t=ye),B.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Li.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ee.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),b=x.state.lights;if(me===!0&&(he===!0||e!==P)){let t=e===P&&r.id===N;Pe.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Pe.numPlanes||v.numIntersection!==Pe.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===ct(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?ut(r,t,i,s,h):lt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(R.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==N&&(N=r.id,O=!0),E||P!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(L,`projectionMatrix`,e.projectionMatrix),A.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(L,_e.setFromMatrixPosition(e.matrixWorld)),we.logarithmicDepthBuffer&&A.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),P!==e&&(P=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(L,`sunShadowMap`,b.state.sunShadowMap,B),b.state.directionalShadowMap.length>0&&A.setValue(L,`directionalShadowMap`,b.state.directionalShadowMap,B),b.state.spotShadowMap.length>0&&A.setValue(L,`spotShadowMap`,b.state.spotShadowMap,B),b.state.pointShadowMap.length>0&&A.setValue(L,`pointShadowMap`,b.state.pointShadowMap,B)),i.isSkinnedMesh){A.setOptional(L,i,`bindMatrix`),A.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(L,`boneTexture`,e.boneTexture,B))}i.isBatchedMesh&&(A.setOptional(L,i,`batchingTexture`),A.setValue(L,`batchingTexture`,i._matricesTexture,B),A.setOptional(L,i,`batchingIdTexture`),A.setValue(L,`batchingIdTexture`,i._indirectTexture,B),A.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(L,`batchingColorTexture`,i._colorsTexture,B));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0)&&Le.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Im()),O){if(A.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&mt(j,k),a&&r.fog===!0&&je.refreshFogUniforms(j,a),je.refreshMaterialUniforms(j,r,oe,ae,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}yp.upload(L,dt(v),j,B)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(yp.upload(L,dt(v),j,B),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(L,`center`,i.center),A.setValue(L,`modelViewMatrix`,i.modelViewMatrix),A.setValue(L,`normalMatrix`,i.normalMatrix),A.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];He.update(n,w),He.bind(n,w)}}return w}function mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ht(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),F.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest,R.viewport(F),R.scissor(te),R.setScissorTest(ne),N=-1;return}if(o.__webglFramebuffer===void 0)B.setupRenderTarget(e);else if(o.__hasExternalTextures)B.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);B.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&B.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,F.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest}else F.copy(le).multiplyScalar(oe).floor(),te.copy(ue).multiplyScalar(oe).floor(),ne=de;if(n!==0&&(r=O),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(F),R.scissor(te),R.setScissorTest(ne),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}N=-1};function gt(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=we.textureFormatReadable(e.format),t.__typeReadable=we.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=gt(o);if(u.__formatReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,Be.convert(c),Be.convert(l),a)}finally{let e=M===null?null:z.get(M).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=gt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,Be.convert(l),Be.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=M===null?null:z.get(M).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await $r(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;B.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Be.convert(t.format),_=Be.convert(t.type),v;t.isData3DTexture?(B.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(B.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(B.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,k),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&B.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?B.setTextureCube(e,0):e.isData3DTexture?B.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?B.setTexture2DArray(e,0):B.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,R.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Wr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Li._getDrawingBufferColorSpace(e),t.unpackColorSpace=Li._getUnpackColorSpace()}},Rm=[`cockpit`,`hood`,`chase`],zm={cockpit:`Kokpit`,hood:`Kapota`,chase:`Zezadu`},Bm=class{camera;mode=`cockpit`;chaseYaw=0;look=0;initialised=!1;target=new W;constructor(e){this.camera=e}snap(e){this.chaseYaw=e.yaw,this.look=0,this.initialised=!0}update(e,t,n,r,i){this.initialised||this.snap(e);let a=Math.hypot(e.vx,e.vy),o=Math.cos(e.yaw),s=Math.sin(e.yaw),c=-s,l=o,u=n*.012,d=(Math.random()-.5)*u,f=(Math.random()-.5)*u;if(this.mode===`chase`){let n=(a>3?e.yaw+Math.atan2(e.vy,Math.max(e.vx,.1))*.6:e.yaw)-this.chaseYaw;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;this.chaseYaw+=n*Math.min(1,t*5);let o=Math.cos(this.chaseYaw),s=Math.sin(this.chaseYaw),c=6.4+a*.02;this.camera.position.set(e.x-o*c,r+2.25-i*c+d,e.z-s*c),this.target.set(e.x+o*5,r+.9+i*5,e.z+s*5),this.camera.fov=62+Math.min(10,a*.2)}else{let n=Math.max(-.4,Math.min(.4,e.yawRate*.3));this.look+=(n-this.look)*Math.min(1,t*4);let a=e.yaw+this.look,u=this.mode===`cockpit`,p=u?-.4:.55,m=u?-.36:0,h=r+(u?1.16:1.2),g=e.accLong*.0025+i;this.camera.position.set(e.x+o*p+c*m+f,h+d,e.z+s*p+l*m),this.target.set(this.camera.position.x+Math.cos(a)*20,h-(u?.9:1.4)+g*20,this.camera.position.z+Math.sin(a)*20),this.camera.fov=u?62:68}this.camera.lookAt(this.target),this.camera.updateProjectionMatrix()}},Vm={low:{maxPixelRatio:1,antialias:!1,shadows:!1,shadowMapSize:1024,shadowExtent:28,treeCount:.45,foliage:.5,postFx:!1,anisotropy:2},medium:{maxPixelRatio:1.5,antialias:!0,shadows:!0,shadowMapSize:2048,shadowExtent:45,treeCount:.75,foliage:.75,postFx:!1,anisotropy:4},high:{maxPixelRatio:2,antialias:!0,shadows:!0,shadowMapSize:4096,shadowExtent:70,treeCount:1,foliage:1,postFx:!0,anisotropy:8}};function Hm(e){return e?`medium`:`high`}function Um(e,t){return e===`low`||e===`medium`||e===`high`?e:t}var Wm=class extends Pu{constructor(e){super(e),this.type=jn}parse(e){let t=function(e,t){switch(e){case 1:throw Error(`THREE.HDRLoader: Read Error: `+(t||``));case 2:throw Error(`THREE.HDRLoader: Write Error: `+(t||``));case 3:throw Error(`THREE.HDRLoader: Bad File Format: `+(t||``));default:case 4:throw Error(`THREE.HDRLoader: Memory Error: `+(t||``))}},n=function(e,t,n){t||=1024;let r=e.pos,i=-1,a=0,o=``,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));for(;0>(i=s.indexOf(`
`))&&a<t&&r<e.byteLength;)o+=s,a+=s.length,r+=128,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));return-1<i&&(!1!==n&&(e.pos+=a+i+1),o+s.slice(0,i))},r=function(e){let r=/^#\?(\S+)/,i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,a=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:``,comments:``,programtype:`RGBE`,format:``,gamma:1,exposure:1,width:0,height:0},l,u;for((e.pos>=e.byteLength||!(l=n(e)))&&t(1,`no header found`),(u=l.match(r))||t(3,`bad initial token`),c.valid|=1,c.programtype=u[1],c.string+=l+`
`;l=n(e),!1!==l;)if(c.string+=l+`
`,l.charAt(0)===`#`)c.comments+=l+`
`;else if((u=l.match(i))&&(c.gamma=parseFloat(u[1])),(u=l.match(a))&&(c.exposure=parseFloat(u[1])),(u=l.match(o))&&(c.valid|=2,c.format=u[1]),(u=l.match(s))&&(c.valid|=4,c.height=parseInt(u[1],10),c.width=parseInt(u[2],10)),c.valid&2&&c.valid&4)break;return c.valid&2||t(3,`missing format specifier`),c.valid&4||t(3,`missing image size specifier`),c},i=function(e,n,r){let i=n;if(i<8||i>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);i!==(e[2]<<8|e[3])&&t(3,`wrong scanline width`);let a=new Uint8Array(4*n*r);a.length||t(4,`unable to allocate buffer space`);let o=0,s=0,c=4*i,l=new Uint8Array(4),u=new Uint8Array(c),d=r;for(;d>0&&s<e.byteLength;){s+4>e.byteLength&&t(1),l[0]=e[s++],l[1]=e[s++],l[2]=e[s++],l[3]=e[s++],(l[0]!=2||l[1]!=2||(l[2]<<8|l[3])!=i)&&t(3,`bad rgbe scanline format`);let n=0,r;for(;n<c&&s<e.byteLength;){r=e[s++];let i=r>128;if(i&&(r-=128),(r===0||n+r>c)&&t(3,`bad scanline data`),i){let t=e[s++];for(let e=0;e<r;e++)u[n++]=t}else u.set(e.subarray(s,s+r),n),n+=r,s+=r}let f=i;for(let e=0;e<f;e++){let t=0;a[o]=u[e+t],t+=i,a[o+1]=u[e+t],t+=i,a[o+2]=u[e+t],t+=i,a[o+3]=u[e+t],o+=4}d--}return a},a=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=e[t+0]*i,n[r+1]=e[t+1]*i,n[r+2]=e[t+2]*i,n[r+3]=1},o=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=go.toHalfFloat(Math.min(e[t+0]*i,65504)),n[r+1]=go.toHalfFloat(Math.min(e[t+1]*i,65504)),n[r+2]=go.toHalfFloat(Math.min(e[t+2]*i,65504)),n[r+3]=go.toHalfFloat(1)},s=new Uint8Array(e);s.pos=0;let c=r(s),l=c.width,u=c.height,d=i(s.subarray(s.pos),l,u),f,p,m;switch(this.type){case An:m=d.length/4;let e=new Float32Array(m*4);for(let t=0;t<m;t++)a(d,t*4,e,t*4);f=e,p=An;break;case jn:m=d.length/4;let t=new Uint16Array(m*4);for(let e=0;e<m;e++)o(d,e*4,t,e*4);f=t,p=jn;break;default:throw Error(`THREE.HDRLoader: Unsupported type: `+this.type)}return{width:l,height:u,data:f,header:c.string,gamma:c.gamma,exposure:c.exposure,type:p,colorSpace:zr,minFilter:xn,magFilter:xn,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}};function Gm(e){let t=[],n=[],r=[];for(let i=0;i<e.points.length;i+=6){let a=e.points[i];t.push(a.x),n.push(a.z),r.push(a.y)}let i=t.length;return{heightAt(e,a){let o=0,s=0;for(let c=0;c<i;c++){let i=t[c]-e,l=n[c]-a,u=i*i+l*l+4,d=1/(u*u);o+=d,s+=d*r[c]}return s/o}}}function Km(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function qm(e){let t=new Map,n=new Map,r=e.clone();return Jm(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Jm(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Jm(e.children[r],t.children[r],n)}var Ym=class extends Ou{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new nh(e)}),this.register(function(e){return new rh(e)}),this.register(function(e){return new ih(e)}),this.register(function(e){return new ph(e)}),this.register(function(e){return new mh(e)}),this.register(function(e){return new hh(e)}),this.register(function(e){return new oh(e)}),this.register(function(e){return new sh(e)}),this.register(function(e){return new ch(e)}),this.register(function(e){return new lh(e)}),this.register(function(e){return new th(e)}),this.register(function(e){return new uh(e)}),this.register(function(e){return new ah(e)}),this.register(function(e){return new fh(e)}),this.register(function(e){return new dh(e)}),this.register(function(e){return new $m(e)}),this.register(function(e){return new gh(e,Qm.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new gh(e,Qm.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new _h(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=rd.extractUrlBase(e);a=rd.resolveURL(t,this.path)}else a=rd.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new ju(this.manager);s.setPriority(this.priority),s.setCache(this.cache),s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===vh){try{a[Qm.KHR_BINARY_GLTF]=new xh(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Qm.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new qh(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Qm.KHR_MATERIALS_UNLIT:a[t]=new eh;break;case Qm.KHR_DRACO_MESH_COMPRESSION:a[t]=new Sh(i,this.dracoLoader);break;case Qm.KHR_TEXTURE_TRANSFORM:a[t]=new Ch;break;case Qm.KHR_MESH_QUANTIZATION:a[t]=new wh;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Xm(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Zm(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Qm={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DIFFUSE_ROUGHNESS:`KHR_materials_diffuse_roughness`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},$m=class{constructor(e){this.parser=e,this.name=Qm.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new q(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],zr);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new nd(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new $u(s),o.distance=c;break;case`spot`:o=new Zu(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),zh(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},eh=class{constructor(){this.name=Qm.KHR_MATERIALS_UNLIT}getMaterialType(){return Xo}extendParams(e,t,n){let r=[];e.color=new q(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],zr),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,Rr))}return Promise.all(r)}},th=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},nh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new U(e,e)}return Promise.all(r)}},rh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.diffuseRoughness=n.diffuseRoughnessFactor===void 0?0:n.diffuseRoughnessFactor,n.diffuseRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`diffuseRoughnessMap`,n.diffuseRoughnessTexture)),Promise.all(r)}},ih=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},ah=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},oh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_SHEEN}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],zr)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,Rr)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},sh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},ch=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_VOLUME}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(i[0],i[1],i[2],zr),Promise.all(r)}},lh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_IOR}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);return n===null||(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},uh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(i[0],i[1],i[2],zr),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,Rr)),Promise.all(r)}},dh=class{constructor(e){this.parser=e,this.name=Qm.EXT_MATERIALS_BUMP}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},fh=class{constructor(e){this.parser=e,this.name=Qm.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Zm(this.parser,e,this.name)===null?null:Yl}extendMaterialParams(e,t){let n=Zm(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=Qm.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},mh=class{constructor(e){this.parser=e,this.name=Qm.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},hh=class{constructor(e){this.parser=e,this.name=Qm.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},gh=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},_h=class{constructor(e){this.name=Qm.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==Oh.TRIANGLES&&e.mode!==Oh.TRIANGLE_STRIP&&e.mode!==Oh.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new K,n=new W,a=new Ai,s=new W(1,1,1),c=new Ns(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Ts(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Po,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Ts(t.array,t.itemSize,t.normalized))}Ta.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},vh=`glTF`,yh=12,bh={JSON:1313821514,BIN:5130562},xh=class{constructor(e){this.name=Qm.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,yh),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==vh)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-yh,i=new DataView(e,yh),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===bh.JSON){let r=new Uint8Array(e,yh+a,t);this.content=n.decode(r)}else if(r===bh.BIN){let n=yh+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},Sh=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Qm.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Nh[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Nh[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=kh[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,zr,n)})})}},Ch=class{constructor(){this.name=Qm.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},wh=class{constructor(){this.name=Qm.KHR_MESH_QUANTIZATION}},Th=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},Eh=new Ai,Dh=class extends Th{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return Eh.fromArray(i).normalize().toArray(i),i}},Oh={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},kh={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ah={9728:vn,9729:xn,9984:yn,9985:Sn,9986:bn,9987:Cn},jh={33071:gn,33648:_n,10497:hn},Mh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nh={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},Ph={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},Fh={CUBICSPLINE:void 0,LINEAR:Ar,STEP:kr},Ih={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function Lh(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new X({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Rh(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function zh(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Bh(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Vh(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Hh(e){let t,n=e.extensions&&e.extensions[Qm.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Uh(n.attributes):e.indices+`:`+Uh(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Uh(e.targets[n]);return t}function Uh(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Wh(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Gh(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Kh=new K,qh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Xm,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>`u`||n&&r<17||i&&a<98?(this.textureLoader=new Fu(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new ad(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ju(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType(`arraybuffer`),(this.options.withCredentials||this.options.crossOrigin===`use-credentials`)&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Rh(i,a,r),zh(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qm.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(rd.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=Mh[r.type],t=kh[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new bo(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=Mh[r.type],o=kh[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Fo(f,u/s),t.cache.add(n,c)),p=new Ro(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new bo(f,a,d);if(r.sparse!==void 0){let t=Mh.SCALAR,n=kh[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new bo(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=Ah[n.magFilter]||1006,t.minFilter=Ah[n.minFilter]||1008,t.wrapS=jh[n.wrapS]||1e3,t.wrapT=jh[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1,l;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)l=n.getDependency(`bufferView`,a.bufferView).then(function(e){return new Promise(function(n,r){t.parse(e,n,r)})});else{if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new qi(e);t.needsUpdate=!0,n(t)}),t.load(rd.resolveURL(e,i.path),a,void 0,r)})})}let u=l.then(function(e){return c===!0&&o.revokeObjectURL(s),zh(e,a),e.userData.mimeType=a.mimeType||Gh(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Qm.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Qm.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Qm.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new ec,Wo.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Bs,Wo.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return X}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[Qm.KHR_MATERIALS_UNLIT]){let e=r[Qm.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new q(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],zr),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,Rr)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||Ih.OPAQUE;if(l===Ih.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===Ih.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Xo&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new U(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Xo&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Xo){let e=i.emissiveFactor;o.emissive=new q().setRGB(e[0],e[1],e[2],zr)}return i.emissiveTexture!==void 0&&a!==Xo&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,Rr)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),zh(n,i),t.associations.set(n,{materials:e}),i.extensions&&Rh(r,n,i),n})}createUniqueName(e){let t=Cd.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Qm.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Yh(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Hh(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Qm.KHR_DRACO_MESH_COMPRESSION]?i(o):Yh(new Po,o,t),o.mode===Oh.TRIANGLE_STRIP?e=e.then(e=>Km(e,1)):o.mode===Oh.TRIANGLE_FAN&&(e=e.then(e=>Km(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?Lh(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===Oh.TRIANGLES||u.mode===Oh.TRIANGLE_STRIP||u.mode===Oh.TRIANGLE_FAN||u.mode===void 0){let e=i.isSkinnedMesh===!0,t=l.hasAttribute(`skinIndex`)&&l.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),d=e&&t?new ys(l,f):new Y(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights()}else if(u.mode===Oh.LINES)d=new Qs(l,f);else if(u.mode===Oh.LINE_STRIP)d=new Js(l,f);else if(u.mode===Oh.LINE_LOOP)d=new $s(l,f);else if(u.mode===Oh.POINTS)d=new ac(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&Vh(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),zh(d,i),u.extensions&&Rh(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&Rh(r,c[0],i),c[0];let l=new Ea;i.extensions&&Rh(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r)console.warn(`THREE.GLTFLoader: Missing camera parameters.`);else return n.type===`perspective`?t=new Yu(ki.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new ed(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),zh(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new K;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new ws(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new Su(i,void 0,l);return zh(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Kh)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new W().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new bs:t.length>1?new Ea:t.length===1?t[0]:new Ta,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),zh(o,i),i.extensions&&Rh(n,o,i),i.matrix!==void 0){let e=new K;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new Ea;n.name&&(i.name=r.createUniqueName(n.name)),zh(i,n),n.extensions&&Rh(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(qm(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Wo||e instanceof qi)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}Ph[i.path]===Ph.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(Ph[i.path]){case Ph.weights:l=_u;break;case Ph.rotation:l=yu;break;case Ph.translation:case Ph.scale:l=xu;break;default:switch(n.itemSize){case 1:l=_u;break;default:l=xu}}let u=r.interpolation===void 0?Ar:Fh[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+Ph[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Wh(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof yu?Dh:Th)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Jh(e,t,n){let r=t.attributes,i=new Xa;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new W(t[0],t[1],t[2]),new W(a[0],a[1],a[2])),e.normalized){let t=Wh(kh[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new W,t=new W;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Wh(kh[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new Eo;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Yh(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Nh[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Li.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Li.workingColorSpace}" not supported.`),zh(e,t),Jh(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Bh(e,t.targets,n)})}var Xh=p.wheelbase*(1-p.frontWeightFraction),Zh=-p.wheelbase*p.frontWeightFraction,Qh=p.trackWidth/2,$h=Xh+.83,eg=$h-4.14,tg=.8475,ng={paint:0,glass:1,dark:2,headlight:3,taillight:4,trim:5};function rg(e){let t=e.length,n=e.map((n,r)=>{let i=e[Math.max(0,r-1)],a=e[Math.min(t-1,r+1)];return(a[1]-i[1])/(a[0]-i[0])});return r=>{if(r<=e[0][0])return e[0][1];if(r>=e[t-1][0])return e[t-1][1];let i=0;for(;r>e[i+1][0];)i++;let a=e[i+1][0]-e[i][0],o=(r-e[i][0])/a,s=o*o,c=s*o;return(2*c-3*s+1)*e[i][1]+(c-2*s+o)*a*n[i]+(-2*c+3*s)*e[i+1][1]+(c-s)*a*n[i+1]}}var ig=rg([[eg,.8],[eg+.012,.93],[eg+.05,1.04],[eg+.23,1.35],[eg+.34,1.398],[-1.2,1.43],[-.3,1.43],[.18,1.395],[.32,1.36],[.7,1.16],[1.03,.99],[1.12,.968],[1.4,.925],[1.62,.86],[$h-.08,.77],[$h,.67]]),ag=rg([[eg,.8],[eg+.05,.985],[-1.6,.985],[-.6,.955],[.4,.925],[1.03,.915],[1.4,.875],[1.62,.815],[$h-.08,.725],[$h,.63]]),og=rg([[eg,.4],[eg+.06,.31],[eg+.3,.24],[-1.3,.2],[.8,.2],[1.5,.2],[$h-.1,.22],[$h,.3]]),sg=rg([[eg,.62],[eg+.3,.635],[-1,.665],[.18,.635],[.32,.62],[1.03,.75],[$h,.745]]);function cg(e){let t=(e,t)=>Math.max(0,1-Math.min(.985,e)**+t)**(1/t),n=$h-.55,r=eg+.3,i=tg;return e>.6&&(i-=.03*Math.min(1,(e-.6)/(n-.6))**2),e<-1.2&&(i-=.02*Math.min(1,(-1.2-e)/(-1.2-r))**2),e>n&&(i*=t((e-n)/($h-n),2.7)),e<r&&(i*=t((r-e)/(r-eg),4.2)),i}var lg=p.wheelRadius+.058,ug=Qh-.17;function dg(e){let t=cg(e),n=ig(e),r=Math.min(ag(e),n-.06),i=Math.min(og(e),r-.2),a=n-r,o=-1;for(let t of[Xh,Zh]){let n=Math.abs(e-t);n<lg&&(o=p.wheelRadius+Math.sqrt(lg*lg-n*n))}let s=o>i+.03&&t>.5,c=0;for(let t of[Xh,Zh]){let n=Math.abs(e-t);n<lg+.1&&(c=Math.max(c,.014*(1-n/(lg+.1))))}let l=t/tg,u=s?o+.02:i+.075,d=Math.max(u+.1,i+.37),f=a>.12?Math.min(sg(e),t-.03):t-.11*l;return{points:[{z:0,y:i},s?{z:ug,y:i}:{z:Math.max(0,t-.17*l),y:i},s?{z:ug,y:o}:{z:Math.max(0,t-.07*l),y:i+.012},{z:Math.max(0,t-.012*l+c),y:u},{z:t+c,y:d},{z:Math.max(0,t-.034*l),y:r},{z:Math.max(0,f),y:n-(a>.12?.05:.028)},{z:Math.max(0,f)*.55,y:n-.008},{z:0,y:n}],arch:s,greenhouse:a}}var fg=4,pg=8,mg=33;function hg(e){let t=[],n=t=>e[Math.max(0,Math.min(e.length-1,t))];for(let e=0;e<pg;e++){let r=n(e-1),i=n(e),a=n(e+1),o=n(e+2);for(let e=0;e<fg;e++){let n=e/fg,s=n*n,c=s*n,l=(e,t,r,i)=>.5*(2*t+(r-e)*n+(2*e-5*t+4*r-i)*s+(3*t-e-3*r+i)*c),u=(e,t)=>e+(t-e)*n;t.push({z:Math.max(0,.6*l(r.z,i.z,a.z,o.z)+.4*u(i.z,a.z)),y:.6*l(r.y,i.y,a.y,o.y)+.4*u(i.y,a.y)})}}return t.push(e[e.length-1]),t}function gg(){let e=new Set,t=t=>e.add(Math.round(Math.max(eg,Math.min($h,t))*1e4)/1e4);for(let e=eg;e<=$h+1e-6;e+=.03)t(e);for(let e of[0,.0015,.004,.008,.014,.022,.032,.045,.06,.08,.1,.13,.16,.2,.25,.3,.36,.42,.5])t($h-e),t(eg+e);for(let e of[Xh,Zh])for(let n=0;n<=1.0001;n+=1/14){let r=lg*Math.cos(n*Math.PI/2);t(e+r),t(e-r),t(e+r+.004),t(e-r-.004)}for(let e of[.31,.32,.4,.42,1.02,1.03,-.6,-.72,eg+.36,eg+.07,eg+.23])t(e);return[...e].sort((e,t)=>e-t)}function _g(e,t,n,r,i){if(t<=2&&(e>$h-.07||e<eg+.07))return ng.paint;if(t<=1)return ng.dark;if(t===2)return r?ng.dark:ng.trim;if(i>.2){if(t===5)return e>eg+.36&&e<.41&&!(e>-.72&&e<-.6)&&n>=1?ng.glass:ng.paint;if(t>=6&&(e>.32&&e<1.02&&(t!==6||n!==0)||e>eg+.07&&e<eg+.23&&(t!==6||n!==0)))return ng.glass}return ng.paint}var vg=null;function yg(){if(vg)return vg;let e=gg(),t=[],n=[];for(let r of e){let{points:e,arch:i,greenhouse:a}=dg(r),o=hg(e);n.push({arch:i,greenhouse:a});for(let e=0;e<mg;e++)t.push(r,o[e].y,o[e].z);for(let e=31;e>=1;e--)t.push(r,o[e].y,-o[e].z)}let r=Array.from({length:6},()=>[]),i=(e,t)=>e*64+t%64;for(let t=0;t<e.length-1;t++)for(let a=0;a<64;a++){let o=i(t,a),s=i(t,a+1),c=i(t+1,a+1),l=i(t+1,a),u=(e[t]+e[t+1])/2,d=a<32?a:63-a;r[_g(u,Math.min(7,Math.floor(d/fg)),d%fg,n[t].arch||n[t+1].arch,Math.min(n[t].greenhouse,n[t+1].greenhouse))].push(o,l,s,s,l,c)}for(let n of[0,e.length-1]){let a=0;for(let e=0;e<64;e++)a+=t[(n*64+e)*3+1]/64;let o=t.length/3;t.push(e[n],a,0);for(let e=0;e<64;e++){let t=i(n,e),a=i(n,e+1);n===0?r[ng.paint].push(o,t,a):r[ng.paint].push(o,a,t)}}let a=new Po;a.setAttribute(`position`,new J(t,3));let o=[];r.forEach((e,t)=>{a.addGroup(o.length,e.length,t),o.push(...e)}),a.setIndex(o),a.computeVertexNormals();let s=[],c=t=>e.reduce((n,r,i)=>Math.abs(r-t)<Math.abs(e[n]-t)?i:n,0),l=(e,n,r)=>{let i=c(e);for(let e of[1,-1])for(let a=n*fg;a<r*fg;a++)for(let n of[a,a+1]){let r=i*64+n;s.push(t[r*3],t[r*3+1],e*(t[r*3+2]+.003))}};l(.41,3,5),l(eg+.36,3,6),l(-.66,3,5);for(let e of[1,-1])for(let n=c(1.05);n<c($h-.12);n++)for(let r of[n,n+1]){let n=r*64+24;s.push(t[n*3],t[n*3+1]+.003,e*t[n*3+2])}let u=new Po;return u.setAttribute(`position`,new J(s,3)),vg={geometry:a,seams:u},vg}function bg(e,t){let n=hg(dg(Math.max(eg,Math.min($h,e))).points);for(let e=12;e<n.length-1;e++){let r=n[e],i=n[e+1];if(t>=r.y&&t<=i.y&&i.y>r.y)return r.z+(i.z-r.z)*(t-r.y)/(i.y-r.y)}return 0}function xg(e,t,n){let r=n>0?$h-.7:eg+.7,i=n>0?$h:eg;for(let n=0;n<26;n++){let n=(r+i)/2;bg(n,e)>t?r=n:i=n}return(r+i)/2}function Sg(e,t,n){let r=[],i=[];for(let i=0;i<=t;i++)for(let a=0;a<=e;a++)r.push(...n(a/e,i/t));for(let n=0;n<t;n++)for(let t=0;t<e;t++){let r=n*(e+1)+t;i.push(r,r+1,r+e+1,r+1,r+e+2,r+e+1)}let a=new Po;return a.setAttribute(`position`,new J(r,3)),a.setIndex(i),a.computeVertexNormals(),a}var Cg=null;function wg(){if(Cg)return Cg;let e=.004,t=(t,n,r,i,a,o)=>Sg(28,8,(s,c)=>{let l=xg(a(t>0?$h-.03:eg+.03)-(1-c)*o(1),i,t),u=1-(1-s)*(1-s),d=r+(l-r)*u,f=a(d)-(1-c)*o(s),p=Math.max(i*.98,bg(d,f));return[d+t*e*u,f,n*(p+e)]}),n=(t,n,r,i)=>Sg(24,5,(a,o)=>{let s=(a*2-1)*n,c=r+(i-r)*o;return[xg(c,Math.abs(s),t)+t*e,c,s]});return Cg={headlights:[1,-1].map(e=>t(1,e,$h-.46,.36,e=>ag(e)-.012,e=>.035+.1*e**.8)),taillights:[1,-1].map(e=>t(-1,e,eg+.2,.4,()=>1,e=>.12+.07*e)),grilles:[n(1,.33,.585,.655),n(1,.56,.33,.47)],rearGlassTrim:[]},Cg}var Tg=typeof location<`u`?new URLSearchParams(location.search).get(`model`):null,Eg={url:`./models/${Tg&&/^[a-z0-9_-]+$/i.test(Tg)?Tg:`civic`}.glb`,yaw:0,zUp:!1,wheelPattern:/wheel|tyre|tire|rim|kolo/i,originOnGround:!0,length:$h-eg},Dg=null;function Og(){return Dg||(Dg=new Promise(e=>{new Ym().load(Eg.url,t=>{try{e(kg(t.scene))}catch{e(null)}},void 0,()=>e(null))}),Dg)}function kg(e){let t=new Ea;t.add(e),Eg.zUp&&(e.rotation.x=-Math.PI/2),e.rotation.y=Eg.yaw,t.updateMatrixWorld(!0);let n=new Xa().setFromObject(t),r=n.getSize(new W);r.z>r.x*1.2&&(e.rotation.y+=Math.PI/2,t.updateMatrixWorld(!0),n=new Xa().setFromObject(t));let i=n.max.x-n.min.x;if(!(i>0))return null;let a=Eg.length/i;e.scale.multiplyScalar(a),t.updateMatrixWorld(!0),n=new Xa().setFromObject(t),e.position.x+=$h-n.max.x,(!Eg.originOnGround||n.min.y<-.05)&&(e.position.y-=n.min.y),e.position.z-=(n.min.z+n.max.z)/2,t.updateMatrixWorld(!0),e.traverse(e=>{let t=e;if(t.isMesh){t.castShadow=!0;for(let e of Array.isArray(t.material)?t.material:[t.material]){let t=e;t.isMeshStandardMaterial&&(t.envMapIntensity=Math.max(t.envMapIntensity??1,1.2))}}});let o=[null,null,null,null],s=[];e.traverse(t=>{if(!Eg.wheelPattern.test(t.name))return;let n=t.parent;for(;n&&n!==e;){if(Eg.wheelPattern.test(n.name))return;n=n.parent}s.push(t)});let c=new W;for(let e of s){new Xa().setFromObject(e).getCenter(c);let t=c.x>($h+eg)/2,n=c.z>0,r=(t?0:2)+ +!!n,i=new Xa().setFromObject(e).getSize(new W);Math.abs(i.y-2*p.wheelRadius)>.2||o[r]||(o[r]=e)}return{body:t,wheels:o.every(Boolean)?o:[null,null,null,null]}}function Ag(e,t){let n=new Xi(e,t);return n.texture.wrapS=hn,n.texture.repeat.x=-1,n}var jg={centre:Ag(640,160),left:Ag(320,200),right:Ag(320,200)},Mg={centre:{width:.21,height:.0525},side:{width:.175,height:.108,x:.278,y:.985,z:.87}},Ng=-.36,Pg=.77;function Fg(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new cc(r);return i.colorSpace=Rr,i.anisotropy=8,i}function Ig(e,t){let n=Fg(128,128,n=>{let r=n.createImageData(128,128),i=7;for(let n=0;n<16384;n++){i=i*1664525+1013904223>>>0;let a=e+((i>>>16)/65535-.5)*t;r.data[n*4]=a,r.data[n*4+1]=a,r.data[n*4+2]=a+2,r.data[n*4+3]=255}n.putImageData(r,0,0)});return n.wrapS=n.wrapT=hn,n.repeat.set(6,6),n}var Lg=new W(0,1,0),Rg=new W;function zg(e,t,n){e.position.copy(t).add(n).multiplyScalar(.5),Rg.copy(n).sub(t),e.scale.set(e.scale.x,Math.max(.001,Rg.length()),e.scale.z),e.quaternion.setFromUnitVectors(Lg,Rg.normalize())}function Bg(e,t,n,r=0){return new W(e.x,e.y+r,e.z+n)}function Vg(e,t,n,r,i,a,o=6,s=12){let c=[],l=[],u=new W,d=new W,f=new W;for(let l=0;l<=s;l++){let p=l/s;u.lerpVectors(e,t,p),d.lerpVectors(n,r,p);for(let e=0;e<=o;e++){let t=e/o;f.lerpVectors(u,d,t).addScaledVector(i,Math.sin(Math.PI*t)*a),c.push(f.x,f.y,f.z)}}let p=o+1;for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=e*p+t;l.push(n,n+p,n+1,n+1,n+p,n+p+1)}let m=new Po;m.setAttribute(`position`,new J(c,3)),m.setIndex(l),m.computeVertexNormals();let h=[];for(let e=0;e<=s;e++)for(let t=0;t<=o;t++)h.push(t/o,e/s);return m.setAttribute(`uv`,new J(h,2)),m}var Hg=class{geometry;constructor(e,t,n){let r=.03,i=new Kc,a=t/2,o=e/2;i.moveTo(-a+r,-o),i.lineTo(a-r,-o),i.quadraticCurveTo(a,-o,a,-o+r),i.lineTo(a,o-r),i.quadraticCurveTo(a,o,a-r,o),i.lineTo(-a+r,o),i.quadraticCurveTo(-a,o,-a,o-r),i.lineTo(-a,-o+r),i.quadraticCurveTo(-a,-o,-a+r,-o);let s=new Al(i,{depth:n,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2});s.translate(0,0,-n/2),s.rotateX(Math.PI/2),this.geometry=s}};function Ug(e,t,n,r,i=10){let a=new Y(new hc(n,n,1,i),r);return zg(a,e,t),a}function Wg(e,t,n,r=.012){let i=new Al(e,{depth:t-2*r,bevelEnabled:!0,bevelSize:r,bevelThickness:r,bevelSegments:3,curveSegments:18});return i.translate(0,0,-(t-2*r)/2),new Y(i,n)}function Gg(e,t,n){let r=new Al(e,{depth:t,bevelEnabled:!1,curveSegments:28});return r.rotateY(-Math.PI/2),new Y(r,n)}var Kg=640,qg=176;function Jg(){let e=document.createElement(`canvas`);e.width=Kg,e.height=qg;let t=e.getContext(`2d`),n=new cc(e);n.colorSpace=Rr,n.anisotropy=8;let r=(e,n,r,i,a,o,s,c,l)=>{let u=Math.PI*.8,d=Math.PI*2.2;t.fillStyle=`#6e7278`,t.beginPath(),t.arc(e,n,r+7,0,Math.PI*2),t.fill();let f=t.createRadialGradient(e,n-r*.3,r*.1,e,n,r);f.addColorStop(0,`#fbfaf4`),f.addColorStop(1,`#dcd9cd`),t.fillStyle=f,t.beginPath(),t.arc(e,n,r,0,Math.PI*2),t.fill(),s<i&&(t.strokeStyle=`#d0161b`,t.lineWidth=r*.09,t.beginPath(),t.arc(e,n,r*.9,u+(d-u)*s/i,d),t.stroke()),t.fillStyle=`#17181a`,t.strokeStyle=`#17181a`,t.font=`bold ${Math.round(r*(c>8?.16:.22))}px Helvetica, Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`;for(let a=0;a<=c*2;a++){let o=u+(d-u)*a/(c*2),s=a%2==0;t.lineWidth=s?3:1.5,t.beginPath(),t.moveTo(e+Math.cos(o)*r*(s?.8:.87),n+Math.sin(o)*r*(s?.8:.87)),t.lineTo(e+Math.cos(o)*r*.95,n+Math.sin(o)*r*.95),t.stroke(),s&&t.fillText(String(Math.round(i/c*(a/2)/l)),e+Math.cos(o)*r*.64,n+Math.sin(o)*r*.64)}t.font=`${Math.round(r*.15)}px Helvetica, Arial, sans-serif`,t.fillStyle=`#4a4d52`,t.fillText(o,e,n+r*.42);let p=u+(d-u)*Math.max(0,Math.min(1,a/i));t.strokeStyle=`#d0161b`,t.lineWidth=Math.max(4,r*.07),t.lineCap=`round`,t.beginPath(),t.moveTo(e-Math.cos(p)*r*.16,n-Math.sin(p)*r*.16),t.lineTo(e+Math.cos(p)*r*.86,n+Math.sin(p)*r*.86),t.stroke(),t.lineCap=`butt`,t.fillStyle=`#101113`,t.beginPath(),t.arc(e,n,r*.13,0,Math.PI*2),t.fill()},i=``,a=(e,a,o,s)=>{let c=`${Math.round(e/40)}|${Math.round(a)}|${o}|${Math.round(s)}`;c!==i&&(i=c,t.clearRect(0,0,Kg,qg),t.fillStyle=`#0d0e10`,t.beginPath(),t.ellipse(Kg/2,qg,Kg/2,qg,0,Math.PI,0),t.fill(),r(150,112,56,8e3,e,`×1000`,6400,8,1e3),r(320,92,76,220,a,`km/h`,999,11,1),r(490,112,56,50,s,`palivo`,999,5,1),t.fillStyle=`#1d2a22`,t.fillRect(296,132,48,24),t.fillStyle=e>6250?`#6ab8ff`:`#b9f0c8`,t.font=`bold 20px Menlo, monospace`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(String(o),320,145),n.needsUpdate=!0)};return a(850,0,1,50),{mesh:new Y(new Pl(.42,.1155),new Xo({map:n,transparent:!0,toneMapped:!1})),draw:a}}function Yg(){let e=new Ea,t=Ig(60,20),n=new X({color:11119535,map:t,roughness:.93}),r=new X({color:8158850,map:t,roughness:.9}),i=new X({color:789774,roughness:.75}),a=new X({color:14211806,metalness:.95,roughness:.2}),o=Ig(190,14),s=new X({color:14276300,map:o,roughness:.95,emissive:4868162,side:2}),c=new Kc;c.moveTo(.9,.935),c.quadraticCurveTo(.66,.972,.47,.955),c.quadraticCurveTo(.37,.944,.352,.88),c.lineTo(.368,.73),c.quadraticCurveTo(.42,.57,.62,.5),c.lineTo(.9,.5),c.closePath(),e.add(Wg(c,Pg*2-.02,n));let l=new Y(new fc(.004,.004,.46),i);l.position.set(.352,.8,.43);let u=new Y(new fc(.004,.15,.004),i);u.position.set(.356,.725,.2),e.add(l,u);let d=(e,t,n=0)=>{let r=new Kc;return r.moveTo(-e,n),r.absellipse(0,n,e,t,Math.PI,0,!0),r.closePath(),r},f=.918,p=Gg(d(.235,.118),.26,n);p.position.set(.585,f,Ng),e.add(p);let m=d(.25,.142,-.012);m.holes.push(d(.222,.114,.002));let h=Gg(m,.03,r);h.position.set(.327,f,Ng),e.add(h);let g=Jg();g.mesh.position.set(.322,.97175,Ng),g.mesh.rotation.y=-Math.PI/2,e.add(g.mesh);let _=new X({map:Fg(128,160,e=>{e.fillStyle=`#060607`,e.fillRect(0,0,128,160),e.strokeStyle=`#2f3237`,e.lineWidth=4;for(let t=1;t<9;t++)t!==4&&t!==5&&(e.beginPath(),e.moveTo(8,t*17.5),e.lineTo(120,t*17.5),e.stroke());e.fillStyle=`#1f2125`,e.fillRect(0,70,128,20)}),roughness:.6});for(let t of[-.665,.665]){let n=new Y(new Pl(.1,.125),_);n.position.set(.351,.862,t),n.rotation.y=-Math.PI/2,e.add(n)}let v=new Y(new fc(.03,.045,.44),i);v.position.set(.37,.845,.39);let y=new Y(new fc(.2,.004,.36),r);y.position.set(.58,.969,.4),y.rotation.z=-.1,e.add(v,y);let b=Fg(320,560,e=>{e.clearRect(0,0,320,560),e.beginPath(),e.moveTo(22,6),e.lineTo(298,6),e.quadraticCurveTo(316,8,314,30),e.lineTo(280,380),e.quadraticCurveTo(260,540,160,552),e.quadraticCurveTo(60,540,40,380),e.lineTo(6,30),e.quadraticCurveTo(4,8,22,6),e.closePath();let t=e.createLinearGradient(0,0,320,560);t.addColorStop(0,`#d9dbde`),t.addColorStop(.5,`#c2c5c9`),t.addColorStop(1,`#a9acb1`),e.fillStyle=t,e.fill(),e.save(),e.clip();let n=(t,n,r,i,a,o)=>{e.fillStyle=o,e.beginPath(),e.roundRect(t,n,r,i,a),e.fill()},r=(t,n,r,i)=>{e.fillStyle=i,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()};for(let t of[30,168]){n(t,26,124,50,6,`#08090a`),e.strokeStyle=`#33363b`,e.lineWidth=3;for(let n=1;n<5;n++)e.beginPath(),e.moveTo(t+6,26+n*10),e.lineTo(t+118,26+n*10),e.stroke();n(t+44,46,36,8,3,`#b9bcc1`)}for(let t=0;t<3;t++){let n=132+t*68;r(66,n,31,`#7f8389`),r(66,n,27,`#111214`),r(66,n,15,`#1d1f22`),e.strokeStyle=`#f0f1f2`,e.lineWidth=3,e.beginPath(),e.moveTo(66,n),e.lineTo(66+Math.cos(-1.9+t*.6)*24,n+Math.sin(-1.9+t*.6)*24),e.stroke()}n(116,100,178,84,5,`#8d9197`),n(122,106,166,72,4,`#c9ccd0`),n(160,124,86,24,3,`#2b2413`),e.fillStyle=`#ffb347`,e.font=`bold 17px Menlo, monospace`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`2:51`,203,137),r(138,138,11,`#8a8e94`),r(272,138,11,`#8a8e94`),e.fillStyle=`#6a6e74`;for(let t=0;t<6;t++)e.fillRect(128+t*27,160,22,11);n(116,196,178,62,5,`#8d9197`),n(122,202,166,50,4,`#0b0b0c`);for(let e=0;e<3;e++)r(158+e*46,292,14,`#8a8e94`),r(158+e*46,292,11,`#141517`);e.strokeStyle=`#8d9197`,e.lineWidth=2,e.beginPath(),e.moveTo(34,326),e.lineTo(286,326),e.stroke(),r(82,372,22,`#8a8e94`),r(82,372,18,`#d0161b`),e.fillStyle=`#ffd9d6`,e.beginPath(),e.moveTo(82,361),e.lineTo(93,380),e.lineTo(71,380),e.fill(),r(246,372,20,`#8a8e94`),r(246,372,15,`#d5d8dc`),r(160,458,66,`#e3e6e9`),r(160,458,60,`#8d9197`),r(160,458,55,`#0b0b0c`),e.restore()}),x=.3,S=x*560/320,C=new Ea;C.position.set(.318,.99-S/2,.035),C.rotation.y=.14;let w=new Y(new fc(.2,.505,.26),r);w.position.x=.106;let T=new Y(new Pl(x,S),new X({map:b,transparent:!0,alphaTest:.5,roughness:.45,metalness:.35}));T.position.x=-.002,T.rotation.y=-Math.PI/2;let E=new Y(new Ll(1,20,14),i);E.scale.set(.035,.048,.048),E.position.set(-.012,-.166875,0);let D=new W(-.02,-.156875,0),O=new W(-.115,-.08187499999999999,0),k=new Y(new Ll(1,18,14),new X({color:1316118,roughness:.55}));k.scale.set(.03,.036,.03),k.position.copy(O);let A=document.createElement(`canvas`);A.width=172,A.height=48;let j=A.getContext(`2d`),ee=new cc(A);ee.colorSpace=Rr;let M=``,N=()=>{let e=new Date,t=`${String(e.getHours()).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}`;t!==M&&(M=t,j.fillStyle=`#2b2413`,j.fillRect(0,0,172,48),j.fillStyle=`#ffb347`,j.font=`bold 36px Menlo, monospace`,j.textAlign=`center`,j.textBaseline=`middle`,j.fillText(t,86,26),ee.needsUpdate=!0)};N();let P=new Y(new Pl(86/320*x,24/560*S),new Xo({map:ee,toneMapped:!1}));P.position.set(-.0035,S/2-136/560*S,(203/320-.5)*x),P.rotation.y=-Math.PI/2,C.add(w,T,P,E,Ug(D,O,.008,a),k),e.add(C);let F=new Ea,te=new X({color:1579291,roughness:.62});F.add(new Y(new Rl(.175,.021,16,56),te));let ne=new Y(new Rl(.1585,.0014,6,72),new Xo({color:9048599}));ne.position.z=.0125,F.add(ne);let re=new X({color:2105636,roughness:.7});for(let e of[-1,1]){let t=new Y(new fc(.1,.05,.02),re);t.position.set(e*.118,.004,.002),F.add(t)}let ie=new Y(new fc(.058,.09,.02),re);ie.position.set(0,-.122,.002),F.add(ie);let I=new Y(new fc(.036,.03,.006),i);I.position.set(.118,-.006,.014),F.add(I);let ae=new Kc;ae.moveTo(-.082,.042),ae.quadraticCurveTo(0,.07,.082,.042),ae.quadraticCurveTo(.088,-.022,.036,-.082),ae.quadraticCurveTo(0,-.098,-.036,-.082),ae.quadraticCurveTo(-.088,-.022,-.082,.042);let oe=new Y(new Al(ae,{depth:.022,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16}),te);oe.position.z=-.004,F.add(oe);let se=Fg(128,104,e=>{e.clearRect(0,0,128,104),e.strokeStyle=`#d5d8dc`,e.lineWidth=9,e.beginPath(),e.roundRect(8,8,112,88,22),e.stroke(),e.fillStyle=`#d5d8dc`,e.fillRect(34,22,16,60),e.fillRect(78,22,16,60),e.fillRect(34,44,60,15)}),ce=new Y(new Pl(.05,.0406),new X({map:se,transparent:!0,metalness:.8,roughness:.3}));ce.position.set(0,-.004,.0275),F.add(ce);let le=new X({color:1776671,roughness:.85}),ue=new X({color:11736604,roughness:.7}),de=[];for(let e of[-1,1]){let t=new Ea,n=new Y(new Ll(1,14,10),le);n.scale.set(.034,.046,.04);let r=new Y(new Ll(1,12,8),ue);r.scale.set(.024,.008,.03),r.position.set(0,.03,.02);let i=new Y(new pc(.012,.035,4,8),le);i.position.set(-e*.03,.035,.012),i.rotation.z=e*.6,t.add(n,r,i),t.position.set(e*.172,.03,.024),F.add(t),de.push(t)}let fe=new Ea;fe.position.set(.27,.8,Ng),fe.rotation.order=`YXZ`,fe.rotation.y=-Math.PI/2,fe.rotation.x=.3,fe.add(F);let pe=new Y(new hc(.045,.06,.22,14).rotateX(Math.PI/2),r);pe.position.z=-.12,fe.add(pe),e.add(fe);let me=new X({color:1845056,roughness:.9}),he=[new W(-.22,.7,-.61),new W(-.22,.7,-.10999999999999999)],ge=he.map(()=>{let t=new Y(new hc(.036,.046,1,12),me);return e.add(t),t}),_e=new X({color:9277331,map:t,roughness:.98});for(let t of[-1,1]){let i=t*.79,o=new Y(new fc(2.1,.64,.04),r);o.position.set(-.17,.61,i);let s=new Y(new fc(1,.22,.02),_e);s.position.set(-.1,.78,i-t*.022);let c=new Y(new fc(2.1,.035,.07),n);c.position.set(-.17,.94,i-t*.015);let l=new Y(new fc(.62,.05,.075),n);l.position.set(-.22,.66,i-t*.05);let u=new Y(new fc(.09,.02,.014),a);u.position.set(.2,.86,i-t*.028),e.add(o,s,c,l,u)}let ve=new X({color:1579291,roughness:.95}),ye=new Y(new fc(2.3,.04,1.6),ve);ye.position.set(-.25,.3,0);let be=new Y(new fc(.04,.68,1.6),ve);be.position.set(.9,.62,0),e.add(ye,be);let xe=e=>({glassBase:new W(.9,.93,e*.7),glassTop:new W(.17,1.392,e*.565),sideBase:new W(.83,.94,e*.775),sideTop:new W(.11,1.392,e*.615)}),L=new X({color:1842463,roughness:.8,side:2});for(let t of[-1,1]){let n=xe(t),r=new W(-.35,-.25,-t).normalize();e.add(new Y(Vg(n.glassBase,n.glassTop,n.sideBase,n.sideTop,r,.035),s)),e.add(new Y(Vg(n.glassBase,n.glassTop,Bg(n.glassBase,n.glassTop,-t*.008),Bg(n.glassTop,n.glassBase,-t*.007),r,.003,1),L)),e.add(new Y(Vg(n.sideBase,n.sideTop,Bg(n.sideBase,n.sideTop,t*.005,-.006),Bg(n.sideTop,n.sideBase,t*.005,-.006),r,.003,1),L))}let Se=e=>new W(.17,1.39,e*.57),Ce=e=>new W(0,1.435,e*.63);e.add(new Y(Vg(Se(-1),Se(1),Ce(-1),Ce(1),new W(-.3,-1,0).normalize(),.03),s));for(let t of[-1,1])e.add(new Y(Vg(new W(.11,1.392,t*.615),new W(-.9,1.4,t*.66),new W(0,1.435,t*.55),new W(-.9,1.435,t*.56),new W(0,-.4,-t).normalize(),.02),s));let we=new X({color:13618370,map:o,roughness:.97});for(let[t,n]of[[-.33,.36],[.3,.34]]){let r=new Y(new Hg(n,.15,.016).geometry,we);r.position.set(.06,1.418,t),r.rotation.z=-.3,e.add(r);let a=new Y(new hc(.006,.006,.05,6),i);a.rotation.x=Math.PI/2,a.position.set(-.01,1.43,t+(t<0?1:-1)*(n/2-.02)),e.add(a)}let R=new Y(new fc(1.1,.02,1.26),s);R.position.set(-.4,1.435,0),e.add(R);let Te=Fg(1024,512,e=>{e.clearRect(0,0,1024,512);let t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,`rgba(40,70,80,0.30)`),t.addColorStop(.16,`rgba(40,70,80,0.10)`),t.addColorStop(.3,`rgba(60,90,95,0.05)`),t.addColorStop(1,`rgba(60,90,95,0.06)`),e.fillStyle=t,e.fillRect(0,0,1024,512),e.fillStyle=`#060707`,e.fillRect(0,0,1024,12),e.fillRect(0,482,1024,30),e.fillRect(0,0,14,512),e.fillRect(1010,0,14,512);let n=(t,n,r,i,a,o,s)=>{for(let c=0;c<a;c++){let l=2.1*(1-c/a)+.3;for(let a=0;a<o;a+=s){let o=t+(r===0?a:r*(c+.5)*s),u=n+(i===0?a:i*(c+.5)*s);e.beginPath(),e.arc(o+c%2*s/2*(r===0),u+c%2*s/2*(i===0),l,0,Math.PI*2),e.fill()}}};n(0,12,0,1,4,1024,5),n(0,482,0,-1,4,1024,5),n(14,0,1,0,4,512,5),n(1010,0,-1,0,4,512,5)});Te.wrapS=Te.wrapT=gn;let z=new Xo({map:Te,transparent:!0,depthWrite:!1,side:2,toneMapped:!1});{let t=new W(.905,.925,-.715),n=new W(.905,.925,.715),r=new W(.165,1.398,-.575),i=new W(.165,1.398,.575),a=new Po,o=[],s=[],c=[];for(let e=0;e<=1;e++)for(let a=0;a<=8;a++){let c=a/8,l=(e===0?t:r).clone().lerp(e===0?n:i,c);l.x+=Math.sin(Math.PI*c)*.05,o.push(l.x,l.y,l.z),s.push(c,e)}for(let e=0;e<8;e++)c.push(e,e+1,9+e,e+1,10+e,9+e);a.setAttribute(`position`,new J(o,3)),a.setAttribute(`uv`,new J(s,2)),a.setIndex(c);let l=new Y(a,z);l.renderOrder=2,e.add(l)}let B=new Xo({color:2902610,transparent:!0,opacity:.1,depthWrite:!1,side:2});for(let t of[-1,1]){let n=new Kc;n.moveTo(.83,.95),n.lineTo(.11,1.39),n.lineTo(-.95,1.395),n.lineTo(-.95,.95),n.closePath();let r=new Y(new Fl(n),B);r.position.z=t*.8,r.renderOrder=2,e.add(r)}let Ee=new Ea;Ee.position.set(.25,1.295,.02),Ee.rotation.y=-.22;let De=new Y(new fc(.025,.066,.23),i),Oe=new Y(new Pl(Mg.centre.width,Mg.centre.height),new Xo({map:jg.centre.texture}));Oe.position.x=-.0135,Oe.rotation.y=-Math.PI/2,Ee.add(De,Oe),e.add(Ee,Ug(new W(.25,1.31,.02),new W(.21,1.365,.02),.008,i,6));for(let t of[-1,1]){let n=Mg.side,r=new Y(new Pl(n.width,n.height),new Xo({map:(t<0?jg.left:jg.right).texture}));r.position.set(n.x,n.y,t*n.z),r.rotation.y=-Math.PI/2+(t<0?.3:-.5);let a=new Y(new Pl(n.width+.016,n.height+.016),i);a.position.set(n.x+.002,n.y,t*n.z),a.rotation.y=r.rotation.y,e.add(a,r)}let ke=new W;return{group:e,update(t){F.rotation.z=Math.max(-2,Math.min(2,-t.steerAngle*13)),g.draw(t.rpm,Math.hypot(t.vx,t.vy)*3.6,t.gear,t.fuel),N(),e.updateWorldMatrix(!0,!1),fe.updateWorldMatrix(!1,!0),de.forEach((t,n)=>{t.getWorldPosition(ke),e.worldToLocal(ke),zg(ge[n],he[n],ke)})}}}var Xg=tg*2;function Zg(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new cc(r);return i.colorSpace=Rr,i.anisotropy=8,i}var Qg=null;function $g(e){let t=p.wheelRadius;if(!Qg){let e=[[.194,-.082],[.215,-.098],[.248,-.103],[.272,-.096],[t-.004,-.078],[t,-.05],[t,.05],[t-.004,.078],[.272,.096],[.248,.103],[.215,.098],[.194,.082]],n=[[.196,-.09],[.19,-.082],[.176,-.07],[.172,.02],[.18,.07],[.192,.082],[.198,.092],[.186,.094]],r=(e,t)=>new Nl(e.map(([e,t])=>new U(e,t)),t).rotateX(Math.PI/2);Qg={tyre:r(e,40),rim:r(n,36),disc:new hc(.135,.135,.022,28).rotateX(Math.PI/2)}}let n=new Ea,r=new Ea;n.add(r);let i=new X({color:789517,roughness:.92,side:2}),a=new X({color:13619926,metalness:.95,roughness:.28,side:2}),o=new Y(Qg.tyre,i);o.castShadow=!0,r.add(o,new Y(Qg.rim,a));let s=new fc(.15,.024,.018);for(let e=0;e<5;e++){let t=e/5*Math.PI*2;for(let e of[-.11,.11]){let n=new Y(s,a);n.position.set(Math.cos(t+e*.35)*.11,Math.sin(t+e*.35)*.11,.062),n.rotation.z=t+e,r.add(n)}}let c=new Y(new hc(.052,.058,.03,20).rotateX(Math.PI/2),a);c.position.z=.062,r.add(c);let l=new X({color:2895409,metalness:.8,roughness:.4});for(let e=0;e<4;e++){let t=e/4*Math.PI*2+.4,n=new Y(new hc(.008,.008,.012,6).rotateX(Math.PI/2),l);n.position.set(Math.cos(t)*.034,Math.sin(t)*.034,.08),r.add(n)}let u=new Y(Qg.disc,new X({color:7830400,metalness:.9,roughness:.45}));u.position.z=.02,r.add(u);let d=new Y(new fc(e?.11:.08,.06,.05),new X({color:e?12720666:3816512,roughness:.5,metalness:.3}));return d.position.set(0,.125,.02),n.add(d),n.userData.spinning=r,n}var e_=null;function t_(e={}){let t=e.ghost??!1,n=new Ea,r=new Ea;n.add(r);let i=new Ea,a=new Ea,o=new Ea;r.add(i),i.add(a,o),o.visible=!1;let s=yg(),c=[],l=[],u=[],d=null,f=null,m=null,h=[],g=new Ea;if(a.add(g),t){let e=new Xo({color:5231359,transparent:!0,opacity:.28,depthWrite:!1});i.add(new Y(s.geometry,Array.from({length:6},()=>e)))}else{let t=new Yl({color:e.color??11734808,metalness:.45,roughness:.38,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.25}),n=new Yl({color:1054492,metalness:0,roughness:.04,transparent:!0,opacity:.42,envMapIntensity:2.2,depthWrite:!1}),i=new X({color:723724,roughness:.95}),f=new X({color:1513498,roughness:.75}),h=new Yl({color:10133672,metalness:.9,roughness:.1,clearcoat:1,emissive:16774096,emissiveIntensity:.06,envMapIntensity:2.4}),_=new Yl({color:4850949,roughness:.15,clearcoat:1,emissive:16716808,emissiveIntensity:.45,envMapIntensity:1.8});d=_;let v=new Y(s.geometry,[t,n,i,h,_,f]);v.castShadow=!0,a.add(v),a.add(new Qs(s.seams,new Bs({color:657930})));let y=wg();h.side=2,_.side=2;let b=new X({color:657931,roughness:.6,metalness:.3,side:2});for(let e of y.headlights)a.add(new Y(e,h));for(let e of y.taillights)a.add(new Y(e,_));for(let e of y.grilles)a.add(new Y(e,b));let x=new X({color:16777215,emissive:16774876,emissiveIntensity:1.1,roughness:.2});for(let e of[-1,1])for(let[t,n,r]of[[.075,.5,.042],[.135,.62,.034]]){let i=new Y(new Ll(r,14,10),x);i.scale.set(.5,1,1),i.position.set($h-t,.675-t*.25,e*n),a.add(i)}let S=new X({color:1184533,roughness:.95}),C=new Y(new fc(2.7,.62,Xg-.22),S);C.position.set(-.75,.6,0),g.add(C);let w=new Y(new fc(.16,.72,.46),new X({color:1908514,roughness:.8}));w.position.set(-.62,1.05,-.36),w.rotation.z=-.2,g.add(w);let T=new Y(new Ll(.135,16,12),new X({color:15921906,roughness:.3,metalness:.1}));T.position.set(-.45,1.2,-.36),g.add(T);let E=new X({color:11449274,metalness:.7,roughness:.35}),D=(e,t,n,r,i,a)=>{let o=new W(e,t,n),s=new W(r,i,a),c=new Y(new hc(.02,.02,o.distanceTo(s),8),E);c.position.copy(o).add(s).multiplyScalar(.5),c.quaternion.setFromUnitVectors(new W(0,1,0),s.clone().sub(o).normalize()),g.add(c)};for(let e of[-1,1])D(-.72,.4,e*.66,-.74,1.36,e*.57),D(-.74,1.36,e*.57,.1,1.33,e*.55),D(.1,1.33,e*.55,.62,.95,e*.66),D(-.74,1.36,e*.57,-1.75,.75,e*.5);D(-.74,1.36,-.57,-.74,1.36,.57),D(-.73,.8,-.63,-.73,1.3,.58);for(let e of[-1,1]){let n=new Y(new Ll(.09,14,10),t);n.scale.set(.75,.62,1.15),n.position.set(.6,1,e*(tg+.07));let r=new Y(new fc(.06,.03,.1),f);r.position.set(.6,.96,e*tg),a.add(n,r);let i=new Y(new fc(.15,.028,.02),f);i.position.set(-.45,.85,e*(tg-.012)),g.add(i);let o=new Y(new fc(.02,.14,.2),f);o.position.set(Zh-p.wheelRadius-.09,.25,e*Qh),g.add(o)}for(let e of[-.3,.25]){let t=new Y(new fc(.016,.012,.46),f);t.position.set(.99,1.01,e),t.rotation.y=.18,g.add(t)}let O=new Y(new hc(.004,.006,.34,6),f);O.position.set(-1.6,1.57,0),O.rotation.z=.5,g.add(O);let k=new Y(new Rl(.035,.01,8,16),new X({color:13902370,roughness:.5}));k.position.set($h+.02,.36,.42),k.rotation.y=Math.PI/2,g.add(k);let A=new Y(new hc(.036,.036,.16,14,1,!0).rotateZ(Math.PI/2),new X({color:12106946,metalness:1,roughness:.25,side:2}));A.position.set(eg+.02,.31,.44),g.add(A);let j=new Y(new fc(.2,.022,Xg-.5),t);j.position.set(eg+.3,1.4,0),j.rotation.z=.06,g.add(j);let ee=new X({map:Zg(256,256,t=>{t.fillStyle=`#ffffff`,t.beginPath(),t.arc(128,128,122,0,Math.PI*2),t.fill(),t.lineWidth=8,t.strokeStyle=`#111`,t.stroke(),t.fillStyle=`#111`,t.font=`bold 150px Helvetica, Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(e.number??`14`,128,140)}),transparent:!0,roughness:.5,polygonOffset:!0,polygonOffsetFactor:-4});for(let e of[-1,1]){let t=new Y(new Pl(.52,.52),ee);t.position.set(-.12,.66,e*(tg+.006)),t.rotation.y=e>0?0:Math.PI,t.userData.keep=!0,g.add(t)}let M=Zg(512,64,e=>{e.fillStyle=`#0c0c0d`,e.fillRect(0,0,512,64),e.fillStyle=`#ffffff`,e.font=`bold 40px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`ENDURANCE MOST`,256,34)}),N=new Y(new Pl(1.12,.13),new Xo({map:M,polygonOffset:!0,polygonOffsetFactor:-4}));N.position.set(.4,1.318,0),N.rotation.order=`YXZ`,N.rotation.y=Math.PI/2,N.rotation.x=-1.03,g.add(N);let P=Zg(256,56,e=>{e.fillStyle=`#f4f4f2`,e.fillRect(0,0,256,56),e.fillStyle=`#1b3fa0`,e.fillRect(0,0,26,56),e.fillStyle=`#111`,e.font=`bold 40px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`MOST 14`,140,30)}),F=new Y(new Pl(.5,.11),new X({map:P,roughness:.4}));F.position.set(eg-.006,.7,0),F.rotation.y=-Math.PI/2,g.add(F),e_||=Zg(128,256,e=>{let t=e.createRadialGradient(0,0,10,0,0,128);t.addColorStop(0,`rgba(0,0,0,0.75)`),t.addColorStop(.45,`rgba(0,0,0,0.5)`),t.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=t,e.translate(64,128),e.scale(.5,1),e.fillRect(-128,-128,256,256)});let te=new Y(new Pl(2.5,5.2),new Xo({map:e_,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));te.rotation.order=`YXZ`,te.rotation.y=Math.PI/2,te.rotation.x=-Math.PI/2,te.position.set(-.25,.022,0),te.renderOrder=2,r.add(te),[[Xh,-Qh],[Xh,Qh],[Zh,-Qh],[Zh,Qh]].forEach(([e,t],n)=>{let i=new Ea;i.position.set(e,p.wheelRadius,t);let a=$g(n<2);t<0&&(a.rotation.y=Math.PI),i.add(a),r.add(i),u.push(i),c.push(a),n<2&&l.push(i)}),m=Yg(),o.add(m.group)}t||Og().then(t=>{if(!t)return;for(let e of[...a.children,...g.children])e!==g&&!e.userData.keep&&(e.visible=!1);let n=t.body.clone(!0);t.wheels.forEach(e=>{e&&n.getObjectByName(e.name)?.traverse(e=>e.visible=!1)});let r=new Yl({color:e.color??11734808,metalness:.45,roughness:.36,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.25}),o=new Yl({color:658962,metalness:.1,roughness:.05,clearcoat:1,envMapIntensity:2.2}),s=new X({color:1316119,roughness:.7}),c=new Yl({color:13620440,metalness:.8,roughness:.12,clearcoat:1,emissive:16774096,emissiveIntensity:.25,envMapIntensity:2.2}),l=new X({color:14251548,emissive:16747036,emissiveIntensity:.25,roughness:.3}),u=new X({color:11187908,metalness:1,roughness:.08,envMapIntensity:2}),d=new Yl({color:5899782,roughness:.15,clearcoat:1,emissive:16716808,emissiveIntensity:.45,envMapIntensity:1.8}),p={"Material.002":r,"Material.003":o,Material:s,"Material.001":c,"Material.006":l,"Material.005":u,"Material.004":d};n.traverse(e=>{let t=e;if(!t.isMesh)return;let n=/grille/i.test(t.name)||/grille/i.test(t.parent?.name??``)?s:null;t.material=Array.isArray(t.material)?t.material.map(e=>n??p[e.name]??e):n??p[t.material.name]??t.material}),f=d,n.traverse(e=>{e.isMesh&&!/hood|fender|mirror/i.test(`${e.name} ${e.parent?.name??``}`)&&h.push(e)}),i.add(n)});let _=0,v=0,y=[0,0,0,0],b=d;return{group:n,exterior:g,interior:o,wheels:u,update(e,t,a,s,u){for(let e of h)e.visible=!o.visible;n.position.set(e.x,s,e.z),n.rotation.y=-e.yaw,r.rotation.z=Math.atan(u);let d=Math.min(1,t*8);_+=(-e.accLat*.0045-_)*d,v+=(e.accLong*.0035-v)*d,i.rotation.x=_,i.rotation.z=v;for(let n=0;n<c.length;n++){y[n]=(y[n]+e.wheelSpeed[n]*t)%(Math.PI*2);let r=c[n].userData.spinning;r.rotation.z=n%2==0?y[n]:-y[n]}for(let t of l)t.rotation.y=-e.steerAngle;b&&(b.emissiveIntensity=a?3.2:.45),f&&(f.emissiveIntensity=a?3.2:.45),m&&o.visible&&m.update(e)}}}var n_=new Fu,r_=new Map,i_=8;function a_(e){i_=e}function o_(e,t){let n=`${e}:${t}`,r=r_.get(n);if(r)return r;let i=n_.load(`./textures/${e}.webp`);return i.wrapS=i.wrapT=hn,i.colorSpace=t?Rr:``,i.anisotropy=i_,r_.set(n,i),i}function s_(e,t){return e.onBeforeCompile=e=>{e.uniforms.surfTile={value:t.tile},e.uniforms.surfGain={value:new W(...t.gain)},e.uniforms.surfMacro={value:t.macro},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float surfTile;
varying vec2 vSurfPos;`).replace(`#include <project_vertex>`,`#include <project_vertex>
        vSurfPos = (modelMatrix * vec4(transformed, 1.0)).xz;
        #ifdef USE_MAP
          vMapUv = vSurfPos / surfTile;
        #endif
        #ifdef USE_NORMALMAP
          vNormalMapUv = vSurfPos / surfTile;
        #endif
        #ifdef USE_ROUGHNESSMAP
          vRoughnessMapUv = vSurfPos / surfTile;
        #endif`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform vec3 surfGain;
        uniform float surfMacro;
        varying vec2 vSurfPos;
        float surfHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float surfNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(surfHash(i), surfHash(i + vec2(1.0, 0.0)), f.x), mix(surfHash(i + vec2(0.0, 1.0)), surfHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }`).replace(`#include <map_fragment>`,`#include <map_fragment>
        diffuseColor.rgb *= surfGain;
        float surfN = surfNoise(vSurfPos / 41.0) * 0.55 + surfNoise(vSurfPos / 13.0) * 0.3 + surfNoise(vSurfPos / 4.7) * 0.15;
        diffuseColor.rgb *= 1.0 + surfMacro * (surfN - 0.5) * 2.0;`)},e.customProgramCacheKey=()=>`world-mapped-${t.tile}-${t.gain.join(`,`)}-${t.macro}`,e}function c_(e,t,n={}){let r=o_(`${e}_color`,!0),i=o_(`${e}_normal`,!1),a=new U(n.normalScale??1,n.normalScale??1);return n.standard?s_(new X({map:r,normalMap:i,normalScale:a,roughnessMap:e===`asphalt`?o_(`asphalt_rough`,!1):null,roughness:n.roughness??.9,metalness:0,envMapIntensity:n.envMapIntensity??.35}),t):s_(new Xl({map:r,normalMap:i,normalScale:a}),t)}function l_(e,t=16777215,n=2.5){let r=(t,r)=>{let i=n_.load(`./textures/${t}.webp`);return i.wrapS=i.wrapT=hn,i.colorSpace=r?Rr:``,i.anisotropy=i_,i.repeat.set(e/n,6/n),i};return new Xl({color:t,map:r(`concrete_color`,!0),normalMap:r(`concrete_normal`,!1),side:2})}function u_(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function d_(e,t,n){let r=e.points[t];return[r.x-Math.sin(r.heading)*n,r.z+Math.cos(r.heading)*n]}function f_(e,t,n,r,i,a={}){let o=e.points.length,s=a.step??2,c=a.yA??0,l=a.yB??c,u=[],d=[],f=[],p=[],m=0;for(let h=t;;h+=s){let t=Math.min(h,n),s=(t%o+o)%o,g=d_(e,s,r(s)),_=d_(e,s,i(s)),v=e.points[s].y;u.push(g[0],v+c,g[1],_[0],v+l,_[1]);let y=t*e.step/(a.uvScale??6);if(d.push(0,y,1,y),a.color){let e=a.color(t);f.push(e[0],e[1],e[2],e[0],e[1],e[2])}if(m>0){let e=(m-1)*2;p.push(e,e+1,e+2,e+1,e+3,e+2)}if(m++,t>=n)break}let h=new Po;return h.setAttribute(`position`,new J(u,3)),h.setAttribute(`uv`,new J(d,2)),a.color&&h.setAttribute(`color`,new J(f,3)),h.setIndex(p),h.computeVertexNormals(),h}function p_(e,t){let n=[],r=0;for(;r<e&&t(r);)r++;if(r===e)return[[0,e]];let i=r;for(;i<r+e;)if(t(i%e)){let a=i;for(;a<r+e&&t(a%e);)a++;n.push([i,a-1]),i=a}else i++;return n}function m_(e){let t=document.createElement(`canvas`);t.width=256,t.height=160;let n=t.getContext(`2d`);n.fillStyle=`#f4f4f4`,n.fillRect(0,0,256,160),n.strokeStyle=`#111`,n.lineWidth=10,n.strokeRect(5,5,246,150),n.fillStyle=`#111`,n.font=`bold 110px Helvetica, Arial, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,128,86);let r=new cc(t);return r.colorSpace=Rr,r}function h_(e){return ae(e).map(e=>({start:e.brakeIndex,corner:e.apexIndex,fromSpeed:e.fromKmh/3.6}))}function g_(e){let t=e.length,n=new Po,r=[],i=[],a=[],o=.28;for(let n=0;n<=t;n++){let s=e[n%t],c=e[(n+1)%t],l=-Math.sin(s.heading)*o,u=Math.cos(s.heading)*o;r.push(s.x-l,s.y+.03,s.z-u,s.x+l,s.y+.03,s.z+u);let d=(c.speed*c.speed-s.speed*s.speed)/(2*Math.max(.2,Math.hypot(c.x-s.x,c.z-s.z))),f=d<-1.5?[.95,.12,.1]:d>.25?[.1,.85,.3]:[.98,.8,.1];if(i.push(...f,...f),n>0){let e=(n-1)*2;a.push(e,e+1,e+2,e+1,e+3,e+2)}}n.setAttribute(`position`,new J(r,3)),n.setAttribute(`color`,new J(i,3)),n.setIndex(a);let s=new Y(n,new Xo({vertexColors:!0,transparent:!0,opacity:.6,depthWrite:!1,side:2}));return s.renderOrder=2,s}function __(e,t,n,r){let i=new Ea,a=e.points.length,o=e.halfWidth,s=t=>e.points[t].left,c=t=>e.points[t].right,l=e=>t.barrierLeft[e]===1/0?24:t.barrierLeft[e],u=e=>t.barrierRight[e]===1/0?24:t.barrierRight[e],d=c_(`grass`,{tile:3.2,gain:[.78,.8,.86],macro:.24}),f=1/0,p=-1/0,m=1/0,h=-1/0;for(let t of e.points)f=Math.min(f,t.x),p=Math.max(p,t.x),m=Math.min(m,t.z),h=Math.max(h,t.z);let g=Math.ceil((p-f+1400)/14),_=Math.ceil((h-m+1400)/14),v=new Float32Array((g+1)*(_+1)*3),y=new Float32Array((g+1)*(_+1)*2),b=[];for(let e=0;e<=_;e++)for(let t=0;t<=g;t++){let n=f-700+t*14,i=m-700+e*14,a=e*(g+1)+t;v[a*3]=n;let o=Math.min(t,g-t,e,_-e)*14,s=Math.min(1,o/300);v[a*3+1]=(r.heightAt(n,i)-.4)*s+-1.5*(1-s),v[a*3+2]=i,y[a*2]=n/26,y[a*2+1]=i/26,t<g&&e<_&&b.push(a,a+g+1,a+1,a+1,a+g+1,a+g+2)}for(let t=0;t<a;t+=3){let n=e.points[t],r=Math.max(0,Math.floor((n.x-24-(f-700))/14)),i=Math.min(g,Math.ceil((n.x+24-(f-700))/14)),a=Math.max(0,Math.floor((n.z-24-(m-700))/14)),o=Math.min(_,Math.ceil((n.z+24-(m-700))/14));for(let e=a;e<=o;e++)for(let t=r;t<=i;t++){let r=e*(g+1)+t;v[r*3+1]>n.y-.45&&(v[r*3+1]=n.y-.45)}}let x=new Po;x.setAttribute(`position`,new bo(v,3)),x.setAttribute(`uv`,new bo(y,2)),x.setIndex(b),x.computeVertexNormals();let S=new Y(x,d);S.receiveShadow=!0,i.add(S);let C=new Y(new Pl(15e3,15e3),d);C.rotation.x=-Math.PI/2,C.position.y=-1.55,i.add(C);let w=d,T=e=>e>a-800||e<60,E=new Float32Array(a).fill(1/0);for(let t=0;t<a;t+=2){let n=e.points[t],r=1/0;for(let i=0;i<a;i+=4){let o=Math.abs(t-i);if(Math.min(o,a-o)<160)continue;let s=e.points[i],c=(n.x-s.x)*(n.x-s.x)+(n.z-s.z)*(n.z-s.z);c<r&&(r=c)}E[t]=Math.sqrt(r),t+1<a&&(E[t+1]=E[t])}let D=(e,t)=>Math.max(o+1.5,Math.min(t,E[e]/2-2)),O=e=>D(e,T(e)?46:t.barrierLeft[e]===1/0?s(e)+4:t.barrierLeft[e]+4),k=e=>D(e,T(e)?34:t.barrierRight[e]===1/0?c(e)+4:t.barrierRight[e]+4);for(let t of[new Y(f_(e,0,a,e=>-O(e),e=>-s(e)+.05,{yA:-.012,uvScale:26}),w),new Y(f_(e,0,a,e=>c(e)-.05,e=>k(e),{yA:-.012,uvScale:26}),w),new Y(f_(e,0,a,e=>-O(e)-5,e=>-O(e),{yA:-3,yB:-.012,uvScale:10}),w),new Y(f_(e,0,a,e=>k(e),e=>k(e)+5,{yA:-.012,yB:-3,uvScale:10}),w)])t.receiveShadow=!0,i.add(t);let A=c_(`asphalt`,{tile:3.5,gain:[3,3.3,3.55],macro:.16},{standard:!0,roughness:1,envMapIntensity:.35,normalScale:.8}),j=new Y(f_(e,0,a,e=>-s(e),e=>c(e),{yA:.01,uvScale:9}),A);j.receiveShadow=!0,i.add(j);let ee=new Xl({color:14211284});i.add(new Y(f_(e,0,a,e=>-s(e)+.1,e=>-s(e)+.3,{yA:.02}),ee)),i.add(new Y(f_(e,0,a,e=>c(e)-.3,e=>c(e)-.1,{yA:.02}),ee));let M=2*e.step,N=e=>new Xl({map:v_(e)}),P=N(1),F=N(0);for(let[n,r]of p_(a,e=>t.kerbLeft[e]===1)){let t=new Y(f_(e,n,r,e=>-s(e)-rt,e=>-s(e),{yA:.05,yB:.015,step:1,uvScale:M*4}),P);t.receiveShadow=!0,i.add(t)}for(let[n,r]of p_(a,e=>t.kerbRight[e]===1)){let t=new Y(f_(e,n,r,e=>c(e),e=>c(e)+rt,{yA:.015,yB:.05,step:1,uvScale:M*4}),F);t.receiveShadow=!0,i.add(t)}let te=c_(`gravel`,{tile:2.4,gain:[.62,.56,.46],macro:.22});for(let[n,r]of p_(a,e=>t.gravelLeft[e]===1&&t.barrierLeft[e]!==1/0))i.add(new Y(f_(e,n,r,e=>-l(e)+.5,e=>-s(e)-3,{yA:.004}),te));for(let[n,r]of p_(a,e=>t.gravelRight[e]===1&&t.barrierRight[e]!==1/0))i.add(new Y(f_(e,n,r,e=>c(e)+3,e=>u(e)-.5,{yA:.004}),te));let ne=c_(`asphalt`,{tile:4.5,gain:[5.6,5.8,6.1],macro:.14},{standard:!0,roughness:1,envMapIntensity:.25,normalScale:.6});for(let[n,r]of p_(a,e=>t.runoffLeft[e]===1))i.add(new Y(f_(e,n,r,e=>-Math.min(l(e)-.5,O(e)),e=>-s(e)-.02,{yA:.006,uvScale:9}),ne));for(let[n,r]of p_(a,e=>t.runoffRight[e]===1))i.add(new Y(f_(e,n,r,e=>c(e)+.02,e=>Math.min(u(e)-.5,k(e)),{yA:.006,uvScale:9}),ne));let re=new X({color:4173459,roughness:.8});for(let[n,r]of p_(a,e=>t.paintLeft[e]>0))i.add(new Y(f_(e,n,r,e=>-s(e)-t.paintLeft[e],e=>-s(e),{yA:.008,step:1}),re));for(let[n,r]of p_(a,e=>t.paintRight[e]>0))i.add(new Y(f_(e,n,r,e=>c(e),e=>c(e)+t.paintRight[e],{yA:.008,step:1}),re));let ie=new Xl({vertexColors:!0,side:2}),I=e=>Math.floor(e/6)%2==0?[.72,.74,.76]:[.62,.64,.66];for(let[n,r]of p_(a,e=>t.barrierLeft[e]!==1/0))i.add(new Y(f_(e,n,r,e=>-t.barrierLeft[e],e=>-t.barrierLeft[e],{yA:0,yB:1,color:I}),ie));for(let[n,r]of p_(a,n=>t.barrierRight[n]!==1/0&&pt(e,n)===null))i.add(new Y(f_(e,n,r,e=>t.barrierRight[e],e=>t.barrierRight[e],{yA:0,yB:1,color:I}),ie));let ae=a-708,oe=a+ot,se=new Y(f_(e,ae,oe,t=>pt(e,t)??15.3,()=>it,{yA:.01,step:2}),A);se.receiveShadow=!0,i.add(se),i.add(new Y(f_(e,ae+50,oe-50,()=>8.85,()=>9.05,{yA:.02}),ee));let ce=e=>Math.floor(e/3)%2==0?[.82,.82,.8]:[.2,.22,.25],le=new Xl({vertexColors:!0,side:2}),ue=a-394,de=a-175;i.add(new Y(f_(e,ue,de,()=>at,()=>at,{yA:0,yB:3.2,step:1,color:ce}),le));let fe=new Xl({color:14276303,side:2});i.add(new Y(f_(e,ue,de,()=>at,()=>at,{yA:3.2,yB:7}),fe)),i.add(new Y(f_(e,ue,de,()=>at,()=>at+12,{yA:7}),new Xl({color:9080210,side:2})));let pe=l_(1,14080220);i.add(new Y(f_(e,ae,ue,()=>at,()=>at,{yA:0,yB:1}),pe)),i.add(new Y(f_(e,de,oe,()=>at,()=>at,{yA:0,yB:1}),pe));{let t=e.points[a-386],n=at+6,r=new Y(new fc(9,15,9),new Xl({color:13619926}));r.position.set(t.x-Math.sin(t.heading)*n,t.y+7.5,t.z+Math.cos(t.heading)*n),r.rotation.y=-t.heading;let o=new Y(new fc(9.3,3.2,9.3),new Xl({color:1845818}));o.position.set(r.position.x,t.y+12.2,r.position.z),o.rotation.y=-t.heading,i.add(r,o)}let me=document.createElement(`canvas`);me.width=512,me.height=256;let he=me.getContext(`2d`),ge=u_(404);for(let e=0;e<16;e++){he.fillStyle=e%2==0?`#5d6470`:`#4d535e`,he.fillRect(0,e*16,512,16);for(let t=0;t<64;t++)ge()<.55&&(he.fillStyle=[`#c9423a`,`#e8e3d6`,`#2f5fa8`,`#e2b53c`,`#2b2e33`,`#4a9a5c`,`#d98a3a`][Math.floor(ge()*7)],he.fillRect(t*8+1,e*16+3,6,9),he.fillStyle=`#e3bfa0`,he.fillRect(t*8+2,e*16+1,4,3))}let _e=new cc(me);_e.colorSpace=Rr,_e.wrapS=_e.wrapT=hn,_e.rotation=Math.PI/2,_e.repeat.set(2,1),i.add(new Y(f_(e,a-380,a-250,()=>-40,()=>-28,{yA:9,yB:1.2,uvScale:14}),new Xl({map:_e,side:2}))),i.add(new Y(f_(e,a-380,a-250,()=>-40,()=>-40,{yA:0,yB:12}),fe)),i.add(new Y(f_(e,a-380,a-250,()=>-41,()=>-30,{yA:12.5,yB:11.5}),new Xl({color:6252402,side:2})));let ve=document.createElement(`canvas`);ve.width=96,ve.height=16;let ye=ve.getContext(`2d`);for(let e=0;e<12;e++)for(let t=0;t<2;t++)ye.fillStyle=(e+t)%2==0?`#f2f2f2`:`#151515`,ye.fillRect(e*8,t*8,8,8);let be=new cc(ve);be.colorSpace=Rr,be.magFilter=vn;let xe=e.points[0],L=new Y(new Pl(1.2,e.points[0].left+e.points[0].right),new Xo({map:be}));be.center.set(.5,.5),be.rotation=Math.PI/2,L.rotation.x=-Math.PI/2,L.rotation.z=-xe.heading,L.position.set(xe.x,xe.y+.025,xe.z),i.add(L);for(let t=0;t<10;t++){let n=a-8-t*8,r=t%2==0?-2.6:2.6,o=new Y(f_(e,n,n+1,()=>r-1.1,()=>r+1.1,{yA:.022,step:1}),ee);i.add(o)}let Se=new Xl({color:5592405}),Ce=new Pl(1.5,.95),we=new Map;for(let t of h_(n))for(let n of[200,150,100,50]){let r=((t.corner-n)%a+a)%a,o=e.points[r],l=we.get(n);l||(l=m_(String(n)),we.set(n,l));let u=new Xo({map:l,side:2});for(let t of[-1,1]){if(t>0&&pt(e,r)!==null)continue;let[n,a]=d_(e,r,t*((t<0?s(r):c(r))+2.4)),l=new Y(Ce,u);l.position.set(n,o.y+1.35,a),l.rotation.y=Math.atan2(-Math.cos(o.heading),-Math.sin(o.heading)),i.add(l);let d=new Y(new hc(.04,.04,.9,6),Se);d.position.set(n,o.y+.45,a),i.add(d)}}let R=g_(n);return i.add(R),{group:i,racingLine:R,asphaltMat:A}}function v_(e){let t=document.createElement(`canvas`);t.width=64,t.height=512;let n=t.getContext(`2d`);[`#1d3f93`,`#e9e7e1`,`#c11b14`,`#e9e7e1`].forEach((e,t)=>{n.fillStyle=e,n.fillRect(0,t*512/4,64,128)});let r=7,i=()=>(r=r*16807%2147483647,r/2147483647);for(let e=0;e<2600;e++){let e=i()*64,t=i()*512;n.fillStyle=i()<.7?`rgba(40,38,36,${(.05+i()*.15).toFixed(2)})`:`rgba(255,255,255,${(.04+i()*.08).toFixed(2)})`,n.fillRect(e,t,1+i()*3,1+i()*6)}let a=n.createLinearGradient(e*64,0,(1-e)*64,0);a.addColorStop(0,`rgba(20,20,20,0.45)`),a.addColorStop(.45,`rgba(20,20,20,0.12)`),a.addColorStop(1,`rgba(20,20,20,0)`),n.fillStyle=a,n.fillRect(0,0,64,512);for(let t=0;t<40;t++){let t=e===1?64-i()*64*.6:i()*64*.6;n.fillStyle=`rgba(15,15,15,${(.06+i()*.12).toFixed(2)})`,n.fillRect(t,i()*512,2+i()*6,30+i()*160)}n.fillStyle=`rgba(0,0,0,0.35)`;for(let e=0;e<4;e++)n.fillRect(0,e*512/4,64,2);let o=new cc(t);return o.colorSpace=Rr,o.wrapT=hn,o.anisotropy=8,o}function y_(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function b_(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new cc(r);return i.colorSpace=Rr,i.wrapS=i.wrapT=hn,i.anisotropy=8,i}function x_(e,t){let n=[],r=0;for(;r<e;)if(t(r)){let i=r;for(;i<e&&t(i);)i++;n.push([r,i-1]),r=i}else r++;return n}function S_(e){let t=new Ea,n=e.length,r=(t,r,i,a,o,s)=>{let c=[],l=[],u=[],d=0;for(let f=t;f<=r;f++){let t=e[(f%n+n)%n],r=-Math.sin(t.heading),p=Math.cos(t.heading),m=t.x+r*i,h=t.z+p*i;c.push(m-r*a,t.y+o,h-p*a,m+r*a,t.y+o,h+p*a);let g=s(f);if(l.push(0,0,0,g,0,0,0,g),d>0){let e=(d-1)*2;u.push(e,e+1,e+2,e+1,e+3,e+2)}d++}let f=new Po;f.setAttribute(`position`,new J(c,3)),f.setAttribute(`color`,new J(l,4)),f.setIndex(u);let p=new Y(f,new Xo({vertexColors:!0,transparent:!0,depthWrite:!1}));return p.renderOrder=1,p};t.add(r(0,n,0,1.7,.014,t=>.1+Math.min(.22,Math.abs(e[(t%n+n)%n].curvature)*9)));for(let i of h_(e)){let e=i.start+5,a=i.start+((i.corner-i.start)%n+n)%n+12,o=t=>.34*Math.min(1,(t-e)/15,(a-t)/20);t.add(r(e,a,-.72,.11,.016,o)),t.add(r(e,a,.72,.11,.016,o))}return t}function C_(e,t){let n=new Ea,r=e.points.length,i=(t,n)=>t[n]!==1/0&&pt(e,n)===null,a=b_(64,64,e=>{e.clearRect(0,0,64,64),e.strokeStyle=`rgba(190,196,204,0.85)`,e.lineWidth=1.5;for(let t=-64;t<128;t+=8)e.beginPath(),e.moveTo(t,0),e.lineTo(t+64,64),e.moveTo(t+64,0),e.lineTo(t,64),e.stroke()});a.repeat.set(1,1);let o=new Xo({map:a,transparent:!0,side:2,depthWrite:!1,opacity:.8}),s=new Xl({color:7370108}),c=t=>Math.abs(e.points[t].curvature)<1/400,l=(e,t)=>{let n=e.getAttribute(`uv`);for(let e=0;e<n.count;e++)n.setXY(e,n.getY(e)*6,e%2==0?0:t/1.2)},u=new hc(.045,.045,3.6,6),d=[];for(let a of[-1,1]){let s=a<0?t.barrierLeft:t.barrierRight;for(let[t,u]of x_(r,e=>c(e)&&i(s,e))){if(u-t<60)continue;let r=f_(e,t,u,e=>a*s[e],e=>a*s[e],{yA:1,yB:3.6,step:4});l(r,2.6),n.add(new Y(r,o));for(let n=t;n<=u;n+=6){let t=e.points[n];d.push([t.x-Math.sin(t.heading)*a*s[n],t.y+1.8,t.z+Math.cos(t.heading)*a*s[n]])}}}let f=new Ns(u,s,d.length),p=new K;d.forEach(([e,t,n],r)=>f.setMatrixAt(r,p.makeTranslation(e,t,n))),n.add(f);{let t=1.1,i=(ct+lt)/2,a=l_(t,15001322),c=new Xl({color:15330028,side:2}),u=e=>Math.floor(e/4)%2==0?[.78,.1,.12]:[.95,.95,.95],d=new Xl({vertexColors:!0,side:2}),f=[],m=[];for(let[s,p]of x_(r,t=>dt(e,t))){n.add(new Y(f_(e,s,p,()=>ct,()=>ct,{yA:0,yB:.8500000000000001,step:2}),a)),n.add(new Y(f_(e,s,p,()=>ct,()=>ct,{yA:.8500000000000001,yB:t,step:1,color:u}),d)),n.add(new Y(f_(e,s,p,()=>lt,()=>lt,{yA:0,yB:t,step:2}),a)),n.add(new Y(f_(e,s,p,()=>ct,()=>lt,{yA:t,step:2}),c));let r=f_(e,s,p,()=>i,()=>i,{yA:t,yB:4,step:2});l(r,2.9),n.add(new Y(r,o));for(let t=s;t<=p;t+=5){let n=e.points[t];f.push([n.x-Math.sin(n.heading)*i,n.y+5.1/2,n.z+Math.cos(n.heading)*i])}m.push(s,p)}let h=new Ns(new hc(.05,.05,2.9,6),s,f.length);f.forEach(([e,t,n],r)=>h.setMatrixAt(r,p.makeTranslation(e,t,n))),n.add(h);let g=new Xl({map:b_(64,64,e=>{e.fillStyle=`#f2c200`,e.fillRect(0,0,64,64),e.fillStyle=`#111`;for(let t=-64;t<128;t+=32)e.beginPath(),e.moveTo(t,64),e.lineTo(t+16,64),e.lineTo(t+80,0),e.lineTo(t+64,0),e.fill()})});m.forEach((t,r)=>{let a=e.points[t],o=r%2==0?-1:1,s=new Y(new fc(2.4,1.1,.9),g),c=o*1.25;s.position.set(a.x+Math.cos(a.heading)*c-Math.sin(a.heading)*i,a.y+.55,a.z+Math.sin(a.heading)*c+Math.cos(a.heading)*i),s.rotation.y=-a.heading,n.add(s)})}let m=document.createElement(`canvas`);m.width=2048,m.height=128;let h=m.getContext(`2d`),g=new cc(m);g.colorSpace=Rr,g.wrapS=g.wrapT=hn,g.anisotropy=8;let _=(e,t,n,r,i,a,o=488)=>{e.fillStyle=a,e.font=i,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,n,r,o)},v=[{bg:`#ffffff`,logo:`./ads/nikolas-tours.png`,draw:(e,t,n)=>{n?e.drawImage(n,0,0,369,36,t+16,40,480,47):(_(e,`NIKOLAS`,t+200,66,`bold 74px Helvetica, Arial, sans-serif`,`#1b2f8f`,330),_(e,`tours`,t+425,74,`italic bold 50px Helvetica, Arial, sans-serif`,`#1b2f8f`,130))}},{bg:`#ffffff`,logo:`./ads/3it.svg`,draw:(e,t,n)=>{n?e.drawImage(n,t+256-103,4,206,120):_(e,`3IT`,t+256,68,`bold 92px Helvetica, Arial, sans-serif`,`#c91834`)}},{bg:`#ffffff`,logo:`./ads/hotel-nikolas.png`,draw:(e,t,n)=>{n&&e.drawImage(n,t+26,24,184,80),_(e,`Hotel Nikolas`,t+(n?360:256),66,`italic bold 44px Georgia, serif`,`#1f3f9c`,n?260:460)}},{bg:`#ffffff`,logo:`./ads/aks-architekti.png`,draw:(e,t,n)=>{n?e.drawImage(n,255,355,430,240,t+40,6,208,116):_(e,`AKS`,t+150,66,`bold 80px Helvetica, Arial, sans-serif`,`#111111`,220),_(e,`ARCHITEKTI`,t+380,68,`bold 34px Helvetica, Arial, sans-serif`,`#111111`,230)}}],y=v.map(()=>null),b=()=>{for(let e=0;e<4;e++){let t=v[e%v.length];h.fillStyle=t.bg,h.fillRect(e*512,0,512,128),t.draw(h,e*512,y[e%v.length]),h.fillStyle=`rgba(0,0,0,0.3)`,h.fillRect((e+1)*512-3,0,3,128)}g.needsUpdate=!0};b(),v.forEach((e,t)=>{if(!e.logo)return;let n=new Image;n.onload=()=>{y[t]=n,b()},n.src=e.logo});let x=new Xl({map:g,side:2});for(let a of[-1,1]){let o=a<0?t.barrierLeft:t.barrierRight;for(let[t,s]of x_(r,e=>i(o,e))){if(s-t<90)continue;let r=t+20,i=f_(e,r,Math.min(s-20,r+160),e=>a*(o[e]-.25),e=>a*(o[e]-.25),{yA:.05,yB:1.65,step:4}),c=i.getAttribute(`uv`);for(let e=0;e<c.count;e++)c.setXY(e,-a*Math.floor(e/2)*4/25.6,e%2==0?0:1);n.add(new Y(i,x))}}let S=new Xl({map:b_(128,64,e=>{e.fillStyle=`#17181a`,e.fillRect(0,0,128,64);for(let t=0;t<4;t++)for(let n=0;n<4;n++)e.fillStyle=t===1?`#b9201f`:t===2?`#d9d9d9`:`#0c0c0d`,e.beginPath(),e.ellipse(n*32+16,t*16+8,14,6.5,0,0,Math.PI*2),e.fill(),e.fillStyle=`#050505`,e.beginPath(),e.ellipse(n*32+16,t*16+8,7,2.5,0,0,Math.PI*2),e.fill()}),side:2});for(let a of[-1,1]){let o=a<0?t.gravelLeft:t.gravelRight,s=a<0?t.barrierLeft:t.barrierRight;for(let[t,c]of x_(r,e=>o[e]===1&&i(s,e))){let r=f_(e,t,c,e=>a*(s[e]-.7),e=>a*(s[e]-.7),{yA:0,yB:1,step:2}),i=r.getAttribute(`uv`);for(let e=0;e<i.count;e++)i.setXY(e,Math.floor(e/2)*.8,e%2==0?0:1);n.add(new Y(r,S));let o=f_(e,t,c,e=>a*(s[e]-.7),e=>a*s[e],{yA:1,step:2});n.add(new Y(o,new Xl({color:1316118,side:2})))}}{let t=Math.min(r-1,2226),i=e.points[t],a=new Y(new Rl(11,.9,10,28,Math.PI),new Xl({color:13836330}));a.position.set(i.x,i.y,i.z),a.rotation.y=-i.heading+Math.PI/2,n.add(a)}{let t=e.points[Math.min(r-1,2737)],i=new Xl({color:14277855}),a=new Y(new fc(2.4,1.3,34),i);a.position.set(t.x,t.y+6.6,t.z),a.rotation.y=-t.heading,n.add(a);for(let e of[-1,1]){let r=new Y(new fc(1.2,6,1.2),i);r.position.set(t.x-Math.sin(t.heading)*e*15,t.y+3,t.z+Math.cos(t.heading)*e*15),r.rotation.y=-t.heading,n.add(r)}}let C=new Xl({color:15037995}),w=new Xl({color:2829875});for(let a=150;a<r;a+=280){let r=e.points[a].curvature>0?-1:1,o=r<0?t.barrierLeft:t.barrierRight;if(!i(o,a))continue;let s=e.points[a],c=s.x-Math.sin(s.heading)*r*(o[a]+1.8),l=s.z+Math.cos(s.heading)*r*(o[a]+1.8),u=new Y(new fc(2.4,2.3,2.4),C);u.position.set(c,s.y+1.15,l),u.rotation.y=-s.heading;let d=new Y(new fc(3,.15,3),w);d.position.set(c,s.y+2.4,l),d.rotation.y=-s.heading,n.add(u,d)}return n}function w_(e){let t=b_(2048,1024,e=>{let t=e.createLinearGradient(0,0,0,1024);t.addColorStop(0,`#2f6fc4`),t.addColorStop(.3,`#6fa6e2`),t.addColorStop(.47,`#bcd6ee`),t.addColorStop(.5,`#dfe9f1`),t.addColorStop(1,`#dfe9f1`),e.fillStyle=t,e.fillRect(0,0,2048,1024);let n=y_(77);for(let t=0;t<46;t++){let t=n()*2048,r=n(),i=150+r*330,a=.5+(1-r)*1.1,o=9+Math.floor(n()*10);for(let r=0;r<o;r++){let r=t+(n()-.5)*240*a,o=i+(n()-.5)*38*a,s=(40+n()*70)*a,c=(14+n()*20)*a;for(let t of[-2048,0,2048]){let n=e.createRadialGradient(r+t,o,0,r+t,o,s);n.addColorStop(0,`rgba(255,255,255,0.75)`),n.addColorStop(.6,`rgba(250,251,253,0.32)`),n.addColorStop(1,`rgba(250,251,253,0)`),e.fillStyle=n,e.save(),e.translate(r+t,o),e.scale(1,c/s),e.beginPath(),e.arc(0,0,s,0,Math.PI*2),e.fill(),e.restore()}}let s=e.createRadialGradient(t,i+22*a,0,t,i+22*a,150*a);s.addColorStop(0,`rgba(120,135,155,0.22)`),s.addColorStop(1,`rgba(120,135,155,0)`),e.fillStyle=s,e.save(),e.translate(t,i+22*a),e.scale(1,.16),e.beginPath(),e.arc(0,0,150*a,0,Math.PI*2),e.fill(),e.restore()}});t.wrapT=gn;let n=new Y(new Ll(e,48,24),new Xo({map:t,side:1,fog:!1,depthWrite:!1}));return n.renderOrder=-1,n}function T_(e){let t=new Ea,n=e.points.length,r=e.halfWidth,i=e.points[0],a=-Math.sin(i.heading),o=Math.cos(i.heading),s=new X({color:3817287,metalness:.6,roughness:.5}),c=r*2+5;for(let e of[-1,1]){let n=new Y(new fc(.5,7.4,.5),s);n.position.set(i.x+a*e*(c/2),i.y+3.7,i.z+o*e*(c/2)),n.rotation.y=-i.heading,t.add(n)}let l=new Y(new fc(.6,1.1,c+.5),s);l.position.set(i.x,i.y+7,i.z),l.rotation.y=-i.heading,t.add(l);let u=new Y(new Pl(c-6,.8),new Xo({map:b_(1024,64,e=>{e.fillStyle=`#c8141e`,e.fillRect(0,0,1024,64),e.fillStyle=`#ffffff`,e.font=`bold 44px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`AUTODROM MOST  ·  START / CÍL`,512,34)}),side:2}));u.position.set(i.x-Math.cos(i.heading)*.32,i.y+7,i.z-Math.sin(i.heading)*.32),u.rotation.y=Math.atan2(-Math.cos(i.heading),-Math.sin(i.heading)),t.add(u);let d=[];for(let e=0;e<5;e++){let n=new Xo({color:2755853}),r=new Y(new mc(.28,20),n),c=(e-2)*.8;r.position.set(i.x+a*c-Math.cos(i.heading)*.34,i.y+6.05,i.z+o*c-Math.sin(i.heading)*.34),r.rotation.y=u.rotation.y;let l=new Y(new fc(.1,.75,.75),s);l.position.set(i.x+a*c-Math.cos(i.heading)*.26,i.y+6.05,i.z+o*c-Math.sin(i.heading)*.26),l.rotation.y=-i.heading,t.add(l,r),d.push(n)}let f=b_(256,128,e=>{e.fillStyle=`#d4d1c8`,e.fillRect(0,0,256,128),e.fillStyle=`#23262b`,e.fillRect(22,30,212,98),e.fillStyle=`#3a3f47`;for(let t=40;t<128;t+=12)e.fillRect(22,t,212,2);e.fillStyle=`#c8141e`,e.fillRect(0,0,256,16)}),p=f_(e,n-394,n-175,()=>at-.06,()=>at-.06,{yA:0,yB:3.6,step:2}),m=p.getAttribute(`uv`);for(let e=0;e<m.count;e++)m.setXY(e,-(Math.floor(e/2)*2)/8,e%2==0?0:1);return t.add(new Y(p,new Xl({map:f,side:2}))),{group:t,setLights(e){d.forEach((t,n)=>t.color.setHex(n<e?16719904:2755853))}}}var E_=p.wheelbase*(1-p.frontWeightFraction),D_=-p.wheelbase*p.frontWeightFraction,O_=p.trackWidth/2,k_=[E_,E_,D_,D_],A_=[-O_,O_,-O_,O_],j_=1600,M_=.09,N_=160,P_=class{group=new Ea;markPos=[];markGeo=[];markHead=[0,0,0,0];lastPoint=[null,null,null,null];smokePos=new Float32Array(480);smokeAlpha=new Float32Array(N_);smokeSize=new Float32Array(N_);smokeVel=new Float32Array(480);smokeLife=new Float32Array(N_);smokeGeo=new Po;smokeHead=0;smokeTimer=0;constructor(){let e=new Xo({color:328965,transparent:!0,opacity:.5,depthWrite:!1,side:2});for(let t=0;t<4;t++){let t=new Float32Array(j_*6*3),n=new Po;n.setAttribute(`position`,new bo(t,3)),n.setDrawRange(0,0);let r=new Y(n,e);r.frustumCulled=!1,r.renderOrder=1,this.markPos.push(t),this.markGeo.push(n),this.group.add(r)}this.smokeGeo.setAttribute(`position`,new bo(this.smokePos,3)),this.smokeGeo.setAttribute(`alpha`,new bo(this.smokeAlpha,1)),this.smokeGeo.setAttribute(`size`,new bo(this.smokeSize,1));let t=new ql({transparent:!0,depthWrite:!1,uniforms:{scale:{value:600}},vertexShader:`
        attribute float alpha;
        attribute float size;
        varying float vAlpha;
        uniform float scale;
        void main() {
          vAlpha = alpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / max(0.5, -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = smoothstep(1.0, 0.2, d) * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(0.86, 0.86, 0.86, a);
        }`}),n=new ac(this.smokeGeo,t);n.frustumCulled=!1,n.renderOrder=3,this.group.add(n)}get counts(){return{marks:this.markHead.reduce((e,t)=>e+t,0),smoke:this.smokeLife.filter(e=>e>0).length}}clear(){for(let e=0;e<4;e++)this.markHead[e]=0,this.lastPoint[e]=null,this.markGeo[e].setDrawRange(0,0);this.smokeAlpha.fill(0),this.smokeLife.fill(0)}addMark(e,t,n,r,i){let a=this.lastPoint[e];if(this.lastPoint[e]=[t,n,r],!a)return;let o=Math.hypot(t-a[0],r-a[2]);if(o<.25){this.lastPoint[e]=a;return}if(o>3)return;let s=-Math.sin(i)*M_,c=Math.cos(i)*M_,l=this.markPos[e],u=this.markHead[e]%j_*18,d=[a[0]-s,a[1],a[2]-c,a[0]+s,a[1],a[2]+c,t-s,n,r-c,a[0]+s,a[1],a[2]+c,t+s,n,r+c,t-s,n,r-c];l.set(d,u),this.markHead[e]++;let f=this.markGeo[e];f.setDrawRange(0,Math.min(this.markHead[e],j_)*6);let p=f.getAttribute(`position`);p.clearUpdateRanges(),p.addUpdateRange(u,18),p.needsUpdate=!0}puff(e,t,n,r){let i=this.smokeHead++%N_;this.smokePos.set([e,t+.15,n],i*3),this.smokeVel.set([(Math.random()-.5)*1.2,.8+Math.random()*.8,(Math.random()-.5)*1.2],i*3),this.smokeLife[i]=1,this.smokeAlpha[i]=Math.min(.5,.18+r*.2),this.smokeSize[i]=.5}update(e,t,n,r,i){let a=Math.hypot(e.vx,e.vy),o=Math.cos(e.yaw),s=Math.sin(e.yaw),c=a>1?e.yaw+Math.atan2(e.vy,e.vx):e.yaw;this.smokeTimer+=r;let l=this.smokeTimer>.03;l&&(this.smokeTimer=0);for(let r=0;r<4;r++){if(!(e.slip[r]>1.25&&a>4&&i[r]&&e.load[r]>300)){this.lastPoint[r]=null;continue}let u=e.x+k_[r]*o-A_[r]*s,d=e.z+k_[r]*s+A_[r]*o,f=t+n*k_[r];this.addMark(r,u,f+.03,d,c),l&&e.slip[r]>1.7&&this.puff(u,f,d,e.slip[r]-1.7)}let u=!1;for(let e=0;e<N_;e++)this.smokeLife[e]<=0||(u=!0,this.smokeLife[e]-=r/1.4,this.smokePos[e*3]+=this.smokeVel[e*3]*r,this.smokePos[e*3+1]+=this.smokeVel[e*3+1]*r,this.smokePos[e*3+2]+=this.smokeVel[e*3+2]*r,this.smokeSize[e]+=r*1.6,this.smokeAlpha[e]*=Math.exp(-r*1.8),this.smokeLife[e]<=0&&(this.smokeAlpha[e]=0));(u||l)&&(this.smokeGeo.getAttribute(`position`).needsUpdate=!0,this.smokeGeo.getAttribute(`alpha`).needsUpdate=!0,this.smokeGeo.getAttribute(`size`).needsUpdate=!0)}},F_={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},I_=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},L_=new ed(-1,1,1,-1,0,1),R_=new class extends Po{constructor(){super(),this.setAttribute(`position`,new J([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new J([0,2,0,0,2,0],2))}},z_=class{constructor(e){this._mesh=new Y(R_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,L_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},B_=class extends I_{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ql?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Wl.clone(e.uniforms),this.material=new ql({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new z_(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},V_=class extends I_{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},H_=class extends I_{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},U_=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new U);this._width=n.width,this._height=n.height,t=new Xi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jn}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new B_(F_),this.copyPass.material.blending=0,this.timer=new ud}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}V_!==void 0&&(r instanceof V_?n=!0:r instanceof H_&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new U);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},W_={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},G_=class extends I_{constructor(){super(),this.isOutputPass=!0,this.uniforms=Wl.clone(W_.uniforms),this.material=new Jl({name:W_.name,uniforms:this.uniforms,vertexShader:W_.vertexShader,fragmentShader:W_.fragmentShader}),this._fsQuad=new z_(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Li.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},K_=class extends I_{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new q}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},q_={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new q(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},J_=class e extends I_{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new U(256,256):new U(e.x,e.y),this.clearColor=new q(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Xi(i,a,{type:jn,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Xi(i,a,{type:jn,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Xi(i,a,{type:jn,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=q_;this.highPassUniforms=Wl.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ql({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Wl.clone(F_.uniforms),this.blendMaterial=new ql({uniforms:this.copyUniforms,vertexShader:F_.vertexShader,fragmentShader:F_.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new q,this._oldClearAlpha=1,this._basic=new Xo,this._fsQuad=new z_(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new ql({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new U(.5,.5)},direction:{value:new U(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ql({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};J_.BlurDirectionX=new U(1,0),J_.BlurDirectionY=new U(0,1);var Y_={uniforms:{tDiffuse:{value:null},aspect:{value:16/9},speedBlur:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float aspect;
    uniform float speedBlur;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      float r = length(d * vec2(aspect, 1.0)) / length(vec2(aspect, 1.0) * 0.5);
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      if (speedBlur > 0.001) {
        // radiální rozmazání: střed ostrý, k okrajům roste
        float amount = speedBlur * smoothstep(0.35, 1.0, r) * 0.035;
        vec3 sum = c;
        for (int k = 1; k < 8; k++) {
          sum += texture2D(tDiffuse, vUv - d * amount * float(k)).rgb;
        }
        c = sum / 8.0;
      }
      // jemná S-křivka kontrastu a o kousek sytější barvy
      c = mix(c, c * c * (3.0 - 2.0 * c), 0.18);
      float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(luma), c, 1.07);
      // ztmavení rohů jako u objektivu
      c *= 1.0 - 0.3 * smoothstep(0.55, 1.15, r);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`},X_=class{composer;bloom;grade;constructor(e,t,n){let r=e.getDrawingBufferSize(new U),i=new Xi(r.x,r.y,{type:jn,samples:4});this.composer=new U_(e,i),this.composer.addPass(new K_(t,n)),this.bloom=new J_(new U(r.x/2,r.y/2),.16,.35,3.2),this.composer.addPass(this.bloom),this.composer.addPass(new G_),this.grade=new B_(Y_),this.composer.addPass(this.grade)}setSize(e,t,n){this.composer.setPixelRatio(n),this.composer.setSize(e,t),this.bloom.resolution.set(e*n/2,t*n/2),this.grade.uniforms.aspect.value=e/t}render(e,t){let n=ki.clamp((e-28)/30,0,1),r=this.grade.uniforms.speedBlur;r.value+=(n-r.value)*Math.min(1,t*4),this.composer.render(t)}};function Z_(e,t){let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)}function Q_(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r;i=i*i*(3-2*i),a=a*a*(3-2*a);let o=Z_(n,r),s=Z_(n+1,r),c=Z_(n,r+1),l=Z_(n+1,r+1);return o+(s-o)*i+(c-o)*a+(o-s-c+l)*i*a}function $_(e,t,n){let r=0,i=.5,a=1;for(let o=0;o<n;o++)r+=i*Q_(e*a,t*a),a*=2.03,i*=.5;return r}function ev(e,t){return((e-t)%360+540)%360-180}function tv(e,t,n){let r=ev(e,t)/n;return Math.exp(-r*r)}function nv(e,t){let n=e=>Math.tan(e*Math.PI/180)*t,r=tv(e,318,62)**.6,i=n(4.2)*r*(.62+.42*$_(e/7,1.3,5)+.12*$_(e/1.2,5.7,3)),a=n(2.8)*tv(e,98,3.2)+n(2.3)*tv(e,112,2.4)+n(1.6)*tv(e,125,4)+n(1.3)*tv(e,83,3)+n(1.1)*tv(e,140,5)+n(.9)*tv(e,70,6),o=n(.9)*(.6+.8*$_(e/14,7.1,3));return Math.max(i,a,o)}function rv(e,t,n){let r=[],i=[],a=[];for(let a=0;a<=e;a++){let o=a/e*360;for(let e=0;e<=t;e++){let a=n(o,e/t);r.push(a.x,a.y,a.z),i.push(a.color.r,a.color.g,a.color.b)}}let o=t+1;for(let n=0;n<e;n++)for(let e=0;e<t;e++){let t=n*o+e,r=(n+1)*o+e;a.push(t,r,t+1,r,r+1,t+1)}let s=new Po;return s.setAttribute(`position`,new J(r,3)),s.setAttribute(`color`,new J(i,3)),s.setIndex(a),s.computeVertexNormals(),s}function iv(e,t,n){let r=new Ea,i=e=>{let t=e*Math.PI/180;return[Math.sin(t),-Math.cos(t)]},a=6200,o=new q(9676987),s=new q(5137012),c=new Y(rv(720,6,(r,c)=>{let[l,u]=i(r),d=nv(r,a)*c**.7*(.92+.08*$_(r/2,c*4,3)),f=a+(1-c)*-900,p=s.clone().lerp(o,.1+.55*(1-c)+.25*$_(r/3,c*6+9,3));return{x:e+l*f,y:n-10+d,z:t+u*f,color:p}}),new Xo({vertexColors:!0,fog:!1}));c.name=`distant-mountains`,r.add(c);let l=new q(2372380),u=new q(7304260),d=new q(5202992),f=rv(540,16,(r,a)=>{let[o,s]=i(r),c=1700+2100*a,f=o*c,p=s*c,m=125*tv(r,42,6)*Math.exp(-(((c-3300)/600)**2))*(.75+.5*$_(f/120,p/120,4)),h=85*$_(f/900,p/900,4)*a**1.4+m,g=$_(f/260+3,p/260,3),_=g>.55||m>30?l.clone():g>.42?d.clone():u.clone();return _.multiplyScalar(.85+.3*Q_(f/70,p/70)),{x:e+f,y:n+1+h,z:t+p,color:_}});return r.add(new Y(f,new Xl({vertexColors:!0}))),r}function av(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}function ov(e){let t=new cc(e);return t.colorSpace=Rr,t.anisotropy=4,t}function sv(e,t,n,r,i){let[a,o]=av(256,256);o.strokeStyle=`#3b3128`,o.lineWidth=2;for(let t=0;t<6;t++){o.beginPath(),o.moveTo(128,128);let t=e()*Math.PI*2;o.lineTo(128+Math.cos(t)*90,128+Math.sin(t)*90),o.stroke()}let s=Array.from({length:7},()=>[e()*Math.PI*2,.7+e()*.3]),c=e=>{let t=.62;for(let[n,r]of s)t+=.06*r*Math.cos(e*3+n);return t*122};for(let a=0;a<1700;a++){let a=e()*Math.PI*2,s=Math.sqrt(e())*c(a),l=128+Math.cos(a)*s,u=128+Math.sin(a)*s,d=1-u/256*.5-s/122*-.15;o.fillStyle=`hsl(${(t+(e()-.5)*14).toFixed(1)}, ${(n+(e()-.5)*14).toFixed(1)}%, ${(r*(.7+.45*d)+(e()-.5)*8).toFixed(1)}%)`,o.save(),o.translate(l,u),o.rotate(e()*Math.PI*2),o.beginPath();let f=i*(.7+e()*.6);o.ellipse(0,0,f,f*.45,0,0,Math.PI*2),o.fill(),o.restore()}return ov(a)}function cv(e){let[t,n]=av(256,128),r=(t,r,i,a)=>{n.strokeStyle=`hsl(${(150+(e()-.5)*16).toFixed(1)}, ${(28+e()*14).toFixed(1)}%, ${(12+e()*13).toFixed(1)}%)`,n.beginPath(),n.moveTo(t,r),n.lineTo(t+Math.cos(i)*a,r+Math.sin(i)*a),n.stroke()};n.lineCap=`round`;let i=(t,i,a,o,s,c)=>{n.strokeStyle=`#3a2e22`,n.lineWidth=c,n.beginPath(),n.moveTo(t,i),n.lineTo(t+Math.cos(a)*o,i+Math.sin(a)*o),n.stroke(),n.lineWidth=1.6;for(let n=0;n<s;n++){let n=e(),s=t+Math.cos(a)*o*n,c=i+Math.sin(a)*o*n,l=e()<.5?-1:1;r(s,c,a+l*(.6+e()*.7),5+e()*7*(1.1-n*.5))}};i(0,64,0,250,260,3);for(let t=0;t<22;t++){let n=.04+t/22*.9,r=n*256,a=(1-n)*62+16;for(let t of[-1,1])i(r,64,t*(.5+e()*.45),a*(.75+e()*.4),Math.round(a*3),1.5)}return ov(t)}function lv(e){let t=[],n=[],r=[],i=[],a=[],o=new W;e.forEach((e,s)=>{for(let[a,s]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let c=e.anchored?(a+1)/2:a;o.copy(e.p).addScaledVector(e.u,e.anchored?c*2:c).addScaledVector(e.v,s),t.push(o.x,o.y,o.z);let l=e.normal(o);n.push(l.x,l.y,l.z),r.push((a+1)/2,(s+1)/2);let u=e.shade(o);i.push(u,u,u)}let c=s*4;a.push(c,c+1,c+2,c,c+2,c+3)});let s=new Po;return s.setAttribute(`position`,new J(t,3)),s.setAttribute(`normal`,new J(n,3)),s.setAttribute(`uv`,new J(r,2)),s.setAttribute(`color`,new J(i,3)),s.setIndex(a),s}function uv(e){let t=e()*2-1,n=e()*Math.PI*2,r=Math.sqrt(1-t*t);return new W(Math.cos(n)*r,t,Math.sin(n)*r)}function dv(e,t,n,r,i){let a=[],o=e=>new W((e.x-t.x)/n.x,(e.y-t.y)/n.y+.35,(e.z-t.z)/n.z).normalize(),s=e=>{let r=(e.y-(t.y-n.y))/(2*n.y),i=Math.min(1,Math.hypot((e.x-t.x)/n.x,(e.z-t.z)/n.z,(e.y-t.y)/n.y));return ki.clamp(.42+.38*r+.3*i,.35,1)};for(let c=0;c<r;c++){let r=uv(e),c=.45+.55*Math.cbrt(e()),l=new W(t.x+r.x*n.x*c,t.y+r.y*n.y*c,t.z+r.z*n.z*c),u=uv(e),d=new W().crossVectors(u,uv(e)).normalize(),f=i*(.8+e()*.4);a.push({p:l,u:u.multiplyScalar(f),v:d.multiplyScalar(f),normal:o,shade:s})}return lv(a)}function fv(e,t){let n=[],r=new W(0,1,0);for(let i=0;i<17;i++){let a=i/17,o=1.6+a*12.4,s=3.6*(1-a)**.9+.5,c=Math.max(4,Math.round((i>13?5:7)*Math.sqrt(t))),l=e()*Math.PI*2;for(let t=0;t<c;t++){let i=l+t/c*Math.PI*2+(e()-.5)*.4,u=.22+e()*.18+(1-a)*.1,d=new W(Math.cos(i)*Math.cos(u),-Math.sin(u),Math.sin(i)*Math.cos(u)),f=new W().crossVectors(d,r).normalize(),p=new W().crossVectors(f,d).normalize(),m=s*(.85+e()*.3),h=new W(0,o,0),g=m*.75+.5,_=e=>new W(e.x,Math.max(.2,(e.y-o)*.6+.45),e.z).normalize(),v=e=>{let t=Math.min(1,Math.hypot(e.x,e.z)/(s+.01));return ki.clamp(.35+.35*t+.3*a,.3,1)};n.push({p:h,u:d.clone().multiplyScalar(m/2),v:f.clone().multiplyScalar(g/2),normal:_,shade:v,anchored:!0}),n.push({p:h,u:d.clone().multiplyScalar(m/2),v:p.clone().multiplyScalar(g*.38),normal:_,shade:v,anchored:!0})}}for(let e of[0,Math.PI/2]){let t=new W(0,1,0),r=new W(Math.cos(e),0,Math.sin(e));n.push({p:new W(0,13.2,0),u:t.clone().multiplyScalar(.9),v:r.multiplyScalar(.35),normal:()=>new W(0,1,0),shade:()=>.95,anchored:!0})}return lv(n)}function pv(e){return new Xl({map:e,vertexColors:!0,alphaTest:.45,alphaToCoverage:!0,side:2})}function mv(e,t,n,r={}){let i=r.cardDensity??1,a=new Ea,o=new Xl({color:4865587}),s=new Xl({color:14276300}),c=[{share:.45,crown:fv(n,i),material:pv(cv(n)),trunk:new hc(.12,.32,14,6).translate(0,7,0),bark:o,tint:(e,t)=>t.setRGB(.85+e()*.25,.9+e()*.2,.9+e()*.2),stretch:.3},{share:.35,crown:dv(n,new W(0,7.2,0),new W(3.9,3.3,3.9),Math.round(110*i),1.35),material:pv(sv(n,98,30,21,9)),trunk:new hc(.22,.4,6.5,6).translate(0,3.25,0),bark:o,tint:(e,t)=>t.setRGB(.8+e()*.35,.85+e()*.25,.75+e()*.25),stretch:.25},{share:.2,crown:dv(n,new W(0,8.6,0),new W(2.3,3.9,2.3),Math.round(70*i),1.15),material:pv(sv(n,82,36,28,7)),trunk:new hc(.1,.2,10,6).translate(0,5,0),bark:s,tint:(e,t)=>t.setRGB(.85+e()*.25,.9+e()*.15,.8+e()*.2),stretch:.35}],l=c.map(()=>[]);for(let t of e){let e=n(),r=0;for(;r<c.length-1&&e>c[r].share;)e-=c[r].share,r++;l[r].push(t)}let u=new K,d=new Ai,f=new W(0,1,0),p=new q;c.forEach((e,r)=>{let i=l[r];if(i.length===0)return;let o=new Ns(e.crown,e.material,i.length),s=new Ns(e.trunk,e.bark,i.length);i.forEach(([r,i,a],c)=>{let l=t.heightAt(r,i)-.4;d.setFromAxisAngle(f,n()*Math.PI*2),u.compose(new W(r,l,i),d,new W(a,a*(1-e.stretch/2+n()*e.stretch),a)),o.setMatrixAt(c,u),s.setMatrixAt(c,u),e.tint(n,p),o.setColorAt(c,p)}),o.instanceMatrix.needsUpdate=!0,s.instanceMatrix.needsUpdate=!0,o.castShadow=!0,s.castShadow=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),a.add(s,o)});let[m,h]=av(64,64),g=h.createRadialGradient(32,32,2,32,32,32);g.addColorStop(0,`rgba(0,0,0,0.5)`),g.addColorStop(.6,`rgba(0,0,0,0.28)`),g.addColorStop(1,`rgba(0,0,0,0)`),h.fillStyle=g,h.fillRect(0,0,64,64);let _=new Ns(new Pl(10,10).rotateX(-Math.PI/2),new Xo({map:new cc(m),transparent:!0,depthWrite:!1}),e.length);return e.forEach(([e,n,r],i)=>{let a=e-4.2*r,o=n-2.8*r;u.makeScale(r*1.4,1,r*1.1).setPosition(a,t.heightAt(a,o)-.3,o),_.setMatrixAt(i,u)}),_.instanceMatrix.needsUpdate=!0,_.renderOrder=1,a.add(_),a}function hv(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gv(e,t,n){let r=hv(20041),i=Math.round(1500*n.treeCount),a=1/0,o=-1/0,s=1/0,c=-1/0;for(let t of e.points)a=Math.min(a,t.x),o=Math.max(o,t.x),s=Math.min(s,t.z),c=Math.max(c,t.z);let l=[],u=0;for(;l.length<i&&u++<i*40;){let t=a-420+r()*(o-a+840),n=s-420+r()*(c-s+840),i=!0;for(let r=0;r<e.points.length;r+=8){let a=e.points[r];if((a.x-t)*(a.x-t)+(a.z-n)*(a.z-n)<16900){i=!1;break}}i&&l.push([t,n,.7+r()*.9])}let d=e.points.length;for(let[t,i]of[[Me,-1],[Ne,1]])t.forEach((t,a)=>{if(t<=0)return;let o=Math.min(d-1,a*6),s=e.points[o];for(let a=0;a<3;a++){let a=Math.max(t,30)+2+r()*r()*70,o=(r()-.5)*6,c=s.x+Math.cos(s.heading)*o-Math.sin(s.heading)*i*a,u=s.z+Math.sin(s.heading)*o+Math.cos(s.heading)*i*a,f=!0;for(let t=0;t<d;t+=10){let n=e.points[t];if((n.x-c)*(n.x-c)+(n.z-u)*(n.z-u)<676){f=!1;break}}let p=r()<n.treeCount;f&&p&&l.push([c,u,.75+r()*.8])}});return mv(l,t,r,{cardDensity:n.foliage})}var _v=new W(23.1,30,15.6).normalize(),vv=new W().crossVectors(new W(0,1,0),_v).normalize(),yv=new W().crossVectors(_v,vv).normalize(),bv=160,xv=class{canvas;quality;renderer;scene=new Fa;camera=new Yu(72,1,.08,9e3);rig=new Bm(this.camera);car;ghost;racingLine;trackGroup;asphaltMat;hemi;rain=null;wet=!1;showroom=null;sun;effects=new P_;trafficCars=[];trees;startArea;postFx=null;mirrorEnabled=!1;mirrorTarget=new Xi(768,192);mirrorCam=new Yu(30,4,.5,9e3);overlayScene=new Fa;overlayCam=new ed(-1,1,1,-1,0,1);mirrorQuad;mirrorFrame;cockpitMirrorCam=new Yu(20,4,.3,2500);cockpitMirrorTurn=0;constructor(e,t,n,r,i=Vm.high){this.canvas=e,this.quality=i,this.renderer=new Lm({canvas:e,antialias:i.antialias,powerPreference:`high-performance`}),this.pixelRatio=Math.min(window.devicePixelRatio,i.maxPixelRatio),this.renderer.setPixelRatio(this.pixelRatio),a_(i.anisotropy),this.renderer.shadowMap.enabled=i.shadows,this.renderer.shadowMap.type=2,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.scene.fog=new Pa(11847384,500,11e3),this.hemi=new Lu(13624319,7174738,1.2),this.scene.add(this.hemi),this.sun=new nd(16773590,2.8),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(i.shadowMapSize,i.shadowMapSize);let a=this.sun.shadow.camera,o=i.shadowExtent;a.left=-o,a.right=o,a.top=o,a.bottom=-o,a.near=1,a.far=320,a.updateProjectionMatrix(),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target),this.scene.background=new q(9418464);let s=new Y(new mc(6500,32),new Xo({color:3947840}));s.rotation.x=-Math.PI/2,s.position.y=-2;let c=e=>{let t=new Fa;e instanceof qi?t.background=e:t.add(e),t.add(s);let n=new qd(this.renderer),r=this.scene.environment;this.scene.environment=n.fromScene(t,0,1,9e3).texture,r?.dispose(),n.dispose()};c(w_(7e3)),new Fu().load(`./sky/sky.webp`,e=>{e.mapping=303,e.colorSpace=Rr,this.scene.background=e}),new Wm().load(`./sky/sky_1k.hdr`,e=>{e.mapping=303,c(e),e.dispose()});let l=t.points[Math.floor(t.points.length/2)];this.scene.add(iv((t.points[0].x+l.x)/2,(t.points[0].z+l.z)/2,0));let u=Gm(t),d=__(t,n,r,u);this.racingLine=d.racingLine,this.trackGroup=d.group,this.asphaltMat=d.asphaltMat,this.scene.add(d.group),this.scene.add(S_(r)),this.scene.add(C_(t,n)),this.startArea=T_(t),this.scene.add(this.startArea.group),this.trees=gv(t,u,i),this.scene.add(this.trees);let f=this.mirrorTarget.texture;f.wrapS=hn,f.repeat.x=-1,this.mirrorQuad=new Y(new Pl(1,1),new Xo({map:f,depthTest:!1,fog:!1})),this.mirrorFrame=new Y(new Pl(1,1),new Xo({color:723982,depthTest:!1,fog:!1,toneMapped:!1})),this.mirrorFrame.renderOrder=0,this.mirrorQuad.renderOrder=1,this.overlayScene.add(this.mirrorFrame,this.mirrorQuad),this.scene.add(this.effects.group),this.car=t_(),this.scene.add(this.car.group),this.ghost=t_({ghost:!0}),this.ghost.group.visible=!1,this.scene.add(this.ghost.group),i.postFx&&(this.postFx=new X_(this.renderer,this.scene,this.camera)),this.resize(),window.addEventListener(`resize`,()=>this.resize())}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(e,t,!1),this.postFx?.setSize(e,t,this.pixelRatio),this.camera.aspect=e/t,this.camera.updateProjectionMatrix();let n=.52,r=n*e/t/4,i=1-16/t*2;this.mirrorQuad.scale.set(n,r,1),this.mirrorQuad.position.set(0,i-r/2,0),this.mirrorFrame.scale.set(n+8/e*2,r+8/t*2,1),this.mirrorFrame.position.copy(this.mirrorQuad.position)}get stats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,...this.effects.counts}}get cameraMode(){return this.rig.mode}setCameraMode(e){this.rig.mode=e;let t=e===`cockpit`;this.car.exterior.visible=!t,this.car.interior.visible=t;for(let e of this.car.wheels)e.visible=!t}setCondition(e,t){let n=this.racingLine.visible;this.trackGroup.remove(this.racingLine),this.racingLine.geometry.dispose(),this.racingLine.material.dispose(),this.racingLine=g_(e),this.racingLine.visible=n,this.trackGroup.add(this.racingLine),this.wet=t,this.asphaltMat.color.setHex(t?9080726:16777215),this.asphaltMat.roughness=t?.28:.82,this.asphaltMat.envMapIntensity=t?1.1:.35;let r=this.scene.fog;r.color.setHex(t?11121596:11847384),r.near=t?80:500,r.far=t?1700:11e3,this.hemi.intensity=t?1:1.2,this.sun.intensity=t?.7:2.8,this.scene.backgroundIntensity=t?.62:1;let i=this.scene.getObjectByName(`distant-mountains`);if(i&&(i.visible=!t),t&&!this.rain){let e=1400,t=new Float32Array(e*6);for(let n=0;n<e;n++){let e=(Math.random()-.5)*50,r=Math.random()*16,i=(Math.random()-.5)*50;t.set([e,r,i,e+.05,r-.7,i],n*6)}let n=new Po;n.setAttribute(`position`,new bo(t,3)),this.rain=new Qs(n,new Bs({color:14674160,transparent:!0,opacity:.35,depthWrite:!1})),this.rain.frustumCulled=!1,this.scene.add(this.rain)}this.rain&&(this.rain.visible=t)}setShowroom(e){this.showroom=e}setStartLights(e){this.startArea.setLights(e)}setMirror(e){this.mirrorEnabled=e}setLineVisible(e){this.racingLine.visible=e}setTraffic(e,t){for(;this.trafficCars.length<e.length;){let t=this.trafficCars.length,n=t_({color:e[t].color,number:String(21+t*7)});this.trafficCars.push(n),this.scene.add(n.group)}this.trafficCars.forEach((n,r)=>{n.group.visible=r<e.length,r<e.length&&n.update(e[r].state,t,e[r].braking,e[r].y,e[r].grade)})}clearEffects(){this.effects.clear()}snapCamera(e){this.rig.snap(e)}setGhost(e){this.ghost.group.visible=e!==null,e&&(this.ghost.group.position.set(e.x,e.y,e.z),this.ghost.group.rotation.y=-e.yaw)}placeShadows(e,t){let n=this.quality.shadowExtent,r=this.camera.getWorldDirection(this.tmpDir);r.y=0,r.lengthSq()<1e-6&&r.set(Math.cos(e.yaw),0,Math.sin(e.yaw)),r.normalize();let i=this.tmpCenter.set(e.x+r.x*n*.55,t,e.z+r.z*n*.55),a=2*n/this.quality.shadowMapSize,o=i.dot(vv),s=i.dot(yv);i.addScaledVector(vv,Math.round(o/a)*a-o).addScaledVector(yv,Math.round(s/a)*a-s),this.sun.position.copy(i).addScaledVector(_v,bv),this.sun.target.position.copy(i)}tmpDir=new W;tmpCenter=new W;slowTime=0;pixelRatio=1;adaptQuality(e){e>.04&&e<.25?this.slowTime+=e:this.slowTime=Math.max(0,this.slowTime-e*2),this.slowTime>3&&this.pixelRatio>1&&(this.pixelRatio=Math.max(1,this.pixelRatio-.5),this.renderer.setPixelRatio(this.pixelRatio),this.resize(),this.slowTime=0)}render(e,t,n,r,i,a,o){if(this.adaptQuality(t),t>0&&this.effects.update(e,i,a,t,o),this.car.update(e,t,n,i,a),this.rig.update(e,t,r,i,a),this.showroom){let t=e.yaw+this.showroom.angle;this.camera.position.set(e.x+Math.cos(t)*this.showroom.distance,i+this.showroom.height,e.z+Math.sin(t)*this.showroom.distance),this.camera.fov=40,this.camera.lookAt(e.x,i+.62,e.z),this.camera.updateProjectionMatrix()}if(this.placeShadows(e,i),this.rain&&this.wet){let e=this.rain.geometry.getAttribute(`position`),n=e.array,r=(t>0?t:.016)*22;for(let e=0;e<n.length;e+=6)n[e+1]-=r,n[e+4]-=r,n[e+4]<0&&(n[e+1]+=16,n[e+4]+=16);e.needsUpdate=!0,this.rain.position.set(this.camera.position.x,i-1,this.camera.position.z)}if(this.rig.mode===`cockpit`){let t=Math.cos(e.yaw),n=Math.sin(e.yaw),r=[`centre`,`left`,`right`][this.cockpitMirrorTurn++%3],o=this.cockpitMirrorCam,s=r===`left`?-1:+(r===`right`),c=r===`centre`?-1.9:Mg.side.x,l=r===`centre`?1.22:Mg.side.y,u=s*(Mg.side.z+.06);o.position.set(e.x+t*c-n*u,i+l,e.z+n*c+t*u);let d=s*.16,f=-t*Math.cos(d)- -n*Math.sin(d),p=-n*Math.cos(d)-t*Math.sin(d);o.lookAt(o.position.x+f*30,o.position.y-1.2-a*30,o.position.z+p*30);let m=jg[r];o.aspect=m.width/m.height,o.fov=r===`centre`?13:22,o.updateProjectionMatrix();let h=this.rain?this.rain.visible:!1;this.car.group.visible=!1,this.effects.group.visible=!1,this.rain&&(this.rain.visible=!1),this.renderer.setRenderTarget(m),this.renderer.render(this.scene,o),this.renderer.setRenderTarget(null),this.car.group.visible=!0,this.effects.group.visible=!0,this.rain&&(this.rain.visible=h)}let s=this.mirrorEnabled&&this.rig.mode!==`cockpit`;if(s){let t=Math.cos(e.yaw),n=Math.sin(e.yaw);this.mirrorCam.position.set(e.x-t*1.6,i+1.2,e.z-n*1.6),this.mirrorCam.lookAt(e.x-t*40,i+.6-a*38,e.z-n*40);let r=this.car.group.visible,o=this.rain?this.rain.visible:!1;this.car.group.visible=!1,this.trees.visible=!1,this.effects.group.visible=!1,this.rain&&(this.rain.visible=!1),this.renderer.setRenderTarget(this.mirrorTarget),this.renderer.render(this.scene,this.mirrorCam),this.renderer.setRenderTarget(null),this.car.group.visible=r,this.trees.visible=!0,this.effects.group.visible=!0,this.rain&&(this.rain.visible=o)}this.postFx?this.postFx.render(B(e),t>0?t:.016):this.renderer.render(this.scene,this.camera),s&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.overlayScene,this.overlayCam),this.renderer.autoClear=!0)}},Sv=4,Cv=2500,wv=1.07,Tv=1.25,Ev=p.massEmpty+.5*p.fuelCapacity*p.fuelDensity;function Dv(e){for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e}function Ov(e,t=1){let n=0;for(let t=1;t<=p.gears.length;t++){let r=e/p.wheelRadius*F(t)*60/(2*Math.PI);if(r>p.redlineRpm)continue;let i=P(Math.max(r,2500),1)*te(t)/p.wheelRadius;i>n&&(n=i)}let r=.95*p.tyre.mu*t*Ev*h*p.frontWeightFraction*.9;return Math.min(n,r)}function kv(e){return .5*g*p.cdA*e*e+p.rollingResistance*Ev*h}function Av(e,t,n){let r=e.points.length,i=new Float64Array(t),a=new Float64Array(t),o=new Float64Array(t),s=new Float64Array(t);for(let n=0;n<t;n++){let c=e.points[Math.floor(n*r/t)];i[n]=c.x,a[n]=c.z,o[n]=-Math.sin(c.heading),s[n]=Math.cos(c.heading)}let c=new Float64Array(t);if(n){let e=n.length;for(let r=0;r<t;r++){let i=r*e/t,a=Math.floor(i),o=i-a;c[r]=n[a%e]*(1-o)+n[(a+1)%e]*o}}let l=new Float64Array(t),u=new Float64Array(t);for(let n=0;n<t;n++){let i=e.points[Math.floor(n*r/t)];l[n]=-(i.left-1),u[n]=i.right-1}let d=e=>i[e]+c[e]*o[e],f=e=>a[e]+c[e]*s[e],p=e=>(e%t+t)%t,m=new Float64Array(t).fill(1),h=e=>d(p(e-1))-2*d(e)+d(p(e+1)),g=e=>f(p(e-1))-2*f(e)+f(p(e+1));for(let e=0;e<Cv;e++){if(e%40==0)for(let e=0;e<t;e++){let t=p(e-1),n=p(e+1),r=(Math.hypot(d(e)-d(t),f(e)-f(t))+Math.hypot(d(n)-d(e),f(n)-f(e)))/2;m[e]=1/Math.max(r*r*r,1e-6)}for(let e=0;e<t;e++){let t=p(e-1),n=p(e+1),r=m[t]*h(t)-2*m[e]*h(e)+m[n]*h(n),i=m[t]*g(t)-2*m[e]*g(e)+m[n]*g(n),a=(r*o[e]+i*s[e])/(m[t]+4*m[e]+m[n]);c[e]=Math.max(l[e],Math.min(u[e],c[e]-1.5*a))}}return c}function jv(e){let t=null;for(let n of[32,16,8,Sv])t=Av(e,Math.floor(e.points.length/n),t);return t}var Mv=null;function Nv(e,t=1){Mv&&Mv.track===e||(Mv={track:e,lines:new Map});let n=Mv.lines.get(t);if(n)return n;let r=t===1?null:Nv(e,1),i=e.points.length,a=r?new Float64Array:jv(e),o=a.length,s=new Float64Array(i);for(let t=0;t<i&&!r;t++){let n=t*o/i,r=Math.floor(n),c=n-r,l=a[(r-1+o)%o],u=a[r%o],d=a[(r+1)%o],f=a[(r+2)%o],p=.5*(2*u+(-l+d)*c+(2*l-5*u+4*d-f)*c*c+(-l+3*u-3*d+f)*c*c*c);s[t]=Math.max(-(e.points[t].left-1),Math.min(e.points[t].right-1,p))}let c=new Float64Array(i),l=new Float64Array(i);for(let t=0;t<i;t++){let n=e.points[t];r&&(s[t]=r[t].lateral),c[t]=r?r[t].x:n.x-Math.sin(n.heading)*s[t],l[t]=r?r[t].z:n.z+Math.cos(n.heading)*s[t]}let u=new Float64Array(i),d=new Float64Array(i);for(let e=0;e<i;e++){let t=(e-1+i)%i,n=(e+1)%i;u[e]=Math.atan2(l[n]-l[t],c[n]-c[t]),d[e]=Math.hypot(c[n]-c[e],l[n]-l[e])}let f=new Float64Array(i);for(let e=0;e<i;e++){let t=0;for(let n=-4;n<4;n++)t+=d[(e+n+i)%i];f[e]=Dv(u[(e+4)%i]-u[(e-4+i)%i])/t}let g=new Float64Array(i),_=p.tyre.mu/m.mu,v=wv*t*_,y=Tv*t*_;for(let e=0;e<i;e++)g[e]=Math.min(51.388888888888886,Math.sqrt(v*h/Math.max(Math.abs(f[e]),1e-4)));let b=(e,t)=>{let n=e*e*Math.abs(t)/(v*h);return Math.sqrt(Math.max(0,1-n*n))};for(let n=0;n<2;n++){for(let n=0;n<i;n++){let r=(n+1)%i,a=g[n],o=(Ov(a,t)*b(a,f[n])-kv(a))/Ev*.97-h*e.points[n].grade,s=Math.sqrt(Math.max(0,a*a+2*o*d[n]));s<g[r]&&(g[r]=s)}for(let t=i-1;t>=0;t--){let n=(t+1)%i,r=g[n],a=r*r*Math.abs(f[n])/(v*h),o=Math.max(.5,y*h*Math.max(0,1-1.3*a)*.95+kv(r)/Ev+h*e.points[t].grade),s=Math.sqrt(r*r+2*o*d[t]);s<g[t]&&(g[t]=s)}}let x=[];for(let t=0;t<i;t++)x.push({x:c[t],z:l[t],s:e.points[t].s,lateral:s[t],heading:u[t],curvature:f[t],speed:g[t],y:e.points[t].y});return Mv.lines.set(t,x),x}var Pv=`mostrace.settings.v1`;function Fv(){let e={autoShift:!0,line:!0,ghost:!0,sound:!0,wet:!1,ambient:15,traffic:0,gridPos:1,steer:1,camera:0,quality:Hm(dn())};try{let t=localStorage.getItem(Pv);if(!t)return e;let n=JSON.parse(t);if(typeof n!=`object`||!n)return e;let r=n;return{autoShift:typeof r.autoShift==`boolean`?r.autoShift:e.autoShift,line:typeof r.line==`boolean`?r.line:e.line,ghost:typeof r.ghost==`boolean`?r.ghost:e.ghost,sound:typeof r.sound==`boolean`?r.sound:e.sound,wet:typeof r.wet==`boolean`?r.wet:e.wet,steer:r.steer===.75||r.steer===1.3?r.steer:1,traffic:r.traffic===4||r.traffic===8?r.traffic:0,gridPos:typeof r.gridPos==`number`&&Number.isFinite(r.gridPos)?Rt(r.gridPos,8):1,ambient:r.ambient===5||r.ambient===15||r.ambient===25?r.ambient:e.ambient,camera:typeof r.camera==`number`&&r.camera>=0&&r.camera<Rm.length?Math.floor(r.camera):0,quality:Um(r.quality,e.quality)}}catch{return e}}function Iv(e){try{localStorage.setItem(Pv,JSON.stringify(e))}catch{}}function Lv(e){let t=document.getElementById(e);if(!t)throw Error(`Chybí prvek #${e}`);return t}var Rv=tt(),zv=_t(Rv),Bv=.72,Vv=Nv(Rv),Hv=Vv,Uv=Lv(`view`),Q=Fv(),Wv=new xv(Uv,Rv,zv,Vv,Vm[Um(new URLSearchParams(location.search).get(`quality`),Q.quality)]),Gv=new O(Rv),Kv=new e,qv=new ln(()=>navigator.getGamepads?navigator.getGamepads():[]);qv.attach(window);var Jv=dn()?new pn(Lv(`touch-gas`),Lv(`touch-brake`)):null;qv.touch=Jv;var Yv=new x(Rv.length),Xv=new r,Zv=new Yt(Rv,zv),Qv=ae(Hv),$v=new le(Qv,Rv.length),ey=[],ty=new _(Rv.length),ny=null,ry=[],iy=[],ay=!1,oy=`menu`,$=z(Hv[0].x,Hv[0].z,Hv[0].heading),sy=wt(Rv,zv,$),cy={steer:0,throttle:0,brake:0,handbrake:0,gearUp:!1,gearDown:!1},ly=0,uy=0,dy=performance.now(),fy=0,py=0,my=0,hy=2,gy=0,_y=!1,vy=``,yy=0,by=[!1,!1,!1],xy=!1,Sy=0,Cy=0,wy=0,Ty=null,Ey={active:!1,t:0,hold:0,goAt:-1,reacted:!1},Dy=null,Oy={dry:null,wet:null},ky=`dry`;function Ay(){return ky===`wet`?Bv:1}function jy(e){ky=e,Hv=Nv(Rv,Ay()),Qv=ae(Hv),$v=new le(Qv,Rv.length),ry=Array.from({length:Math.ceil(Rv.length/10)},(e,t)=>Hv[Math.min(Hv.length-1,t*10)].speed*3.6),ny=null,Wv.setCondition(Hv,e===`wet`),Yv.clearBest(),Dy=null;let t=jt(void 0,e);t&&(Yv.loadBest(t.time,t.trace,t.sectors),Dy=t.ghost.length>0?t.ghost:null),Oy[e]||My(e)}function My(e){window.setTimeout(()=>{if(Oy[e])return;let t=new r,n=e===`wet`?Bv:1,i=Et(Rv,Nv(Rv,n),e===`wet`?1:1.02,(e,n)=>t.sample(e,n.x,n.z,n.yaw),n);Number.isFinite(i.lapTime)&&(Oy[e]={ghost:t.data(),time:i.lapTime},Zy())},300)}var Ny=Lv(`menu`),Py=Lv(`pause`),Fy=Lv(`touch`),Iy=Lv(`opt-auto`),Ly=Lv(`opt-line`),Ry=Lv(`opt-ghost`),zy=Lv(`opt-sound`),By=Lv(`opt-wet`),Vy=Lv(`opt-ambient`),Hy=Lv(`opt-quality`),Uy=Lv(`opt-traffic`),Wy=Lv(`opt-grid`),Gy=Lv(`opt-grid-label`),Ky=Lv(`opt-steer`),qy=Lv(`best-hint`),Jy=Lv(`pad-hint`);function Yy(){Gv.setMirror(Zv.cars.length>0&&Rm[Q.camera]!==`cockpit`)}function Xy(){Iy.checked=Q.autoShift,Ly.checked=Q.line,Ry.checked=Q.ghost,zy.checked=Q.sound,By.checked=Q.wet,Vy.value=String(Q.ambient),Hy.value=Q.quality,Uy.value=String(Q.traffic);let e=Q.traffic+1;Wy.options.length!==e&&Wy.replaceChildren(...Array.from({length:e},(t,n)=>new Option(`${n+1}.${n===0?` (pole position)`:n===e-1?` (poslední)`:``}`,String(n+1)))),Wy.value=String(Rt(Q.gridPos,Q.traffic)),Gy.classList.toggle(`hidden`,Q.traffic===0),Ky.value=String(Q.steer),qv.sensitivity=Q.steer;let t=Q.wet?`wet`:`dry`;t===ky&&ay||(ay=!0,jy(t)),Wv.setLineVisible(Q.line),Wv.setCameraMode(Rm[Q.camera]),Yy(),Kv.enabled=Q.sound,Iv(Q)}function Zy(){let e=[];Yv.best!==null&&e.push(`Tvůj rekord: ${S(Yv.best)}`);let t=Oy[ky];t&&e.push(`Referenční jezdec (počítač): ${S(t.time)}`),qy.textContent=`${ky===`wet`?`Mokro`:`Sucho`} – ${e.length>0?e.join(` · `):`zatím bez času`}`}for(let[e,t]of[[Iy,`autoShift`],[Ly,`line`],[Ry,`ghost`],[zy,`sound`],[By,`wet`]])e.addEventListener(`change`,()=>{Q[t]=e.checked,Xy(),Zy()});Ky.addEventListener(`change`,()=>{let e=Number(Ky.value);Q.steer=e===.75||e===1.3?e:1,Xy()}),Uy.addEventListener(`change`,()=>{let e=Number(Uy.value);Q.traffic=e===4||e===8?e:0,Xy()}),Wy.addEventListener(`change`,()=>{Q.gridPos=Rt(Number(Wy.value),8),Xy()}),Hy.addEventListener(`change`,()=>{let e=Um(Hy.value,Q.quality);e!==Q.quality&&(Q.quality=e,Iv(Q),location.reload())}),Vy.addEventListener(`change`,()=>{let e=Number(Vy.value);Q.ambient=e===5||e===25?e:15,Xy()});function Qy(e){oy=e,Ny.classList.toggle(`hidden`,e!==`menu`),Py.classList.toggle(`hidden`,e!==`pause`),Fy.classList.toggle(`hidden`,!Jv||e!==`drive`),Jv&&e!==`drive`&&Jv.releaseAll(),e===`pause`&&Gv.speedGraph(ny,ry,Qv.map(e=>e.apexS),Rv.length),e===`pause`&&Gv.analysis(ey.length>0?ey:$v.lapResults(),Qv,iy),Gv.setVisible(e!==`menu`),e===`menu`&&Zy(),dy=performance.now()}function $y(e,t,n){let r=Hv.length,i=Hv[(e%r+r)%r];$=z(i.x,i.z,i.heading),$.vx=t,$.gear=n;for(let e=0;e<4;e++)$.wheelSpeed[e]=t/p.wheelRadius;sy=wt(Rv,zv,$),Wv.snapCamera($)}function eb(e){if(Kv.start(),Jv&&(Jv.enable().then(e=>{e||Gv.toast(`Řízení náklonem není povolené
povol pohyb a orientaci v nastavení prohlížeče`,5)}),window.setTimeout(()=>{Jv.active&&!Jv.tiltAvailable&&Gv.toast(`Telefon neposílá náklon
řízení gyroskopem nefunguje`,5)},2500)),Yv.resetSession(),Xv.reset(),$v.reset(),ey=[],iy=[],ty.reset(),ny=null,Wv.clearEffects(),qv.clearPending(),cy={...cy,gearUp:!1,gearDown:!1},Ty=null,Ey.active=e===`grid`,gy=0,Ey.t=0,Ey.hold=.6+Math.random()*1.8,Ey.goAt=-1,Ey.reacted=!1,ly=0,uy=0,_y=!1,by=[!1,!1,!1],xy=e===`demo`,Yv.recordBest=!xy,e===`flying`||e===`demo`){$y(Hv.length-260,110/3.6,3);let e=xy?85:Math.min(75,Q.ambient+45);$.tyreTemp=[e,e,e,e],Gv.toast(xy?`Ukázkové kolo
řídí počítač – sleduj stopu a pedály`:`Letmé kolo
měření začne na cílové čáře`,3.5)}else if(e===`pit`){let e=Rv.points.length,t=Rv.points[e-500],n=(9+it)/2;$=z(t.x-Math.sin(t.heading)*n,t.z+Math.cos(t.heading)*n,t.heading);let r=Q.ambient+10;$.tyreTemp=[r,r,r,r],$.brakeTemp=[Q.ambient+30,Q.ambient+20],sy=wt(Rv,zv,$),_y=!0,Wv.snapCamera($),Gv.toast(`Výjezd z boxů
limit 60 km/h, studené pneumatiky`,4)}else{let e=Rt(Q.gridPos,Q.traffic),t=zt(Rv,e,Q.traffic).player,n=Rv.points[t.index];$=z(n.x-Math.sin(n.heading)*t.lateral,n.z+Math.cos(n.heading)*t.lateral,n.heading),$.tyreTemp=[Q.ambient+20,Q.ambient+20,Q.ambient+20,Q.ambient+20],sy=wt(Rv,zv,$),Wv.snapCamera($),Gv.toast(`Start z roštu${Q.traffic>0?` – ${e}. místo`:``}\nplyn až po zhasnutí světel`,3)}e===`grid`&&Q.traffic>0?Zv.resetGrid(zt(Rv,Q.gridPos,Q.traffic).others,Hv):Zv.reset(xy?0:Q.traffic,Hv,sy.index),Wv.setMirror(Zv.cars.length>0),Yy(),Qy(`drive`)}Lv(`btn-flying`).addEventListener(`click`,()=>eb(`flying`)),Lv(`btn-grid`).addEventListener(`click`,()=>eb(`grid`)),Lv(`btn-pit`).addEventListener(`click`,()=>eb(`pit`)),Lv(`btn-demo`).addEventListener(`click`,()=>eb(`demo`)),Lv(`btn-resume`).addEventListener(`click`,()=>Qy(`drive`)),Lv(`touch-pause`).addEventListener(`click`,()=>{oy===`drive`&&Qy(`pause`)}),Lv(`touch-reset`).addEventListener(`click`,()=>{oy===`drive`&&!xy&&sb()});for(let e of[`keydown`,`pointerdown`,`pointerup`,`touchend`,`click`])window.addEventListener(e,()=>Kv.start());document.addEventListener(`visibilitychange`,()=>{document.hidden||Kv.start()}),Lv(`btn-menu`).addEventListener(`click`,()=>Qy(`menu`)),Lv(`btn-clear`).addEventListener(`click`,()=>{Nt(void 0,ky),Yv.clearBest(),Dy=null,Zy()});var tb=Lv(`setup`),nb={mass:Lv(`set-mass`),mu:Lv(`set-mu`),wheel:Lv(`set-wheel`),final:Lv(`set-final`),gears:[1,2,3,4,5].map(e=>Lv(`set-g${e}`))},rb=Lv(`setup-error`),ib=Lv(`setup-rpm`);function ab(e){nb.mass.value=String(e.massEmpty),nb.mu.value=String(e.mu),nb.wheel.value=(e.wheelRadius*200).toFixed(1),nb.final.value=String(e.finalDrive),nb.gears.forEach((t,n)=>t.value=String(e.gears[n])),ob()}function ob(){let e=Number(nb.wheel.value)/200,t=Number(nb.final.value),n=nb.gears.map(n=>Math.round(100/3.6/e*Number(n.value)*t*60/(2*Math.PI)/10)*10);ib.textContent=n.every(e=>Number.isFinite(e))?`Otáčky při 100 km/h: ${n.map((e,t)=>`${t+1}. ${e}`).join(` · `)} – porovnej se svým otáčkoměrem.`:``}for(let e of[nb.wheel,nb.final,...nb.gears])e.addEventListener(`input`,ob);Lv(`btn-setup`).addEventListener(`click`,()=>{ab({massEmpty:p.massEmpty,gears:p.gears,finalDrive:p.finalDrive,wheelRadius:p.wheelRadius,mu:p.tyre.mu}),rb.textContent=``,tb.classList.remove(`hidden`)}),Lv(`btn-setup-cancel`).addEventListener(`click`,()=>tb.classList.add(`hidden`)),Lv(`btn-setup-reset`).addEventListener(`click`,()=>{f(),location.reload()}),Lv(`btn-setup-save`).addEventListener(`click`,()=>{let e=c({massEmpty:Number(nb.mass.value),mu:Number(nb.mu.value),wheelRadius:Number(nb.wheel.value)/200,finalDrive:Number(nb.final.value),gears:nb.gears.map(e=>Number(e.value))}),t=[`massEmpty`,`mu`,`wheelRadius`,`finalDrive`,`gears`].filter(t=>e[t]===void 0);if(t.length>0){let e={massEmpty:`hmotnost`,mu:`přilnavost`,wheelRadius:`průměr kola`,finalDrive:`stálý převod`,gears:`převody (pět hodnot sestupně)`};rb.textContent=`Mimo povolený rozsah: ${t.map(t=>e[t]).join(`, `)}.`}else d(e),location.reload()}),window.addEventListener(`keydown`,e=>{let t=e.target instanceof HTMLElement&&[`BUTTON`,`SELECT`,`INPUT`].includes(e.target.tagName);oy===`menu`&&e.code===`Enter`&&!t&&tb.classList.contains(`hidden`)&&eb(`flying`)}),window.addEventListener(`gamepadconnected`,()=>{Jy.textContent=`Ovladač připojen. Stiskem × spustíš letmé kolo.`}),window.addEventListener(`gamepaddisconnected`,()=>{Jy.textContent=`Ovladač odpojen, řídíš klávesnicí.`}),document.addEventListener(`visibilitychange`,()=>{document.hidden&&oy===`drive`&&Qy(`pause`)});function sb(){let e=Math.max($.fuel,2),t=$.tyreWear,n=$.tyreTemp,r=$.brakeTemp,i=sy.index-15;for(let e=0;e<8;e++){let e=(i%Rv.points.length+Rv.points.length)%Rv.points.length*Rv.step;if(!Zv.cars.some(t=>{let n=Math.abs(t.contact.s-e);return Math.min(n,Rv.length-n)<25}))break;i-=20}$y(i,0,1),$.brakeTemp=r,$.fuel=e,$.tyreWear=t,$.tyreTemp=n,gy=hy,Gv.toast(`Návrat na trať\npenalizace ${hy} s`,hy)}function cb(){for(let e of ft(Rv,zv,sy.index,sy.lateral))lb(e)}function lb(e){let t=Math.min(.4,e.dir*(sy.lateral-e.face)+.9);if(!(t>0))return;let n=Rv.points[sy.index],r=-Math.sin(n.heading)*e.dir,i=Math.cos(n.heading)*e.dir;$.x-=r*t,$.z-=i*t;let a=Math.cos($.yaw),o=Math.sin($.yaw),s=$.vx*a-$.vy*o,c=$.vx*o+$.vy*a,l=s*r+c*i;if(l>0){s-=r*l*1.3,c-=i*l*1.3;let e=Math.max(.5,1-l*.06);s*=e,c*=e,$.yawRate*=.5,yy=Math.min(3,yy+l*.4),Cy=Math.max(Cy,Math.min(1,l/8))}$.vx=s*a+c*o,$.vy=-s*o+c*a}function ub(e){let t={...cy,gearUp:e&&cy.gearUp,gearDown:e&&cy.gearDown};if(xy)t=Tt($,Hv,Rv,sy.index,1),cy=t;else if((Q.autoShift||qv.device===`touch`)&&(py-=k,py<=0&&$.shiftTimer<=0)){let e=en($t($.vx,$.wheelSpeed,$.gear),$.gear,{throttle:t.throttle,braking:t.brake>.1});(e.up||e.down)&&(t.gearUp=e.up,t.gearDown=e.down,py=.7)}gy>0&&(gy-=k,t.throttle=0,t.brake=1,t.gearUp=!1,t.gearDown=!1),Ey.active&&(t.throttle=0,t.brake=1,t.gearUp=!1,t.gearDown=!1),ke($,t,sy.surfaces,k,{...sy.env,grip:Ay(),ambient:Q.ambient}),ly+=k,Zv.cars.length>0&&!Ey.active&&(Zv.step(k,Hv,$,{grip:Ay(),ambient:Q.ambient}),Zv.playerHit&&(Cy=Math.max(Cy,.7))),sy=wt(Rv,zv,$,sy.index),cb();let n=Yv.update(sy.s,ly);Yv.lapId===fy?n&&n.type===`sector`&&(by[n.index]=n.delta!==null&&n.delta<0,Gv.toast(`S${n.index+1}  ${S(n.time)}${n.delta===null?``:`  ${C(n.delta)}`}`,2)):(n&&n.type===`lap`&&(xy?Gv.toast(`Ukázkové kolo ${S(n.time)}`,4):n.isBest?(Dy=Xv.data(),Yv.bestTrace&&Yv.bestSectors&&Mt({time:n.time,sectors:Yv.bestSectors,trace:Yv.bestTrace,ghost:Dy},void 0,ky),Gv.toast(`Nejlepší kolo ${S(n.time)}${n.delta===null?``:`  ${C(n.delta)}`}`,4)):Gv.toast(`${S(n.time)}  ${C(n.delta)}`,4)),fy=Yv.lapId,n&&n.type===`lap`&&(Ty=wy-$.fuel),wy=$.fuel,n&&n.type===`lap`&&(ey=$v.lapResults(),iy.push({time:n.time,sectors:n.sectors}),ty.complete()&&(ny=ty.data())),$v.reset(),ty.reset(),Xv.reset(),by=[!1,!1,!1]),Yv.running&&Xv.sample(Yv.current(ly),$.x,$.z,$.yaw),Yv.running&&ty.sample(sy.s,B($)*3.6);let r=$v.update(sy.s,B($)*3.6,t.brake);r&&Q.line&&Gv.corner(r)}function db(e,t){mt(Rv,sy.index,sy.lateral)?(t>17.666666666666668?vy=`Boxy – limit 60 km/h`:_y||(vy=t<.5?`Servis…`:`Boxy – zastav pro palivo a pneumatiky`),t<.5&&!_y?(my+=e,my>3&&($.fuel=p.fuelCapacity,$.tyreWear=[0,0,0,0],$.tyreTemp=[Q.ambient+10,Q.ambient+10,Q.ambient+10,Q.ambient+10],wy=$.fuel,_y=!0,Gv.toast(`Natankováno, nové pneumatiky
pozor, jsou studené`,3.5))):t>=.5&&(my=0)):(my=0,_y=!1)}var fb=0,pb=0;function mb(e){let t=performance.now(),n=Math.min(.25,(e-dy)/1e3);dy=e;let r=B($);if(cy=qv.update(Math.max(n,.001),r),oy===`menu`?(qv.consumeAction(`pause`),qv.consumeAction(`start`)&&tb.classList.contains(`hidden`)&&eb(`flying`)):(qv.consumeAction(`start`),qv.consumeAction(`pause`)&&Qy(oy===`pause`?`drive`:`pause`)),oy===`drive`){if(qv.consumeAction(`reset`)&&!xy&&sb(),qv.consumeAction(`camera`)&&(Q.camera=(Q.camera+1)%Rm.length,Xy()),qv.consumeAction(`line`)&&(Q.line=!Q.line,Xy()),qv.consumeAction(`ghost`)&&(Q.ghost=!Q.ghost,Xy()),Ey.active)Ey.t+=n,Ey.t>=5+Ey.hold&&(Ey.active=!1,Ey.goAt=ly);else if(Ey.goAt>=0&&!Ey.reacted&&cy.throttle>.3){Ey.reacted=!0;let e=ly-Ey.goAt;Gv.toast(e<.08?`Plyn držen před zhasnutím
reakce se neměří`:`Reakce ${e.toFixed(2).replace(`.`,`,`)} s`,2.5)}let e=!0,t=performance.now();uy=j(uy,n,()=>{ub(e),e=!1}),pb+=(performance.now()-t-pb)*.05,vy=``,$.fuel<=0?vy=`Došlo palivo – R = návrat, zajeď do boxů`:gy>0?vy=`Penalizace – rozjezd za ${Math.ceil(gy)} s`:sy.wheelsOff>=2&&(vy=`Mimo trať`),db(n,r);let i=sy.surfaces.some(e=>e===`kerb`),a=sy.wheelsOff>0,o=Math.max(...$.slip),s=r>3?a?.8:i?.5:0:0;yy=Math.max(yy*Math.exp(-n*6),s*1.5+Math.min(1,r/60)*.25),Cy*=Math.exp(-n*5),qv.rumble(Math.max(Cy,s*.6+($.absActive?.25:0)),Math.max(Cy,Math.min(1,(o-1)*.8))),Kv.update($.rpm,cy.throttle,r,o,s,!0)}else qv.consumeAction(`reset`),qv.consumeAction(`camera`),qv.consumeAction(`line`),qv.consumeAction(`ghost`),Kv.update($.rpm,0,0,0,0,!1);let a=Dy??Oy[ky]?.ghost??null,o=Q.ghost&&a&&Yv.running?i(a,Yv.current(ly)):null;if(o?(Sy=nt(Rv,o.x,o.z,Sy).index,Wv.setGhost({...o,y:Rv.points[Sy].y})):Wv.setGhost(null),Wv.setStartLights(Ey.active?Math.min(5,Math.floor(Ey.t)):0),Wv.setTraffic(Zv.cars.map(e=>({state:e.state,y:e.contact.y,grade:e.contact.env.grade,braking:e.braking,color:e.color})),oy===`drive`&&!Ey.active?n:0),Wv.render($,oy===`drive`?n:0,cy.brake>.05,oy===`drive`?yy:0,sy.y,sy.env.grade,sy.surfaces.map(e=>e===`asphalt`||e===`kerb`)),oy!==`menu`){let e=Q.line&&Qv.length>0?oe(Qv,sy.s,Rv.length):null,t=e!==null&&(e.braking||e.distance<400);Gv.update({fuelPerLap:Ty,traffic:Zv.cars.flatMap(e=>[e.state.x,e.state.z]),stintSeconds:ly,startLights:Ey.active?Math.min(5,Math.floor(Ey.t)):null,note:t&&e?{distance:e.distance,braking:e.braking,targetKmh:e.note.targetKmh,gear:e.note.gear}:null,speedKmh:r*3.6,gear:$.gear,rpm:$.rpm,throttle:cy.throttle,brake:cy.brake,handbrake:(cy.handbrake??0)>.05,steer:$.steerAngle/p.maxSteerAngle,current:Yv.current(ly),running:Yv.running,delta:Yv.delta(sy.s,ly),last:Yv.last,best:Yv.best,laps:Yv.laps,sectorsDone:Yv.sectors.length,sectorBetter:by,fuel:$.fuel,tyreWear:$.tyreWear,tyreTemp:$.tyreTemp,brakeTemp:$.brakeTemp,camera:zm[Rm[Q.camera]],device:(xy?`Počítač (ukázka)`:(qv.device===`gamepad`?`Ovladač`:qv.device===`touch`?`Mobil – náklon`:`Klávesnice`)+(Q.autoShift||qv.device===`touch`?` · automat`:` · manuál`))+(ky===`wet`?` · mokro`:``),ghost:Q.ghost?Dy?`tvé nejlepší kolo`:Oy[ky]?`referenční jezdec`:`–`:`vypnutý`,warning:vy,carX:$.x,carZ:$.z,ghostX:o?o.x:null,ghostZ:o?o.z:null})}fb+=(performance.now()-t-fb)*.05,requestAnimationFrame(mb)}Xy(),Qy(`menu`),requestAnimationFrame(mb);{let e=new URLSearchParams(location.search),t=e.get(`showroom`),n=e.get(`cam`);if(t!==null||n!==null){let[r,i,a]=(t??``).split(`,`).map(Number);$y(Number(e.get(`s`)??4100),0,1),Ny.classList.add(`hidden`),t===null?Wv.setCameraMode(n===`cockpit`?`cockpit`:n===`hood`?`hood`:`chase`):(Wv.setCameraMode(`chase`),Wv.setShowroom({angle:(Number.isFinite(r)?r:35)*Math.PI/180,height:Number.isFinite(i)?i:1.35,distance:Number.isFinite(a)?a:6.2}))}}