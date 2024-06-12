import CountDownTime from "@/components/CountDownTime";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import LeagueTable from "@/components/LeagueTable";
import Navigation from "@/components/Navigation";
import TableResources from "@/components/TableResources";
import Welcome from "@/components/Welcome";
import YoutubeVideoContainer from "@/components/YoutubeVideoContainer";
import Image from "next/image";
import SuccessDialog from "./(user)/dashboard/wallet/SuccessDialog";

export default function Home() {
  return (
    <>
      <Navigation logo="logo1" />
      <div className="bg-[rgba(38,39,38)]">
        <Welcome />
      </div>

      <CountDownTime />
      <TableResources />
      <LeagueTable />
      <HowItWorks />
      <YoutubeVideoContainer />
      <Footer />

    </>
  );
}
