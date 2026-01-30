import React, { useState, useEffect } from 'react';
import { initializeGemini, getStoredKey, clearStoredKey } from '../services/gemini';

export default function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check if key exists (from env or storage)
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const storedKey = getStoredKey();
    
    if (envKey || storedKey) {
      setHasKey(true);
      // Auto-init if we have a stored key
      if (storedKey && !envKey) initializeGemini(storedKey);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      initializeGemini(apiKey.trim());
      setHasKey(true);
      alert("Key saved! You can now identify fish.");
      onClose();
    }
  };

  const handleClear = () => {
    if(confirm("Remove your API Key?")) {
      clearStoredKey();
      setHasKey(false);
      alert("Key removed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem' }}>⚙️ Settings</h2>
          <button className="btn-ghost" onClick={onClose} style={{ fontSize: '1.5rem', padding: '0 8px' }}>&times;</button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Google Gemini API Key</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '16px' }}>
            To use the AI features, you need a free API key from Google. 
            {import.meta.env.VITE_GEMINI_API_KEY ? 
              <span style={{ color: 'var(--color-safe)', display: 'block', marginTop: '4px', fontWeight: 'bold' }}>✓ Using Host Key (Dev Mode)</span> : 
              ""}
          </p>

          {!import.meta.env.VITE_GEMINI_API_KEY && (
            <>
               <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={hasKey ? "Key is saved (hidden)" : "Paste AIza... key here"}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px', 
                  border: '1px solid #ddd', marginBottom: '8px', fontSize: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>Save Key</button>
                {hasKey && <button className="btn btn-ghost" onClick={handleClear} style={{ color: 'var(--color-danger)' }}>Clear</button>}
              </div>
              <p style={{ fontSize: '0.8rem', marginTop: '12px', color: '#666' }}>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--color-primary)' }}>Get a free key here</a>. 
                Your key is stored locally in your browser.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
