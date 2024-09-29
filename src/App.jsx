import { motion } from "framer-motion";
import Form from "./Components/form";
import Header from "./Components/Header";
import Output from "./Components/Output";
import AnimatedHeading from "./Components/Animation";

const App = () => {
  return (
    <div className="bg-[rgb(205,77,164)] h-[100vh] overflow-auto p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <AnimatedHeading />
      <Form />
      <Output />
    </motion.div>
    </div>
  );
};

export default App;

