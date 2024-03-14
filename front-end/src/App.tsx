import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./utils/route";
import "./layout/assets/style/main.scss";
import { Footer } from "./layout/footer";
import { Header } from "./layout/header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header></Header>
        <div className="app-main">
          <AppRoutes />
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
