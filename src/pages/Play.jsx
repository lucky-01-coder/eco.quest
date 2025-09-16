import React, { useEffect, useMemo, useRef, useState } from 'react';

function Tabs(){
  const [hash,setHash]=useState(()=>window.location.hash||'#quiz');
  useEffect(()=>{
    const fn=()=>setHash(window.location.hash||'#quiz');
    window.addEventListener('hashchange',fn);
    return ()=>window.removeEventListener('hashchange',fn);
  },[]);
  const tabs=[{id:'quiz',label:'Eco Quiz'},{id:'waste',label:'Waste Sorter'},{id:'energy',label:'Energy Saver'},{id:'transit',label:'Transit Ranker'}];
  return (
    <nav className="tabs">
      {tabs.map(t=> (
        <a key={t.id} href={`#${t.id}`} className={`tab${hash===`#${t.id}`?' active':''}`}>{t.label}</a>
      ))}
    </nav>
  );
}

function Quiz(){
  const QUESTIONS = useMemo(()=>[
    { q: 'Which gas is the main driver of climate change?', options: ['Oxygen','Carbon dioxide','Nitrogen','Helium'], answer: 1 },
    { q: 'Best practice to cut energy at school?', options: ['Leave lights on','Use LED bulbs','Open windows in winter','Run devices overnight'], answer: 1 },
    { q: 'Which goes into compost?', options: ['Banana peel','Glass bottle','Aluminum can','Plastic wrapper'], answer: 0 },
    { q: 'Reduce, reuse, ____?', options: ['Repeat','React','Recycle','Refill'], answer: 2 },
    { q: 'Cleaner commute option?', options: ['Car alone','Carpool','Idling car','Private jet'], answer: 1 },
  ],[]);
  const [qi,setQi]=useState(0); const [score,setScore]=useState(0); const [picked,setPicked]=useState(null);
  const done = qi>=QUESTIONS.length;
  const cur = QUESTIONS[qi] || {};
  return (
    <div className="card" id="quiz-card">
      <div className="small" id="quiz-progress">{done? 'Finished' : `Question ${qi+1} of ${QUESTIONS.length}`}</div>
      <h2 className="mt-8" id="quiz-question">{done? `Your score: ${score}/${QUESTIONS.length} (${Math.round(score/QUESTIONS.length*100)}%)` : cur.q}</h2>
      <div id="quiz-options" className="row mt-8">
        {!done && cur.options?.map((opt, idx)=>{
          const cls = picked===null? 'quiz-option' : idx===cur.answer? 'quiz-option correct' : (picked===idx? 'quiz-option wrong' : 'quiz-option');
          return (
            <button key={idx} className={cls} onClick={()=>{
              if(picked!==null) return; setPicked(idx); if(idx===cur.answer) setScore(s=>s+1);
            }}>{opt}</button>
          );
        })}
      </div>
      <div className="mt-14 flex gap-8 justify-end">
        {done && <button className="btn ghost" id="quiz-restart" onClick={()=>{setQi(0);setScore(0);setPicked(null);}}>Restart</button>}
        <button className="btn primary" id="quiz-next" disabled={!done && picked===null} onClick={()=>{
          if(done){ setQi(0); setScore(0); setPicked(null); }
          else { setQi(i=>i+1); setPicked(null); }
        }}>{done? 'Play again' : 'Next'}</button>
      </div>
    </div>
  );
}

function WasteSorter(){
  const ALL_ITEMS = useMemo(()=>[
    { id:'i1', name:'Banana peel',    bin:'compost'  },
    { id:'i2', name:'Aluminum can',   bin:'recycle'  },
    { id:'i3', name:'Paper',          bin:'recycle'  },
    { id:'i4', name:'Glass bottle',   bin:'recycle'  },
    { id:'i5', name:'Plastic wrapper',bin:'landfill' },
    { id:'i6', name:'Tea leaves',     bin:'compost'  },
  ],[]);
  const [remaining,setRemaining]=useState(()=>ALL_ITEMS.map(x=>({...x})));
  const [placed,setPlaced]=useState({ recycle:[], compost:[], landfill:[] });
  const sortedCount = ALL_ITEMS.length - remaining.length;
  const score = React.useMemo(()=>{
    const allPlaced=[...placed.recycle,...placed.compost,...placed.landfill];
    return allPlaced.filter(it => placed[it.bin].some(p=>p.id===it.id)).length;
  },[placed]);
  const onDrop=(bin,id)=>{
    const idx=remaining.findIndex(x=>x.id===id); if(idx===-1) return;
    const it=remaining[idx];
    setRemaining(prev=>prev.filter(x=>x.id!==id));
    setPlaced(prev=>({ ...prev, [bin]: [...prev[bin], it] }));
  };
  return (
    <>
      <div className="row grid-2">
        <div className="card">
          <div className="small">Items</div>
          <div id="items-list" className="row mt-10">
            {remaining.map(it=> (
              <Draggable key={it.id} id={it.id} label={it.name} />
            ))}
          </div>
        </div>
        <div className="row grid-3">
          {['recycle','compost','landfill'].map(bin=> (
            <DropBin key={bin} bin={bin} items={placed[bin]} onDrop={onDrop} />
          ))}
        </div>
      </div>
      <div className="mt-14 flex justify-between items-center">
        <div className="small">Sorted: <span id="sorted-count">{sortedCount}</span>/<span id="total-count">{ALL_ITEMS.length}</span></div>
        <div>
          <span className="small">Score: <span className="stat" id="waste-score">{score}</span></span>
          <button className="btn primary ml-10" id="waste-finish" onClick={()=>alert(`Score: ${score}/${ALL_ITEMS.length}`)}>Finish</button>
          <button className="btn ghost ml-6" id="waste-restart" onClick={()=>{ setRemaining(ALL_ITEMS.map(x=>({...x}))); setPlaced({ recycle:[], compost:[], landfill:[] }); }}>Restart</button>
        </div>
      </div>
    </>
  );
}
function Draggable({id,label}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    el.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/plain', id); });
  },[id]);
  return <div ref={ref} className="item draggable" draggable data-id={id}>{label}</div>;
}
function DropBin({bin, items, onDrop}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const over=e=>e.preventDefault();
    const drop=e=>{ e.preventDefault(); const id=e.dataTransfer.getData('text/plain'); onDrop(bin,id); };
    el.addEventListener('dragover',over); el.addEventListener('drop',drop);
    return ()=>{ el.removeEventListener('dragover',over); el.removeEventListener('drop',drop); };
  },[bin,onDrop]);
  return (
    <div ref={ref} className="card bin" data-bin={bin}>
      <div className="bin-title">{bin}</div>
      <div className="row mt-8" id={`bin-${bin}`}>{items.map(it=> <div key={it.id} className="item">{it.name}</div>)}</div>
    </div>
  );
}

function EnergySaver(){
  const [items,setItems]=useState([
    { id:'l', name:'Classroom lights (20 LED bulbs)', w:200, on:true },
    { id:'p', name:'Projector', w:250, on:true },
    { id:'c', name:'Computers (10)', w:400, on:true },
    { id:'a', name:'AC unit', w:1200, on:true },
    { id:'s', name:'Smartboard', w:150, on:true },
  ]);
  const BASE = useMemo(()=> items.reduce((s,i)=>s+i.w,0),[]);
  const cur = items.filter(i=>i.on).reduce((s,i)=>s+i.w,0);
  const reduction = Math.round((1 - cur/BASE)*100);
  return (
    <div className="row grid-2">
      <div className="card">
        <div className="small">Goal: reduce classroom power by ≥30%</div>
        <div id="energy-list" className="row mt-10">
          {items.map(it=> (
            <div key={it.id} className={`toggle-row${it.on?'':' dim'}`}>
              <div>
                <div className="fw-600">{it.name}</div>
                <div className="small">{it.w} W</div>
              </div>
              <button className="btn" onClick={()=> setItems(prev=> prev.map(p=> p.id===it.id? {...p, on:!p.on} : p))}>{it.on? 'On':'Off'}</button>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <div className="meter"><div id="energy-meter" className="meter-fill" style={{width: Math.max(0,Math.min(100,reduction))+'%'}}/></div>
          <div className="small mt-6">Baseline: <span id="energy-base" className="stat">{BASE}</span> W · Current: <span id="energy-current" className="stat">{cur}</span> W · Reduction: <span id="energy-pct" className="stat">{reduction}</span>%</div>
        </div>
        <div className="mt-12 flex gap-8 wrap">
          <button className="btn primary" id="energy-finish" onClick={()=>alert(`Reduction: ${reduction}% (${BASE-cur} W saved). Target: 30%.`)}>Finish</button>
          <button className="btn" id="energy-all-off" onClick={()=> setItems(prev=> prev.map(p=> ({...p, on:false})))}>Turn all off</button>
          <button className="btn ghost" id="energy-reset" onClick={()=> setItems(prev=> prev.map(p=> ({...p, on:true})))}>Reset</button>
        </div>
      </div>
      <div className="card">
        <div className="small">Tips</div>
        <ul className="small mt-8">
          <li>Switch to LEDs and turn off when leaving.</li>
          <li>Use power management on computers.</li>
          <li>Optimize AC setpoint and seal drafts.</li>
        </ul>
      </div>
    </div>
  );
}

function TransitRanker(){
  const CORRECT = useMemo(()=>[
    { id:'walk', label:'Walking' },
    { id:'bike', label:'Bicycle' },
    { id:'bus',  label:'Public bus' },
    { id:'carpool', label:'Carpool (2–3)' },
    { id:'car',  label:'Car (solo)' },
    { id:'plane',label:'Plane (short‑haul)' },
  ],[]);
  const [order,setOrder]=useState(()=> CORRECT.map(x=>({...x})).sort(()=>Math.random()-0.5));
  const correctPos = order.reduce((n,it,idx)=> n + (it.id===CORRECT[idx].id?1:0), 0);
  return (
    <div className="card">
      <div className="small">Rank from greenest (top) to highest emissions (bottom)</div>
      <div id="transit-list" className="row mt-10">
        {order.map(item=> (
          <DraggableRow key={item.id} item={item} order={order} setOrder={setOrder} />
        ))}
      </div>
      <div className="mt-12 flex justify-between items-center">
        <div className="small">Correct in place: <span id="transit-score" className="stat">{correctPos}</span>/<span id="transit-total">{CORRECT.length}</span></div>
        <div>
          <button className="btn primary" id="transit-check" onClick={()=>alert(`Correct positions: ${correctPos}/${CORRECT.length}`)}>Check order</button>
          <button className="btn ml-6" id="transit-shuffle" onClick={()=> setOrder(CORRECT.map(x=>({...x})).sort(()=>Math.random()-0.5))}>Shuffle</button>
        </div>
      </div>
    </div>
  );
}
function DraggableRow({item, order, setOrder}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const onDragStart=e=>{ e.dataTransfer.setData('text/plain', item.id); };
    const onDragOver=e=>e.preventDefault();
    const onDrop=e=>{ e.preventDefault(); const draggedId=e.dataTransfer.getData('text/plain'); if(!draggedId||draggedId===item.id) return; const from=order.findIndex(x=>x.id===draggedId); const to=order.findIndex(x=>x.id===item.id); const next=[...order]; const [moved]=next.splice(from,1); next.splice(to,0,moved); setOrder(next); };
    el.addEventListener('dragstart',onDragStart); el.addEventListener('dragover',onDragOver); el.addEventListener('drop',onDrop);
    return ()=>{ el.removeEventListener('dragstart',onDragStart); el.removeEventListener('dragover',onDragOver); el.removeEventListener('drop',onDrop); };
  },[item,order,setOrder]);
  return <div ref={ref} className="draggable-row" draggable data-id={item.id}>{item.label}</div>;
}

export default function Play(){
  return (
    <>
      <header>
        <div className="container">
          <h1 className="title">Play: Games & Quizzes</h1>
          <Tabs/>
          <div className="mt-10 flex justify-end"><a className="btn" href="/">Home</a></div>
        </div>
      </header>
      <main className="container">
        <section id="quiz" className="panel section"><Quiz/></section>
        <section id="waste" className="panel section"><WasteSorter/></section>
        <section id="energy" className="panel section"><EnergySaver/></section>
        <section id="transit" className="panel section"><TransitRanker/></section>
      </main>
    </>
  );
}
