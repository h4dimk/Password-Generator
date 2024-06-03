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
      <div className="password-generator flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        <h1 className="text-4xl font-bold text-white mb-8">
          Strong Password Generator
        </h1>

        {/* Error Message (if any) */}
        {errorMessage && (
          <div className="error-message text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <div className="options-container flex flex-col items-center gap-4">
          <div className="flex items-center">
            <label className="text-lg text-white mr-4">Length:</label>
            <input
              type="number"
              className="w-20 rounded-md bg-gray-200 px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="checkbox-container flex items-center">
              <input
                type="checkbox"
                id="uppercase"
                checked={options.uppercase}
                onChange={(e) =>
                  setOptions({ ...options, uppercase: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="uppercase" className="text-lg text-white">
                Uppercase Letters
              </label>
            </div>
            <div className="checkbox-container flex items-center">
              <input
                type="checkbox"
                id="lowercase"
                checked={options.lowercase}
                onChange={(e) =>
                  setOptions({ ...options, lowercase: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="lowercase" className="text-lg text-white">
                Lowercase Letters
              </label>
            </div>
            <div className="checkbox-container flex items-center">
              <input
                type="checkbox"
                id="numbers"
                checked={options.numbers}
                onChange={(e) =>
                  setOptions({ ...options, numbers: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="numbers" className="text-lg text-white">
                Numbers
              </label>
            </div>
            <div className="checkbox-container flex items-center">
              <input
                type="checkbox"
                id="special"
                checked={options.special}
                onChange={(e) =>
                  setOptions({ ...options, special: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="special" className="text-lg text-white">
                Special Characters
              </label>
            </div>
          </div>
        </div>

        <div className="password-container flex mt-8">
          <input
            type="text"
            className="w-full rounded-md bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            value={generatedPassword}
            readOnly
          />
          <button
            className="generate-button bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed ml-4"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
          <button
            className="copy-button bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed ml-4"
            onClick={handleCopyToClipboard}
            disabled={!generatedPassword}
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
