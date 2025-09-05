import React from "react";


const AboutUs = () => {
  return (
    <div className="w-full font-sans text-gray-800">
      
      <div className="grid grid-cols-0 gap-1">
      <img src="/images/hero.jpeg" alt="Hero" className="w-full h-100px object-cover" />

      </div>

      {/* About Us */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2">About Us</h2>
        <p className="text-gray-600 mb-8">Smarter GPS solutions for Every Journey</p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/images/about.jpeg"
            alt="Way4Track GPS"
            className="rounded-lg shadow-lg"
          />
          <div className="text-left">
            <p className="mb-4 leading-relaxed">
              At Way4Track, we specialize in delivering cutting-edge GPS tracking solutions
              designed for businesses and individuals. Our mission is simple: to make tracking
              effortless, accurate, and reliable.
            </p>
            <p className="mb-4 leading-relaxed">
              From basic trackers for personal vehicles to advanced AIS-140 certified devices,
              we provide technology that ensures safety, compliance, and convenience. Whether
              you need fleet management, vehicle monitoring, ACC control, video surveillance, or
              government compliance, Way4Track has a solution tailored to your requirement.
            </p>
            <p className="mb-6 leading-relaxed">
              Trusted by transport companies, logistics providers, and individuals alike, we
              combine innovation, reliability, and affordability to help you stay connected to
              what matters most.
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Get in touch
            </button>
          </div>
        </div>
      </section>

                                     {/* Why Chose */}
      <section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-[40px] md:text-[48px] font-extrabold mb-3 text-gray-900">Why Choose us</h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
      Thank you for trusting Way4Track – powering every journey with precision, safety, and control.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div className="relative">
        
        <div className="absolute -left-6 -top-6 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
          
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 10h2M3 14h2M21 10h-2M21 14h-2M10 3v2M14 3v2M10 21v-2M14 21v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="bg-gray-100 rounded-[14px] p-8 shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#2f7e34] mb-3">Cutting-Edge Technology</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Advanced GPS solutions with real-time tracking, fuel monitoring, and remote control features.
          </p>
        </div>
      </div>
                
      
                    <div className="relative">
        <div className="absolute -left-6 -top-6 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
          
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3l6 2v4c0 5-3 9-6 11-3-2-6-6-6-11V5l6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 12.5l1.8 1.8L15 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="bg-green-600 text-white rounded-[14px] p-8 shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Proven Reliability</h3>
          <p className="text-white/90 text-lg leading-relaxed">
            Trusted by businesses and individuals for accurate, uninterrupted performance.
          </p>
        </div>
      </div>

      
      <div className="relative">
        <div className="absolute -left-6 -top-6 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
          
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3.5" y="6.5" width="17" height="11.5" rx="2.2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="bg-green-600 text-white rounded-[14px] p-8 shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Compliance & Safety First</h3>
          <p className="text-white/90 text-lg leading-relaxed">
            AIS-140 certified devices for government compliance and enhanced passenger safety.
          </p>
        </div>
      </div>

      
      <div className="relative">
        <div className="absolute -left-6 -top-6 w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
          
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 13a3 3 0 003 3h.5v-3H4zM20 13a3 3 0 01-3 3h-.5v-3H20z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 17v2a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 17v2a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="bg-gray-100 rounded-[14px] p-8 shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#2f7e34] mb-3">Dedicated Support</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            24/7 customer assistance to ensure smooth operation and quick problem resolution.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Records Section */}
      <section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    
    <h2 className="text-[40px] md:text-[48px] font-extrabold mb-2 text-gray-900">
      Our Records
    </h2>
    <p className="text-gray-600 mb-12">Our Journey So Far</p>

    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-green-600 text-white rounded-lg p-8 md:col-span-2 flex flex-col justify-center items-center">
        <h3 className="text-4xl font-bold mb-2">50,000+</h3>
        <p className="text-xl md:text-2xl font-medium">Active GPS Devices</p>
      </div>

      
      <div className="bg-gray-100 text-green-600 rounded-lg p-8 flex flex-col justify-center items-center">
        <p className="text-lg font-medium">Countries Covered</p>
        <h3 className="text-3xl font-bold">120+</h3>
      </div>
      <div className="bg-gray-100 text-green-600 rounded-lg p-8 flex flex-col justify-center items-center">
        <p className="text-lg font-medium">Countries Satisfaction</p>
        <h3 className="text-3xl font-bold">98%</h3>
      </div>
      <div className="bg-green-600 text-white rounded-lg p-8 md:col-span-2 flex flex-col justify-center items-center">
        <h3 className="text-4xl font-bold mb-2">12+</h3>
        <p className="text-xl md:text-2xl font-medium">Years of Experience</p>
      </div>
    </div>
  </div>
</section>

      
      {/* History */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Our History</h2>
          <p className="text-gray-600 mb-12">
            From a Simple Idea to a Trusted GPS Solutions Leader
          </p>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-green-600"></div>
            <div className="space-y-16">
              <div className="relative flex justify-start w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2009</span>
                </div>
                <div className="w-5/12 mr-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2009 – Founded with a Vision</h3>
                  <p className="text-sm text-gray-600">
                    Started our journey to make GPS tracking smarter and accessible for everyone.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-end w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2012</span>
                </div>
                <div className="w-5/12 ml-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2012 – First Major Platform Release</h3>
                  <p className="text-sm text-gray-600">
                    Launched our flagship GPS platform, setting new standards in vehicle tracking.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-start w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2015</span>
                </div>
                <div className="w-5/12 mr-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2015 – International Expansion</h3>
                  <p className="text-sm text-gray-600">
                    Expanded our services beyond borders, connecting fleets worldwide.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-end w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2018</span>
                </div>
                <div className="w-5/12 ml-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2018 – AI Integration</h3>
                  <p className="text-sm text-gray-600">
                    Introduced artificial intelligence to enhance tracking accuracy and predictive analytics.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-start w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2021</span>
                </div>
                <div className="w-5/12 mr-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2021 – IoT Ecosystem</h3>
                  <p className="text-sm text-gray-600">
                    Connected devices and vehicles into a seamless Internet of Things experience.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-end w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="mt-2 text-sm font-semibold text-green-700">2024</span>
                </div>
                <div className="w-5/12 ml-auto bg-gray-50 p-4 rounded-lg shadow text-left">
                  <h3 className="text-green-700 font-semibold mb-1">2024 – Next-Gen Platform</h3>
                  <p className="text-sm text-gray-600">
                    Unveiled the future of GPS tracking with advanced tech and unmatched reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 text-gray-700">
            And this is just the beginning — at{" "}
            <span className="text-green-600 font-semibold">Way4Track</span>, innovation never stops.
          </p>
        </div>
      </section>

      {/* cto */}
      <footer className="bg-green-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">That’s All About Us</h2>
          <p className="mb-6">Feel Free To Say Hi!</p>
          <p className="text-sm max-w-xl mx-auto mb-6">
            Thanks For Stopping By. We’re Excited To Help You Track What Matters Most.
            Ready To Connect?
          </p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
            Get In Touch!
          </button>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="text-sm space-y-1">
                <li>About</li>
                <li>Our Products</li>
                <li>Careers</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="text-sm space-y-1">
                <li>Contact Us</li>
                <li>Whatsapp</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <ul className="text-sm space-y-1">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-sm border-t border-white/40 pt-6">
            ©2025 All Rights Reserved • Terms Of Use • Privacy Policy • Legal Policies
          </div>
          <h1 className="text-9xl font-bold mt-6">Way4Track</h1>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
