import React from 'react';

export default function Collection({ savedFish }) {
  if (!savedFish || savedFish.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>My Catch Collection</h2>
        <div style={{ 
          padding: '60px 40px', 
          backgroundColor: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Your sticker book is empty.</p>
          <p>Scan a fish to start your collection!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '24px', paddingBottom: '100px' }}>
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>My Catch Collection</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '16px' 
      }}>
        {savedFish.map((item, index) => (
          <div key={index} className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              marginBottom: '12px',
              border: '3px solid var(--color-bg-sand)'
            }}>
              <img src={item.userImage || item.image} alt={item.commonName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1rem', textAlign: 'center', marginBottom: '4px' }}>{item.commonName}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
