import React from "react";
import "./Grid.css";
import grid1 from "../../../public/images/grid1.png"
import grid2 from "../../../public/images/grid2.png"
import grid3 from "../../../public/images/grid3.png"
import grid4 from "../../../public/images/grid4.png"
const Grid = () => {
  return (
        <section className="grid-section">
      <h2>BROWSE BY DRESS STYLE</h2>
    <div className="grid-container">
   
      <div className="grid-card casual-card">

        <h3>Casual</h3> <img src={grid1} alt="Casual" />
      </div>
      <div className="grid-card formal-card">
    
        <h3>Formal</h3> <img src={grid2} alt="Formal" />
      </div>
      <div className="grid-card party-card">
   
        <h3>Party</h3> <img src={grid3} alt="Party" />
      </div>
     
      <div className="grid-card gym-card">
    
        <h3>Gym</h3> <img src={grid4} alt="Gym" />
      </div>
    </div>
    </section>
  );
};
export default Grid;
