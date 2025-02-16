import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEN_AI_KEY);

// Define the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAIContent(birthDate){
const prompt = `
Given a birth date, return a JSON object with the following details:

1. "date": The provided birth date in "Month Day, Year" format.
2. "dayOfWeek": The full day of the week for the given date.
3. "birthstone": The most commonly associated birthstone for that birth month.
4. "birthstoneSymbol": A short phrase (three words) representing the meaning of the birthstone.
5. "zodiac": The western zodiac sign based on the birth date.
6. "zodiacSymbol": Three words/phrases describing key traits of the western zodiac sign.
7. "chineseZodiac": The Chinese zodiac animal corresponding to the birth year.
8. "chineseZodiacElement": The associated Chinese zodiac element.
9. "birthFlower": The traditional birth flower for the birth month.
10. "birthFlowerSymbol": Three words describing the symbolic meaning of the birth flower.
11. "svg": An SVG string (not escaped, no new line characters) containing an artistic representation of the birthstone, zodiac, Chinese zodiac, and birth flower. 
The SVG should be directly usable in an application. Make sure it is 800 x 600 pixels. No text or words should exist in the SVG.
12. "imgDescription": A description of the artistic choices in the SVG without using the word "SVG".

Ensure the output is valid JSON with proper formatting and contains no escape sequences for quotes. 

Use the date "${birthDate}" as the input and return only the JSON object with no additional text or formatting.

`;


    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
            const parsedResult = JSON.parse(jsonMatch[0]); // Parse the matched JSON
            return parsedResult;
        } else {
            throw new Error("No JSON object found in the response text.");
        }
    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
}

