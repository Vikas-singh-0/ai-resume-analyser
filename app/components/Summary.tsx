import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

type ATSProps = {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-700"
      : score > 49
        ? "text-yellow-400"
        : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
        </div>
        <p className="text-2xl flex justify-between items-center">
          <span className={textColor}>{score}</span>
          <span>/100</span>
          <ScoreBadge score={score} />
        </p>
      </div>
    </div>
  );
};

function Summary({ feedback }: { feedback: Feedback }) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your resume score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on variables listed below
          </p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills  " score={feedback.skills.score} />
    </div>
  );
}

export default Summary;
