import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile,stat} from 'node:fs/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../exports/voice-preview');
const files=new Map([['/','index.html'],['/index.html','index.html'],['/voices.json','voices.json']]);
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  const relative=files.get(url.pathname)??(/^\/audio\/[a-f0-9]{16}\.wav$/.test(url.pathname)?url.pathname.slice(1):null);
  if(!relative){res.writeHead(404);return res.end('Not found')}
  const file=path.join(root,relative);await stat(file);const data=await readFile(file);
  res.writeHead(200,{'Content-Type':relative.endsWith('.wav')?'audio/wav':relative.endsWith('.json')?'application/json; charset=utf-8':'text/html; charset=utf-8','Content-Length':data.length,'Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Chưa có mẫu giọng. Chạy npm run voices:generate trước. / Run npm run voices:generate first.')}
});
server.listen(3052,'127.0.0.1',()=>console.log('Voice preview: http://localhost:3052'));
server.on('error',e=>{console.error(e.message);process.exitCode=1});
