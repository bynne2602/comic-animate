import http from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(await readFile(path.join(root,'project.json'),'utf8'));
const routes=new Map([['/', ['tools/watch.html','text/html; charset=utf-8']],['/watch.html',['tools/watch.html','text/html; charset=utf-8']],['/video.mp4',[config.video,'video/mp4']],['/subtitles.srt',[config.subtitles,'application/x-subrip; charset=utf-8']]]);
http.createServer((req,res)=>{
 const item=routes.get(new URL(req.url,'http://localhost').pathname);
 if(!item){res.writeHead(404);return res.end('Not found');}
 const file=path.join(root,item[0]);
 if(!existsSync(file)){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Chưa có file video. Chạy npm run render hoặc dùng bản MP4 kèm gói bàn giao.');}
 const size=statSync(file).size;let start=0,end=size-1,status=200;
 if(req.headers.range){
  const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}
  if(m[1]){start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),size-1):size-1;}else start=Math.max(0,size-Number(m[2]));
  if(start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}status=206;
 }
 const headers={'Content-Type':item[1],'Content-Length':end-start+1,'Accept-Ranges':'bytes','Cache-Control':'no-cache'};
 if(status===206)headers['Content-Range']=`bytes ${start}-${end}/${size}`;
 res.writeHead(status,headers);if(req.method==='HEAD')return res.end();
 const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
}).listen(config.previewPort,'127.0.0.1',()=>console.log(`Mở http://localhost:${config.previewPort}/watch.html`));
