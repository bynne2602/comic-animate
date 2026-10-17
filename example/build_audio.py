# Speech synthesis: VieNeu-TTS by Phạm Nguyễn Ngọc Bảo (pnnbao97).
# https://github.com/pnnbao97/VieNeu-TTS — see THIRD_PARTY_NOTICES.md.
import hashlib,json,subprocess
from pathlib import Path
from vieneu import Vieneu

ROOT=Path(__file__).resolve().parent
PUBLIC=ROOT.parent/'public'/'dienhong-haidang'
CACHE=ROOT/'voice-haidang';CACHE.mkdir(exist_ok=True);PUBLIC.mkdir(exist_ok=True)
old=json.loads((ROOT.parent/'content/source-timeline.json').read_text(encoding='utf-8'))
def run(*args):subprocess.run(list(map(str,args)),check=True)
def probe(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)]))
tts=Vieneu()
scenes=[];cursor=0;files=[]
for i,scene in enumerate(old['scenes']):
    text=scene['text'];key=hashlib.sha256(('Hải Đăng|'+text).encode()).hexdigest()[:12]
    raw=CACHE/f'{i:02d}-{key}.wav';wav=CACHE/f'{i:02d}-slow.wav'
    if not raw.exists():
        audio=tts.infer(text,voice='Hải Đăng');tts.save(audio,str(raw))
    # 93% of the selected sample's native speed, preserving pitch.
    run('ffmpeg','-y','-v','error','-i',raw,'-af','atempo=0.93','-ar','48000','-ac','2',wav)
    duration=probe(wav);scenes.append(dict(scene,start=round(cursor,6),end=round(cursor+duration,6)))
    cursor+=duration;files.append(wav)
    print('VOICE',i,scene['kind'],round(duration,2),flush=True)
(CACHE/'concat.txt').write_text(''.join("file '"+p.as_posix()+"'\n" for p in files),encoding='utf-8')
run('ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',CACHE/'concat.txt','-af','loudnorm=I=-16:TP=-1.5:LRA=7','-ar','48000','-ac','2',PUBLIC/'narration.wav')
captions=[]
for a,b in zip(old['scenes'],scenes):
    ratio=(b['end']-b['start'])/(a['end']-a['start'])
    for c in old['captions']:
        if a['start']<=c['start']<a['end']:
            captions.append(dict(c,start=b['start']+(c['start']-a['start'])*ratio,end=min(b['end'],b['start']+(c['end']-a['start'])*ratio)))
data={'duration':probe(PUBLIC/'narration.wav')+.45,'fps':30,'voice':'Hải Đăng','engine':'VieNeu v3 Turbo','speed':.93,'scenes':scenes,'captions':captions,'captionTiming':'provisional scene-scaled; alignment pending'}
(PUBLIC/'timeline.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
run('ffmpeg','-y','-v','error','-stream_loop','-1','-i',ROOT.parent/'content/music-seed.wav','-t',data['duration'],'-af',f'afade=t=out:st={data["duration"]-.8}:d=0.8',PUBLIC/'music.wav')
(PUBLIC/'voice-settings.json').write_text(json.dumps({'voice':'Hải Đăng','audition':10,'engine':'VieNeu v3 Turbo','speedMultiplier':.93,'pitchPreserved':True},ensure_ascii=False,indent=2),encoding='utf-8')
print('COMPLETE',data['duration'],flush=True)
