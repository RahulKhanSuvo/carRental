import logo from "../assets/Logo/footer-logo.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#10100F]">
      <div className="lg:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mx-auto md:mx-6 mx-4 py-20">
        {/* Logos */}
        <div>
          <img className="w-36" src={logo} alt="Logo" />
          <h4 className="text-white mt-4">Follow Us On:</h4>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/cdrdeadpool/"
              className="text-[#ababab] hover:text-[#FF2C3B]"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com/cdrdeadpool"
              className="text-[#ababab] hover:text-[#FF2C3B]"
            >
              <AiFillTwitterCircle size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/cdrdeadpool/"
              className="text-[#ababab] hover:text-[#FF2C3B]"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white text-lg">Resources</h3>
          <div className="flex flex-col mt-2">
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              About Us
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Gallery
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Our Team
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Pricing
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Contact
            </a>
          </div>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-white text-lg">Community</h3>
          <div className="flex flex-col mt-2">
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Area Details
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Blog Grid
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Faq
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Service Areas
            </a>
            <a href="#" className="text-[#ababab] hover:text-[#FF2C3B]">
              Testimonials
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg">Contact</h3>
          <div className="flex flex-col mt-2">
            <p className="text-[#ababab]">
              57 Heold Insaf Station Road, Cardiff, United Kingdom
            </p>
            <a
              href="mailto:rahul.khan.suvo@gmail.com"
              className="text-[#ababab] hover:text-[#FF2C3B]"
            >
              rahul.khan.suvo@gmail.com
            </a>
            <a
              href="tel:+880292014012"
              className="text-[#ababab] hover:text-[#FF2C3B]"
            >
              029-2021-4012
            </a>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-t-[#5c5c5c] text-[#ababab]  py-8">
        <p>
          Copyright © 2024{" "}
          <Link className="text-[#FF2C3B] text-xl">Carola</Link> , Inc. All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
