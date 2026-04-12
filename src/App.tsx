import { Outlet } from "react-router-dom";

import { Footer } from "./modules/customer/components/Home/Footer";
import Navbar from "./modules/customer/components/Home/Navbar";


const App = () => {
  return (
    <>
      <Navbar />

      <main>

         <Outlet /> 


     
      </main>

      <Footer />
    </>
  );
};

export default App;
