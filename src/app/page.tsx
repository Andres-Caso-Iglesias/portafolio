import Timeline from "@/components/Timeline";
import EducationSection from "@/components/EducationSection";
import LocaleContent from "@/components/LocaleContent";
import { HeroAboutClient, SkillsProjectsContactClient } from "@/components/HomeClientContent";

export default function Home() {
  const defaultLang = 'es' as const;

  return (
    <main className="min-h-screen">
      <LocaleContent defaultLang={defaultLang}>
        <HeroAboutClient />
      </LocaleContent>

      {/* Timeline Section */}
      <Timeline />

      {/* Education Section */}
      <EducationSection />

      <LocaleContent defaultLang={defaultLang}>
        <SkillsProjectsContactClient />
      </LocaleContent>
    </main>
  );
}
