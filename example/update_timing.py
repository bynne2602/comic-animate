"""After optional re-synthesis/alignment, refresh lip envelope and the approved95% SRT."""
import json, subprocess
from pathlib import Path
import numpy as np

ROOT=Path(__file__).resolve().parent
PUBLIC=ROOT.parent/'public'/'dienhong-haidang'
track=json.loads((PUBLIC/'timeline.json').read_text(encoding='utf-8'))
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(PUBLIC/'narration.wav'),'-ac','1','-ar','16000','-f','s16le','-'])
samples=np.frombuffer(raw,dtype='<i2').astype(np.float64)/32768
window=800
rms=np.array([np.sqrt(np.mean(samples[i:i+window]**2)) for i in range(0,len(samples),window)])
scale=max(float(np.percentile(rms,95)),.001)
envelope=np.clip((rms-.002)/scale,0,1)
(PUBLIC/'envelope.json').write_text(json.dumps([round(float(x),4) for x in envelope]),encoding='utf-8')
rate=95/93
def timestamp(seconds):
 ms=round(seconds*1000)
 return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
parts=[]
for i,c in enumerate(track['captions'],1):
 parts.append(f"{i}\n{timestamp(c['start']/rate)} --> {timestamp(c['end']/rate)}\n{c['text']}\n")
(ROOT/'subtitles-95.srt').write_text('\n'.join(parts),encoding='utf-8-sig')
print('Updated source93% lip envelope and delivery95% subtitles. Playback remains95/93.')
