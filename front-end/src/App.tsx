import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./utils/route";
import "./layout/assets/style/main.scss";
import { Footer } from "./layout/footer";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="">header</header>
      <div className="app-main">
        <Router>
          <AppRoutes />
        </Router>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default App;
