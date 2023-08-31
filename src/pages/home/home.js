import React from "react";
import Typewriter from "typewriter-effect";
import { introdata } from "../../assets/data";

const Intro = () => {
  return (
    <div className="h-screen flex flex-col flex-grow items-center justify-center text-white pt-4">
      <div className="rounded-full bg-emerald-600 inline-block w-80">
        <img src={introdata.img_url} className="rounded-full" alt="Profile" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">{introdata.title}</h1>
        <p className="font-thin">{introdata.description}</p>
        <Typewriter
          options={{
            strings: [
              introdata.animated.first,
              introdata.animated.second,
              introdata.animated.third,
              introdata.animated.fourth,
              introdata.animated.fifth,
              introdata.animated.sixth,
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 10,
          }}
        />
      </div>
    </div>
  );
};

export default Intro;
