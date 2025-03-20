import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Inforlandia() {
	const tasks = [
		{
		  text: "Assemble and testet desktop computers and laptops, ensuring quality and efficiency in hardware production.",
		  keywords: [ "quality", "efficiency", "computers", "laptops"],
		},
		{
		  text: "Transferred to the RMA team, managing equipment repairs and diagnostics using a ticketing platform to track and resolve issues effectively.",
		  keywords: ["RMA", "equipment repairs", "diagnostics", "ticketing platform", "issue resolution"],
		},
		{
		  text: "Analyze and repair faulty electronic devices, ensuring minimal downtime and maintaining high service standards.",
		  keywords: ["analyze", "repair", "high service"],
		},
	  ];
	  

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
        <div className="flex flex-col spacey-y-2">
          {/* Title */}
          <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          IT Support Technician <span className="text-AAsecondary">@ Inforlandia</span>
          </span>
          {/* Date */}
          <span className="font-mono text-xs text-gray-500">Nov 2017 - Mar 2019</span>
          <span
            className="font-mono text-xs text-AAsecondary hover:cursor-pointer"
            style={{ fontSize: "0.6rem" }}
            // set on click to open the website
            onClick={() => window.open("https://www.inforlandia.com/", "_blank")}
          >
            www.inforlandia.com
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
