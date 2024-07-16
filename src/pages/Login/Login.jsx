import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const Login = () => {
    const { profileLoader, setProfileLoader } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
  
    // Password Show / Hide Toggle
    const [passToggle, setPassToggle] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const pin = form.pin.value;
      const loginData = { email, pin };
  
      // validation
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        toast.error("Invalid email address");
        return;
      }
  
      console.log(loginData);
  
      axiosPublic.post("/login", loginData).then((res) => {
        console.log(res.data);
        if (res.data.result?.isLogin) {
          toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
  
          // setTimeout(() => {
          form.reset();
          setProfileLoader(!profileLoader);
          navigate("/");
          // }, 0);
        } else {
          toast.error(res?.data?.result?.message);
        }
      });
    };
    return (
      <div className="py-8 min-h-screen flex flex-row-reverse justify-around items-center">
        <div className="text-center sm:min-h-[80vh] lg:min-h-0 sm:flex lg:block justify-center items-center">
          <div className="w-fit mx-auto">
            <div className="max-w-[15.625rem] mx-auto mb-3">
              <Link to="/">
                <img className="w-full" src={logo} alt="logo" />
              </Link>
            </div>
            <h4 className="text-4xl font-bold text-[#007F37]">
              Welcome <span className="text-primary-color">Back</span>
            </h4>
            <p className="text-lg font-medium mt-2 text-slate-600 mb-6">Please Login to continue!</p>
  
            {/* login form */}
            <form onSubmit={handleSubmit}>
              {/* email */}
              <div className="w-full mx-auto flex items-center gap-3 text-base border-2 text-slate-600 border-[#007F37] rounded-full py-3 px-4 pl-6">
                <MdEmail className="text-xl" />
                <input type="email" placeholder="Email" name="email" className="bg-transparent w-full text-black outline-none" required />
              </div>
  
              {/* pin */}
              <div className="mt-4 w-full mx-auto flex justify-between items-center gap-3 text-base border-2 text-slate-600 border-[#007F37] rounded-full py-3 px-6">
                <div className="flex gap-3 items-center">
                  <MdOutlineKey className="text-xl" />
                  <input
                    type={passToggle ? "text" : "password"}
                    placeholder="Pin"
                    name="pin"
                    maxLength={5}
                    className="bg-transparent w-full text-black outline-none"
                    required
                  />
                </div>
                <div onClick={() => setPassToggle(!passToggle)} className="text-[1.4rem] cursor-pointer">
                  {passToggle ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </div>
              </div>
  
              {/* submit button */}
              <input
                type="submit"
                value="Log In"
                className="w-full mx-auto mt-6 btn h-auto min-h-0 bg-[#007F37] hover:bg-[#0b381e] text-white font-bold rounded-full py-3 px-10"
              />
            </form>
  
            <p className="text-slate-500 mt-5">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-red-500 font-bold underline opacity-90">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

export default Login;