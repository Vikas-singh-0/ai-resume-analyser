import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/puter/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Cool resume analyser!" },
  ];
}

export default function Home() {
  const { isLoading, auth, init } = usePuterStore();
  const location = useLocation();
  const next: string = location.search.split('next=')[1];
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated) {
      navigate('/auth?next=/');
    } 
    init();
  }, [auth.isAuthenticated]);
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section py-16">
      <div className="page-heading"> 
        <h1>Track your applications </h1>
        <h2>Review your submissions and check AI powered feedback.</h2>
      </div>
    </section>
    {resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map(resume => <>
          <ResumeCard key={resume.id} resume={resume} />
        </>)}
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
}
