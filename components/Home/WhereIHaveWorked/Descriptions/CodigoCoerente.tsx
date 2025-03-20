import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function CodigoCoerente() {
	const tasks = [
		{
			text: "Implemented and maintained cluster networks and systems, ensuring high availability and performance for critical applications.",
			keywords: ["networks", "high availability", "performance"],
		},
		{
			text: "Conducted Q&A testing to identify and resolve software and hardware issues, improving reliability and user experience.",
			keywords: [
				"Q&A testing",
				"bug fixing",
				"software reliability",
				"hardware testing",
				"user experience",
			],
		},
		{
			text: "Developed software solutions Python and Lua, optimizing system functionality and automating tasks.",
			keywords: ["Python", "Lua", "software development", "automation"],
		},
		{
			text: "Led projects from planning to execution, managing resources and timelines to ensure successful deliveries.",
			keywords: ["planning", "execution", "timelines", "successful"],
		},
	];

	return (
		<>
			<div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
				<div className="flex flex-col spacey-y-2">
					{/* Title */}
					<span className="text-gray-100 text-sm sm:text-lg font-Arimo tracking-wide">
						Electronics & IT Technician{" "}
						<span className="text-AAsecondary">
							@ Código Coerente 
						</span>
					</span>

					{/* Date */}
					<span className="font-mono text-xs text-gray-500">
						Mar 2019 - Apr 2023
					</span>
					<span
						className="font-mono text-xs text-AAsecondary hover:cursor-pointer"
						style={{ fontSize: "0.6rem" }}
						// set on click to open the website
						onClick={() =>
							window.open("https://www.brightstuff.pt/", "_blank")
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
								className="flex flex-row space-x-2"
							>
								<ArrowIcon
									className={
										"h-5 w-4 text-AAsecondary flex-none"
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
