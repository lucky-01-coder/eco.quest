import React, { useMemo, useState, useEffect, useRef } from 'react';

// SDG 13 content adapted from United Nations (https://sdgs.un.org/goals/goal13)
const SDG13 = (()=>{
  const overview = "SDG 13, Climate Action, calls for urgent action to combat climate change and its impacts. It emphasizes strengthening resilience, integrating climate measures into policy, and supporting vulnerable communities through adaptation and mitigation efforts.";
  const why = [
    "Climate change threatens lives, livelihoods, and ecosystems through extreme weather, floods, droughts, and sea-level rise.",
    "Reducing greenhouse gas emissions and building resilience helps protect economies, health, and food security.",
    "Adaptation and disaster risk reduction save lives by preparing communities for climate-related hazards.",
    "Climate finance and international cooperation are essential to support developing countries in mitigation and adaptation."
  ];
  const targets = [
    "13.1: Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.",
    "13.1.1: Track deaths, missing persons, and directly affected persons per 100,000 population due to disasters.",
    "13.1.2: Increase the number of countries adopting and implementing national disaster risk reduction strategies aligned with the Sendai Framework (2015–2030).",
    "13.1.3: Increase the proportion of local governments adopting and implementing local disaster risk reduction strategies aligned with national strategies.",
    "13.2: Integrate climate change measures into national policies, strategies, and planning.",
    "13.2.1: Countries with nationally determined contributions, long-term strategies, national adaptation plans, and adaptation communications reported to the UNFCCC.",
    "13.2.2: Track total greenhouse gas emissions per year.",
    "13.3: Improve education, awareness, and human and institutional capacity on climate change mitigation, adaptation, impact reduction, and early warning."
  ];
  const impacts = [
    "Human-induced climate change reached alarming levels in 2024, with global temperatures temporarily exceeding the 1.5°C threshold and higher climate impacts, leading to displacement and economic losses.",
    "By 2024, 131 countries reported adoption and implementation of national disaster risk reduction strategies, up from 57 in 2015.",
    "2024 likely marked the first year when global temperatures surpassed 1.5°C above pre-industrial levels; atmospheric CO2 remained the highest in over 2 million years (levels around 151% above pre-industrial).",
    "Disasters claimed an average of about 124 million people affected per year over the past decade, with 41,647 lives lost annually in that period, and disaster-related deaths per 100,000 population declined from 1.61 (2005–2014) to 0.79 (2014–2023).",
    "Global climate finance flows reached about $1.3 trillion per year (biennium 2021–2022), with adaptation finance rising to about $63 billion annually; private and public investments surged in mitigation sectors such as sustainable transport, clean energy, and buildings."
  ];
  const actions = [
    "Advocate for climate education: participate in school curricula updates to include climate change and sustainability topics.",
    "Reduce personal footprint: minimize energy use at home, recycle, and choose sustainable transport options where possible.",
    "Engage in local disaster risk reduction planning: join or form student groups that contribute to school or community DRR activities.",
    "Support science and sustainability clubs: organize projects on climate mitigation, renewable energy, or water conservation.",
    "Promote awareness campaigns: design age-appropriate campaigns on climate risks and adaptation actions for peers and families.",
    "Learn about local policies: review national and local climate policies and encourage transparency and accountability in reporting progress.",
    "Participate in citizen science: collect and share data on local weather, air quality, or energy use to inform school projects.",
    "Collaborate with community partners: partner with local businesses or NGOs on climate action initiatives like tree planting or energy audits."
  ];
  const glossary = [
    "Climate Action: Efforts to reduce greenhouse gas emissions and adapt to climate impacts to protect people and the planet.",
    "Greenhouse Gases: Gases like CO2 that trap heat in the atmosphere and drive global warming.",
    "NDC (Nationally Determined Contribution): A country's plan to reduce national emissions and adapt to climate impacts under the UN Climate Change framework.",
    "Adaptation Plans: Strategies to adjust to climate impacts and reduce vulnerability to hazards.",
    "Disaster Risk Reduction: Approaches to lessen the damage caused by natural hazards through planning, preparedness, and mitigation.",
    "Sendai Framework: Global agreement (2015–2030) focused on reducing disaster risk and losses.",
    "Green Climate Fund: A financial mechanism to help developing countries fund climate mitigation and adaptation projects.",
    "SIDS: Small Island Developing States, highly vulnerable to climate impacts and sea-level rise."
  ];
  const bullets = arr => arr.map(s => `• ${s}`).join(' ');
  return {
    id: 'sdg13',
    title: 'SDG 13: Climate Action (UN)',
    desc: overview,
    lessons: [
      { title: 'Overview', content: overview },
      { title: 'Why it matters', content: bullets(why) },
      { title: 'Targets (highlights)', content: bullets(targets) },
      { title: 'Current impacts & facts', content: bullets(impacts) },
      { title: 'Actions for students', content: bullets(actions) },
      { title: 'Glossary', content: bullets(glossary) },
    ]
  };
})();

const MODULES = [
  SDG13,
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

  // Simple text-to-speech playback for lesson content
  const [speakingKey, setSpeakingKey] = useState(null);
  const synthRef = useRef(null);
  const supportsTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(()=>{
    return ()=>{ try { window.speechSynthesis?.cancel(); } catch {} };
  },[]);

  function speakText(text, key){
    if (!supportsTTS || !text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 1; u.pitch = 1; u.volume = 1;
      u.onend = ()=> setSpeakingKey(null);
      synthRef.current = u;
      setSpeakingKey(key);
      window.speechSynthesis.speak(u);
    } catch {}
  }
  function stopSpeaking(){
    try { window.speechSynthesis.cancel(); } catch {}
    setSpeakingKey(null);
  }

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
            <div className="small mt-6">Source: United Nations — SDG 13 (Climate Action)</div>
            <div className="mt-12">
              <div className="progress"><div className="progress-fill" style={{width: pct(current)+"%"}}/></div>
              <div className="small mt-6">{(progress[current.id]||[]).length}/{current.lessons.length} lessons completed</div>
            </div>
            <div id="lessons-list" className="row mt-8">
              {current.lessons.map((l, idx)=>{
                const done = new Set(progress[current.id]||[]).has(idx);
                const key = `${current.id}:${idx}`;
                const isSpeaking = speakingKey === key;
                return (
                  <div key={idx} className="item grid-two">
                    <input type="checkbox" checked={done} onChange={e=>toggle(current.id, idx, e.target.checked)} />
                    <div>
                      <div className="fw-600">{l.title}</div>
                      <div className="small mt-4">{l.content}</div>
                      {supportsTTS && (
                        <div className="mt-8 flex gap-8 wrap">
                          {!isSpeaking && <button className="btn" onClick={()=>speakText(l.content, key)}>Play audio</button>}
                          {isSpeaking && <button className="btn" onClick={stopSpeaking}>Stop audio</button>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-14 flex gap-8 wrap">
              <button className="btn primary" onClick={()=>{ const all=[...Array(current.lessons.length).keys()]; save({ ...progress, [current.id]: all }); }}>Mark all complete</button>
              <button className="btn" onClick={()=>{ stopSpeaking(); setOpenId(null); }}>Back to modules</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
