import {useCurrentFrame,useVideoConfig} from 'remotion';
import {River} from '../DepthScenery';
import {PortraitCast as Actor} from '../PortraitCast';
import {Stage,Bubble} from './Stage';
export const RiverPlan=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <Stage index={2} river><River time={t}/>
  <path d="M-20 578Q159 493 285 632l-45 118H-20Z" fill="#c5c69f"/>
  <path d="M-20 621q140-62 241 50l-12 79H-20Z" fill="#dfd0ad"/>
  <g transform="translate(175 690) scale(1.06)" fill="#a76059" stroke="#211f25" strokeWidth={4}><path d="M-43-165Q-79-147-82-47l49 16 48-35 43 33q-4-95-48-131Z"/></g>
  <Actor role="guard" x={175} y={690} scale={1.06} time={t} pose="point" action={t} mood="think"/>
  <Actor role="guard" x={440} y={693} scale={.67} time={t+1} pose="rest" mood="think"/>
  <Bubble lines={t<2.6?['TRẦN HƯNG ĐẠO BÀY TRẬN']:['BÍ MẬT DƯỚI MẶT NƯỚC']}/>
 </Stage>;
};
