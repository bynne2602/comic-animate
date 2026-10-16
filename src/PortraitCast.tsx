import React from 'react';

export type CastRole='elder'|'elder2'|'elder3'|'king'|'scribe'|'guard'|'narrator';
type Mood='happy'|'calm'|'think'|'shock'|'shout'|'sly'|'worry';
type Pose='rest'|'talk'|'point'|'raise'|'walk'|'hold'|'carry';
type Pt={x:number;y:number};
const ink='#211f25',skin='#ffe5d6',white='#fffaf0';
const lerp=(a:number,b:number,v:number)=>a+(b-a)*v;
const ease=(v:number)=>{const n=Math.max(0,Math.min(1,v));return n*n*(3-2*n);};
function armJoint(s:Pt,w:Pt,side:number,len:number){
 const dx=w.x-s.x,dy=w.y-s.y,d=Math.max(.001,Math.hypot(dx,dy));
 const r=Math.sqrt(Math.max(0,len*len-d*d/4));
 return{x:(s.x+w.x)/2-dy/d*r*side,y:(s.y+w.y)/2+dx/d*r*side};
}
function Arm({s,w,color,side,len,handOnly=false,forearmOnly=false,point=false}:{s:Pt;w:Pt;color:string;side:number;len:number;handOnly?:boolean;forearmOnly?:boolean;point?:boolean}){
 const e=armJoint(s,w,side,len);const dx=w.x-e.x,dy=w.y-e.y,d=Math.hypot(dx,dy)||1;
 const cuff={x:w.x-dx/d*7,y:w.y-dy/d*7};
 const path=forearmOnly?`M${e.x} ${e.y}L${cuff.x} ${cuff.y}`:`M${s.x} ${s.y}L${lerp(s.x,e.x,.75)} ${lerp(s.y,e.y,.75)}Q${e.x} ${e.y} ${lerp(e.x,cuff.x,.25)} ${lerp(e.y,cuff.y,.25)}L${cuff.x} ${cuff.y}`;
 return <g stroke={ink} strokeLinecap="round" strokeLinejoin="round">
  {!handOnly&&<><path d={path} fill="none" strokeWidth="22"/><path d={path} fill="none" stroke={color} strokeWidth="14"/></>}
  {handOnly&&<g transform={`translate(${w.x} ${w.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI+(point?90:-90)})`} strokeWidth="3.4" fill={skin}>
   {point?<path d="M-8-4q-9 9-3 19 4 7 15 3l8-6-1-14q-1-6-6-4L3 0 1-20q0-6-5-6-5 1-4 7l1 15z"/>:<path d="M-10-7q-9 8-5 19 4 10 17 9 12-2 14-13 2-8-5-14-4-3-7 1l-3 2q-4-9-11-4z"/>}
   <path d="M-6 7q5 3 11 1" fill="none" stroke="#bd8c7e" strokeWidth="1.6"/>
  </g>}
 </g>;
}

/** Original cast: compact mitten hands, clean tunic silhouette, expressive inked face. */
export const PortraitCast:React.FC<{x:number;y:number;scale?:number;role?:CastRole;mood?:Mood;pose?:Pose;time:number;action?:number;phase?:number;flip?:boolean;flag?:boolean;lip?:number}>=({x,y,scale=1,role='elder',mood='calm',pose='rest',time,action=0,phase=0,flip=false,flag=false,lip})=>{
 const old=role.startsWith('elder'),bald=role==='elder2',v=role==='elder3'?2:bald?1:0;
 const coat=role==='narrator'?'#5877b1':role==='king'?'#ffbe3d':(role==='scribe'||role==='narrator')?'#5bbac0':role==='guard'?'#50987d':v===1?'#699f99':v===2?'#df985d':'#f07055';
 const hair=old?'#f6edda':'#39313b';const gait=time*5.2+phase;
 const walk=pose==='walk',holding=pose==='hold'||pose==='carry';
 const bob=walk?Math.cos(gait*2)*1.1:Math.sin(time*2+phase)*.65;
 const progress=ease((action-phase*.08)/.55),talk=.5+.5*Math.sin(time*3.2+phase);
 const s1={x:-39,y:-151},s2={x:39,y:-151};
 let w1={x:-58,y:-59},w2={x:58,y:-59};
 if(walk){w1={x:-58-10*Math.sin(gait),y:-64+7*Math.sin(gait)};w2={x:58+10*Math.sin(gait),y:-64-7*Math.sin(gait)};}
 if(pose==='talk')w2={x:lerp(77,108,talk),y:lerp(-107,-132,talk)};
 if(pose==='point')w2={x:lerp(58,133,progress),y:lerp(-59,-170,progress)};
 if(pose==='raise')w2={x:lerp(58,106,progress),y:lerp(-59,-239,progress)};
 if(holding){w1={x:pose==='hold'?-37:-29,y:-112};w2={x:-w1.x,y:-112};}
 if(flag)w2={x:104,y:-143};
 const rightSide=['talk','point','raise'].includes(pose)?1:-1;
 const rightLen=pose==='raise'?57:flag?38:holding?34:walk?54:51;
 const leg=(side:number)=>{const step=walk?Math.sin(gait)*side*12:0,lift=walk?Math.max(0,Math.cos(gait)*side)*8:0;const foot={x:side*23+step,y:-lift};return <g key={side}>
  <path d={`M${side*23} -60Q${side*23+step*.45} ${-30-lift*.6} ${foot.x} ${foot.y-7}`} fill="none" stroke={ink} strokeWidth="17"/>
  <path d={`M${side*23} -60Q${side*23+step*.45} ${-30-lift*.6} ${foot.x} ${foot.y-7}`} fill="none" stroke="#645966" strokeWidth="9"/>
  <path d={`M${foot.x-9} ${foot.y-10}q-9-2-15 6-4 7 4 9h31q8-2 4-8l-6-7z`} fill={white} strokeWidth="3.5"/>
 </g>;};
 const blink=(time+phase*.4)%4>3.83;
 const tilt=mood==='sly'?-6:mood==='think'?-4:mood==='shock'?4:Math.sin(time*1.4+phase)*1;
 const open=lip!==undefined?lip>.1:pose==='talk'||mood==='shout';const jaw=open?(lip!==undefined?3+lip*11:6+Math.abs(Math.sin(time*10))*6):0;
 const face=(role==='scribe'||role==='narrator')?'M-65-275Q-63-306-24-314Q28-325 63-287L69-218Q54-184 4-167Q-44-177-65-209Z':bald?'M-67-270Q-62-316-2-316Q62-318 68-269L65-214Q41-176 0-175Q-47-179-65-215Z':'M-68-273Q-57-312-4-313Q48-314 67-278L69-223Q57-180 0-172Q-51-180-68-217Z';
 return <g transform={`translate(${x} ${y}) scale(${flip?-scale:scale} ${scale})`} stroke={ink} strokeWidth="4.4" strokeLinejoin="round" strokeLinecap="round">
  <ellipse cx="0" cy="7" rx="61" ry="9" fill="#211f25" opacity=".12" stroke="none"/>
  {[-1,1].map(leg)}
  <g transform={`translate(0 ${bob})`}>
   <Arm s={s1} w={w1} color={coat} side={1} len={holding?34:walk?54:51}/><Arm s={s2} w={w2} color={coat} side={rightSide} len={rightLen}/>
   <path d="M-15-184v35h31v-35" fill={skin}/>
   <path d="M-24-166Q-44-164-48-137L-58-60Q0-47 59-60L48-137Q44-163 24-166L0-149Z" fill={coat}/>
   <path d="M-24-166l24 17 24-17 7 11-31 26-31-26z" fill={white} strokeWidth="3.2"/>
   <path d="M25-154l-39 72" strokeWidth="9" fill="none"/><path d="M25-154l-39 72" stroke={white} strokeWidth="3.6" fill="none"/>
   <path d="M-55-82q56 10 110 0l2 13q-58 12-114-1z" fill={role==='king'?'#b84f36':'#52495a'} strokeWidth="3"/>
   <rect x="-8" y="-81" width="19" height="14" rx="2" fill="#ffc747" strokeWidth="2.8"/>
   <path d="M-35-116l-5 19m68-15 4 15" strokeWidth="2" opacity=".3"/>
   {pose==='hold'&&<g transform="translate(0 -114)"><rect x="-39" y="-23" width="78" height="45" rx="5" fill="#fff1c6" strokeWidth="3"/><path d="M-34-19v36m68-36v36" stroke="#cf9f65" strokeWidth="5"/><path d="M-17-8h25m-25 10h32" stroke="#ad8a61" strokeWidth="2"/><rect x="15" y="5" width="10" height="10" fill="#e96951" stroke="none"/></g>}
   {pose==='carry'&&<path d="M-29-89q-15-18-8-43 4-15 22-20l-4-11h34l-4 11q24 7 28 24 3 22-10 39z" fill="#efd4a1" strokeWidth="3.5"/>}
   {flag&&<g strokeWidth="3.5"><path d="M104 0v-430"/><path d={`M105-424q34 ${Math.sin(time*4+phase)*6-5} 66 0l-15 24 15 24q-32 ${Math.sin(time*4+phase)*4-3} -66 0z`} fill="#ef6a4c"/></g>}
   {holding&&<><Arm s={s1} w={w1} color={coat} side={1} len={34} forearmOnly/><Arm s={s2} w={w2} color={coat} side={rightSide} len={34} forearmOnly/></>}
   <Arm s={s1} w={w1} color={coat} side={1} len={holding?34:walk?54:51} handOnly/><Arm s={s2} w={w2} color={coat} side={rightSide} len={rightLen} handOnly point={pose==='point'}/>
   <g transform={`rotate(${tilt} 0 -184)`}>
    {(role==='scribe'||role==='narrator')&&<path d="M-67-222q-20-93 48-114 77-23 95 71l-11 58-120 3z" fill={hair}/>}
    {old&&!bald&&<path d="M-66-280l-17 19 5 32 18-15" fill="#4e6660" strokeWidth="3.6"/>}
    <path d="M-65-252q-21-7-20 13 1 19 22 19M65-252q20-8 21 12 0 18-22 20" fill={skin} strokeWidth="3.6"/>
    <path d={face} fill={skin}/>
    <path d="M-74-241q-7 0-3 9m153-9q7 0 3 9" stroke="#c49d89" strokeWidth="2" fill="none"/>
    {(role==='scribe'||role==='narrator')?<><path d="M-69-257q-18-48 13-67 14-24 42-14 29-16 48 3 31-4 40 34 7 23-6 47l-15-30q-34 20-63-6-19 31-48 29l-1 23z" fill={hair}/><path d="M-43-312q22-18 40-12m26 3 20 13" stroke="#71616e" strokeWidth="3" fill="none"/></>:old&&bald?<><path d="M-65-271q-10 5-5 22l10 1 1-17m121-6q10 5 5 22l-10 1-1-17" fill={hair} strokeWidth="3"/><path d="M-32-300q31-13 63 1" stroke="#c7b8a1" strokeWidth="2" fill="none"/></>:role==='king'?<><path d="M-64-286l10-48q53-22 108 0l11 48z" fill="#3d3944"/><path d="M-55-324q56-11 110 0m-114 30H59" stroke="#ffc64b" strokeWidth="4"/><circle cy="-316" r="8" fill="#ef6a4c" strokeWidth="2.6"/></>:<><path d="M-69-270q-3-62 66-61 67-1 73 61-67-16-139 0z" fill={role==='guard'?'#4c5c6e':'#4e6660'}/>{old&&<path d="M-55-303q53-18 109 0m-109 17q53-18 111 0" fill="none" stroke="#91a999" strokeWidth="2.7"/>}</>}
    <g fill="none" strokeWidth="5.5">
     {mood==='shout'?<path d="M-43-254l24 9m38 0 24-9"/>:mood==='worry'?<path d="M-43-245q15 3 24-7m38 0q10 10 24 7"/>:mood==='shock'?<path d="M-43-260q13-11 24-2m38 0q13-9 24 2"/>:mood==='sly'?<path d="M-43-248h24m38-7q14-9 24-1"/>:<path d="M-43-254q13-6 24-2m38 0q13-6 24 2"/>}
    </g>
    {blink||mood==='happy'?<path d="M-40-233q11-12 22 0m38 0q11-12 22 0" strokeWidth="4.3" fill="none"/>:['think','sly'].includes(mood)?<><path d="M-45-235q14-9 29 0l-2 10q-14 5-26-1zm65 0q14-9 29 0l-2 10q-14 5-26-1z" fill={white} strokeWidth="3.2"/><ellipse cx="-26" cy="-232" rx="4.5" ry="5.5" fill={ink} stroke="none"/><ellipse cx="34" cy="-232" rx="4.5" ry="5.5" fill={ink} stroke="none"/><path d="M-44-235h27m39 0h26" strokeWidth="3.8"/></>:<><ellipse cx="-31" cy="-233" rx={mood==='shock'?10:6.2} ry={mood==='shock'?13:9} fill={ink} stroke="none"/><ellipse cx="31" cy="-233" rx={mood==='shock'?10:6.2} ry={mood==='shock'?13:9} fill={ink} stroke="none"/><circle cx="-29" cy="-236" r="1.7" fill={white} stroke="none"/><circle cx="33" cy="-236" r="1.7" fill={white} stroke="none"/></>}
    {role==='narrator'&&<g fill="none" strokeWidth="2.9"><ellipse cx="-31" cy="-233" rx="23" ry="21"/><ellipse cx="31" cy="-233" rx="23" ry="21"/><path d="M-8-233q8-6 16 0m-74-7 12 4m100 0 12-4"/></g>}<path d="M0-234q-5 13 0 16h7" fill="none" strokeWidth="2.6"/>
    <ellipse cx="-44" cy="-213" rx="10" ry="4" fill="#efafa0" stroke="none"/><ellipse cx="44" cy="-213" rx="10" ry="4" fill="#efafa0" stroke="none"/>
    {old&&<path d={bald?'M-34-196q5 34 34 37 29-6 36-37l-35 8z':v===2?'M-32-196q1 32 32 48 28-17 34-48l-34 9z':'M-35-196q0 39 34 51 34-15 37-51l-36 10z'} fill={hair} strokeWidth="3.4"/>}
    {open?<><path d={`M-18-203q18-5 36 0l-2 ${jaw}q-16 15-31 0z`} fill="#943b4c" strokeWidth="3.2"/><path d="M-13-202h27v5h-27" fill={white} stroke="none"/></>:mood==='shock'?<ellipse cx="1" cy="-201" rx="7" ry="9" fill="#943b4c" strokeWidth="3"/>:mood==='worry'?<path d="M-12-197q12-11 25 0" fill="none" strokeWidth="3.2"/>:['sly','think'].includes(mood)?<path d="M-11-201q9 4 22-1" fill="none" strokeWidth="3.2"/>:<path d="M-13-202q14 13 28-1" fill="none" strokeWidth="3.4"/>}
    {old&&<><path d="M0-212q-19-4-29 8 14 4 29-1 15 5 30 1-12-13-30-8z" fill={hair} strokeWidth="2.5"/><path d="M-49-222l7 3m85-1 7-3" fill="none" stroke="#bd8f7b" strokeWidth="1.8"/></>}
   </g>
  </g>
 </g>;
};


