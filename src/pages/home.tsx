import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SignUp from "../components/signUp";
import SignIn from "../components/signIn";
import SignupImage from "../assets/signUp.svg"
import SigninImage from "../assets/siginIn.svg"


const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="relative flex w-full max-w-3xl lg:h-[90vh] shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex flex-col justify-center items-center w-2/3 custom-bg text-white p-6 relative">
         {/* @ts-ignore */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup-text" : "signin-text"}
              initial={{ opacity: 0, x: isSignUp ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full flex flex-col items-center"
            >
              <h2 className="text-2xl font-semibold">
                {isSignUp ?
                  <div>
                     <img src={SignupImage} alt="signup" />
                  </div>
                  : 
                  <div>
                  <img src={SigninImage} alt="signin" />
               </div>
                 
                 }
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 p-6">
        {/* @ts-ignore */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "Sign up" : "Sign In"}
              initial={{ opacity: 0, x: isSignUp ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -50 : 50 }}
              transition={{ duration: 0.5 }}
            >
              {isSignUp ? (
                <SignUp onToggle={toggleForm} />
              ) : (
                <SignIn onToggle={toggleForm} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
