const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const API_URL = 'http://your-backend-url/api/models';

// List of open source models to upload
const modelsToUpload = [
  {
    id: 'car',
    name: 'Car Model',
    filePath: path.join(__dirname, '../fallback-models/car.glb'),
    source: 'https://sketchfab.com/3d-models/free-car-model-cc0-770017da9f7e4dd9b754105ffe5eb209',
    license: 'CC0'
  },
  {
    id: 'house',
    name: 'House Model',
    filePath: path.join(__dirname, '../fallback-models/house.glb'),
    source: 'https://sketchfab.com/3d-models/house-d58408e79ba94f3d9196e1c8def7719b',
    license: 'CC-BY'
  },
  // Add more models as needed
];

async function uploadModels() {
  console.log('Starting model upload to backend...');
  
  for (const model of modelsToUpload) {
    try {
      if (!fs.existsSync(model.filePath)) {
        console.error(`File doesn't exist: ${model.filePath}`);
        continue;
      }
      
      const formData = new FormData();
      formData.append('id', model.id);
      formData.append('name', model.name);
      formData.append('source', model.source);
      formData.append('license', model.license);
      formData.append('file', fs.createReadStream(model.filePath));
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        console.log(`Successfully uploaded ${model.name}`);
      } else {
        console.error(`Failed to upload ${model.name}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error uploading ${model.name}: ${error.message}`);
    }
  }
  
  console.log('Upload process completed');
}

// Run the upload script
uploadModels().catch(console.error);
