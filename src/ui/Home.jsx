import { fetchAllPolls } from "../utils/api";
import { useGetTrendingPollsQuery } from "../redux/api";

import { Hero } from "../App";
import FeatureSection from "./Features";
import Cta from "./Cta";
import Footer from "./Footer";
import TrendingPollsSection from "./TrendingPollsSection";

export default function Home() {
  const { data: polls, isLoading, error } = useGetTrendingPollsQuery();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center border-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="loader"></span>
        </div>
      </div>
    );
  return (
    <>
      <Hero />
      <FeatureSection />
      <TrendingPollsSection polls={polls} />
      <Cta />
      <Footer />
    </>
  );
}
export async function homeLoader() {
  const polls = await fetchAllPolls();

  return polls;
}
