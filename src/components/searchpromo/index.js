import React from 'react';

export default function Promotion() {
  const url = "#/category/mobile"; // Change this URL to the desired destination
  return (
    <div className="relative overflow-hidden bg-white text-center" style={{ position: 'relative' }}>
      <div className="py-10">
        <div className="mx-auto max-w-7xl sm:static" style={{ position: 'relative' }}>
          <a href={url} style={{ display: 'block', width: '100%', height: '100%' }}>
            <img
              src="https://dexata.co/wp-content/uploads/2024/06/arena-ecommerce-secondary-banner.png"
              alt="Best Prices Banner"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '10%',    // Adjusted top padding for aesthetics
              left: '6%',   // Adjusted left padding for aesthetics
              maxWidth: 'calc(100% - 20px)',  // Prevents text from extending outside the image width
              padding: '0 10px',  // Additional padding to ensure text has space around it
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
    </div>
  );
}
