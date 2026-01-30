import React from 'react';

export default function NavBar({ currentView, setView }) {
  const getIconColor = (view) => currentView === view ? 'var(--color-primary)' : 'var(--color-text-muted)';
  
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      paddingBottom: 'max(12px, env(safe-area-inset-bottom))'
    }}>
      <button 
        className="btn-ghost" 
        onClick={() => setView('home')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={getIconColor('home')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span style={{ fontSize: '0.75rem', color: getIconColor('home') }}>Identify</span>
      </button>

      <button 
        className="btn-ghost" 
        onClick={() => setView('collection')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={getIconColor('collection')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <span style={{ fontSize: '0.75rem', color: getIconColor('collection') }}>My Catches</span>
      </button>

      <button 
        className="btn-ghost" 
        onClick={() => setView('profile')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={getIconColor('profile')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span style={{ fontSize: '0.75rem', color: getIconColor('profile') }}>Profile</span>
      </button>
    </nav>
  );
}
