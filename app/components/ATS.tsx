import React from 'react'

function ATS({score, suggestions}: {score: number, suggestions: { type: 'good' | 'improve'; tip: string; }[]}) {
  const getBackgroundColor = (score: number) => {
    if (score >= 70) return '#d4edda'; // light green
    if (score < 50) return '#f8d7da'; // light red
    return '#fff3cd'; // light yellow
  };

  const getCompliment = (score: number) => {
    if (score >= 70) return 'Good job!';
    if (score < 50) return 'Requires improvement';
    return 'Keep improving';
  };

  return (
    <div style={{
      background: `linear-gradient(to bottom, ${getBackgroundColor(score)}, white)`,
      padding: '24px',
      borderRadius: '12px',
      margin: '16px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          backgroundColor: score >= 70 ? '#28a745' : score < 50 ? '#dc3545' : '#ffc107',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: '4px'
        }}>
          <img className='h-30 w-20'
            src={score >= 70 ? '/icons/check.svg' : score < 50 ? '/icons/warning.svg' : '/icons/info.svg'}
            alt={score >= 70 ? 'Good' : score < 50 ? 'Bad' : 'Info'}
            style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }}
          />
        </div>
        ATS Score: {score}%
      </h2>
      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '1.4rem', fontStyle: 'italic', fontWeight: '500' }}>{getCompliment(score)}</p>
      <p className='text-sm text-gray-500 pb-6'>This score indicates how well your resume matches the job description. Aim for 70% or above for better chances.
      <span>/100</span>
      </p>
      <div>
        {suggestions.length > 0 ? (
          suggestions.map((sug, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
              <img
                src={sug.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'}
                alt={sug.type === 'good' ? 'Good' : 'Warning'}
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
              />
              <p style={{
                margin: 0,
                color: sug.type === 'good' ? '#28a745' : '#dc3545',
                lineHeight: '1.4',
                fontSize: '0.95rem'
              }}>{sug.tip}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#777', fontStyle: 'italic' }}>No suggestions available.</p>
        )}
      </div>
    </div>
  );
}

export default ATS
