import Banner from "../Components/Banner";
import Testimonials from "../Components/Testimonials";
import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      {/* content */}
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
