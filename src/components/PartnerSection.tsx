import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";

const logos = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Beeline-Uzbekistan-logo-2022.png",
    link: "https://beeline.uz",
  },
  {
    img: "https://api.logobank.uz/media/logos_png/Ucell-01.png",
    link: "https://ucell.uz",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/OQ_LOGO.svg/1200px-OQ_LOGO.svg.png",
    link: "https://mobi.uz",
  },
];

const extendedLogos = [...logos, ...logos, ...logos, ...logos];

const PartnerSection = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full py-16 md:py-24 bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-screen-2xl px-5 mx-auto">
        <h2 className="text-gray-900 text-4xl md:text-5xl font-semibold tracking-tight mb-16 text-center">
          {t("ourPartner")}
        </h2>

        <div className="space-y-8">
          {/* 1st row - Left to Right */}
          <div className="relative flex items-center">
            <Marquee speed={100} gradient={false} pauseOnHover loop={0}>
              {extendedLogos.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-8 md:px-12 h-24 hover:opacity-75 transition-opacity"
                >
                  <img
                    className="h-16 md:h-20 w-auto object-contain"
                    src={item.img || "/placeholder.svg"}
                    alt="Partner logo"
                  />
                </a>
              ))}
            </Marquee>
          </div>

          {/* 2nd row - Right to Left (different direction) */}
          <div className="relative flex items-center">
            <Marquee
              speed={100}
              direction="right"
              gradient={false}
              pauseOnHover
              loop={0}
            >
              {extendedLogos.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-8 md:px-12 h-24 hover:opacity-75 transition-opacity"
                >
                  <img
                    className="h-16 md:h-20 w-auto object-contain"
                    src={item.img || "/placeholder.svg"}
                    alt="Partner logo"
                  />
                </a>
              ))}
            </Marquee>
          </div>

          {/* 3rd row - Left to Right (same as 1st row) */}
          <div className="relative flex items-center">
            <Marquee speed={100} gradient={false} pauseOnHover loop={0}>
              {extendedLogos.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-8 md:px-12 h-24 hover:opacity-75 transition-opacity"
                >
                  <img
                    className="h-16 md:h-20 w-auto object-contain"
                    src={item.img || "/placeholder.svg"}
                    alt="Partner logo"
                  />
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
