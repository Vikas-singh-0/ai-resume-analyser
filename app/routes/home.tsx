import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
// import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/puter/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Resume } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Cool resume analyser!" },
  ];
}

export default function Home() {
  const { isLoading, auth, init, kv, fs } = usePuterStore();
  const location = useLocation();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setResumesLoading] = useState(false);
  const next: string = location.search.split("next=")[1];
  const navigate = useNavigate();

  const deleteResume = async (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;

    try {
      // Delete from KV
      // kv.del
      await kv.del(`resume:${resumeId}`);
      // Delete image file
      await fs.delete(resume.imagePath);
      // Delete resume file
      await fs.delete(resume.resumePath);
      // Update local state
      setResumes(resumes.filter(r => r.id !== resumeId));
    } catch (error) {
      console.error("Failed to delete resume:", error);
      // Optionally show error to user
    }
  };

  useEffect(() => {
    const loadResumes = async () => {
      setResumesLoading(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value));

      setResumes(parsedResumes || []);
      setResumesLoading(false);
    };
    loadResumes();
  }, []);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
    init();
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Track your applications </h1>
          <h2>Review your submissions and check AI powered feedback.</h2>
        </div>
      </section>
      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={deleteResume} />
          ))}
        </div>
        // <div key={resume.id} className="resume-card">
        //   <img src={resume.imagePath} alt="Resume Image" className="resume-image" />
        //   <div className="resume-details">
        //     <h3 className="company-name">{resume.companyName || "Unknown Company"}</h3>
        //     <p className="job-title">{resume.jobTitle || "Unknown Job Title"}</p>
        //     <a href={resume.resumePath} download className="download-link">Download Resume</a>
        //     <div className="feedback-section">
        //       <h4>Overall Score: {resume.feedback.overallScore}</h4>
        //       <div className="feedback-categories">
        //         <div className="category">
        //           <h5>ATS Score: {resume.feedback.ATS.score}</h5>
        //           <ul>
        //             {resume.feedback.ATS.tips.map((tip, index) => (
        //               <li key={index} className={tip.type === "good" ? "tip-good" : "tip-improve"}>
        //                 {tip.tip}
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //         <div className="category">
        //           <h5>Tone & Style Score: {resume.feedback.toneAndStyle.score}</h5>
        //           <ul>
        //             {resume.feedback.toneAndStyle.tips.map((tip, index) => (
        //               <li key={index} className={tip.type === "good" ? "tip-good" : "tip-improve"}>
        //                 {tip.tip} - {tip.explanation}
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //         <div className="category">
        //           <h5>Content Score: {resume.feedback.content.score}</h5>
        //           <ul>
        //             {resume.feedback.content.tips.map((tip, index) => (
        //               <li key={index} className={tip.type === "good" ? "tip-good" : "tip-improve"}>
        //                 {tip.tip} - {tip.explanation}
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //         <div className="category">
        //           <h5>Structure Score: {resume.feedback.structure.score}</h5>
        //           <ul>
        //             {resume.feedback.structure.tips.map((tip, index) => (
        //               <li key={index} className={tip.type === "good" ? "tip-good" : "tip-improve"}>
        //                 {tip.tip} - {tip.explanation}
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //         <div className="category">
        //           <h5>Skills Score: {resume.feedback.skills.score}</h5>
        //           <ul>
        //             {resume.feedback.skills.tips.map((tip, index) => (
        //               <li key={index} className={tip.type === "good" ? "tip-good" : "tip-improve"}>
        //                 {tip.tip} - {tip.explanation}
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </main>
  );
}
