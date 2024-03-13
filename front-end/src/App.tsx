import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./route";
import "./layout/assets/style/main.scss";

const App: React.FC = () => {
  return (
    <>
      <header className="">header</header>
      <div className="app-main">
        <Router>
          <AppRoutes />
        </Router>
      </div>

      <footer className="">footer</footer>
    </>
  );
};

export default App;
