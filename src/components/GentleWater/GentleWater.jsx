import React from "react";
import WaterSimulation from "./WaterSimulation";

function GentleWater() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fb7427] relative overflow-hidden">
      {/* Water Simulation Canvas */}
      <div className="w-full h-[70vh]">
        <WaterSimulation />
      </div>

      {/* Footer */}
    </div>
  );
}

export default GentleWater;
