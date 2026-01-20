import HeroPremium from "@/components/hero/HeroPremium";
import HeroText from "@/components/hero/HeroText";
import DietHeroCard from "@/components/hero/DietFormCard";

export default function HomePage() {
  return (
    <main>
      <HeroPremium>
        <HeroText />
        <DietHeroCard />
      </HeroPremium>
    </main>
  );
}
