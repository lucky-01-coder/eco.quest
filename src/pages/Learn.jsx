import React from 'react';

const NASA_LINKS = [
  { title: 'Big Questions', url: 'https://climatekids.nasa.gov/menu/big-questions/' },
  { title: 'Weather & Climate', url: 'https://climatekids.nasa.gov/menu/weather-and-climate/' },
  { title: 'Atmosphere', url: 'https://climatekids.nasa.gov/menu/atmosphere/' },
  { title: 'Water', url: 'https://climatekids.nasa.gov/menu/water/' },
  { title: 'Energy', url: 'https://climatekids.nasa.gov/menu/energy/' },
  { title: 'Plants & Animals', url: 'https://climatekids.nasa.gov/menu/plants-and-animals/' },
  { title: 'Games', url: 'https://climatekids.nasa.gov/menu/play/' },
  { title: 'Activities', url: 'https://climatekids.nasa.gov/menu/make/' },
  { title: 'People', url: 'https://climatekids.nasa.gov/menu/dream/' },
  { title: 'Videos', url: 'https://climatekids.nasa.gov/watch/' },
  { title: 'Mystery', url: 'https://climatekids.nasa.gov/climate-change-meaning/' }
];

export default function Learn(){
  return (
    <section className="section">
      <div className="container">
        <span className="badge">📘 Learn</span>
        <h1 className="h1 mt-6">Standards‑aligned learning</h1>
        <p className="lead">Ready‑to‑teach, bite‑sized lessons crafted with educators. Pair with quizzes to reinforce outcomes.</p>

        <div className="mt-16">
          <div className="small">Explore</div>
          <h2 className="mt-6">NASA Climate Kids</h2>
          <div className="row grid-3 mt-16">
            {NASA_LINKS.map(link => (
              <a key={link.url} className="card card-link" href={link.url} target="_blank" rel="noopener noreferrer">
                <div className="fw-600">{link.title}</div>
                <div className="small mt-6">Opens nasa.gov in a new tab</div>
              </a>
            ))}
          </div>
          <div className="small mt-10">Links to content by NASA Climate Kids.</div>
        </div>
      </div>
    </section>
  );
}
