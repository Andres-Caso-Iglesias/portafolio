import Timeline from "@/components/Timeline";
import EducationSection from "@/components/EducationSection";
import { HeroAboutClient, SkillsProjectsContactClient } from "@/components/HomeClientContent";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroAboutClient />

      {/* Timeline Section */}
      <Timeline />

      {/* Education Section */}
      <EducationSection />

      <SkillsProjectsContactClient />
    </main>
  );
}
