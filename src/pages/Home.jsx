import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  console.log(apiKey)
  const [Idea, setIdea] = useState("");
  const [Category, setCategory] = useState("Ai Saas");
  const [result, setResult] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleGenerate = async () => {
    setLoading(true);
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `You are an expert UI/UX designer and frontend developer.
                          Create a high-quality, modern landing page for:

                            Product/Idea: [${Idea}]
                            Category: [${Category}]

                            Use ONLY HTML and Tailwind CSS (no JavaScript).

                            Design requirements:
                            - Fully responsive (mobile-first)
                            - Clean, modern SaaS-style UI
                            - Proper spacing, shadows, and rounded corners
                            - Use Tailwind classes only

                            Sections to include:
                            1. Hero section:
                              - Catchy headline related to the idea
                              - Supporting text explaining value
                              - CTA button

                            2. Features:
                              - 3–4 feature cards
                              - Use relevant icons (Heroicons style)

                            3. How it works (optional but preferred):
                              - 3 steps layout

                            4. Testimonials (optional):
                              - 2–3 user reviews

                            5. Final CTA section:
                              - Strong persuasive message

                            6. Footer

                            Extra:
                            - Use realistic content (not lorem ipsum)
                            - Make it visually appealing
                            - Add hover effects using Tailwind

                            Output rules:
                            - Return ONLY valid HTML
                            - No explanations
                            - No markdown`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173/",
        },
      },
    );
    console.log(response.data.choices[0].message.content);
    setResult(response.data.choices[0].message.content);
    setLoading(false);
  };
  const copycode = () => {
   navigator.clipboard.writeText(result);
    alert("code copied to clipboard");
  };
  return (
    <div>
      <div className="min-h-screen  bg-[#F0F9FF] px-10 py-4 font-sans">
        <div className="min-w-sm mx-auto rounded-2xl bg-white shadow-2xl p-8">
          <h1 className="text-3xl text-center font-bold text-purple-800 mb-6">
            AI Landing Page Genarator
          </h1>
          <input
            type="text"
            className="w-full border rounded-lg mb-4 border-gray-600 p-3"
            placeholder="Enter Your Product Idea..(eg:Travel,fitness,...)"
            value={Idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <select
            className="w-full border border-gray-800 rounded-lg p-3 mb-4"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Ai Saas">Ai Saas</option>
            <option value="Productive Tool">Productive Tool</option>
            <option value="Startup">Startup</option>
          </select>
          <button
            className="bg-purple-800 text-white font-bold w-full p-3 rounded-lg hover:bg-purple-700"
            onClick={handleGenerate}
          >
            {Loading ? "Generating..." : "Generate Landing Page"}
          </button>
          {result && (
            <div className="mt-8 ">
              <h2 className="text-bold text-4xl mb-3">live preview</h2>
              <div
                className="p-5 rounded-lg shadow-lg mb-3 "
                dangerouslySetInnerHTML={{ __html: result }}
              ></div>
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-6">HTML CODE:</h3>
                <button
                  className="border border-gray-800 bg-gray-700 px-5 py-3 rounded-lg font-bold text-white"
                  onClick={copycode}
                >
                  copy code
                </button>
              </div>
              <pre className="mt-6 bg-black text-sm text-white overflow-x-auto p-3 rounded-lg">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
