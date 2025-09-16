import React, { useEffect, useMemo, useState } from 'react';

function loadJSON(key, def){ try { return JSON.parse(localStorage.getItem(key)||JSON.stringify(def)); } catch { return def; } }

export default function Dashboard(){
  const [auth, setAuth] = useState(()=> loadJSON('eco_auth', {}));
  const [students, setStudents] = useState(()=> loadJSON('eco_students', []));
  const [scores, setScores] = useState(()=> loadJSON('eco_scores', {}));

  const school = auth.school || '';
  const badgesList = [
    { id:'recycle_champ', name:'Recycle Champ', icon:'♻️' },
    { id:'energy_star', name:'Energy Star', icon:'⚡' },
    { id:'water_guard', name:'Water Guard', icon:'💧' },
    { id:'eco_leader', name:'Eco Leader', icon:'🌟' },
    { id:'waste_warrior', name:'Waste Warrior', icon:'🗑️' },
    { id:'green_commuter', name:'Green Commuter', icon:'🚲' },
  ];

  const filteredStudents = useMemo(()=> school? students.filter(s=>s.school===school) : students, [students, school]);
  const leaderboard = useMemo(()=> filteredStudents.map(s=>{
    const sc = scores[s.email] || { points:0, badges:[] };
    return { id: s.email, name: s.name||s.email, points: sc.points||0, badges: (sc.badges||[]).map(id=>({id})) };
  }).sort((a,b)=> (b.points||0)-(a.points||0)), [filteredStudents, scores]);

  const topTeamName = leaderboard[0]?.name || '—';

  function persistScores(next){ setScores(next); localStorage.setItem('eco_scores', JSON.stringify(next)); }

  function awardPoints(delta, email){
    if(!email) return; const next = { ...scores };
    const cur = next[email] || { points:0, badges:[] };
    cur.points = (cur.points||0) + delta; next[email] = cur; persistScores(next);
    alert(`+${delta} points awarded to ${email}`);
  }
  function awardBadge(badgeId, email){
    if(!email||!badgeId) return; const next = { ...scores };
    const cur = next[email] || { points:0, badges:[] };
    if(!cur.badges.includes(badgeId)) cur.badges.push(badgeId);
    next[email] = cur; persistScores(next);
    const b = badgesList.find(x=>x.id===badgeId);
    alert(`Badge awarded: ${(b?.icon?b.icon+' ':'')+(b?.name||badgeId)} to ${email}`);
  }

  useEffect(()=>{ setAuth(loadJSON('eco_auth', {})); setStudents(loadJSON('eco_students', [])); setScores(loadJSON('eco_scores', {})); },[]);

  const isStudent = (auth.role||'')==='student';

  return (
    <section className="section">
      <div className="container">
        <span className="badge">🏆 Educator Sandbox</span>
        <h1 className="h1">Dashboard</h1>
        <p className="lead">Manage eco‑points, award badges, and track competitions.</p>
        <div className="small mt-6" id="context-school">{school? `Viewing data for ${school}`: ''}</div>

        <div className="row grid-3 mt-16">
          <div className="card"><div className="small">Students</div><div className="stat" id="teams-count">{filteredStudents.length}</div></div>
          <div className="card"><div className="small">Badges</div><div className="stat" id="badges-count">{badgesList.length}</div></div>
          <div className="card"><div className="small">Top Student</div><div className="fw-700" id="top-team">{topTeamName}</div></div>
        </div>

        <div className="row grid-2 mt-16">
          <div className="card" id="student-view" style={{display: isStudent? 'block':'none'}}>
            <div className="small">Student View</div>
            <div className="small mt-6">Welcome, <span id="student-name" className="fw-700">{auth.name||'—'}</span></div>
            <div className="row grid-3 mt-10">
              <div className="card"><div className="small">School</div><div className="fw-800" id="student-school">{school||'—'}</div></div>
              <div className="card"><div className="small">My Points</div><div className="stat" id="student-points">{(scores[auth.email]?.points)||0}</div></div>
              <div className="card"><div className="small">Badges</div><div className="fw-700" id="student-badges">{(scores[auth.email]?.badges||[]).length}</div></div>
            </div>
            <div className="mt-10"><a className="btn primary" href="/play">Go to Quests</a></div>
          </div>

          <div className="card" id="admin-actions" style={{display: isStudent? 'none':'block'}}>
            <div className="small">Admin Actions</div>
            <div className="grid-two mt-10">
              <select id="student-select" className="select" defaultValue="">
                <option value="">Select student</option>
                {filteredStudents.map(s=> <option key={s.email} value={s.email}>{(s.name||s.email)+ (s.school? ` — ${s.school}`:'')}</option>)}
              </select>
              <select id="badge-select" className="select" defaultValue="">
                <option value="">Select badge</option>
                {badgesList.map(b=> <option key={b.id} value={b.id}>{(b.icon? b.icon+' ':'')+b.name}</option>)}
              </select>
            </div>
            <div className="mt-10 flex gap-8 wrap">
              <button className="btn" onClick={()=>{ const email=document.getElementById('student-select')?.value; awardPoints(10, email); }}>+10 points</button>
              <button className="btn" onClick={()=>{ const email=document.getElementById('student-select')?.value; awardPoints(50, email); }}>+50</button>
              <button className="btn primary" onClick={()=>{ const email=document.getElementById('student-select')?.value; const badgeId=document.getElementById('badge-select')?.value; awardBadge(badgeId, email); }}>🎖 Award badge</button>
            </div>
          </div>

          <div className="card" style={{overflow:'auto'}}>
            <table className="table">
              <thead><tr><th>Rank</th><th>Student</th><th>Badges</th><th className="text-right">Points</th></tr></thead>
              <tbody id="leaderboard-body">
                {leaderboard.map((t,i)=> (
                  <tr key={t.id}><td>#{i+1}</td><td>{t.name}</td><td>{t.badges?.length||0}</td><td className="text-right">{(t.points||0).toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {auth.role==='teacher' && (
          <div className="card mt-16" id="students-card">
            <div className="small">Students (logins)</div>
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>School</th><th>Last Login</th></tr></thead>
              <tbody id="students-table-body">
                {students.map(s=> <tr key={s.email}><td>{s.name||'—'}</td><td>{s.email||''}</td><td>{s.school||''}</td><td>{s.t? new Date(s.t).toLocaleString(): ''}</td></tr>)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
