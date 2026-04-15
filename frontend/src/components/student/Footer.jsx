// import { FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-10 md:mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col items-center justify-between gap-4">
        {/* Left */}
        <div className="text-center">
          <h2 className="text-xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#4309a7]">©</span> 2026 Your Company. All
            rights reserved.
          </p>
        </div>

        {/* Right - Social Icons */}
        {/* <div className="flex gap-6">
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-600 hover:text-[#F83002] transition"
          >
            <FacebookIcon size={19} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-600 hover:text-[#F83002] transition"
          >
            <TwitterIcon size={19} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-[#F83002] transition"
          >
            <LinkedinIcon size={19} />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
