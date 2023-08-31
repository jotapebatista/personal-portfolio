import React from "react";

function Portfolio() {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1.",
      imageUrl: "/images/project1.jpg", // Update with your image URL
      demoUrl: "#", // Update with the actual demo URL
      codeUrl: "#", // Update with the actual code repository URL
    },
    // Add more project objects as needed
  ];

  return (
    <div className="text-white py-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-700 p-6 rounded-lg flex flex-col items-center">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex space-x-4">
              <a href={project.demoUrl} className="text-emerald-400 hover:underline">
                Demo
              </a>
              <a href={project.codeUrl} className="text-emerald-400 hover:underline">
                Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
