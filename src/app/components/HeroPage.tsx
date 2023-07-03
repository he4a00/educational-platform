import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";

const HeroPage = () => {
  return (
    <div className=" mt-20 ">
      <div className="container flex justify-center flex-col between items-center">
        {/* <div className="flex flex-col">
          <h1 className="text-4xl front-bold">Welcome To Englishy</h1>
        </div> */}
        <Image
          width={1200}
          height={400}
          className="opacity-40"
          alt="hero"
          src="https://img.freepik.com/free-vector/vowels-concept-illustration_114360-7486.jpg?w=1380&t=st=1688395540~exp=1688396140~hmac=96e8ddfbd0b3f46688b0e10d01b57535166cb51b58b79ad4c29c428df0d7d654"
        />
      </div>
    </div>
  );
};

export default HeroPage;
