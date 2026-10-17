import {useCurrentFrame,useVideoConfig} from 'remotion';
import {River} from '../DepthScenery';
import {PortraitCast as Actor} from '../PortraitCast';
import {Stage,Bubble,Stake,ease} from './Stage';
export const HiddenStakes=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps,water=ease((t-2.4)/2);
 return <Stage index={3} river><River time={t}/>
  <path d="M-20 531q143-16 262 109L211 750H-20Z" fill="#d8c69f"/>
  <g>{[0,1,2].map(i=><Stake key={i} x={269+i*79} y={507+i*49+10*ease(t/1.8)} s={.75+i*.1}/>)}{[0,1].map(i=><Stake key={i} x={330+i*130} y={590+i*25} s={1.1}/>)}</g>
  <path d={`M232 ${565-water*118}Q388 ${535-water*118} 560 ${606-water*118}V790H205Z`} fill="#79b7bd"/>
  <path d={`M255 ${571-water*118}q43-9 79 3m28 19q43-9 79 3`} stroke="#c2dcce" strokeWidth={3} fill="none"/>
  <Actor role="guard" x={100+18*ease(t)} y={688} scale={.76} time={t} pose="point" action={t} mood="calm"/>
  <Bubble lines={t<2.6?['LẶNG LẼ DỰNG BÃI CỌC']:['TRIỀU LÊN • CỌC CHÌM']}/>
 </Stage>;
};
