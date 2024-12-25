import DiscountCard from "./DiscountCard";
import image1 from "../assets/discouts/banner-bg-1.png";
import image2 from "../assets/discouts/banner-bg-2.png";
import image3 from "../assets/discouts/banner-bg-3.png";
const Discount = () => {
  return (
    <div className="lg:container lg:mx-auto grid md:grid-cols-2 lg:grid-cols-3 mb-10 gap-6 md:mx-6 mx-4">
      <DiscountCard
        title={"Weekend deals"}
        subtitle={"15%"}
        description={"Get 15% off for weekend rentals!"}
        image={image1}
      ></DiscountCard>
      <DiscountCard
        title={"Exclusive Deal"}
        subtitle={"70%"}
        description={"Luxury cars at $99/day this holiday season!”"}
        image={image2}
      ></DiscountCard>
      <DiscountCard
        title={"Get Secure Fleet"}
        subtitle={"Armored Cars"}
        description={"With Security Guards"}
        image={image3}
      ></DiscountCard>
    </div>
  );
};

export default Discount;
