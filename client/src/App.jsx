import { useState } from "react";
import axios from "./services/axiosService";
import PopupMessage from "./components/PopupMessage";

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGeneratePassword = async () => {
    if (
      !options.uppercase &&
      !options.lowercase &&
      !options.numbers &&
      !options.special
    ) {
      setErrorMessage("Please choose at least one option.");
      return;
    }
    try {
      const response = await axios.post("/passwords", { length, options });
      const data = response.data;
      console.log(data);
      setGeneratedPassword(data.password);
      setErrorMessage("");
    } catch (error) {
      console.error("Error generating password:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error copying password to clipboard:", error);
      });
  };

  return (
    <>
      {showPopup && (
        <PopupMessage
          message="Password copied to clipboard!"
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-teal-500 mb-4">
          Password Generator
        </h1>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="flex mb-4 items-center">
          <input
            type="number"
            className="w-20 mr-4 rounded-md bg-gray-100 p-2 focus:outline-teal-500 focus:ring-teal-500"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="mr-2 text-gray-700">Length:</label>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) =>
                setOptions({ ...options, uppercase: e.target.checked })
              }
              className="mr-1"
            />
            <label className="text-gray-700 mr-2">Uppercase</label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) =>
                setOptions({ ...options, lowercase: e.target.checked })
              }
              className="mr-1"
            />
            <label className="text-gray-700 mr-2">Lowercase</label>
          </div>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) =>
                setOptions({ ...options, numbers: e.target.checked })
              }
              className="mr-1"
            />
            <label className="text-gray-700 mr-2">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={options.special}
              onChange={(e) =>
                setOptions({ ...options, special: e.target.checked })
              }
              className="mr-1"
            />
            <label className="text-gray-700 mr-2">Special Characters</label>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <input
            type="text"
            className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-teal-500 focus:ring-teal-500"
            value={generatedPassword}
            readOnly
          />
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus-ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleCopyToClipboard}
            disabled={!generatedPassword}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
