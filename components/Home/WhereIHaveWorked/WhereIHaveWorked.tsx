import React from "react";
import { motion } from "../../../node_modules/framer-motion/dist/framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import Brightstuff from "./Descriptions/Brightstuff";
import CodigoCoerente from "./Descriptions/CodigoCoerente";
import MADigital from "./Descriptions/MADigital";
import Inforlandia from "./Descriptions/Inforlandia";

export default function WhereIHaveWorked() {
	const barRef = React.useRef<HTMLDivElement>(null);
	// ? INFORMATIONAL control the green position using px,
	// ? INFORMATIONAL the default value of barRef's class should be at the beginning translate-y-[0px]
	const GetDescription = () => {
		console.log(DescriptionJob);
		switch (DescriptionJob) {
			// case "Inforlandia":
			// 	return <Inforlandia />;
			case "Brightstuff":
				return <Brightstuff />;
			case "MADigital":
				return <MADigital />;
			case "CodigoCoerente":
				return <CodigoCoerente />;
			case "Inforlandia":
				return <Inforlandia />;
		}
	};
	const [DescriptionJob, setDescriptionJob] = React.useState("Brightstuff");
	return (
		<div
			data-aos="fade-up"
			className="flex flex-col items-center justify-center py-24 space-y-12 bg-AAprimary"
		>
			{/* // ? Title "Where I've Worked" */}
			<div className="flex flex-col space-y-8 px-4 sm:px-0 w-full sm:w-[500px] md:w-[700px] lg:w-[900px]">
				<section className="flex flex-row items-center">
					<div className="flex flex-row items-center">
						<ArrowIcon
							className={
								"flex-none h-4 md:h-6 w-4 md:w-5 text-AAsecondary"
							}
						/>
						{/* <span className="text-AAsecondary font-sans text-sm  sm:text-xl">
						{" "}
						02.
					</span> */}
					</div>

					<span className="text-gray-200 opacity-85 font-bold tracking-wider text-lg md:text-2xl px-3">
						Where I&apos;ve Worked
					</span>
					<div className="bg-gray-400 h-[0.2px] w-28 sm:w-44 md:w-80"></div>
				</section>
			</div>

			{/* // ? Where I've Worked Content section */}
			<section
				className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0
      justify-center md:justify-center items-center md:items-start "
			>
				{/* // ? Left side of Where I've Worked, contains the bar and name of companies */}
				<CompaniesBar setDescriptionJob={setDescriptionJob} />
				{/* // ? Description for The job */}
				{GetDescription()}
			</section>
		</div>
	);
}

const CompaniesBar = (props) => {
	const [barPosition, setBarPosition] = React.useState<Number>(-8); // Green bar position by the default it's -20px
	const [barAbovePosition, setBarAbovePosition] = React.useState<Number>(0);
	const [
		companyNameBackgroundColorGreen,
		setCompanyNameBackgroundColorGreen,
	] = React.useState<boolean[]>([
		true,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const CompanyButton = (props) => {
		return (
			<button
				onClick={() => {
					setBarPosition(props.BarPosition);
					setBarAbovePosition(props.BarAvobePosition);
					props.setDescriptionJob(props.DescriptionJob);
					setCompanyNameBackgroundColorGreen(
						props.CompanyNameBackgroundColorGreen
					);
				}}
				className={`flex-none sm:text-sm text-xs text-center md:text-left  hover:text-AAsecondary
             hover:bg-ResumeButtonHover rounded  font-mono  
             py-3 md:pl-6 md:px-4 md:w-44 w-32 duration-500
             ${
					companyNameBackgroundColorGreen[
						props.ButtonOrderOfcompanyNameBackgroundColorGreen
					]
						? "bg-ResumeButtonHover text-AAsecondary"
						: "text-gray-500"
				}`}
			>
				{props.CompanyName}
			</button>
		);
	};

	return (
		<div
			id="WhereIhaveWorkedSection"
			className=" flex flex-col md:flex-row  w-screen lg:w-auto 
      overflow-auto scrollbar-hide md:overflow-hidden pb-4 md:pb-0 justify-start
       sm:justify-center items-start sm:items-center"
		>
			{/* // ? left bar Holder */}
			<div
				className=" hidden md:block bg-gray-500 relative h-0.5 w-34 md:h-[162px] translate-y-1 md:w-0.5  
        rounded md:order-1 order-2  "
			>
				{/* // ? animated left bar */}
				<motion.div
					animate={{ y: barPosition }}
					// ref={barRef}
					className={`absolute w-10 h-0.5 md:w-0.5 md:h-12 rounded bg-AAsecondary `}
				></motion.div>
			</div>
			{/* // ? Companies name as buttons */}
			<div className="flex flex-col md:order-2 order-1 space-y-1 pl-8 md:pl-0 ">
				<div className="flex flex-row md:flex-col">
					<CompanyButton
						ButtonOrderOfcompanyNameBackgroundColorGreen={0}
						CompanyName="Brightstuff"
						BarPosition={-10}
						BarAvobePosition={1}
						DescriptionJob="Brightstuff"
						CompanyNameBackgroundColorGreen={[
							true,
							false,
							false,
							false,
							false,
							false,
							false,
							false,
						]}
						setDescriptionJob={props.setDescriptionJob}
					/>

					<CompanyButton
						ButtonOrderOfcompanyNameBackgroundColorGreen={2}
						CompanyName="M&A Digital"
						BarPosition={30}
						BarAvobePosition={129}
						DescriptionJob="MADigital"
						CompanyNameBackgroundColorGreen={[
							false,
							false,
							true,
							false,
							false,
							false,
							false,
							false,
						]}
						setDescriptionJob={props.setDescriptionJob}
					/>

					<CompanyButton
						ButtonOrderOfcompanyNameBackgroundColorGreen={1}
						CompanyName="Código Coerente"
						BarPosition={75}
						BarAvobePosition={129}
						DescriptionJob="CodigoCoerente"
						CompanyNameBackgroundColorGreen={[
							false,
							true,
							false,
							false,
							false,
							false,
							false,
							false,
						]}
						setDescriptionJob={props.setDescriptionJob}
					/>

					<CompanyButton
						ButtonOrderOfcompanyNameBackgroundColorGreen={3}
						CompanyName="Inforlandia"
						BarPosition={120}
						BarAvobePosition={385}
						DescriptionJob="Inforlandia"
						CompanyNameBackgroundColorGreen={[
							false,
							false,
							false,
							true,
							false,
							false,
							false,
							false,
						]}
						setDescriptionJob={props.setDescriptionJob}
					/>
				</div>
				<div className="block md:hidden h-0.5 rounded bg-gray-500">
					<motion.div
						animate={{ x: barAbovePosition }}
						className="w-[128px] h-0.5 rounded bg-AAsecondary"
					></motion.div>
				</div>
			</div>
		</div>
	);
};
