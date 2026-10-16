import React,{createContext,useContext} from 'react';

export const DepthTime=createContext(0);
const line='#817667';

/** Distant silhouettes have no ink outline; contrast increases toward the viewer. */
export function Hills(){
 const time=useContext(DepthTime),drift=Math.sin(time*.17)*2.5;
 return <g data-depth="background">
  <defs><linearGradient id="depth-sky" x2="0" y2="1"><stop stopColor="#d8e9e7"/><stop offset="1" stopColor="#f5edda"/></linearGradient></defs>
  <rect x="-60" y="-60" width="660" height="870" fill="url(#depth-sky)"/>
  <circle cx="426" cy="125" r="34" fill="#f4dba7" opacity=".8"/>
  <g transform={`translate(${drift} 0)`}>
   <path d="M-90 377Q-5 330 65 265Q100 235 137 283L230 367Q305 300 354 276Q395 251 425 294L630 408V570H-90Z" fill="#c2d4cb"/>
   <path d="M-80 426Q5 355 79 373Q159 394 219 357Q291 333 356 393Q419 349 600 418V590H-80Z" fill="#a9c4b3"/>
   <path d="M-40 405q139-24 253 8t400 2" fill="none" stroke="#e0e9db" strokeWidth="16" opacity=".55"/>
  </g>
 </g>;
}

function House({x,y,s=1,barn=false,far=false}:{x:number;y:number;s?:number;barn?:boolean;far?:boolean}){
 return <g data-depth={far?'distant-building':'middle-building'} transform={`translate(${x} ${y}) scale(${s})`} stroke={far?'#aaa78f':line} strokeWidth={far?1.5:2.3} strokeLinejoin="round" opacity={far?.62:1}>
  <path d="M-79-5H79v112H-79Z" fill={far?'#d6cdb1':barn?'#ccad81':'#ead6ae'}/>
  <path d="M-97-4l97-68 98 68z" fill={far?'#b6ac91':'#bd8c6b'}/>
  <path d="M-78-5H79" stroke={far?'#b4ae96':'#a77a5f'} strokeWidth="4"/>
  <path d="M-21 107V28h43v79" fill={far?'#b3ad97':'#9c8c79'}/>
  {!far&&<><rect x="-61" y="31" width="25" height="28" rx="1" fill="#b9c6ac"/><path d="M-49 32v26" fill="none" strokeWidth="1.4"/>{barn&&<path d="M39 34v64m17-64v64" fill="none" stroke="#a78b66" strokeWidth="2"/>}</>}
  <path d="M-86 112H88" strokeWidth="3"/>
 </g>;
}

function Tree({x,y,s=1}:{x:number;y:number;s?:number}){
 return <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#78866a" strokeWidth="2.2" strokeLinejoin="round">
  <path d="M-9 100l7-104h12l12 104" fill="#a49372"/>
  <path d="M-33 17Q-73-3-52-36Q-46-61-17-55Q6-85 32-54Q66-57 65-20Q82 15 45 24Q7 40-33 17Z" fill="#8faf83"/>
  <path d="M-49-26q13-25 39-17" stroke="#b5c399" fill="none" strokeWidth="4"/>
 </g>;
}

export function Village(){return <>
 <Hills/>
 <g data-depth="middle-ground">
  <path d="M-40 428Q244 371 580 425V750H-40" fill="#b9cda5"/>
  <path d="M-40 475Q131 438 276 471L252 512Q104 478-40 531ZM327 455Q452 415 580 468V524Q433 477 330 498Z" fill="#cbd5af"/>
  <House x={407} y={343} s={.45} far/>
  <House x={119} y={382} s={.91}/>
  <Tree x={472} y={430} s={.84}/>
 </g>
 <g data-depth="character-ground">
  <path d="M-30 545Q236 505 570 548V790H-30" fill="#d8d1b3"/>
  <path d="M270 479q-7 105-48 142L115 790H421L307 617q-26-46-20-138" fill="#ecddbb"/>
  <path d="M-30 602q119-28 226-7m141-2q94-21 235 9" fill="none" stroke="#b6bd99" strokeWidth="2" opacity=".48"/>
 </g>
 </>;}

export function Palace({yard=false}:{yard?:boolean}){return <>
 <Hills/>
 <g data-depth="middle-building" stroke={line} strokeWidth="2.2" strokeLinejoin="round">
  <path d="M40 270H500V545H40Z" fill="#e8d7b6"/>
  <path d="M12 270Q81 250 104 190H435Q460 249 530 270l-22 17H31Z" fill="#bb8a70"/>
  <path d="M67 267H478" fill="none" stroke="#d8af86" strokeWidth="4"/>
  <path d="M157 311Q270 271 384 311V532H157Z" fill="#b9ab97" stroke="none"/>
  <path d="M190 319H350V532H190Z" fill="#c8b9a0" stroke="none"/>
  <path d="M270 319v213" fill="none" stroke="#b1a58e" strokeWidth="2"/>
  {[88,452].map(x=><g key={x}><path d={`M${x-10} 285h20v250h-20z`} fill="#ba8d75"/><path d={`M${x-14} 530h28v12h-28z`} fill="#d6b48c"/></g>)}
  <path d="M42 541h456l23 22H19Z" fill="#d1bc98"/>
 </g>
 <g data-depth="character-ground">
  <path d="M-30 562H570V790H-30Z" fill={yard?'#d9cfb5':'#e9dcc0'}/>
  <path d="M40 563 2 790m498-227 38 227M-20 649h580" fill="none" stroke="#c6b997" strokeWidth="1.8" opacity=".5"/>
  {!yard&&<><path d="M226 549h88l68 241H159Z" fill="#c78f7d"/><path d="M232 549 169 790m139-241 65 241" fill="none" stroke="#e5c49b" strokeWidth="3"/><path d="M239 523V435q30-18 61 0v88z" fill="#ceb080" stroke="#a58f6d" strokeWidth="2"/><circle cx="270" cy="451" r="13" fill="#e3c695" stroke="none"/></>}
 </g>
 </>;}

export function River({time}:{time:number}){return <>
 <Hills/>
 <g data-depth="river-distance">
  <path d="M-30 379q177-67 315 15l-28 57q-148-64-287 6Z" fill="#b5c8a2"/>
  <path d="M365 407q78-62 206-42v105l-169-9Z" fill="#b5c8a2"/>
  <path d="M245 384h58q-19 69 62 112L600 673V800H-40V631l252-149q55-28 33-98Z" fill="#a3cecd"/>
  <path d="M-30 523Q248 463 585 544V790H-30" fill="#79b7bd"/>
  <path d="M-30 681Q241 578 582 675V790H-30" fill="#639fa9"/>
 </g>
 <g fill="none" stroke="#c2dcce" strokeWidth="3" strokeLinecap="round" opacity=".7">{[0,1,2,3,4].map(i=><path key={i} d={`M${i%2?320:18} ${485+i*52}q29-5 62 0`} transform={`translate(${Math.sin(time*.7+i)*4} 0)`}/>)}</g>
 </>;}

export function Store(){return <>
 <Hills/>
 <path d="M-40 451Q249 402 580 447V790H-40Z" fill="#b9c6a2"/>
 <g data-depth="middle-building"><Tree x={486} y={442} s={.7}/><House x={279} y={349} s={1.3} barn/></g>
 <path d="M-30 545Q254 503 570 545V790H-30Z" fill="#ded0ad"/>
 <path d="M252 507h40l79 283H163Z" fill="#eddfbd"/>
 <g fill="#d8bb84" stroke="#8f7d61" strokeWidth="2">{[0,1].map(i=><path key={i} d={`M${63+i*48} 689q-14-43 7-58l-3-10h20l-3 10q21 15 8 58Z`}/>)}</g>
 </>;}

/** Cropped near-edge silhouettes frame the action without crossing faces or hands. */
export function Foreground({kind,time}:{kind:string;time:number}){
 const river=kind==='fight',palace=['council','answer','meaning','ending'].includes(kind);
 const shift=Math.sin(time*.17)*5;
 return <g data-depth="foreground" transform={`translate(${shift} 0)`} strokeLinecap="round" strokeLinejoin="round">
  {river?<g fill="#3e7479" stroke="#426e70" strokeWidth="2"><path d="M-20 790 6 679l7 92 20-58-5 77ZM515 790l-4-111 14 81 23-63 13 93Z"/><path d="M-20 744q39-24 58 1M508 746q27-15 66 0" fill="none" strokeWidth="5"/></g>:palace?<g fill="#aa9a81"><path d="M-20 746 56 727l30 63H-20ZM467 790l24-60 71 15v45Z"/><path d="M-20 748 56 731m437 3 69 15" stroke="#8e816d" strokeWidth="3"/></g>:<g fill="#64866b" stroke="#4e725e" strokeWidth="2.5"><path d="M-30 790v-60q11-22 28-9 3-31 25-22 17 7 11 29 31-6 38 18l10 44ZM480 790l4-42q4-22 25-18 1-30 22-24 24 3 18 30 22-7 30 18v36Z"/><path d="M8 772l6-31m-1 18 18-10m481 21 11-28" fill="none" stroke="#a4b290" strokeWidth="2"/></g>}
 </g>;
}
