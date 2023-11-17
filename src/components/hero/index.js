import heroSection from "../../data/hero";

export default function Hero() {
  return (
    <div>
      <main>
        <div className="relative px-6 lg:px-8">
          <img src="https://i.postimg.cc/yddfKVmC/andrew-tanglao-3-I2vzcm-Ep-LU-unsplash.jpg" className="absolute left-0 top-0 z-[-1] w-full h-full object-cover"/>
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <h1 className="text-4xl font-bold tracking-tight text-[#0351aa] sm:text-center sm:text-6xl">
              {heroSection?.Hero_Heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-black sm:text-center">
              {heroSection?.Hero_Text}
            </p>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
              <button className="inline-block rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm">
                {heroSection?.Hero_Button_Text}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
