import json,re,unicodedata,difflib
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel
ROOT=Path(__file__).resolve().parent
PUBLIC=ROOT.parent/'public/dienhong-haidang'
track=json.loads((PUBLIC/'timeline.json').read_text(encoding='utf-8'))
model=WhisperModel('base',device='cpu',compute_type='int8',cpu_threads=4)
def norm(s):
 return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFD',s.lower().replace('đ','d')).encode('ascii','ignore').decode())
captions=[];reports=[]
for i,scene in enumerate(track['scenes']):
 segments,_=model.transcribe(str(ROOT/f'voice-haidang/{i:02d}-slow.wav'),language='vi',word_timestamps=True,beam_size=5,initial_prompt=scene['text'],condition_on_previous_text=False)
 recognized=[]
 for seg in segments:
  for w in seg.words or []:
   tokens=w.word.split()
   for j,t in enumerate(tokens): recognized.append({'text':t,'start':w.start+(w.end-w.start)*j/len(tokens),'end':w.start+(w.end-w.start)*(j+1)/len(tokens)})
 original=scene['text'].split();a=[norm(t) for t in original];b=[norm(w['text']) for w in recognized]
 matches=difflib.SequenceMatcher(None,a,b,autojunk=False);anchors={}
 for block in matches.get_matching_blocks():
  for j in range(block.size):anchors[block.a+j]=recognized[block.b+j]['start']
 ratio=len(anchors)/len(a);print('ALIGN',scene['kind'],round(ratio,3),' '.join(w['text'] for w in recognized),flush=True)
 if ratio<.72: raise RuntimeError('Low text match: inspect synthesis '+scene['kind'])
 x=sorted(anchors);ys=[anchors[k] for k in x];dur=scene['end']-scene['start']
 starts=[float(np.interp(j,x,ys)) for j in range(len(original))]
 # Fill unrecognized edge words by syllable duration; do not change locked text.
 for j in range(x[0]-1,-1,-1):starts[j]=max(0,starts[j+1]-.16)
 for j in range(x[-1]+1,len(original)):starts[j]=min(dur-.06,starts[j-1]+.16)
 group=[]
 for j,w in enumerate(original):
  if group and (len(' '.join(original[k] for k in group))+len(w)>42 or len(group)>=8 or original[group[-1]].endswith(('.', '?','!',':'))):
   captions.append({'start':scene['start']+starts[group[0]],'end':scene['start']+starts[j],'text':' '.join(original[k] for k in group)});group=[]
  group.append(j)
 if group:captions.append({'start':scene['start']+starts[group[0]],'end':scene['end'],'text':' '.join(original[k] for k in group)})
 reports.append({'scene':scene['kind'],'matchedRatio':ratio,'recognized':' '.join(w['text'] for w in recognized)})
track['captions']=captions;track['captionTiming']='Whisper base word timestamps matched against locked Vietnamese script'
(PUBLIC/'timeline.json').write_text(json.dumps(track,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'voice-haidang/alignment.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
def ts(v):
 ms=round(v*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000);return f'{h:02}:{m:02}:{s:02},{ms:03}'
(ROOT/'dien-hong-haidang.srt').write_text('\n\n'.join(f'{i+1}\n{ts(c["start"])} --> {ts(c["end"])}\n{c["text"]}' for i,c in enumerate(captions)),encoding='utf-8-sig')
print('ALIGNED',len(captions),flush=True)
