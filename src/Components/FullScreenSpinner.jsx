import { FadeLoader } from "react-spinners";

const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white  flex items-center justify-center">
      <FadeLoader color="#FF2C3B" size={60} />
    </div>
  );
};

export default FullScreenSpinner;
