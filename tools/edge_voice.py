"""Foreign-language narration and auditions via rany2/edge-tts.

Uses Microsoft's online speech service. See THIRD_PARTY_NOTICES.md.
"""
import argparse,asyncio,hashlib,json,sys,uuid
from pathlib import Path
import edge_tts

ROOT=Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser(description=__doc__)
mode=parser.add_mutually_exclusive_group(required=True)
mode.add_argument('--list',action='store_true')
mode.add_argument('--preview',action='store_true')
mode.add_argument('--output',type=Path,help='Write narration to a new MP3 file')
parser.add_argument('--locale',help='Filter voice list, e.g. en-US, ja-JP, or en')
parser.add_argument('--voice',help='Exact ShortName from the service voice list')
source=parser.add_mutually_exclusive_group()
source.add_argument('--text')
source.add_argument('--text-file',type=Path,help='UTF-8 narration-only text file')
parser.add_argument('--rate',default='+0%',help='Service rate, e.g. --rate=-5% for 95% speed')
parser.add_argument('--limit',type=int,default=4,help='Maximum preview voices; default 4')
args=parser.parse_args()
SAMPLES={
 'en':'Hello! This is a sample voice for your video. Listen and choose the voice that fits your story.',
 'ja':'こんにちは。これは動画のための音声サンプルです。物語に合う声を選んでください。',
 'ko':'안녕하세요. 동영상에 사용할 음성 샘플입니다. 이야기에 어울리는 목소리를 선택해 주세요.',
 'zh':'你好，这是视频的语音试听。请听一听，选择适合你的故事的声音。',
 'fr':'Bonjour, voici une voix pour votre vidéo. Écoutez et choisissez la voix qui correspond à votre histoire.',
 'de':'Hallo, das ist eine Beispielstimme für dein Video. Wähle die Stimme, die zu deiner Geschichte passt.',
 'es':'Hola, esta es una voz de prueba para tu vídeo. Escucha y elige la voz que mejor se adapte a tu historia.',
}

async def save_audio(text,voice,target,rate):
 if target.suffix.lower()!='.mp3':raise ValueError('Output must be an .mp3 file')
 if target.exists():raise FileExistsError(f'Output exists: {target}; choose another filename')
 target.parent.mkdir(parents=True,exist_ok=True)
 temp=target.with_name(target.stem+'.'+uuid.uuid4().hex+'.pending.mp3')
 try:
  await asyncio.wait_for(edge_tts.Communicate(text,voice,rate=rate).save(str(temp)),timeout=60)
  if not temp.is_file() or temp.stat().st_size==0:raise RuntimeError('Speech service returned no audio')
  temp.rename(target)
 finally:
  if temp.exists():temp.unlink()

async def main():
 voices=await asyncio.wait_for(edge_tts.list_voices(),timeout=30)
 out=ROOT/'exports/voice-preview/edge';out.mkdir(parents=True,exist_ok=True)
 (out/'catalog.json').write_text(json.dumps(voices,ensure_ascii=False,indent=2),encoding='utf-8')
 chosen=[v for v in voices if (not args.locale or v['Locale'].lower()==args.locale.lower() or v['Locale'].lower().startswith(args.locale.lower()+'-')) and (not args.voice or v['ShortName']==args.voice)]
 if not chosen:raise ValueError('No matching voice; use --list to check available ShortName and Locale')
 if args.list:
  print(json.dumps(chosen,ensure_ascii=False,indent=2));return
 if args.output and not args.voice:raise ValueError('Narration requires --voice; audition and select a voice first')
 if args.limit<1:raise ValueError('--limit must be positive')
 locale=args.locale or (chosen[0]['Locale'] if args.voice else 'en-US')
 text=args.text_file.read_text(encoding='utf-8-sig') if args.text_file else args.text
 if text is None:
  if args.output:raise ValueError('Narration requires --text or --text-file')
  text=SAMPLES.get(locale.split('-')[0])
  if text is None:raise ValueError('Supply --text in the selected language')
 if not text.strip():raise ValueError('Narration text must not be empty')
 if args.output:
  await save_audio(text,args.voice,args.output,args.rate)
  print(f'Saved: {args.output} | Edge TTS | {args.voice} | rate={args.rate}');return
 if args.rate!='+0%':raise ValueError('Preview samples use --rate=+0%; adjust listening speed in the browser')
 if not args.locale and not args.voice:chosen=[v for v in chosen if v['Locale']=='en-US']
 items=[]
 for voice in chosen[:args.limit]:
  name=voice['ShortName'];key=hashlib.sha256(('edge-tts==7.3.1|'+name+'|'+text).encode()).hexdigest()[:16]
  file=f'audio/{key}.mp3';target=out/file
  if not target.exists():await save_audio(text,name,target,'+0%')
  items.append(dict(name=name,gender='Nữ' if voice['Gender']=='Female' else 'Nam',region=voice['Locale'],style=', '.join(voice.get('VoiceTag',{}).get('VoicePersonalities',[])),file=file))
  print(f'{len(items)}/{min(len(chosen),args.limit)} {name}',flush=True)
 html=(ROOT/'tools/voice-preview.html').read_text(encoding='utf-8')
 html=html.replace('VieNeu v3 Turbo ·','Edge TTS ·')
 html=html.replace('TTS bởi <a href="https://github.com/pnnbao97/VieNeu-TTS" target="_blank" rel="noopener noreferrer">VieNeu-TTS</a> · Phạm Nguyễn Ngọc Bảo (pnnbao97) · Apache-2.0.','TTS: Microsoft Edge online speech · client <a href="https://github.com/rany2/edge-tts" target="_blank" rel="noopener noreferrer">rany2/edge-tts</a>.')
 (out/'index.html').write_text(html,encoding='utf-8')
 (out/'voices.json').write_text(json.dumps(dict(engine='Edge TTS',text=text,voices=items),ensure_ascii=False,indent=2),encoding='utf-8')
 print('Open http://localhost:3052/edge/ after starting npm run voices:preview')

if __name__=='__main__':
 try:asyncio.run(main())
 except (Exception,KeyboardInterrupt) as error:
  print(f'Edge TTS failed: {type(error).__name__}: {error}',file=sys.stderr);sys.exit(1)
