"""Build only the approved first-stage 30-second demo, using the original voice."""
import json, subprocess, wave, math, array
from pathlib import Path
from vieneu import Vieneu

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'bachdang-demo'
OUT.mkdir(parents=True,exist_ok=True)
texts=[
 'Sau Diên Hồng, Đại Việt lại đối mặt quân Nguyên. Lần này, câu chuyện đưa ta đến sông Bạch Đằng.',
 'Năm một nghìn hai trăm tám mươi tám. Đoàn thuyền quân Nguyên đang tìm đường rút về.',
 'Trần Hưng Đạo chọn khúc sông này để bày trận. Nhưng thứ chờ địch lại nằm dưới mặt nước.',
 'Quân dân lặng lẽ đóng những hàng cọc gỗ. Khi thủy triều lên, đầu cọc chìm khuất.',
 'Cọc đã sẵn sàng. Thuyền nhẹ bắt đầu nhử địch. Nhưng muốn thắng, phải chờ đúng con nước.',
]
def run(*args): subprocess.run(list(map(str,args)),check=True)
def probe(path):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(path)]))
tts=Vieneu()
durations=[]
for i,text in enumerate(texts):
 raw=OUT/f'{i}-raw.wav'; dst=OUT/f'{i}-voice.wav'
 if not raw.exists(): tts.save(tts.infer(text,voice='Hải Đăng'),str(raw))
 run('ffmpeg','-y','-v','error','-i',raw,'-af','atempo=0.95,loudnorm=I=-16:TP=-1.5:LRA=7','-ar','48000','-ac','1',dst)
 durations.append(probe(dst)); print('VOICE',i,durations[-1],flush=True)
total=sum(durations)
if total>29.5:raise RuntimeError(f'Natural voice is {total:.2f}s; shorten script rather than accelerate approved voice.')
extra=(30-total)/5
frames=[round((d+extra)*30) for d in durations]
frames[-1]=900-sum(frames[:-1])
scenes=[]; captions=[]; cursor=0
for i,(text,d,n) in enumerate(zip(texts,durations,frames)):
 start=cursor/30; slot=n/30
 run('ffmpeg','-y','-v','error','-i',OUT/f'{i}-voice.wav','-af',f'adelay=120,apad=whole_dur={slot}','-t',slot,OUT/f'{i}-slot.wav')
 scenes.append(dict(index=i,startFrame=cursor,frames=n,start=start,end=(cursor+n)/30,text=text))
 parts=[s.strip()+'.' for s in text.split('.') if s.strip()]
 weight=sum(len(s) for s in parts); offset=start+.12
 for s in parts:
  length=d*len(s)/weight
  captions.append(dict(text=s,startMs=round(offset*1000),endMs=round((offset+length)*1000),timestampMs=None,confidence=None))
  offset+=length
 cursor+=n
(OUT/'concat.txt').write_text(''.join(f"file '{i}-slot.wav'\n" for i in range(5)),encoding='utf-8')
run('ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',OUT/'concat.txt','-c:a','pcm_s16le',OUT/'narration.wav')
with wave.open(str(OUT/'narration.wav')) as w:
 sr=w.getframerate(); samples=array.array('h',w.readframes(w.getnframes()))
 env=[min(1,math.sqrt(sum(x*x for x in samples[k:k+sr//20])/max(1,len(samples[k:k+sr//20])))/4200) for k in range(0,len(samples),sr//20)]
(OUT/'envelope.json').write_text(json.dumps(env),encoding='utf-8')
(OUT/'timeline.json').write_text(json.dumps(dict(duration=30,fps=30,voice='Hải Đăng',speed=.95,scenes=scenes,captions=captions,captionTiming='sentence-weighted; scene audio boundaries measured'),ensure_ascii=False,indent=2),encoding='utf-8')
print('COMPLETE',frames,flush=True)
