const LogoGenerator = ({ setLogoDescription }) => {
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [style, setStyle] = useState("");
  
    const handleGenerateLogo = async () => {
      const prompt = `Create a detailed description of a logo for a company named "${companyName}", operating in the "${industry}" industry. The logo should have a "${style}" style.`;
  
      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
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
        const description = data.choices[0].text.trim();
        setLogoDescription(description);
      } catch (error) {
        console.error("Error generating logo description:", error);
      }
    };
  
    return (
      <div className="logo-generator">
        <form>
          <p>Company Name</p>
          <input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <p>Industry</p>
          <input
            type="text"
            placeholder="Enter industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <p>Logo Style</p>
          <input
            type="text"
            placeholder="Enter logo style (e.g., modern, minimal)"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
          <br />
          <input type="button" value="Submit" onClick={handleGenerateLogo} />
        </form>
      </div>
    );
  };
  
  export default LogoGenerator;
  