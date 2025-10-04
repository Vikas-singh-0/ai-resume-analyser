import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Cool resume analyser!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <div className="page-heading"> 
        <h1>Track your applications </h1>
        <h2>Review your submissions and check AI powered feedback.</h2>
      </div>
    </section>
  </main>
}
