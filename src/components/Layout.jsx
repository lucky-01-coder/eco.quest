import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Layout({ children }){
  return (
    <>
      <header className="header">
        <div className="container flex justify-between items-center gap-16">
          <Link className="brand" to="/"><span className="logo">🌿</span>EcoQuest</Link>
          <nav className="nav" data-nav>
            <NavLink to="/" end className={({isActive})=> isActive ? 'active' : undefined}>Home</NavLink>
            <NavLink to="/learn" className={({isActive})=> isActive ? 'active' : undefined}>Learn</NavLink>
            <NavLink to="/play" className={({isActive})=> isActive ? 'active' : undefined}>Play</NavLink>
            <NavLink to="/impact" className={({isActive})=> isActive ? 'active' : undefined}>Impact</NavLink>
            <NavLink to="/dashboard" className={({isActive})=> isActive ? 'active' : undefined}>Dashboard</NavLink>
            <NavLink to="/teacher-login" className={({isActive})=> isActive ? 'active' : undefined}>Teacher Login</NavLink>
            <NavLink to="/student-login" className={({isActive})=> isActive ? 'active' : undefined}>Student Login</NavLink>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer"><div className="container">© EcoQuest</div></footer>
    </>
  );
}
