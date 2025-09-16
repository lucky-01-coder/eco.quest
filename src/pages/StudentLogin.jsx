import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin(){
  const nav = useNavigate();
  function onSubmit(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let school = data.get('school');
    if (school==='__other'){
      const custom=(data.get('customSchool')||'').toString().trim();
      if(!custom){ alert('Please enter your school name.'); return; }
      school = custom;
    }
    if(!school){ alert('Please select your school.'); return; }
    const name=(data.get('studentName')||'').toString().trim(); if(!name){ alert('Please enter your full name.'); return; }
    const email=data.get('email');
    const auth={ role:'student', email, school, name, t: Date.now() };
    try{
      localStorage.setItem('eco_auth', JSON.stringify(auth));
      const key='eco_students';
      const list = (()=>{ try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch { return []; } })();
      const idx = list.findIndex(s=> s.email===email && s.school===school);
      if(idx>=0) list[idx]=auth; else list.push(auth);
      localStorage.setItem(key, JSON.stringify(list));
    }catch{}
    alert(`Logged in as student (${name}) at ${school} (demo): ${email}`);
    nav('/');
  }
  function onSchoolChange(e){ const v=e.target.value; const el=e.currentTarget.form.querySelector('input[name="customSchool"]'); if(!el) return; el.style.display = v==='__other' ? '' : 'none'; if(v!=='__other') el.value=''; }
  return (
    <section className="section">
      <div className="container card maxw-560">
        <span className="badge">🔐 Login</span>
        <h1 className="h1 mt-8">Student Login</h1>
        <p className="small">Sign in with your school email to view quests and track your points.</p>
        <form className="login-form mt-12 grid-col gap-10" data-role="student" onSubmit={onSubmit}>
          <select className="select" name="school" required onChange={onSchoolChange}>
            <option value="">Select school</option>
            <option value="Eco High">Eco High</option>
            <option value="Riverdale High">Riverdale High</option>
            <option value="Sunrise Academy">Sunrise Academy</option>
            <option value="__other">Other (enter school name)</option>
          </select>
          <input className="input" type="text" name="customSchool" placeholder="Enter school name" style={{display:'none'}} />
          <input className="input" type="text" name="studentName" placeholder="Student full name" required />
          <input className="input" type="email" name="email" placeholder="School email" required />
          <input className="input" type="password" name="password" placeholder="Password" required />
          <button className="btn primary" type="submit">Log in as Student</button>
        </form>
        <div className="small mt-10">Are you a teacher? <a href="/teacher-login" className="small" style={{color:'var(--muted)'}}>Teacher Login</a></div>
      </div>
    </section>
  );
}
