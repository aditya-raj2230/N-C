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
      <footer className="bg-[#fb7427] text-[#fef4b8] py-8 w-full text-center relative z-10">

        <h1 className="text-2xl font-bold mb-4 px-4">
          We build beautiful, functional websites that help businesses grow and
          stand out with the best online.
        </h1>
        <div className="flex justify-center gap-8 text-lg">
          <p className="hover:text-white cursor-pointer transition-colors">
            Privacy Policy
          </p>
          <p className="hover:text-white cursor-pointer transition-colors">
            Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
}

export default GentleWater;
