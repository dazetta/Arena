import heroSection from "../../data/hero";
import PrimaryButton from "../Buttons/PrimaryButton";
import heroImage from '../../assets/Arena-web-banner.png';

export default function Hero() {
  return (
    <div>
      <main>
        <div className="relative px-6 lg:px-8 hero-section font-montserrat">
          <img src={heroImage} className="absolute left-0 top-0 z-[9] w-full h-full object-cover" />
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40 z-[99] relative">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-6xl text-left">
              {heroSection?.Hero_Heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-black text-left">
              {heroSection?.Hero_Text}
            </p>
            <div className="mt-8 flex gap-x-4 text-left">
              <PrimaryButton className="text-lg" onClick={() => {

              }}>{heroSection?.Hero_Button_Text}</PrimaryButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
