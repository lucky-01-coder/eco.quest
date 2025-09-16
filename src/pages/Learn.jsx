import React, { useMemo, useState } from 'react';

const MODULES = [
  { id:'climate101', title:'Climate 101', desc:'Causes, impacts, and solutions for climate change.', lessons:[
    { title:'Intro to climate', content:'Climate is the average of weather over long periods. We study temperature, precipitation, and patterns.' },
    { title:'Greenhouse effect', content:'Gases like CO₂ trap heat, keeping Earth warm, but excess emissions intensify warming.' },
    { title:'Impacts & risks', content:'Sea level rise, extreme weather, biodiversity loss, and health risks affect communities.' },
    { title:'Solutions & policy', content:'Mitigation (cut emissions) and adaptation (prepare) with policies like carbon pricing.' },
    { title:'Quiz: Climate basics', content:'Test your knowledge with a short multiple‑choice quiz.' },
  ]},
  { id:'zerowaste', title:'Zero‑Waste Basics', desc:'Reduce, reuse, recycle—habits that stick.', lessons:[
    { title:'Waste audit', content:'Track what you throw away for a week to identify reduction opportunities.' },
    { title:'Reduce & reuse', content:'Avoid single‑use items, buy durable goods, and repair instead of replacing.' },
    { title:'Recycling rules', content:'Rinse containers; separate paper, plastics, metals, and glass; follow local rules.' },
    { title:'Compost 101', content:'Food scraps and yard waste become nutrient‑rich soil when composted properly.' },
    { title:'Quiz: Zero‑waste', content:'A quick quiz to reinforce zero‑waste habits.' },
  ]},
  { id:'energy', title:'Energy Savers', desc:'Smart energy use at school and home.', lessons:[
    { title:'Where energy goes', content:'Lighting, HVAC, devices, and plug loads make up most school energy use.' },
    { title:'Lighting & devices', content:'Switch to LEDs, enable power management, and turn off when not in use.' },
    { title:'Heating & cooling', content:'Optimize thermostats, seal drafts, and maintain equipment for efficiency.' },
    { title:'Behavioral nudges', content:'“Last out, lights out” signage and student energy monitors build habits.' },
    { title:'Quiz: Energy', content:'A short quiz to check understanding of energy-saving strategies.' },
  ]},
];

const LS_KEY = 'eco_learn_progress_v1';

export default function Learn(){
  const [openId, setOpenId] = useState(null);
  const [progress, setProgress] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(LS_KEY)||'{}'); }catch{ return {}; }
  });

  function save(next){
    setProgress(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  function pct(mod){
    const done = (progress[mod.id]||[]).length;
    const total = mod.lessons.length;
    return Math.round((done/total)*100);
  }

  function toggle(modId, idx, on){
    const set = new Set(progress[modId]||[]);
    if(on) set.add(idx); else set.delete(idx);
    const next = { ...progress, [modId]: [...set] };
    save(next);
  }

  const current = useMemo(()=> MODULES.find(m=>m.id===openId)||null, [openId]);

  return (
    <section className="section">
      <div className="container">
        <span className="badge">📘 Learn</span>
        <h1 className="h1 mt-6">Standards‑aligned learning</h1>
        <p className="lead">Ready‑to‑teach, bite‑sized lessons crafted with educators. Pair with quizzes to reinforce outcomes.</p>

        {!current && (
          <div id="modules-grid" className="row grid-3 mt-16">
            {MODULES.map(mod=> (
              <div key={mod.id} className="card">
                <div className="fw-600">{mod.title}</div>
                <p className="small">{mod.desc}</p>
                <div className="progress mt-8"><div className="progress-fill" style={{width: pct(mod)+"%"}}/></div>
                <div className="small mt-6">{pct(mod)}% complete</div>
                <div className="mt-8"><button className="btn primary" onClick={()=>setOpenId(mod.id)}>Open module</button></div>
              </div>
            ))}
          </div>
        )}

        {current && (
          <div id="module-detail" className="card mt-16">
            <div className="small">Module</div>
            <h2 className="mt-6">{current.title}</h2>
            <p className="small">{current.desc}</p>
            <div className="mt-12">
              <div className="progress"><div className="progress-fill" style={{width: pct(current)+"%"}}/></div>
              <div className="small mt-6">{(progress[current.id]||[]).length}/{current.lessons.length} lessons completed</div>
            </div>
            <div id="lessons-list" className="row mt-8">
              {current.lessons.map((l, idx)=>{
                const done = new Set(progress[current.id]||[]).has(idx);
                return (
                  <div key={idx} className="item grid-two">
                    <input type="checkbox" checked={done} onChange={e=>toggle(current.id, idx, e.target.checked)} />
                    <div>
                      <div className="fw-600">{l.title}</div>
                      <div className="small mt-4">{l.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-14 flex gap-8 wrap">
              <button className="btn primary" onClick={()=>{ const all=[...Array(current.lessons.length).keys()]; save({ ...progress, [current.id]: all }); }}>Mark all complete</button>
              <button className="btn" onClick={()=>setOpenId(null)}>Back to modules</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
