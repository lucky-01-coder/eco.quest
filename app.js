(function(){
  const path = location.pathname.endsWith('/') ? location.pathname + 'index.html' : location.pathname;
  // nav active
  document.querySelectorAll('[data-nav] a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href && (path.endsWith(href) || path === href)) a.classList.add('active');
  });

  const page = document.body.dataset.page;
  if(page === 'dashboard') initDashboard();

  async function initDashboard(){
    const teamsEl = document.getElementById('teams-count');
    const badgesEl = document.getElementById('badges-count');
    const topTeamEl = document.getElementById('top-team');
    const tableBody = document.getElementById('leaderboard-body');

    const auth = (()=>{ try { return JSON.parse(localStorage.getItem('eco_auth')||'{}'); } catch { return {}; } })();
    const school = auth.school || '';
    const qs = school ? `?school=${encodeURIComponent(school)}` : '';
    document.getElementById('context-school') && (document.getElementById('context-school').textContent = school ? `Viewing data for ${school}` : '');

    const [teams, badges, leaderboard] = await Promise.all([
      fetch(`/api/teams${qs}`).then(r=>r.json()).catch(()=>({teams:[]})),
      fetch(`/api/badges${qs}`).then(r=>r.json()).catch(()=>({badges:[]})),
      fetch(`/api/leaderboard${qs}`).then(r=>r.json()).catch(()=>({teams:[]})),
    ]);

    teamsEl && (teamsEl.textContent = String(teams.teams?.length||0));
    badgesEl && (badgesEl.textContent = String(badges.badges?.length||0));
    topTeamEl && (topTeamEl.textContent = leaderboard.teams?.[0]?.name || '—');

    const role = auth.role || '';
    const adminBox = document.getElementById('admin-actions');
    const studentBox = document.getElementById('student-view');
    if(role === 'student'){
      adminBox && (adminBox.style.display = 'none');
      studentBox && (studentBox.style.display = 'block');
      document.getElementById('student-school') && (document.getElementById('student-school').textContent = school || '—');
      document.getElementById('student-name') && (document.getElementById('student-name').textContent = (auth.name||'—'));
      const myTeam = (leaderboard.teams||[])[0] || {};
      document.getElementById('student-points') && (document.getElementById('student-points').textContent = String(myTeam.points||0));
      document.getElementById('student-badges') && (document.getElementById('student-badges').textContent = String(myTeam.badges?.length||0));
    } else {
      adminBox && (adminBox.style.display = 'block');
      studentBox && (studentBox.style.display = 'none');
    }

    if(tableBody){
      tableBody.innerHTML='';
      (leaderboard.teams||[]).forEach((t,i)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>#${i+1}</td><td>${t.name}</td><td>${t.badges?.length||0}</td><td style="text-align:right">${(t.points||0).toLocaleString()}</td>`;
        tableBody.appendChild(tr);
      });
    }

    // Teacher view: render student logins
    const studentsCard = document.getElementById('students-card');
    const studentsTbody = document.getElementById('students-table-body');
    if ((auth.role||'') === 'teacher' && studentsCard && studentsTbody) {
      studentsCard.style.display = 'block';
      const list = (()=>{ try { return JSON.parse(localStorage.getItem('eco_students')||'[]'); } catch { return []; } })();
      studentsTbody.innerHTML='';
      list.forEach(s => {
        const tr = document.createElement('tr');
        const when = s.t ? new Date(s.t).toLocaleString() : '';
        tr.innerHTML = `<td>${s.name||'—'}</td><td>${s.email||''}</td><td>${s.school||''}</td><td>${when}</td>`;
        studentsTbody.appendChild(tr);
      });
    } else if (studentsCard) {
      studentsCard.style.display = 'none';
    }

    const teamSelect = document.getElementById('team-select');
    const badgeSelect = document.getElementById('badge-select');
    if(teamSelect){
      (teams.teams||[]).forEach(t=>{
        const o=document.createElement('option');o.value=t.id;o.textContent=t.name;teamSelect.appendChild(o);
      });
    }
    if(badgeSelect){
      (badges.badges||[]).forEach(b=>{
        const o=document.createElement('option');o.value=b.id;o.textContent=(b.icon?b.icon+' ':'')+b.name;badgeSelect.appendChild(o);
      });
    }

    document.getElementById('add10')?.addEventListener('click',()=>awardPoints(10));
    document.getElementById('add50')?.addEventListener('click',()=>awardPoints(50));
    document.getElementById('awardBadge')?.addEventListener('click',awardBadge);

    async function awardPoints(delta){
      const teamId = teamSelect?.value; if(!teamId) return;
      await fetch('/api/points',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({teamId,points:delta})});
      initDashboard();
    }
    async function awardBadge(){
      const teamId = teamSelect?.value; const badgeId = badgeSelect?.value; if(!teamId||!badgeId) return;
      await fetch('/api/badges',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({teamId,badgeId})});
      initDashboard();
    }
  }

  // demo form
  document.getElementById('demo-form')?.addEventListener('submit',e=>{
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    alert(`Thanks! We'll reach out at ${email}`);
    e.currentTarget.reset();
  });

  // simple login forms (demo only)
  document.querySelectorAll('.login-form').forEach(form => {
    // toggle custom school input for any role that has it
    const schoolSelect = form.querySelector('select[name="school"]');
    const customSchoolInput = form.querySelector('input[name="customSchool"]');
    if (schoolSelect && customSchoolInput) {
      schoolSelect.addEventListener('change', () => {
        if (schoolSelect.value === '__other') { customSchoolInput.style.display = ''; }
        else { customSchoolInput.style.display = 'none'; customSchoolInput.value=''; }
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const role = form.getAttribute('data-role') || 'user';
      const email = data.get('email');
      let school = data.get('school');
      if (school === '__other') {
        school = (data.get('customSchool')||'').toString().trim();
        if (!school) { alert('Please enter your school name.'); return; }
      }
      if(!school){ alert('Please select your school.'); return; }
      const name = (data.get('studentName')||data.get('teacherName')||'').toString().trim();
      if (!name) { alert('Please enter your full name.'); return; }
      const auth = { role, email, school, name, t: Date.now() };
      try{
        localStorage.setItem('eco_auth', JSON.stringify(auth));
        if (role === 'student') {
          const key = 'eco_students';
          const list = (()=>{ try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch { return []; } })();
          const idx = list.findIndex(s => s.email === email && s.school === school);
          if (idx >= 0) list[idx] = auth; else list.push(auth);
          localStorage.setItem(key, JSON.stringify(list));
        }
      }catch{}
      alert(`Logged in as ${role}${name?` (${name})`:''} at ${school} (demo): ${email}`);
      if(role === 'teacher') location.href = '/dashboard.html'; else location.href = '/index.html';
    });
  });
})();
