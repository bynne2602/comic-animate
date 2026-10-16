import React from 'react';
import {AbsoluteFill,Audio,Composition,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import track from '../public/dienhong-haidang/timeline.json';
import {PortraitCast as Actor,CastRole} from './PortraitCast';
import {HistoryWorld} from './HistoryWorld';
import envelope from '../public/dienhong-haidang/envelope.json';

const ink='#211f25',paper='#fff9ed';
const ease=(v:number)=>1-Math.pow(1-Math.max(0,Math.min(v,1)),3);
// The approved recording is at 93%; play it at 95% without re-synthesizing the voice.
const voiceRate=95/93;

export const DienHongVertical:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),time=frame/fps*voiceRate;
 const scene=track.scenes.find(s=>time>=s.start&&time<s.end)||track.scenes.at(-1)!;
 const local=Math.max(0,time-scene.start),caption=track.captions.find(c=>time>=c.start&&time<c.end);
 const fade=Math.min(1,Math.max(0,(track.duration-time)/.35));
 const camera=scene.kind==='council'?1+.16*ease(local/1.2):scene.kind==='meaning'?1.16-.16*ease(local/1.3):scene.kind==='answer'?1+.18*ease((local-1.22)/1.15):scene.kind==='resolve'?1+.16*ease((local-3.35)/1.1):1;
 const lip=envelope[Math.min(envelope.length-1,Math.floor(time/.05))]||0;
 const narratorPose=(scene.kind==='answer'&&local>1.22&&local<3)||(scene.kind==='ending'&&local>5.96)?'raise':scene.kind==='council'&&local>1.7?'point':'talk';
 return <AbsoluteFill style={{background:paper,opacity:fade}}>
  <Audio src={staticFile('dienhong-haidang/narration.wav')} playbackRate={voiceRate} volume={1}/><Audio src={staticFile('dienhong-haidang/music.wav')} volume={.42}/>
  <svg width="1080" height="1920" viewBox="0 0 540 960" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{position:'absolute',inset:0}}>
   <defs><clipPath id="world-frame"><rect x="36" y="65" width="468" height="650" rx="3"/></clipPath></defs>
   <rect width="540" height="960" fill={paper}/>
   <g clipPath="url(#world-frame)"><svg x="36" y="65" width="468" height="650" viewBox="0 0 540 750"><g transform={`translate(${270-270*camera} ${375-375*camera}) scale(${camera})`}><HistoryWorld kind={scene.kind} local={local} time={time}/></g></svg></g>
   <rect x="36" y="65" width="468" height="650" rx="3" fill="none" stroke={ink} strokeWidth="4"/>
   <style>{`.presenter-halo * {stroke:#fffaf0!important;stroke-width:11px!important;fill:#fffaf0!important}`}</style><g className="presenter-halo"><Actor role="narrator" x={101} y={890} scale={.86} time={time} action={scene.kind==='answer'?local-1.22:scene.kind==='ending'?local-5.96:local-1.7} pose={narratorPose} mood="calm" lip={lip}/></g><g><Actor role="narrator" x={101} y={890} scale={.86} time={time} action={scene.kind==='answer'?local-1.22:scene.kind==='ending'?local-5.96:local-1.7} pose={narratorPose} mood="calm" lip={lip}/></g>
  </svg>
  {caption&&<div style={{position:'absolute',left:490,right:80,top:1515,textAlign:'left'}}><span style={{display:'inline-block',color:ink,font:'700 43px/1.27 Arial, sans-serif',textWrap:'balance'}}>{caption.text}</span></div>}
 </AbsoluteFill>;
};export const VerticalRoot:React.FC=()=> <Composition id="DienHong-Vertical" component={DienHongVertical} width={1080} height={1920} fps={30} durationInFrames={Math.ceil(track.duration/voiceRate*30)}/>;








