import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Learn from './pages/Learn.jsx';
import Play from './pages/Play.jsx';
import Impact from './pages/Impact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TeacherLogin from './pages/TeacherLogin.jsx';
import StudentLogin from './pages/StudentLogin.jsx';

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/learn" element={<Learn/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/impact" element={<Impact/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/teacher-login" element={<TeacherLogin/>} />
        <Route path="/student-login" element={<StudentLogin/>} />
      </Routes>
    </Layout>
  );
}
