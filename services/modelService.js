import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Collection of open source fallback models
const fallbackModels = {
  'car': '/fallback-models/car.glb',
  'house': '/fallback-models/house.glb',
  'character': '/fallback-models/character.glb',
  // Add more fallback models as needed
};

const API_URL = 'http://your-backend-url/api/models';
const loader = new GLTFLoader();

export async function loadModel(modelId) {
  try {
    // First attempt to load from backend
    const response = await fetch(`${API_URL}/${modelId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }
    
    const modelData = await response.json();
    return await loadModelFromUrl(modelData.url);
  } catch (error) {
    console.warn(`Backend model fetch failed: ${error.message}`);
    console.log('Using fallback model instead');
    
    // Use fallback model if available
    if (fallbackModels[modelId]) {
      return await loadModelFromUrl(fallbackModels[modelId]);
    } else {
      throw new Error(`No fallback model available for ${modelId}`);
    }
  }
}

function loadModelFromUrl(url) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`),
      (error) => reject(error)
    );
  });
}
