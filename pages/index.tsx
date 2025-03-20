import Header from "../components/Header/Header";
import MyName from "../components/Home/MyName/MyName";
import SocialMediaArround from "../components/Home/SocialMediaArround/SocialMediaArround";
import AboutMe from "../components/Home/AboutMe/AboutMe";
import WhereIHaveWorked from "../components/Home/WhereIHaveWorked/WhereIHaveWorked";
import GetInTouch from "../components/Home/GetInTouch/GetInTouch";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import { useRef } from "react";

export default function Home() {
	const meta = {
		title: "João Batista - Full Stack Developer",
		description: `I've been working on Software development for 2 years straight. Get in touch with me to know more.`,
		type: "website",
	};
	const homeRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta name="description" content={meta.description} />
				<meta property="og:url" content="https://jotapebatista.pt" />
				<link rel="canonical" href="https://jotapebatista.pt" />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="João Batista" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
			</Head>

			<div className="relative min-h-screen bg-AAprimary w-full">
				<Header finishedLoading={true} sectionsRef={homeRef} />
				<MyName finishedLoading={true} />
				<SocialMediaArround finishedLoading={true} />
				<AboutMe />
				<WhereIHaveWorked />
				<GetInTouch />
				{/* <Footer
					githubUrl={"https://github.com/hktitof/my-website"}
					hideSocialsInDesktop={true}
				/> */}
			</div>
		</>
	);
}
