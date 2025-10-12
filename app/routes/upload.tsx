import path from "path";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { AIResponseFormat, prepareInstructions } from "~/constants";
import {
  convertPdfToImage,
  type PdfConversionResult,
} from "~/lib/pdfToImageConverter";
import { usePuterStore } from "~/puter/puter";

function upload() {
  const [isProcessing, setIsProcesssing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { fs, isLoading, kv, ai, auth } = usePuterStore();
  const navigate = useNavigate();
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcesssing(true);
    setStatusText("Uploading a file");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Failed to upload file");
    setStatusText("Converting to image");
    // convertPdfToImage(file);
    try {
      const imageFile: PdfConversionResult = await convertPdfToImage(file);
      if (!imageFile.file)
        return setStatusText("Failed to convert PDF to image");
      setStatusText("uploading image");
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) return setStatusText("Failed to upload image");
      setStatusText("Processing data");
      const uuid = crypto.randomUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobDescription,
        jobTitle,
        feedback: "",
      };

      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("analyzing resume...");

      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );
      if (!feedback) return setStatusText("Failed to analyzze the resume");
      const feedbackMessage =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0];

      data.feedback = JSON.parse(feedbackMessage.text);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete");
      console.log(data);
      navigate(`/resume/${uuid}`);
      setIsProcesssing(false);
      
    } catch (err) {
      console.log(err);
      setIsProcesssing(false);
      return;
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDesc = formData.get("job-description") as string;

    handleAnalyze({
      companyName,
      jobTitle,
      jobDescription: jobDesc,
      file: file as File,
    });
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-[50%]" />
            </>
          ) : (
            <>
              <h2 className="mb-5">
                Please drop your resume for ATS score and improvement tips
              </h2>
            </>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="company name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="job title" />
              </div>
              <div className="form-div">
                <label htmlFor="company-name">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="job-description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button">Analyze Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default upload;
