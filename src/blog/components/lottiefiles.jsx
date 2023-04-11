import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
export const LoginImage = () => {
  return (
    <>
    <div>
      <Player
        src="https://assets1.lottiefiles.com/packages/lf20_hrmx64df.json"
        background="transparent"
        speed={1}
        style={{ maxWidth: "700px",}}
        className="head-img"
        autoplay
        loop
      />
      </div>
    </>
  );
}