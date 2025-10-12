import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

function ScoreBadge({ score }: ScoreBadgeProps) {
  let stars = 0;
  if (score > 90) {
    stars = 5;
  } else {
    stars = Math.round(score / 20);
  }

  const colorClass = score > 70 ? 'text-green-500' : score > 49 ? 'text-yellow-500' : 'text-red-500';
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starElements.push(<span key={i} className={colorClass}>★</span>);
    } else {
      starElements.push(<span key={i} className="text-gray-400">☆</span>);
    }
  }

  return (
    <div className="score-badge" style={{ display: 'flex', alignItems: 'center' }}>
      {starElements}
    </div>
  );
}

export default ScoreBadge;
