import React, { useState, useEffect } from "react";
import "../../styles/Button.css";
function Button({ onClick, name, state }) {
  const [imgSrc, setImgSrc] = useState("");
  const [label, setLabel] = useState("On");
  const [backgroundColor, setBackgroundColor]  = useState("#999");
  switch (name) {
    case "Fan":
      useEffect(() => {
        setImgSrc(
          state === "On"
            ? "/imgs/adjustments/fanOn.gif"
            : "/imgs/adjustments/fanOff.png"
        );
        setLabel(state === "Off" ? "Off" : "On");
        setBackgroundColor(state === "Off"?"coral":"forestgreen");
      }, [name, state]);
      break;
    case "Light":
      useEffect(() => {
        setImgSrc(
          state === "On"
            ? "/imgs/adjustments/lightO.png"
            : "/imgs/adjustments/lightOf.png"
        );
        setLabel(state === "Off" ? "Off" : "On");
        setBackgroundColor(state === "Off"?"coral":"forestgreen");
      }, [name, state]);
      break;
    default:
      break;
  }

  return (
    <button className="aButton" onClick={onClick} style={{backgroundColor:backgroundColor}}>
      <img src={imgSrc} alt="" style={{ width: "30%", height: "60%" }} />
      <label htmlFor="" className="label">
        {label}
      </label>
    </button>
  );
}

export default Button;
