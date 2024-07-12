// Define the cities of interest with buffer distances for proper analysis and their populations
var cities = ee.FeatureCollection([
    ee.Feature(ee.Geometry.Point([77.2090, 28.6139]).buffer(10000), {name: 'Delhi', population: 32941000}),
    ee.Feature(ee.Geometry.Point([72.8777, 19.0760]).buffer(10000), {name: 'Mumbai', population: 21297000}),
    ee.Feature(ee.Geometry.Point([78.4867, 17.3850]).buffer(10000), {name: 'Hyderabad', population: 10801000}),
    ee.Feature(ee.Geometry.Point([77.5946, 12.9716]).buffer(10000), {name: 'Bengaluru', population: 13608000})
  ]);
  
  // Function to add NDVI band to the image
  var addNDVI = function(image) {
    var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
    return image.addBands(ndvi);
  };
  
  // Load Landsat-9 image collection and filter by date and bounds
  var landsat9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
                  .filterDate('2023-01-01', '2023-12-31')
                  .filterBounds(cities)
                  .map(addNDVI);
  
  // Calculate median image to reduce cloud cover and other anomalies
  var medianImage = landsat9.median().clip(cities);
  
  // Function to calculate green cover per city
  var calculateGreenCover = function(city) {
    var cityName = ee.String(city.get('name'));
    var cityPopulation = ee.Number(city.get('population'));
    var cityBuffer = city.geometry();
  
    // Select NDVI band and clip to city buffer
    var ndvi = medianImage.select('NDVI').clip(cityBuffer);
  
    // Threshold for green cover (NDVI > 0.065)
    // keeping value low because 
    var greenCover = ndvi.gt(0.065);
  
    // Calculate the area of green cover in square meters
    var pixelArea = ee.Image.pixelArea();
    var greenCoverArea = greenCover.multiply(pixelArea).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: cityBuffer,
      scale: 30,
      maxPixels: 1e9
    }).get('NDVI');
  
    // Calculate green cover per capita
    var greenCoverPerCapita = ee.Number(greenCoverArea).divide(cityPopulation);
  
    // Return the results as a feature
    return ee.Feature(null, {
      city: cityName,
      green_cover_area: greenCoverArea,
      green_cover_per_capita: greenCoverPerCapita
    });
  };
  
  // Map over the cities to calculate green cover
  var greenCoverResults = cities.map(calculateGreenCover);
  
  // Print the results
  print(greenCoverResults);
  
  // Export the results to a CSV file
  Export.table.toDrive({
    collection: greenCoverResults,
    description: 'GreenCoverPerCity',
    fileFormat: 'CSV'
  });
  