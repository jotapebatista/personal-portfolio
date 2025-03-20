import React, { useEffect, useState } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function GetInTouch() {
	const [isAndroidWebView, setIsAndroidWebView] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility
	const [isSubmitted, setIsSubmitted] = useState(false); // State for the thank you message

	useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor;
		// Check for Android WebView by inspecting the user agent
		if (/android/i.test(userAgent) && /wv/.test(userAgent)) {
			setIsAndroidWebView(true);
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"https://getform.io/f/59b30d0c-8ca7-4149-ac47-6f9171a847d9",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams(formData),
				}
			);

			if (response.ok) {
				toast.success("Message sent successfully!", {
					style: {
						backgroundColor: "#2c3e50",
						color: "rgb(100, 255, 218)",
					},
				});

				setIsFormVisible(false); // Hide form upon successful submission
				setIsSubmitted(true); // Show thank-you message
			} else {
				toast.error("Failed to send message.");
			}
		} catch (error) {
			toast.error("An error occurred.");
			console.error("An error occurred:", error);
		}
	};

	return (
		<div
			id="GetInTouchSection"
			data-aos="fade-up"
			className="flex flex-col space-y-6 w-full h-full items-center bg-AAprimary py-16 px-4"
		>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				pauseOnFocusLoss
			/>

			{/* Title */}
			<div className="flex flex-row items-center space-x-2">
				<ArrowIcon className="h-6 w-6 text-AAsecondary" />
				<span className="text-AAsecondary font-sans text-base sm:text-lg">
					04.
				</span>
				<span className="text-AAsecondary font-sans text-lg sm:text-xl">
					What&apos;s Next?
				</span>
			</div>

			{/* Heading */}
			<span className="text-gray-200 text-4xl sm:text-5xl font-bold tracking-wide opacity-85">
				Get In Touch
			</span>

			{/* Description */}
			<p className="text-gray-400 text-center px-6 sm:px-16 md:px-0 max-w-2xl text-lg leading-relaxed">
				Although I&apos;m always open to new opportunities, my inbox is
				open. Whether you have a question or just want to say hi,
				I&apos;ll try my best to get back to you!
			</p>

			{/* Form or Thank You Message */}
			{!isFormVisible && isSubmitted ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="text-center w-full md:max-w-2xl"
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-AAsecondary">
						Thank You for Your Message!
					</h2>
					<p className="text-gray-400 mt-4 text-lg">
						I'll contact you soon. Looking forward to chatting!
					</p>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: isFormVisible ? 1 : 0 }}
					transition={{ duration: 1 }}
					className="w-full md:max-w-2xl"
				>
					<form
						className="bg-AAprimary p-6 md:p-10 rounded-xl w-full mx-auto border-solid border-2 border-AAsecondary"
						onSubmit={handleSubmit}
					>
						<div className="mb-5">
							<label
								htmlFor="name"
								className="block text-gray-300 mb-2 text-lg"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full p-3 rounded-lg bg-AAtertiary border border-gray-400 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
								placeholder="Your Name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-5">
							<label
								htmlFor="email"
								className="block text-gray-300 mb-2 text-lg"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full p-3 rounded-lg bg-AAtertiary border border-gray-400 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
								placeholder="Your Email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-5">
							<label
								htmlFor="message"
								className="block text-gray-300 mb-2 text-lg"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								className="w-full p-3 rounded-lg bg-AAtertiary border border-gray-400 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
								placeholder="Your Message"
								value={formData.message}
								onChange={handleChange}
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-gray-400 hover:bg-AAsecondary text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300"
						>
							Send Message
						</button>
					</form>
				</motion.div>
			)}

			{/* Contact Button */}
			<div className="pt-6">
				{isAndroidWebView ? (
					<button className="font-mono text-lg text-AAsecondary border-AAsecondary px-6 py-3 border-2 rounded-lg hover:bg-AAsecondary hover:text-AAprimary transition-all">
						abdellatif@anaflous.com
					</button>
				) : (
					<a
						href="mailto:abdellatif@anaflous.com"
						target="_blank"
						rel="noreferrer"
					>
						<button className="font-mono text-lg text-AAsecondary border-AAsecondary px-6 py-3 border-2 rounded-lg hover:bg-AAsecondary hover:text-AAprimary transition-all">
							Say Hello
						</button>
					</a>
				)}
			</div>
		</div>
	);
}
