import TSlider from "./TSlider";

const Testimonials = () => {
  return (
    <div>
      <div className="text-center mt-10">
        <h4 className="text-lg font-medium text-[#FF3600] mb-2">
          Reviewed by People
        </h4>
        <h1 className="text-4xl font-bold text-[#010103] mb-4">
          Clients' Testimonials
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from our satisfied clients who have experienced unmatched service
          and value. Their stories speak volumes about the trust and excellence
          we deliver.
        </p>
      </div>
      <div>
        <TSlider></TSlider>
      </div>
    </div>
  );
};

export default Testimonials;
