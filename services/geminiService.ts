
// import { GoogleGenAI } from "@google/genai";
// import { MENU_ITEMS } from "../constants";

// // Use process.env.API_KEY directly for initialization
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// console.log("---API KEY---",API_KEY)

// export async function getDishRecommendation(userInput: string) {
//   const menuContext = MENU_ITEMS.map(item => 
//     `${item.name} (${item.category}): ${item.description}. Price: $${item.price}. Spicy: ${item.spicyLevel}/3.`
//   ).join('\n');

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `You are the Chef Sommelier at Las Canteras Mexican Grill. 
//       Your goal is to recommend the perfect dish based on the customer's request. 
//       Be warm, professional, and slightly poetic about the food.
      
//       Our Menu:
//       ${menuContext}
      
//       Customer's request: "${userInput}"
      
//       Provide a concise recommendation and explain why it fits their mood/preferences.`
//     });

//     return response.text || "I'm having trouble thinking of a dish right now, but our Tacos al Pastor are always a great choice!";
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     return "I apologize, our kitchen advisor is currently busy. Please try asking again in a moment!";
//   }
// }
