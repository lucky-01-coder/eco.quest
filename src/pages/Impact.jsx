import React from 'react';

export default function Impact(){
  return (
    <section className="section">
      <div className="container">
        <span className="badge">📊 Impact</span>
        <h1 className="h1">Track real‑world outcomes</h1>
        <p className="lead">Measure progress across classes and semesters—turn small actions into campus‑wide change.</p>
        <div className="row grid-3 mt-16">
          <div className="card"><strong>Trees Planted</strong><div className="stat">1,240</div></div>
          <div className="card"><strong>Waste Collected</strong><div className="stat">680 kg</div></div>
          <div className="card"><strong>Participation</strong><div className="stat">87%</div></div>
        </div>
        <div className="mt-16"><a className="btn primary" href="/dashboard">View live leaderboard</a></div>
      </div>
    </section>
  );
}
