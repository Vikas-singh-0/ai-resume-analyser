import React, { useState } from 'react'
import type { Feedback } from '../types/index'

function Details({ feedback }: { feedback: Feedback }) {
  const [openSections, setOpenSections] = useState({
    toneAndStyle: false,
    content: false,
    structure: false,
    skills: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const sections = [
    { key: 'toneAndStyle' as const, label: 'Tone & Style', data: feedback.toneAndStyle },
    { key: 'content' as const, label: 'Content', data: feedback.content },
    { key: 'structure' as const, label: 'Structure', data: feedback.structure },
    { key: 'skills' as const, label: 'Skills', data: feedback.skills },
  ]

  return (
    <div className="bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-6 rounded-2xl mx-auto w-full">
      <h2 className="text-3xl font-semibold text-dark-200 mb-6">Details</h2>
      {sections.map(({ key, label, data }) => (
        <div key={key} className="mb-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            onClick={() => toggleSection(key)}
          >
            <h3 className="text-xl font-semibold text-dark-200">{label}</h3>
            <div className="flex items-center gap-2">
              <div className="score-badge bg-gray-100 text-dark-200 py-1 px-3 rounded-full text-sm font-medium">
                {data.score}/100
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${openSections[key] ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {openSections[key] && (
            <div className="mt-4 transition-all duration-300">
              <ul className="space-y-3">
                {data.tips.map((tip: typeof data.tips[0], index: number) => (
                  <li key={index} className={`flex items-start gap-3 p-3 rounded-lg ${tip.type === 'good' ? 'bg-badge-green text-badge-green-text' : 'bg-badge-red text-badge-red-text'}`}>
                    <img
                      src={tip.type === 'good' ? '/icons/check.svg' : '/icons/cross.svg'}
                      alt={tip.type}
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <strong className="text-sm font-medium">{tip.tip}</strong>
                      <p className="text-xs mt-1 opacity-80">{tip.explanation}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Details
