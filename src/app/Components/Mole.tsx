import React from "react";
import Image from "next/image";

import moleImg from "../../../public/Images/mole.png";
import holeImg from "../../../public/Images/hole.png";

// Define the prop types for the component
interface MyComponentProps {
  showMole: boolean;
}

export default function Mole({ showMole }: MyComponentProps) {
  return (
    <>
      <Image
        src={showMole ? moleImg : holeImg}
        alt="image_of_mole"
        className={`${showMole ? "cursor-pointer" : ""}`}
      />
    </>
  );
}
