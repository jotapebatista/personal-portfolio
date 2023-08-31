import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaJava,
  FaPython,
  FaGitAlt,
} from "react-icons/fa";
import { SiJquery, SiTailwindcss, SiSpring, SiDjango } from "react-icons/si";
import { BiNetworkChart } from "react-icons/bi";

function About() {
  const techStack = [
    { icon: FaHtml5, name: "HTML5" },
    { icon: FaCss3Alt, name: "CSS3" },
    { icon: FaJs, name: "JavaScript" },
    { icon: SiJquery, name: "jQuery" },
    { icon: FaReact, name: "React" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: FaJava, name: "Java" },
    { icon: SiSpring, name: "Spring" },
    { icon: FaPython, name: "Python" },
    { icon: SiDjango, name: "Django" },
    { icon: FaGitAlt, name: "Git" },
    { icon: BiNetworkChart, name: "REST API" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-gradient-to-b from-gray-800 to-black px-2 pt-10 md:px-12 overflow-auto">
    <div className="w-full text-center px-10">
        <p className="font-extrabold text-4xl md:text-5xl pb-4">
          Hey there, I&apos;m João. 🚀
        </p>
        <p className="text-center">
          As a junior Full Stack Developer, I&apos;m on a journey of turning
          innovative ideas into beautifully functional web applications. The
          14-week coding bootcamp I conquered ignited my passion for both
          front-end and back-end technologies. My coding journey is fueled by
          the excitement of bringing creative visions to life.
          <br />
          <br />
          Whether it&apos;s crafting pixel-perfect UIs or building robust APIs, I
          thrive on challenges and collaborations. Let&apos;s build something
          awesome together!
        </p>
      </div>

      <h1 className="font-extrabold text-2xl md:text-3xl mt-6 md:mt-10">
        My Tech Stack
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4 pb-5">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2 md:p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <tech.icon size={32} className="text-white" />
            <p className="mt-1 md:mt-2 text-sm md:text-xl">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
