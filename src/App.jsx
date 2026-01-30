import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Result from './pages/Result';
import Collection from './pages/Collection';
import SettingsModal from './components/SettingsModal';

function App() {
  const [view, setView] = useState('home'); // home, result, collection, profile
  const [currentFish, setCurrentFish] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [collection, setCollection] = useState([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('fishda_collection');
    if (saved) setCollection(JSON.parse(saved));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('fishda_collection', JSON.stringify(collection));
  }, [collection]);

  const handleIdentify = (fish, image) => {
    setCurrentFish(fish);
    setUserImage(image);
    setView('result');
  };

  const handleSave = () => {
    if (currentFish) {
      const newItem = {
        ...currentFish,
        userImage: userImage, // Save the user's photo too
        date: new Date().toISOString()
      };
      setCollection(prev => [newItem, ...prev]);
      setView('collection'); // Go to collection after saving
    }
  };

  const handleScanAgain = () => {
    setCurrentFish(null);
    setUserImage(null);
    setView('home');
  };

  const renderView = () => {
    switch(view) {
      case 'home':
        return <Home onIdentify={handleIdentify} />;
      case 'result':
        return (
          <Result 
            fish={currentFish} 
            userImage={userImage}
            onSave={handleSave} 
            onScanAgain={handleScanAgain} 
          />
        );
      case 'collection':
        return <Collection savedFish={collection} />;
      case 'profile':
        return (
          <div className="container" style={{ paddingTop: '40px' }}>
            <h1 className="text-center" style={{ marginBottom: '24px' }}>Fishda</h1>
            
            <SettingsModal isOpen={true} onClose={() => setView('home')} />

            <div className="card" style={{ marginTop: '24px' }}>
              <h3>About</h3>
              <p className="text-muted" style={{ marginTop: '8px' }}>
                Fishda is your friendly fishing companion.
              </p>
            </div>
             <button 
              className="btn btn-ghost" 
              style={{ width: '100%', color: 'var(--color-danger)', marginTop: '20px' }}
              onClick={() => {
                if(confirm("Clear your entire collection?")) {
                  setCollection([]);
                }
              }}
            >
              Reset Collection
            </button>
          </div>
        );
      default:
        return <Home onIdentify={handleIdentify} />;
    }
  };

  return (
    <div className="app">
      <main>
        {renderView()}
      </main>
      <NavBar currentView={view} setView={setView} />
    </div>
  );
}

export default App;
