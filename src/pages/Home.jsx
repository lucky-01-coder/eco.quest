import React from 'react';
import { Link } from 'react-router-dom';

function StatCard({label, value}){
  return (
    <div className="card">
      <div className="small">{label}</div>
      <div className="stat">{value}</div>
    </div>
  );
}

export default function Home(){
  return (
    <>
      <section className="hero">
        <div className="container row grid-2">
          <div>
            <span className="badge">🏅 Gamified Environmental Learning</span>
            <h1 className="h1">Inspire climate action with quests, points, and real impact</h1>
            <p className="lead">EcoQuest turns sustainability into an engaging adventure for schools and colleges. Teach standards‑aligned lessons, complete eco‑quests, and climb leaderboards—together.</p>
            <div className="mt-16 flex gap-10 wrap">
              <Link className="btn" to="/dashboard">Explore dashboard preview</Link>
            </div>
            <div className="mt-12 small">✔ Standards‑aligned • ✔ Privacy‑first • ✔ Easy rollout</div>
          </div>
          <div>
            <div className="card">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-12">
                  <span className="badge">🌱</span>
                  <div>
                    <div className="fw-600">Green Guardians</div>
                    <div className="small">Environmental Club</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="small">Campus Rank</div>
                  <div className="fw-700">#1</div>
                </div>
              </div>
              <div className="row grid-3 mt-16">
                <StatCard label="Points" value={<span className="stat">12,480</span>} />
                <div className="card"><div className="small">Badges</div><div className="fw-700">🏆 18</div></div>
                <StatCard label="CO₂e Saved" value={<span className="stat">1,240 kg</span>} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <h2>How EcoQuest works</h2>
          <div className="row grid-3 mt-16">
            <Link to="/learn" className="card card-link">
              <div className="fw-600">📘 Learn</div>
              <p>Standards‑aligned lessons crafted with educators.</p>
              <span className="btn">Explore</span>
            </Link>
            <Link to="/play" className="card card-link">
              <div className="fw-600">🎯 Play</div>
              <p>Weekly eco‑quests with points, badges, competition.</p>
              <span className="btn">Explore</span>
            </Link>
            <Link to="/impact" className="card card-link">
              <div className="fw-600">🌍 Impact</div>
              <p>Track CO₂e saved and waste diverted.</p>
              <span className="btn">Explore</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="outcomes">
        <div className="container">
          <h2>Activities and benefits</h2>
          <div className="row grid-3 mt-16">
            <div className="card"><div className="fw-600">🎮 Gamified learning platform</div><p>Interactive lessons, challenges, quizzes, and real‑world tasks like tree‑planting and waste segregation.</p></div>
            <div className="card"><div className="fw-600">🏆 Eco‑points & competitions</div><p>Track eco‑points at class, house, and school levels.</p></div>
            <div className="card"><div className="fw-600">🎖 Rewards & recognition</div><p>Celebrate sustainable practices with digital badges.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <h2>Built for schools and colleges</h2>
          <div className="row grid-3 mt-16">
            <div className="card">🏠 Leaderboards & Houses</div>
            <div className="card">📊 Impact Analytics</div>
            <div className="card">🛡 Privacy & Safety</div>
          </div>
        </div>
      </section>
    </>
  );
}
