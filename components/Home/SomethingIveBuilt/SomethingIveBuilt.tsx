import { FaWordpress, FaPhp, FaJs } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Img from "../../smallComp/image/Img";

export default function SomethingIveBuilt() {
	const router = useRouter();
	return (
		<div
			id="SomethingIveBuiltSection"
			className="flex flex-col xl:space-y-28 space-y-12 bg-AAprimary w-full  
     2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
		>
			{/* // ? Title   */}
			<div
				data-aos="fade-up"
				className="flex flex-row items-center md:px-0"
			>
				<div className="flex-none flex-row space-x-2 items-center pr-2">
					<span className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
						Some Things I&apos;ve Built
					</span>
				</div>
				<div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
			</div>

			<div className="flex flex-col xl:space-y-36 space-y-8 md:space-y-28">
				{/* // ? Project 1 - Sildarte */}
				<div
					data-aos="fade-up"
					className="relative md:grid md:grid-cols-12 w-full md:h-96"
				>
					{/* Left image */}
					<div className="hidden bg-AAprimary z-10 py-4 absolute md:grid grid-cols-12 w-full h-full content-center">
						<div className="relative rounded w-full h-full col-start-6 col-span-7">
							<a
								href="https://www.sildarte.pt"
								target="_blank"
								rel="noreferrer"
							>
								<div className="absolute w-full h-full rounded bg-AAprimary transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"></div>
							</a>
							<Img
								src="/sildarte.png"
								alt="Project Screenshot"
								className="w-full rounded h-full"
							/>
						</div>
					</div>

					{/* Right Content */}
					<div className="md:absolute py-4 md:grid md:grid-cols-12 w-full h-full content-center">
						{/* Background for text in mobile */}
						<div className="absolute w-full h-full bg-opacity-70 z-0 md:order-2">
							<div className="relative w-full h-full">
								<div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
								<div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
								<Img
									src="/sildarte.png"
									alt="Project Screenshot"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						{/* Project Details */}
						<div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 col-span-8 flex flex-col items-start space-y-3 md:order-1">
							<div className="flex flex-col space-y-1 z-10">
								<a
									href="https://www.sildarte.pt"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="text-AAsecondary text-base">
										Sildarte, LDA
									</span>
								</a>
							</div>
							<div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10">
								<p className="text-gray-300 md:text-gray-400 text-left">
									Sildarte specializes in crafting
									high-quality kitchen countertops and
									bathrooms using marble and other premium
									stone materials. I developed their company
									website using{" "}
									<span className="text-AAsecondary">
										WordPress
									</span>
									, enhancing its functionality with custom{" "}
									<span className="text-AAsecondary">
										PHP
									</span>{" "}
									and{" "}
									<span className="text-AAsecondary">
										JavaScript
									</span>{" "}
									scripts.
								</p>
								<div className="flex flex-wrap items-center space-x-4 text-gray-300 md:text-gray-400 text-sm font-Text2 pt-2">
									{/* <span className="text-AAsecondary">
										Tech Stack:
									</span> */}
									<span className="flex items-center space-x-2">
										<FaWordpress className="w-6 h-6 text-AAsecondary" />
										<span>WordPress</span>
									</span>
									<span className="flex items-center space-x-2">
										<FaPhp className="w-6 h-6 text-AAsecondary" />
										<span>PHP</span>
									</span>
									<span className="flex items-center space-x-2">
										<FaJs className="w-6 h-6 text-AAsecondary" />
										<span>JavaScript</span>
									</span>
								</div>
							</div>

							{/* Tech Stack Icons */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
