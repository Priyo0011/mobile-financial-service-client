import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div className="max-w-[1440px] mx-auto ">
          <Outlet></Outlet>
          <Toaster />
        </div>
      );
};

export default Main;