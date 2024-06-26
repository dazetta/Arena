export default function Promotion() {
  return (
    <div className="relative overflow-hidden bg-white text-center">
      <div className="py-10">
        <a href="/#/category/shoes" className="inline-block m-auto relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <img
              src="https://dexata.co/wp-content/uploads/2024/06/arena-ecommerce-secondary-banner.png"
              alt=""
              className="h-full w-full object-cover object-center"
            />

                        <div style={{
              position: 'absolute',
              top: '10%',    // Adjusted top padding for aesthetics
              left: '6%',   // Adjusted left padding for aesthetics
              maxWidth: 'calc(100% - 20px)',  // Prevents text from extending outside the image width
              padding: '2% 10px 0 15%',  // Additional padding to ensure text has space around it
            }}>
              <span style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }} id="banner-text">
                Best Prices
              </span>

                <div style = {{position:'absolute', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', padding: '3px'}}>

                <div className="mb-4">
                  Shop Now
                </div>
            </div>

            </div>
        </a>
      </div>
    </div>
  );
}
