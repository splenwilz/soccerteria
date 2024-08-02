import CountDownTime from "@/components/CountDownTime";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import LeagueTable from "@/components/LeagueTable";
import Navigation from "@/components/Navigation";
import TableResources from "@/components/TableResources";
import Welcome from "@/components/Welcome";
import YoutubeVideoContainer from "@/components/YoutubeVideoContainer";
import { fetchLaLigaStandings, getMatchList } from "@/lib/user";
import { format } from "date-fns";

export default async function Home() {
  const matchList = await getMatchList()
  const laliga1 = await fetchLaLigaStandings({ division: 'first' })
  const laliga2 = await fetchLaLigaStandings({ division: 'second' })

  return (
    <>
      <Navigation logo="logo1" />
      <div className="bg-[rgba(38,39,38)]">
        <Welcome
          time={matchList?.[0]?.gameDate ? format(new Date(matchList[0].gameDate), 'yyyy-MM-dd') : ''}
          jackpot={matchList?.[0]?.jackpot || "0"}
        />
      </div>
      <CountDownTime
        time={matchList?.[0]?.gameDate ? format(new Date(matchList[0].gameDate), 'yyyy-MM-dd') : ''}
        jackpot={matchList?.[0]?.jackpot || "0"}
      />
      <TableResources />
      <LeagueTable
        standings={laliga1?.children[0]?.standings?.entries}
        standings2={laliga2?.children[0]?.standings?.entries}
      />
      <HowItWorks />
      <YoutubeVideoContainer />
      <Footer />
    </>
  );
}
