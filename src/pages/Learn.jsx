import React, { useMemo, useState, useEffect, useRef } from 'react';

// Helper to format bullet arrays as a single string
const bullets = (arr) => arr.map(s => `• ${s}`).join(' ');

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
  return {
    id: 'sdg13',
    title: 'SDG 13: Climate Action (UN)',
    desc: overview,
    source: 'United Nations — SDG 13 (Climate Action)',
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

// NEP 2020 environmental education focus (https://www.education.gov.in/nep)
const NEP2020 = (()=>{
  const overview = "NEP 2020 embeds Environmental Education and sustainability across the curriculum, advancing ecological literacy, experiential learning, and community engagement.";
  const key_principles = [
    "Environmental education integrated across levels and disciplines, not a standalone silo.",
    "Sustainability and climate resilience as core competencies tied to local contexts.",
    "Holistic, multidisciplinary approaches linking environment, economy, and society.",
    "Ethics of care for biodiversity and natural resources inform curriculum and culture.",
    "Schools as living laboratories modeling sustainable practices (energy, water, waste, biodiversity).",
    "Equity and accessibility so EE reaches marginalized learners.",
    "Teacher capacity development prioritized for field-based learning.",
    "Assessment emphasizes projects and demonstrated action over rote learning."
  ];
  const pedagogy = [
    "Experiential, place-based learning with field visits and nature activities.",
    "Project/inquiry learning where students identify local issues and co-create solutions.",
    "Community learning with families, NGOs, local bodies, and indigenous knowledge.",
    "Interdisciplinary modules spanning science, social studies, arts, language, and math.",
    "Service-learning that achieves tangible local environmental improvements.",
    "Campus energy/water/waste/biodiversity audits as routine practice.",
    "Media and data literacy to interpret environmental information and policy.",
    "Digital and hands-on simulations to explore sustainability scenarios."
  ];
  const assessment = [
    "Portfolio-based evidence: fieldwork, projects, impact, and reflection.",
    "Performance tasks and rubrics aligned to systems thinking and action competence.",
    "Community project demonstrations with documented outcomes.",
    "Monitoring school sustainability metrics via student-led dashboards."
  ];
  const implementation = [
    "Integrate EE across subjects in timetables and schemes of work.",
    "In-service teacher training on climate literacy and experiential pedagogy.",
    "Eco-clubs and campus EE labs for sustained practice.",
    "Partnerships with panchayats/municipalities to align with local needs.",
    "Add EE indicators to school improvement plans and reporting.",
    "Student participation in biodiversity conservation and climate resilience projects."
  ];
  const green_skills = [
    "Impact assessment and lifecycle thinking.",
    "Resource management: energy, water, waste, soil, biodiversity.",
    "Climate literacy, risk reduction, and adaptation planning.",
    "Green entrepreneurship and innovation.",
    "Data collection and analysis for environmental monitoring.",
    "Communication and advocacy for community action."
  ];
  return {
    id: 'nep2020',
    title: 'NEP 2020: Environmental Education',
    desc: overview,
    source: 'Government of India — NEP 2020',
    lessons: [
      { title: 'Overview', content: overview },
      { title: 'Key principles', content: bullets(key_principles) },
      { title: 'Pedagogy', content: bullets(pedagogy) },
      { title: 'Assessment', content: bullets(assessment) },
      { title: 'Implementation', content: bullets(implementation) },
      { title: 'Green skills', content: bullets(green_skills) },
    ]
  };
})();

// UNESCO ESD for 2030 essentials (https://www.unesco.org/en)
const UNESCO_ESD = (()=>{
  const overview = "UNESCO's ESD for 2030 promotes a whole-institution, competency-based approach that equips learners to act for sustainable development.";
  const competencies = [
    "Systems thinking for socio-ecological interconnections.",
    "Futures literacy and scenario thinking.",
    "Critical thinking, inquiry, and scientific literacy.",
    "Values-based decision-making and ethics.",
    "Collaborative problem solving across disciplines.",
    "Action competence to design and scale solutions.",
    "Civic participation and community engagement.",
    "Creativity, innovation, and adaptive learning.",
    "Digital and media literacy for sustainability communication.",
    "Respect for cultural diversity and inclusion."
  ];
  const whole_institution = [
    "Embed ESD in vision, policy, governance, and daily practice.",
    "Integrate sustainability across all subjects and curricula.",
    "Educator professional development and communities of practice.",
    "Partnerships with communities, universities, civil society, and business.",
    "Monitoring, evaluation, and learning systems for outcomes.",
    "Equity, gender equality, and social justice as cross-cutting principles."
  ];
  const teacher_training = [
    "Pre-service and in-service training centered on sustainability competencies.",
    "Inquiry/project/experiential methods for sustainability.",
    "Communities of practice for resource and evidence sharing.",
    "Classroom practices for systems thinking and futures literacy.",
    "Assessment of competencies and impact indicators.",
    "Guidance to integrate local challenges and partnerships."
  ];
  const community_engagement = [
    "Co-create learning with families, communities, and youth.",
    "Service learning and local stewardship projects.",
    "Partnerships with NGOs and local government for alignment.",
    "Platforms for indigenous knowledge and cultural diversity.",
    "Continuous dialogue and accountability mechanisms."
  ];
  const themes = [
    "Climate action and resilience",
    "Biodiversity and ecosystem services",
    "Water and resource management",
    "Sustainable food systems and agriculture",
    "Energy transition and sustainable cities",
    "Health, well-being, and equitable education",
    "Quality education and lifelong learning",
    "Digital/media literacy and governance",
    "Cultural diversity, heritage, creative expression",
    "Peace, justice, and inclusive societies"
  ];
  return {
    id: 'unesco-esd',
    title: 'UNESCO: ESD for 2030',
    desc: overview,
    source: 'UNESCO — Education for Sustainable Development (ESD) 2030',
    lessons: [
      { title: 'Overview', content: overview },
      { title: 'Key competencies', content: bullets(competencies) },
      { title: 'Whole-institution approach', content: bullets(whole_institution) },
      { title: 'Teacher training', content: bullets(teacher_training) },
      { title: 'Community engagement', content: bullets(community_engagement) },
      { title: 'Themes', content: bullets(themes) },
    ]
  };
})();

// Climate 101, expanded with NASA Climate, NOAA Climate.gov, and IPCC AR6 SYR
const CLIMATE101 = (()=>{
  const nasa_overview = "NASA explains that Earth’s climate is changing and that human activities are the main driver, supported by satellite observations and long-term data showing warming and patterns of change.";
  const nasa_evidence = [
    "There is unequivocal evidence that Earth is warming at an unprecedented rate.",
    "Human activity is the principal cause of this warming.",
    "Earth-orbiting satellites and new technologies provide long-term, multi-faceted observations of the planet.",
    "Data collected over many years reveal signs and patterns of a changing climate."
  ];
  const nasa_causes = [
    "Human activities are driving the global warming trend observed since the mid-20th century.",
    "Burning fossil fuels (coal and oil) increases atmospheric carbon dioxide (CO2) concentrations, trapping heat in the atmosphere."
  ];
  const nasa_impacts = [
    "Loss of sea ice and melting glaciers and ice sheets.",
    "Rising sea levels that threaten coastal regions.",
    "More intense heat waves and extreme weather events.",
    "Altered weather patterns and increased variability in climate",
    "Broader impacts on ecosystems and coastal communities as climate changes unfold."
  ];
  const nasa_solutions = [
    "Mitigation: reduce greenhouse gas emissions and switch to cleaner energy sources.",
    "Mitigation: increase energy efficiency across buildings, transport, and industry.",
    "Mitigation: deploy renewable energy technologies at scale.",
    "Adaptation: strengthen resilience of communities and infrastructure to climate impacts.",
    "Policy and planning: implement sustainable policies and climate-informed decisions.",
    "Science and monitoring: continue observations and research to track changes.",
    "Education and outreach: engage stakeholders in climate solutions."
  ];

  const noaa_indicators = [
    "2.780 trillion USD: Total cost of 396 U.S. weather and climate disasters ≥ $1B (1980–Aug 2024).",
    "55 atmospheric gases measured for distributions and trends.",
    "36 days: Cyclone Freddy’s duration in 2023, the longest-lived tropical cyclone on record.",
    "19 La Niña events since 1950 influencing global patterns.",
    "3+ million ocean temperature profiles from the Argo buoy fleet (as of 2024).",
    "~100 billion metric tons of ice lost by Antarctica each year since 2003."
  ];
  const noaa_adaptation = [
    "Engage communities and schools in localized climate action plans (floods, heat, hurricanes, wildfires).",
    "Implement early warnings and evacuation planning with schools as partners.",
    "Heat mitigation: cooling centers, shading, water access; schools as hubs during heat waves.",
    "Resilient infrastructure: drainage, building standards, and nature-based solutions.",
    "Integrate climate education and preparedness into curricula and clubs.",
    "Foster local networks for response, recovery, and resource sharing."
  ];
  const noaa_resilience = [
    "Inclusive emergency plans for vulnerable populations.",
    "Green/blue infrastructure to reduce flood risk and urban heat.",
    "Access to climate data and tools for planning in schools and municipalities.",
    "Embed resilience into school facilities management and operations.",
    "Diversify energy, water, and food systems to improve stability."
  ];

  const ipcc_warming = "Current global warming is approximately 1.1–1.2°C above pre-industrial levels, with continued warming if emissions are not reduced.";
  const ipcc_key = [
    "Warming is impacting every region and sector with more extremes and sea-level rise.",
    "Delays in emission cuts lock in higher warming and larger risks.",
    "Some damages are long-lasting or irreversible (ice sheets, some species).",
    "Vulnerable regions bear disproportionate risks with limited adaptive capacity.",
    "Mitigation and adaptation together reduce risks more effectively.",
    "Transformations in energy, land use, transport, and cities are required.",
    "Better data, governance, and finance enable effective responses.",
    "Transitions must be equitable and just to protect development gains.",
    "Global cooperation and access to technology/finance are essential."
  ];
  const ipcc_mitigation = [
    "Pursue 1.5°C-consistent pathways with rapid near-term cuts.",
    "Reach net-zero CO2 and cut non-CO2 gases by mid-century.",
    "Phase out unabated coal; scale renewables and efficiency; decarbonize industry/transport.",
    "Electrify end-use sectors while cleaning the power supply.",
    "Scale nature-based sinks alongside sustainable land use.",
    "Align markets via carbon pricing, regulation, and innovation support.",
    "Front-load action by 2030; near-complete power/transport decarb by ~2050."
  ];
  const ipcc_adapt_limits = [
    "Residual impacts will persist even with strong action.",
    "Some regions face physical/economic limits to adaptation.",
    "Chronic stresses (sea-level rise, heat) challenge health and livelihoods.",
    "Flexibility is critical due to compound and shifting risks.",
    "Equity/justice matter; otherwise the most vulnerable face the hardest limits."
  ];

  return {
    id: 'climate101',
    title: 'Climate 101',
    desc: 'Causes, evidence, impacts, and solutions for climate change.',
    source: 'NASA Climate; NOAA Climate.gov; IPCC AR6 Synthesis Report',
    lessons: [
      { title: 'Overview', content: bullets([nasa_overview, ipcc_warming]) },
      { title: 'Greenhouse effect & causes', content: bullets(nasa_causes) },
      { title: 'What the data shows', content: bullets([...nasa_evidence, ...noaa_indicators]) },
      { title: 'Impacts on Earth systems', content: bullets(nasa_impacts) },
      { title: 'Impacts on people & places', content: bullets(ipcc_key) },
      { title: 'Mitigation pathways', content: bullets(ipcc_mitigation) },
      { title: 'Adaptation & resilience', content: bullets([...noaa_adaptation, ...noaa_resilience, ...ipcc_adapt_limits]) },
      { title: 'What students and schools can do', content: bullets(nasa_solutions) }
    ]
  };
})();

const MODULES = [
  SDG13,
  NEP2020,
  UNESCO_ESD,
  CLIMATE101,
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
            {current.source && <div className="small mt-6">Source: {current.source}</div>}
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
