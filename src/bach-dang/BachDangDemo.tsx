import {AbsoluteFill,Audio,Composition,Folder,Series,staticFile,useVideoConfig} from 'remotion';
import {AfterDienHong} from './AfterDienHong';
import {RetreatFleet} from './RetreatFleet';
import {RiverPlan} from './RiverPlan';
import {HiddenStakes} from './HiddenStakes';
import {WaitForTide} from './WaitForTide';

export const BachDangDemo=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill>
  <Audio src={staticFile('bachdang-demo/narration.wav')}/>
  <Audio src={staticFile('dienhong-haidang/music.wav')} volume={f=>Math.min(1,f/fps,(30*fps-f)/fps)*.30}/>
  <Series>
   <Series.Sequence name="Sau Diên Hồng" durationInFrames={197} premountFor={fps}><AfterDienHong/></Series.Sequence>
   <Series.Sequence name="Đoàn thuyền rút lui" durationInFrames={169} premountFor={fps}><RetreatFleet/></Series.Sequence>
   <Series.Sequence name="Hưng Đạo bày trận" durationInFrames={174} premountFor={fps}><RiverPlan/></Series.Sequence>
   <Series.Sequence name="Bãi cọc và thủy triều" durationInFrames={177} premountFor={fps}><HiddenStakes/></Series.Sequence>
   <Series.Sequence name="Nhử địch, chờ nước" durationInFrames={183} premountFor={fps}><WaitForTide/></Series.Sequence>
  </Series>
 </AbsoluteFill>;
};
export const BachDangCompositions=()=> <>
 <Composition id="BachDang-Demo-30s" component={BachDangDemo} width={1080} height={1920} fps={30} durationInFrames={900}/>
 <Folder name="BachDang-Scenes">
  <Composition id="BD-SauDienHong" component={AfterDienHong} width={1080} height={1920} fps={30} durationInFrames={197}/>
  <Composition id="BD-DoanThuyen" component={RetreatFleet} width={1080} height={1920} fps={30} durationInFrames={169}/>
  <Composition id="BD-BayTran" component={RiverPlan} width={1080} height={1920} fps={30} durationInFrames={174}/>
  <Composition id="BD-BaiCoc" component={HiddenStakes} width={1080} height={1920} fps={30} durationInFrames={177}/>
  <Composition id="BD-ChoConNuoc" component={WaitForTide} width={1080} height={1920} fps={30} durationInFrames={183}/>
 </Folder>
</>;
