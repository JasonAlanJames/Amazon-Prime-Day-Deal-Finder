
import { GoogleGenAI } from "@google/genai";
import { DealCategory, ProductDeal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a product image using the product name as a prompt.
 * @param productName The name of the product to generate an image for.
 * @returns A base64 data URL for the generated image, or an empty string if it fails.
 */
export const generateProductImage = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A professional, commercial-style product photograph of a "${productName}". The product is centered on a clean, minimalist, light gray background. The lighting is bright and even, highlighting the product's details. No text, logos, or distracting elements.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
  } catch (error) {
    console.error(`Failed to generate image for "${productName}":`, error);
  }
  // Return an empty string if image generation fails, the frontend will handle it.
  return '';
};


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
    const jsonMatch = jsonText.match(/```(json)?([\s\S]*?)```/);
    const parsableText = jsonMatch ? jsonMatch[2] : jsonText;

    const dealsData = JSON.parse(parsableText);
    
    return dealsData as DealCategory[];

  } catch (error) {
    console.error("Error fetching deals from Gemini API:", error);
    if (error instanceof SyntaxError) {
      console.error("Failed to parse JSON response from the model.");
      throw new Error("The AI returned an invalid response format. Please try again.");
    }
    throw new Error("Failed to fetch Prime Day deals. The search may have been blocked or returned no results.");
  }
};