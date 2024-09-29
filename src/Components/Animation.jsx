import { motion } from "framer-motion";


const AnimatedHeading = () => {
    return (
        <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
       >
        <h2 className="text-3xl font-bold animate-scale my-10 text-[rgb(20,110,245)]">
         Tcrown
        </h2>
        </motion.div>
    );
  };
  
  export default AnimatedHeading;