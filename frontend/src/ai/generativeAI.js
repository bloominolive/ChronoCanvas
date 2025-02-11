import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEN_AI_KEY);

// Define the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAIContent(birthDate){
const prompt = `
Given a birth date, provide the following details that match that date's month in JSON format:
- Birthstone (the one most popular associated with the birth month)
- Birthstone Symbol (what the birthstone means)
- Western zodiac sign (associated with the month)
- Western zodiac sign symbol (three words/phrases of what the western zodiac sign means)
- Chinese zodiac sign
- Chinese zodiac element
- Birth flower (associated with the birth month)
-Birth flower Symbol (three words that have meaning associated with that flower)
- svg that would be an image of an artistic representation of one or many parts of this data. Do not include any words just an artistic depiction. I should be able to use the svg directly from the json object in my application. be sure not to escape any of the quotes or have n for new lines.
- image description that describes why you made the artistic decisions that you did with the svg.

Use the date "March 15, 1990" as an example and ensure the output is structured as valid JSON.

Example Input: March 15, 1990
Expected Output:
{
  "date": "March 15, 1990",
  "dayOfWeek": "Thursday",
  "birthstone": "Aquamarine",
  "birthstoneSymbol": "Protection, Health, and Tranquility",
  "zodiac": "Aries",
  "zodiacSymbol": "Energetic, candid, and willful",
  "chineseZodiac": "Horse",
  "chineseZodiacElement": "Metal",
  "birthFlower": "Daffodil",
  "birthFlowerSymbol": "New Beginnings, Hope, Renewal
  "svg" : "<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">  </svg> preserve aspect ratio true"
  "imgDescription" : "This features a calming blue aquamarine gradient background, symbolizing protection, health, and tranquility. 
  A flowing Pisces symbol is placed at the center, representing energy, candidness, and willful nature. To the left, a metallic horse silhouette 
  reflects the strength and determination of the Metal Horse from the Chinese Zodiac. A delicate daffodil, the birth flower, is positioned at the bottom right, 
  symbolizing new beginnings and prosperity. The composition is accented with wave-like patterns to emphasize the fluid nature of Pisces, while the entire design maintains a 
  celestial theme with subtle star elements to connect with astrological symbolism." do not use the word svg in the description.

}
Now respond with the JSON object that I can parse for the provided date: ${birthDate}.
`;


    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(result.response.text());
        console.log("Response Text:", responseText);
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
            const parsedResult = JSON.parse(jsonMatch[0]); // Parse the matched JSON
            console.log("Parsed JSON:", parsedResult);
            return parsedResult;
        } else {
            throw new Error("No JSON object found in the response text.");
        }
    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
}

