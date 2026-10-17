import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Village} from '../DepthScenery';
import {PortraitCast as Actor} from '../PortraitCast';
import {Stage,Bubble,ease} from './Stage';
export const AfterDienHong=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <Stage index={0}><Village/>
  <Actor role="guard" x={405-55*ease(t/1.5)} y={647} scale={.73} time={t} pose={t<2?'walk':'point'} action={t-2} mood="calm"/>
  <Actor role="elder" x={170} y={701} scale={1.03} time={t} pose="talk" mood="think"/>
  <Bubble lines={t<2.5?['SAU TIẾNG HÔ DIÊN HỒNG']:['MỘT TRẬN ĐÁNH MỚI…']}/>
 </Stage>;
};
