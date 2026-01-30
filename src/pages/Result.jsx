import React from 'react';

export default function Result({ fish, userImage, onSave, onScanAgain, isSaved }) {
  if (!fish) return null;

  const getSafetyColor = (level) => {
    switch(level) {
      case 'safe': return 'var(--color-safe)';
      case 'caution': return 'var(--color-caution)';
      case 'avoid': return 'var(--color-danger)';
      default: return 'var(--color-text-muted)';
    }
  };

  const getSafetyLabel = (level) => {
    switch(level) {
      case 'safe': return 'Safe to Eat';
      case 'caution': return 'Edible with Caution';
      case 'avoid': return 'Not Recommended';
      default: return 'Unknown';
    }
  };

  // Use user's image if available, otherwise fallback to stock image
  const displayImage = userImage || fish.image;
  
  const [showPinoy, setShowPinoy] = React.useState(false);

  const displayedRecipes = showPinoy && fish.pinoyRecipes ? fish.pinoyRecipes : fish.recipes;

  return (
    <div style={{ padding: '24px', paddingBottom: '100px', animation: 'fadeIn 0.5s ease' }}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ position: 'relative' }}>
          <img src={displayImage} alt={fish.commonName} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
          {userImage && (
             <div style={{ 
               position: 'absolute', 
               bottom: 8, 
               right: 8, 
               background: 'rgba(0,0,0,0.6)', 
               color: 'white', 
               padding: '4px 8px', 
               borderRadius: '4px',
               fontSize: '0.75rem' 
             }}>
               Your Photo
             </div>
          )}
        </div>
        
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ 
              backgroundColor: getSafetyColor(fish.safetyLevel), 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.875rem', 
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              {getSafetyLabel(fish.safetyLevel)}
            </span>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{fish.commonName}</h1>
            
            {/* Local Names Section */}
            {fish.localNames && (
              <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '8px', fontWeight: 500 }}>
                🇵🇭 Tagalog: {fish.localNames.tagalog} • Bisaya: {fish.localNames.bisaya}
              </div>
            )}

            <p className="text-muted" style={{ fontStyle: 'italic' }}>{fish.scientificName}</p>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Pronounced: {fish.pronunciation}</p>
          </div>

          <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
            <p>{fish.edibilityText}</p>
          </div>

          {fish.cookingMethods.length > 0 && (
            <div style={{ marginBottom: '24px', backgroundColor: 'var(--color-bg-sand)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Simple Cooking Tips</h3>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginBottom: '16px' }}>
                {fish.cookingMethods.map((method, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{method}</li>
                ))}
              </ul>

              {(fish.recipes || fish.pinoyRecipes) && (
                <>
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '16px 0' }}></div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Tasty Recipes</h3>
                    
                    {fish.pinoyRecipes && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                          Switch ➔
                        </span>
                        <button 
                          onClick={() => setShowPinoy(!showPinoy)}
                          style={{ 
                            fontSize: '0.8rem', 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            cursor: 'pointer',
                            backgroundColor: showPinoy ? 'var(--color-primary)' : 'white',
                            color: showPinoy ? 'white' : 'var(--color-primary)',
                            border: '1px solid var(--color-primary)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                          }}
                        >
                         {showPinoy ? '🇵🇭 Pinoy Style' : '🌎 International'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {displayedRecipes && displayedRecipes.map((recipe, index) => (
                      <a 
                        key={index} 
                        href={`https://www.google.com/search?q=recipe+${encodeURIComponent(recipe.name)}+${encodeURIComponent(fish.commonName)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: 'var(--color-primary)', 
                          textDecoration: 'none',
                          fontWeight: 500,
                          padding: '8px 12px',
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          borderRadius: '8px'
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>{showPinoy ? '🍛' : '🍲'}</span>
                        {recipe.name}
                        <span style={{ marginLeft: 'auto', fontSize: '0.9em', opacity: 0.6 }}>↗</span>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Fun Fact</h3>
            <p style={{ color: 'var(--color-primary)', fontWeight: 500 }}>"{fish.funFact}"</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {!isSaved && (
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={onSave}
              >
                Add to Collection
              </button>
            )}
            <button 
              className="btn btn-ghost" 
              style={{ flex: isSaved ? 1 : '0 0 auto', padding: '0 16px', border: isSaved ? '1px solid #ddd' : 'none' }}
              onClick={onScanAgain}
            >
              {isSaved ? "Back to Camera" : "Scan Again"}
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-center text-muted" style={{ fontSize: '0.8rem', marginTop: '24px' }}>
        Remember: Only keep what you identify 100%. If unsure, release it gently.
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
