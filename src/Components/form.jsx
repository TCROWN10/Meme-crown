import { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const Form = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [meme, setMeme] = useState(null);
  const memeRef = useRef(null); // Reference to the meme container

  const fetchMeme = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();

      const memesArray = data.data.memes;

      const randomMeme = memesArray[Math.floor(Math.random() * memesArray.length)];

      setMeme(randomMeme.url);
    } catch (error) {
      console.error("Failed to fetch meme:", error);
    }
  };

  // Download the meme with text as an image
  const handleDownload = async () => {
    if (memeRef.current) {
      const canvas = await html2canvas(memeRef.current);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "custom-meme.png";
      link.click();
    }
  };

  return (
    <div className="items-center flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMeme();
        }}
      >
        <div className="flex">
          <div className="flex flex-col w-1/2 items-center">
            <label
              htmlFor="topText"
              className="text-sm font-medium self-start ml-6 hidden md:flex"
            >
              Top Text
            </label>
            <input
              type="text"
              id="topText"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="topText"
              className="border border-gray-600 w-3/4 rounded-md h-10 bg-white p-2 placeholder:text-black text-black text-sm focus:outline-none"
            />
          </div>
          <div className="">
            <img src="/src/Components/Tobi.png" 
            alt=""
            width={80}
            height={80}
            style={{ background: "navajowhite", borderRadius: "50%", border: "2px solid white" }}
            />
            </div>
          <div className="flex flex-col w-1/2 items-center">
            <label
              htmlFor="bottomText"
              className="text-sm font-medium self-start ml-6 hidden md:flex"
            >
              Bottom Text
            </label>
            <input
              type="text"
              id="bottomText"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="bottomText"
              className="border border-gray-600 w-3/4 rounded-md h-10 bg-white p-2 placeholder:text-black text-black text-sm placeholder:text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex w-full justify-center items-center mt-8">
          <button className="w-3/4 bg-violet-800 h-10 text-white rounded-lg">
            Generate
          </button>
        </div>
      </form>

      {meme && (
        <motion.div
          className="mt-8 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          ref={memeRef} // Attach ref to the div that contains the meme and text
        >
          <img src={meme} alt="Meme" className="w-full max-w-sm" />
          {/* Top text */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold drop-shadow-md">
            {text1}
          </div>
          {/* Bottom text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold drop-shadow-md">
            {text2}
          </div>
        </motion.div>
      )}

      {meme && (
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg"
          onClick={handleDownload} // Download functionality
        >
          Download Meme
        </button>
      )}
    </div>
  );
};

export default Form;
