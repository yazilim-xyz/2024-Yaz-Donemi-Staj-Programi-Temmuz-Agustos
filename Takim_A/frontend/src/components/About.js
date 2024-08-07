import React from 'react';
import logo from '../image/logo.jpg'; // Logoyu import etme

const teamMembers = [
  {
    name: 'Talha',
    role: 'Frontend',
    linkedin: 'https://www.linkedin.com/in/talha-tursun-520081276/', // LinkedIn URL'si
    github: 'https://github.com/tursuntalha', // GitHub URL'si
  },
  {
    name: 'Karahan',
    role: 'Backend',
    linkedin: 'https://www.linkedin.com/in/karahanyavuzkara/', // LinkedIn URL'si
    github: 'https://github.com/karahanyavuzkara', // GitHub URL'si
  },
  {
    name: 'Büşra',
    role: 'Frontend',
    linkedin: 'https://www.linkedin.com/in/b%C3%BC%C5%9Fra-basan-421972264/', // LinkedIn URL'si
    github: 'https://github.com/Busrabasan67', // GitHub URL'si
  },
  {
    name: 'Zeynep',
    role: 'Frontend',
    linkedin: 'https://www.linkedin.com/in/zeynep-zivali/', // LinkedIn URL'si
    github: 'https://github.com/zeybit', // GitHub URL'si
  },
];

const About = () => {
  return (
    <div className="h-screen p-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex p-4">
            <div className="bg-secondary text-white shadow-md rounded-lg p-6 w-full flex flex-col items-center justify-center">
              <img
                src={logo}
                alt={`${member.name} Logo`}
                className="h-16 w-16 mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p>{member.role}</p>
              <div className="mt-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mr-4"
                >
                  LinkedIn
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
