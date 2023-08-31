import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const StickyDiv = () => {
  const socialProfiles = {
    github: "https://github.com/jotapebatista",
    linkedin: "https://www.linkedin.com/in/jotapebatista/",
  };
  const downloadCV = () => {
    const cvUrl = "/JoaoBatista_CV_EN.pdf";
    window.open(cvUrl, "_blank");
  };
  return (
    <div className="hidden md:absolute md:top-1/2 md:left-4 md:transform md:-translate-y-1/2 md:flex md:flex-col md:items-center md:justify-center z-50">
      <div className="py-4">
        {socialProfiles.github && (
          <div className="mb-4">
            <a href={socialProfiles.github} target="_blank">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-white hover:text-emerald-400" />
            </a>
          </div>
        )}
        {socialProfiles.linkedin && (
          <div className="mb-4">
            <a href={socialProfiles.linkedin} target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-white hover:text-emerald-400" />
            </a>
          </div>
        )}
        <div className="mb-4">
          <button onClick={downloadCV}>
            <FontAwesomeIcon icon={faFilePdf} className="w-6 h-6 text-white hover:text-emerald-400" />
          </button>
        </div>
      </div>
      <div className="border-white border-t-2 rounded-lg w-8 h-0 mb-4 rotate-90 px-4"></div>
      <p className="text-emerald-400 text-xs md:py-8 font-semibold transform md:-rotate-90">
        Follow Me
      </p>
    </div>
  );
};

export default StickyDiv;