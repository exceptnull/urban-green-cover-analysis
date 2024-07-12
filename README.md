# Green Cover Analysis for Major Indian Cities

This repository contains a Google Earth Engine (GEE) script for analyzing green cover per capita and total green cover across four major Indian cities: Delhi, Mumbai, Hyderabad, and Bengaluru.

## How to Use This Script

### Step 1: Set Up Google Earth Engine

1. **Sign Up**: If you don't already have an account, sign up for Google Earth Engine at [Google Earth Engine](https://earthengine.google.com/).

2. **Log In**: Log in to the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).

### Step 2: Load the Script

1. **Copy the Script**: Open the `.js` file from this repository and copy the entire script.

2. **Create a New Script**: In the Google Earth Engine Code Editor, click on the "Scripts" tab on the left side.

3. **Create a New Repository**: Click on the "New" button to create a new repository if you don't have one.

4. **Create a New File**: Click on the "New File" button and paste the copied script into the new file.

5. **Save the File**: Name the file appropriately and save it.

### Step 3: Run the Script

1. **Execute the Script**: Click on the "Run" button to execute the script.

2. **View Results**: The results will be displayed on the map and in the console.

### Important Notes

- **Accuracy**: The green cover values are approximate as the cities are considered as circles for simplicity.
- **NDVI Threshold**: The NDVI threshold for urban areas is set to 0.065 to capture very sparse vegetation.

### Dependencies

This script uses the following libraries and datasets:

- Landsat 9 Surface Reflectance
- Google Earth Engine JavaScript API

## Cities and Population Data

The analysis covers the following cities with their respective populations:

- **Delhi**: 32,941,000
- **Mumbai**: 21,297,000
- **Hyderabad**: 10,801,000
- **Bengaluru**: 13,608,000

## Contact

For any queries or contributions, please feel free to open an issue or reach out via email: mailaditya@aol.com.

## License

This project is licensed under the MIT License - see the [LICENSE](https://mit-license.org/) file for details.
