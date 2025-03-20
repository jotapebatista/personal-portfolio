import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function MADigital() {
	const tasks = [
		{
		  text: "Developed a multi-tenant CMS using Nuxt.js, ensuring scalability and seamless content management across multiple tenants.",
		  keywords: ["multi-tenant", "CMS", "Nuxt.js", "scalability", "content management"],
		},
		{
		  text: "Built and maintained a .NET Core MVC backend API, optimizing performance and ensuring secure data handling.",
		  keywords: [".NET Core", "MVC", "backend API", "performance optimization", "security"],
		},
		{
		  text: "Designed and optimized SQL Server stored procedures, improving database efficiency and query performance.",
		  keywords: ["SQL Server", "stored procedures", "database optimization", "query performance"],
		},
		{
		  text: "Managed version control and collaborative development using Git, ensuring code quality and streamlined workflows.",
		  keywords: ["Git", "version control", "collaborative development", "code quality", "workflows"],
		},
	  ];
	  


  return (
    <>
      <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
        <div className="flex flex-col spacey-y-2">
          {/* Title */}
          <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Junior Full Stack Developer <span className="text-AAsecondary">@ M&A Digital</span>
          </span>
          {/* Date */}
          <span className="font-mono text-xs text-gray-500">Nov 2023 - Sept 2024</span>
          <span
            className="font-mono text-xs text-AAsecondary hover:cursor-pointer"
            style={{ fontSize: "0.6rem" }}
            // set on click to open the website
            onClick={() => window.open("https://www.madigital.eu/", "_blank")}
          >
            www.madigital.eu
          </span>
        </div>
        <div className="flex flex-col space-y-4 sm:text-sm text-xs">
          {/* Tasks Description 1 */}
          {tasks.map((item, index) => {
            return (
              <div key={index} className="flex flex-row space-x-1">
                <ArrowIcon className={" h-5 w-4 text-AAsecondary flex-none"} />
                <span
                  className="text-gray-500 sm:text-sm text-xs"
                  dangerouslySetInnerHTML={{
                    __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
                  }}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
