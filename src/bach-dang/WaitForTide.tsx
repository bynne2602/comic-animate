import {useCurrentFrame,useVideoConfig} from 'remotion';
import {River} from '../DepthScenery';
import {Stage,Bubble,Ship,ease} from './Stage';
export const WaitForTide=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <Stage index={4} river><River time={t}/>
  <Ship x={390-36*ease(t/5)} y={444} s={.59} time={t} enemy/>
  <Ship x={125+102*ease(t/5)} y={631} s={1.06} time={t+1}/>
  <Bubble lines={t<2.5?['THUYỀN NHẸ NHỬ ĐỊCH']:['CHỜ ĐÚNG CON NƯỚC…']}/>
 </Stage>;
};
