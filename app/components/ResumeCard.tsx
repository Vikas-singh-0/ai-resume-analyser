import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/puter/puter";
import type { Resume } from "~/types";

function ResumeCard({ resume, onDelete }: { resume: Resume; onDelete: (id: string) => void }) {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [resume.imagePath]);
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg break-words text-gray-500">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <ScoreCircle score={resume.feedback.overallScore} />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(resume.id);
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <img src="/icons/cross.svg" alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>
      {resumeUrl && (<div className="gradiant-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={resumeUrl}
            className="w-full h-[350px] max-sm:h-[200px] object-top object-cover"
            alt="resume"
          />
        </div>
      </div>)}
    </Link>
  );
}

export default ResumeCard;
