"""Generate comparable samples for every preset in the installed VieNeu engine."""
import argparse,hashlib,json,sys
from pathlib import Path
from vieneu import Vieneu

ROOT=Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--text',default='Xin chào, đây là giọng đọc thử cho video của bạn. Hãy lắng nghe và chọn giọng phù hợp với câu chuyện.')
parser.add_argument('--list',action='store_true',help='List current engine presets without synthesizing')
args=parser.parse_args()
if not args.text.strip():parser.error('Sample text must not be empty')
tts=Vieneu()
presets=tts.list_preset_voices()
if args.list:
 print(json.dumps(presets,ensure_ascii=False,indent=2))
 raise SystemExit(0)
out=ROOT/'exports/voice-preview';out.mkdir(parents=True,exist_ok=True)
(out/'audio').mkdir(exist_ok=True)
(out/'index.html').write_bytes((ROOT/'tools/voice-preview.html').read_bytes())
voices=[]
for label,name in presets:
 key=hashlib.sha256(('vieneu==3.8.3|'+name+'|'+args.text).encode()).hexdigest()[:16]
 filename=f'audio/{key}.wav';target=out/filename
 if not target.exists():
  temp=target.with_name(target.stem+'-pending.wav')
  tts.save(tts.infer(args.text,voice=name),str(temp))
  temp.replace(target)
 clean=label.removeprefix('⭐ ').strip();detail=clean.split(' — ',1)[-1].split(' · ')
 voices.append(dict(name=name,label=label,gender=detail[0],region=detail[1],style=' · '.join(detail[2:]),file=filename))
 print(f'{len(voices)}/{len(presets)} {name}',flush=True)
(out/'voices.json').write_text(json.dumps(dict(engine='VieNeu v3 Turbo',text=args.text,voices=voices),ensure_ascii=False,indent=2),encoding='utf-8')
print('Ready. Run npm run voices:preview and open http://localhost:3052',flush=True)
