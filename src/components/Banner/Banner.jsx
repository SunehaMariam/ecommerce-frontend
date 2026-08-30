import React from "react";
import versace from "../../../public/images/versace.png"
import zara from "../../../public/images/zara.png";
import gucci from "../../../public/images/gucci.png";
import prada from "../../../public/images/prada.png";
import CK from "../../../public/images/CK.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="brand-banner">
      <img className="brand-logo" src={versace} alt="Versace" />
      <img className="brand-logo" src={zara} alt="Zara" />
      <img className="brand-logo" src={gucci} alt="Gucci" />
      <img className="brand-logo" src={prada} alt="Prada" />
      <img className="brand-logo" src={CK} alt="Calvin Klein" />
    </div>
  );
};

export default Banner;