import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {PortraitCast as Actor} from '../PortraitCast';
import {DepthTime, Foreground} from '../DepthScenery';
import track from '../../public/bachdang-demo/timeline.json';
import envelope from '../../public/bachdang-demo/envelope.json';

export const Ink='#211f25';
export const ease=(t:number)=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
export function Bubble({lines}:{lines:string[]}) {
 const h=lines.length*36+21;
 return <g transform="translate(270 92)" stroke={Ink} strokeWidth={3.4}>
  <rect x={-191} y={-29} width={382} height={h} rx={23} fill="#fffbee"/>
  <path d={`M-95 ${h-34}l-20 32 55-30`} fill="#fffbee"/>
  {lines.map((s,i)=><text key={s} y={-29+h/2+(i-(lines.length-1)/2)*36+1.5} dominantBaseline="middle" textAnchor="middle" fill={Ink} stroke="none" fontFamily="Comic Sans MS, Arial" fontWeight="bold" fontSize={28} textLength={s.length>19?330:undefined} lengthAdjust="spacingAndGlyphs">{s}</text>)}
 </g>;
}
export function Stage({index,children,river=false}:{index:number;children:React.ReactNode;river?:boolean}){
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const scene=track.scenes[index],time=scene.start+frame/fps;
 const caption=track.captions.find(c=>time*1000>=c.startMs&&time*1000<c.endMs);
 const lip=envelope[Math.min(envelope.length-1,Math.floor(time*20))]||0;
 return <AbsoluteFill style={{background:'#fff9ed'}}>
  <svg width={1080} height={1920} viewBox="0 0 540 960" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{position:'absolute',inset:0}}>
   <defs><clipPath id="bachdang-panel"><rect x={36} y={65} width={468} height={650} rx={3}/></clipPath></defs>
   <rect width={540} height={960} fill="#fff9ed"/>
   <g clipPath="url(#bachdang-panel)"><svg x={36} y={65} width={468} height={650} viewBox="0 0 540 750"><DepthTime.Provider value={time}>{children}<Foreground kind={river?'fight':'prepare'} time={time}/></DepthTime.Provider></svg></g>
   <rect x={36} y={65} width={468} height={650} rx={3} fill="none" stroke={Ink} strokeWidth={4}/>
   <style>{`.bachdang-halo *{stroke:#fffaf0!important;stroke-width:11px!important;fill:#fffaf0!important}`}</style>
   <g className="bachdang-halo"><Actor role="narrator" x={101} y={890} scale={.86} time={time} action={frame/fps} pose={index===2?'point':'talk'} mood="calm" lip={lip}/></g>
   <Actor role="narrator" x={101} y={890} scale={.86} time={time} action={frame/fps} pose={index===2?'point':'talk'} mood="calm" lip={lip}/>
  </svg>
  {caption&&<div style={{position:'absolute',left:490,right:80,top:1515,textAlign:'left',color:Ink,font:'700 43px/1.27 Arial, sans-serif',textWrap:'balance'}}>{caption.text}</div>}
 </AbsoluteFill>;
}

export function Stake({x,y,s=1}:{x:number;y:number;s?:number}){
 return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={Ink} strokeWidth={3} strokeLinejoin="round"><path d="M-9 75-7-44 0-67 9-44 11 75Z" fill="#a37550"/><path d="M0-49 2 61" stroke="#d4ac76" strokeWidth={2}/><path d="M-7-44 0-67 9-44" fill="#e6c697"/></g>;
}

export function Ship({x,y,s=1,time,enemy=false}:{x:number;y:number;s?:number;time:number;enemy?:boolean}){
 return <g transform={`translate(${x} ${y+Math.sin(time*2+x)*2.5}) scale(${s})`} stroke={Ink} strokeWidth={3} strokeLinejoin="round">
  <path d="M-96-12-72 34Q8 64 83 26l25-42L57 7H-49Z" fill={enemy?'#87644e':'#a76b4d'}/><path d="M-64 24q69 21 139-2" fill="none" stroke="#604b43"/>
  <path d="M0 0v-174"/>
  {enemy?<><path d="M5-165q68 24 60 117L5-34Z" fill="#a76059"/><path d="M7-132l49 13M7-99l56 10M7-66l56 5" stroke="#d3a081" strokeWidth={2}/></>:<path d={`M2-163q30 ${Math.sin(time*4)*5-4} 57 0L43-142l16 21q-29-5-57 0Z`} fill="#e2694c"/>}
  {[-47,40].map((a,i)=><g key={a} transform={`translate(${a} -5)`}><path d="M-14 2v-31q14-15 28 0V2" fill={enemy?'#8a776d':'#50987d'}/><circle cy={-45} r={15} fill="#ffe5d6"/><path d="M-16-46q1-24 16-23 18 0 17 23Z" fill="#4c5c6e"/><path d="M-6-45v3m12-3v3" strokeWidth={2}/><g transform={`rotate(${Math.sin(time*4+i)*14} 0 -10)`}><path d="M0-10 61 70" strokeWidth={4}/><path d="M47 48 65 74q9 8 13-1L56 40Z" fill="#c49a6c"/><path d="M-8-23 2-9 14-4" fill="none" stroke={enemy?'#8a776d':'#50987d'} strokeWidth={9}/><circle cx={14} cy={-4} r={5} fill="#ffe5d6"/></g></g>)}
 </g>;
}
