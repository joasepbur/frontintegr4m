import React from 'react';
import { Outlet } from 'react-router-dom';
import TeamSidebar from './TeamSidebar';
import './TeamLayout.css';

const TeamLayout = () => {
  return (
    <div className="team-layout">
      <TeamSidebar />
      <main className="team-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TeamLayout;
