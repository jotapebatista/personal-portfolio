import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Brightstuff() {
	const tasks = [
		{
		  text: "Developed an employee attendance monitoring system using the webhook API of the clocking system, improving workforce tracking and efficiency.",
		  keywords: ["attendance monitoring", "webhook API", "clocking system", "workforce tracking", "efficiency"],
		},
		{
		  text: "Created a label printing application with a user-friendly front-end, enabling seamless printing of designated stickers across production printers over the network.",
		  keywords: ["label printing", "networked printers", "front-end development", "sticker printing", "production workflow"],
		},
		{
		  text: "Bridged the gap between industrialization and production by documenting processes, preparing test scenarios, and ensuring compliance before product release.",
		  keywords: ["industrialization", "production", "documentation", "test scenarios", "compliance"],
		},
		{
		  text: "Ensured product quality by defining and overseeing testing procedures, guaranteeing that products leave fully tested and compliant with standards.",
		  keywords: ["product quality", "testing procedures", "compliance", "process oversight", "standards"],
		},
	  ];
	  

	return (
		<>
			<div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
				<div className="flex flex-col spacey-y-2">
					{/* Title */}
					<span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
						Product Owner <span className="text-AAsecondary">@ Brightstuff</span>
					</span>
					{/* Date */}
					<span className="font-mono text-xs text-gray-500">
						Oct 2023 - Sept 2022
					</span>
					<span
						className="font-mono text-xs text-AAsecondary hover:cursor-pointer"
						style={{ fontSize: "0.6rem" }}
						// set on click to open the website
						onClick={() =>
							window.open(
								"https://www.brightstuff.pt/",
								"_blank"
							)
						}
					>
						www.brightstuff.pt
					</span>
				</div>
				<div className="flex flex-col space-y-4 sm:text-sm text-xs">
					{/* Tasks Description 1 */}
					{tasks.map((item, index) => {
						return (
							<div
								key={index}
								className="flex flex-row space-x-1"
							>
								<ArrowIcon
									className={
										" h-5 w-4 text-AAsecondary flex-none"
									}
								/>
								<span
									className="text-gray-500 sm:text-sm text-xs"
									dangerouslySetInnerHTML={{
										__html: getTasksTextWithHighlightedKeyword(
											item.text,
											item.keywords
										),
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
