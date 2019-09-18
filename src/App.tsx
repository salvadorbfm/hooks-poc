import React from "react";
import PlanProvider from "../src/providers/Plan.provider";
import "./App.css";
import PlansView from "./modules/Plans.module";

const App: React.FC = () => {
  return (
    <div className="App">
      <PlanProvider>
        <PlansView />
      </PlanProvider>
    </div>
  );
};

export default App;
