import { useState } from "react";
import axios from "./services/axiosService";
import { data } from "autoprefixer";

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleGeneratePassword = async () => {
    try {
      const response = await axios.post("/passwords", { length, options });
      const data = response.data;
      console.log(data);
      setGeneratedPassword(data.password);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Password Generator</h1>
      <div className="flex mb-4">
        <input
          type="number"
          className="w-20 mr-4 rounded-md border-gray-300 p-2 focus:outline-none"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label className="mr-2">Length:</label>
        <div className="mr-4">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) =>
              setOptions({ ...options, uppercase: e.target.checked })
            }
            className="mr-1"
          />
          <label>Uppercase</label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={(e) =>
              setOptions({ ...options, lowercase: e.target.checked })
            }
            className="mr-1"
          />
          <label>Lowercase</label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) =>
              setOptions({ ...options, numbers: e.target.checked })
            }
            className="mr-1"
          />
          <label>Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={options.special}
            onChange={(e) =>
              setOptions({ ...options, special: e.target.checked })
            }
            className="mr-1"
          />
          <label>Special Characters</label>
        </div>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full rounded-md border-gray-300 p-2 focus:outline-none"
          value={generatedPassword}
          readOnly
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>
        <button
          className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none"
          onClick={handleCopyToClipboard}
          disabled={!generatedPassword}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default App;
