import { Outlet } from "react-router-dom";

import { Footer } from "./modules/customer/components/Home/Footer";
import Navbar from "./modules/customer/components/Home/Navbar";
import CartDrawer from "./modules/customer/components/cart/CartDrawer";

const App = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;
