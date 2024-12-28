import Papa from 'papaparse';
import { calculateDiscount } from './productUtils';

interface Product {
  id: string;
  name: string;
  brand: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  productLink: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  colour?: string; // Add colour field
  swatchImage1?: string;
  swatchAlt1?: string;
  swatchImage2?: string;
  swatchAlt2?: string;
}

// Function to process a single CSV file
function parseSingleCSV(csvData: string, retailerPrefix: string): Product[] {
  const results = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  return results.data.map((row: any, index: number) => ({
    id: `${retailerPrefix}-${index + 1}`, // Unique ID with retailer prefix
    name: row["Product Name"],
    brand: row["Brand"],
    currentPrice: row["Current Price"],
    originalPrice: row["Original Price"],
    discount: row["Discount"] || calculateDiscount(row["Original Price"], row["Current Price"]),
    productLink: row["Product Link"],
    imageUrl: row["Main Image"],
    imageAlt: row["Main Image Alt"],
    category: row["Category"], // Assuming new CSV includes the "Category" field
    colour: row["Colour"] || "", // Add colour from CSV, default to empty string if not present
    swatchImage1: row["Swatch Image 1"],
    swatchAlt1: row["Swatch Alt 1"],
    swatchImage2: row["Swatch Image 2"],
    swatchAlt2: row["Swatch Alt 2"],
    swatchImage3: row["Swatch Image 3"],
    swatchAlt3: row["Swatch Alt 3"],
    swatchImage4: row["Swatch Image 4"],
    swatchAlt4: row["Swatch Alt 4"],
    swatchImage5: row["Swatch Image 5"],
    swatchAlt5: row["Swatch Alt 5"]
  }));
}

// Function to fetch and merge multiple CSV files
export function fetchAndMergeCSV(filePaths: string[]): Promise<Product[]> {
  const promises = filePaths.map((filePath, index) =>
    fetch(filePath)
      .then(response => response.text())
      .then(csvData => parseSingleCSV(csvData, `retailer${index + 1}`))
  );

  return Promise.all(promises)
    .then(productArrays => productArrays.flat()) // Combine all arrays into one
    .catch(error => {
      console.error("Error fetching CSV files:", error);
      throw error;
    });
}
