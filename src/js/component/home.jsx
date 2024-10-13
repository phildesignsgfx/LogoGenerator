import React, { useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg"; // Including image (not used for now)

const Home = () => {
  const [companyName, setCompanyName] = useState(""); // Store company name input
  const [industry, setIndustry] = useState(""); // Store industry input
  const [style, setStyle] = useState(""); // Store style input
  const [logoDescription, setLogoDescription] = useState(""); // Store API response

  const handleGenerateLogo = async () => {
    const prompt = `Create a detailed description of a logo for a company named "${companyName}", operating in the "${industry}" industry. The logo should have a "${style}" style.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Secure key from environment variable
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            max_tokens: 150,
            n: 1,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const generatedDescription = data.choices[0].text.trim();
      setLogoDescription(generatedDescription); // Set API response to state
    } catch (error) {
      console.error("Error generating logo description:", error);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form refresh
          handleGenerateLogo(); // Call API
        }}
      >
        <p>Company Name</p>
        <input
          type="text"
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)} // Capture input
        />
        <p>Industry</p>
        <input
          type="text"
          placeholder="Enter the industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)} // Capture input
        />
        <p>Logo Style</p>
        <input
          type="text"
          placeholder="Enter the logo style (e.g., modern, minimal)"
          value={style}
          onChange={(e) => setStyle(e.target.value)} // Capture input
        />
        <br />
        <input type="submit" value="Generate Logo Description" />
      </form>

      {logoDescription && (
        <div className="logo-description">
          <h2>Generated Logo Description</h2>
          <p>{logoDescription}</p>
        </div>
      )}

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
      </div>
    </div>
  );
};

export default Home;
