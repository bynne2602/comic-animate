import {useCurrentFrame,useVideoConfig} from 'remotion';
import {River} from '../DepthScenery';
import {Stage,Bubble,Ship,ease} from './Stage';
export const RetreatFleet=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <Stage index={1} river><River time={t}/>
  <Ship x={380-40*ease(t/5)} y={430} s={.52} time={t} enemy/>
  <Ship x={135+30*ease(t/5)} y={524} s={.78} time={t+1} enemy/>
  <Ship x={355-50*ease(t/5)} y={670} s={1.08} time={t+2} enemy/>
  <Bubble lines={t<2.4?['BẠCH ĐẰNG • 1288']:['QUÂN NGUYÊN RÚT LUI']}/>
 </Stage>;
};
