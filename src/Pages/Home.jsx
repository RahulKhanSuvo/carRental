import { Helmet } from "react-helmet-async";
import About from "../Components/About";
import Banner from "../Components/Banner";
import Discount from "../Components/Discount";
import RecentListing from "../Components/RecentListing";

import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Carola | home</title>
      </Helmet>
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      <RecentListing></RecentListing>
      <About></About>
      <Discount></Discount>
    </div>
  );
};

export default Home;
