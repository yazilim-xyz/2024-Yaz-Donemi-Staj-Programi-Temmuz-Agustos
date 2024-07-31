import React from 'react';
import logo from '../image/logo.jpg'; // Logoyu import etme

const About = () => {
  return (
    <div className="h-screen p-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex p-4">
          <div className="bg-secondary text-white shadow-md rounded-lg p-6 w-full flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Talha</h3>
            <p>Frontend</p>
          </div>
        </div>
        <div className="flex p-4">
          <div className="bg-secondary text-white shadow-md rounded-lg p-6 w-full flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Karahan</h3>
            <p>Backend</p>
          </div>
        </div>

        <div className="flex p-4">
          <div className="bg-secondary text-white shadow-md rounded-lg p-6 w-full flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Büşra</h3>
            <p>Frontend</p>
          </div>
        </div>
        <div className="flex p-4">
          <div className="bg-secondary text-white shadow-md rounded-lg p-6 w-full flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Zeynep</h3>
            <p>Frontend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
