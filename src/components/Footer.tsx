import { HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="max-w-screen-2xl mx-auto border-t-8 border-secondaryBrown px-5 max-[400px]:px-3 mt-20 pb-12">
      <div className="flex justify-center gap-24 text-center mt-12 max-[800px]:flex-col max-[800px]:gap-10">
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-2xl font-bold max-sm:text-xl">
            {t("footer.contact")}
          </h3>

          <p className="flex items-center gap-2 text-lg max-sm:text-base">
            <HiEnvelope className="text-xl" /> {t("footer.email")}
          </p>

          <p className="flex items-center gap-2 text-lg max-sm:text-base">
            <HiPhone className="text-xl" /> {t("footer.phone")}
          </p>

          <div className="flex gap-5 mt-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-pink-600 text-white text-xl 
              hover:scale-110 hover:rotate-3 hover:shadow-lg transition-all duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-500 text-white text-xl 
              hover:scale-110 hover:-rotate-3 hover:shadow-lg transition-all duration-300"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl font-bold max-sm:text-xl">
            {t("footer.locationTitle")}
          </h3>

          <p className="flex items-center gap-2 text-lg max-sm:text-base mb-3">
            <HiMapPin className="text-xl" /> {t("footer.location")}
          </p>

          <div className="w-[600px] h-[300px] max-sm:w-[260px] max-sm:h-[220px] rounded-xl overflow-hidden shadow-lg border">
            <iframe
              title="Jizzax Map"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen={false}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95788.99818791908!2d67.7888757!3d40.1154855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38a5cbb8d1f7bf27%3A0x5e9c3f1df6b2f0e4!2sJizzakh%20Region!5e0!3m2!1sen!2suz!4v1707042649210"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 my-16">
        <h2 className="text-6xl font-light text-center max-sm:text-5xl">
          {t("footer.brandName")}
        </h2>
        <p className="text-base text-center max-sm:text-sm">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
