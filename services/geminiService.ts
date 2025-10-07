import { GoogleGenAI } from "@google/genai";
import { DealCategory } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const fetchPrimeDayDeals = async (): Promise<DealCategory[]> => {
  try {
    const prompt = `
      You are an expert Amazon Prime Day deal finder. Your task is to use Google Search to find REAL and CURRENT Amazon Prime Day deals available on Amazon.com.

      1.  Search for top Prime Day deals across at least 5 popular categories (e.g., 'Technology', 'Kitchen & Home', 'Health & Beauty', 'Apparel', 'Pet Supplies').
      2.  For each category, find 3-5 of the best deals available right now.
      3.  For each deal, extract the following information:
          - Product Name (The full, exact product name)
          - Original Price (List Price)
          - Sale Price (Prime Day Price)
          - A brief, compelling product description.
      4.  Calculate the discount percentage for each deal: ((Original Price - Sale Price) / Original Price) * 100, rounded to the nearest integer.
      5.  Sort the deals within each category from the highest discount percentage to the lowest.
      6.  **CRITICAL FOR LINK ACCURACY: GENERATE A VALID SEARCH URL WITH AFFILIATE TAG.**
          a. Take the exact 'productName' you extracted.
          b. URL-encode the product name (e.g., replace spaces with '+', and handle other special characters).
          c. Construct the final 'productUrl' using this EXACT template: \`https://www.amazon.com/s?k=URL_ENCODED_PRODUCT_NAME&linkCode=ll2&sr=1-1&tag=product-review-spec-20&th=1\`.
          d. For example, if the productName is "Sony WH-1000XM4 Noise Canceling Headphones", the productUrl should be "https://www.amazon.com/s?k=Sony+WH-1000XM4+Noise+Canceling+Headphones&linkCode=ll2&sr=1-1&tag=product-review-spec-20&th=1".
          e. This search-based approach is the most reliable way to create a working link. DO NOT attempt to find a direct product page, ASIN, or use any other format.
      7.  Return the entire output as a single, valid JSON string. The structure should be an array of deal categories. Do not include any other text or explanations outside of the JSON string.

      The JSON structure must be:
      [
        {
          "categoryName": "Category Name",
          "deals": [
            {
              "productName": "Full Product Name",
              "originalPrice": 129.99,
              "salePrice": 89.99,
              "discountPercentage": 31,
              "description": "Short product description.",
              "productUrl": "https://www.amazon.com/s?k=Full+Product+Name&linkCode=ll2&sr=1-1&tag=product-review-spec-20&th=1"
            }
          ]
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const jsonText = response.text.trim();
    // It's possible the model wraps the JSON in markdown, so we need to extract it.
    const jsonMatch = jsonText.match(/```(json)?([\s\S]*?)```/);
    const parsableText = jsonMatch ? jsonMatch[2] : jsonText;

    const dealsData = JSON.parse(parsableText);

    return dealsData as DealCategory[];

  } catch (error) {
    console.error("Error fetching deals from Gemini API:", error);
    if (error instanceof SyntaxError) {
      // This helps debug if the model returns invalid JSON
      console.error("Failed to parse JSON response from the model.");
      throw new Error("The AI returned an invalid response format. Please try again.");
    }
    throw new Error("Failed to fetch Prime Day deals. The search may have been blocked or returned no results.");
  }
};