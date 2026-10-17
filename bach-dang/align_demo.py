import json,re,unicodedata,difflib
from pathlib import Path
from faster_whisper import WhisperModel
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/bachdang-demo'
track=json.loads((OUT/'timeline.json').read_text(encoding='utf-8'))
model=WhisperModel('base',device='cpu',compute_type='int8',cpu_threads=4,download_root='D:/animate/.hf-cache/hub')
def norm(s):return re.sub('[^a-z0-9]','',unicodedata.normalize('NFD',s.lower().replace('đ','d')).encode('ascii','ignore').decode())
captions=[];reports=[]
for i,scene in enumerate(track['scenes']):
 segments,_=model.transcribe(str(OUT/f'{i}-voice.wav'),language='vi',word_timestamps=True,beam_size=5,initial_prompt=scene['text'],condition_on_previous_text=False,vad_filter=True)
 recognized=[]
 for seg in segments:
  for w in seg.words or []:
   toks=w.word.split()
   for j,t in enumerate(toks):recognized.append(dict(text=t,start=w.start+(w.end-w.start)*j/len(toks),end=w.start+(w.end-w.start)*(j+1)/len(toks)))
 original=scene['text'].split(); anchors={}
 # ASR renders the spoken eight-syllable year as digits; expand only this known year.
 if i==1:
  boundary=next((k for k,w in enumerate(recognized) if norm(w['text'])=='doan'),None)
  if boundary and any(c.isdigit() for w in recognized[:boundary] for c in w['text']):
   left=recognized[0]['start'];right=recognized[boundary]['start']
   recognized=[dict(text=word,start=left+(right-left)*j/8,end=left+(right-left)*(j+1)/8) for j,word in enumerate(original[:8])]+recognized[boundary:]
 for block in difflib.SequenceMatcher(None,[norm(t) for t in original],[norm(w['text']) for w in recognized],autojunk=False).get_matching_blocks():
  for j in range(block.size): anchors[block.a+j]=recognized[block.b+j]['start']
 ratio=len(anchors)/len(original)
 print('ALIGN',i,round(ratio,3),' '.join(w['text'] for w in recognized),flush=True)
 if ratio<.72:raise RuntimeError('Low synthesis/script match')
 starts=[]; keys=sorted(anchors)
 for j in range(len(original)):
  if j in anchors:v=anchors[j]
  elif j<keys[0]:v=max(0,anchors[keys[0]]-(keys[0]-j)*.15)
  elif j>keys[-1]:v=anchors[keys[-1]]+(j-keys[-1])*.15
  else:
   l=max(k for k in keys if k<j);r=min(k for k in keys if k>j)
   v=anchors[l]+(anchors[r]-anchors[l])*(j-l)/(r-l)
  starts.append(scene['start']+.12+v)
 group=[]
 for j,w in enumerate(original):
  if group and (len(' '.join(original[k] for k in group))+len(w)>42 or len(group)>=8 or original[group[-1]].endswith(('.', '?','!'))):
   captions.append(dict(text=' '.join(original[k] for k in group),startMs=round(starts[group[0]]*1000),endMs=round(starts[j]*1000),timestampMs=None,confidence=None));group=[]
  group.append(j)
 last=next((w['end'] for w in reversed(recognized) if norm(w['text'])==norm(original[-1])),recognized[-1]['end'])
 if group:captions.append(dict(text=' '.join(original[k] for k in group),startMs=round(starts[group[0]]*1000),endMs=round((scene['start']+.12+last+.1)*1000),timestampMs=None,confidence=None))
 reports.append(dict(scene=i,matchedRatio=ratio,recognized=' '.join(w['text'] for w in recognized)))
balanced=[]
for c in captions:
 if balanced and len(c['text'].split())<=3 and not balanced[-1]['text'].endswith(('.', '?','!')):
  balanced[-1]['text']+=' '+c['text'];balanced[-1]['endMs']=c['endMs']
 else:balanced.append(c)
captions=balanced
track['captions']=captions;track['captionTiming']='Whisper base word timestamps matched to authored script'
(OUT/'timeline.json').write_text(json.dumps(track,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'bach-dang/alignment.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
def ts(ms):
 h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02}:{m:02}:{s:02},{ms:03}'
(ROOT/'bach-dang/demo-30s.srt').write_text('\n\n'.join(f'{i+1}\n{ts(c["startMs"])} --> {ts(c["endMs"])}\n{c["text"]}' for i,c in enumerate(captions)),encoding='utf-8-sig')
