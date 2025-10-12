import React, { useEffect, useState, type ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/puter/puter";
import type { Feedback } from "~/types/index";

const Resume: () => ReactElement = () => {
  const { kv, auth, isLoading, fs } = usePuterStore();
  const { id } = useParams();
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback|null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) {
      navigate('/auth?next=/resume/${id}');
    } 
  }, [auth.isAuthenticated]);
  useEffect(() => {
    const loadResume = async () => {
      setIsLoadingResume(true);
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imgBlob = await fs.read(data.imagePath);
      if (!imgBlob) return;
      const imageUrl = URL.createObjectURL(imgBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      setIsLoadingResume(false);
    };
    loadResume();
  }, [id]);
  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="bacl-button">
          <img src="/icons/back.svg" alt="logo" className="h-2.5 w-2.5"></img>
          <span className="text-gray-500 text-sm font-semibold">
            Back to homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg)] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {isLoadingResume && <p>loading ...</p>}
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border ">
              <a target="_blank" rel="noopener norefferer" href={resumeUrl}>
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                  alt="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback = {feedback}/> 
                <ATS score = {feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan.gif" className="w-full"></img>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
