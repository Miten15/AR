# AR Light - Augmented Reality Lighting Visualizer

AR Light is a web application that allows users to visualize lighting products in their space using augmented reality technology directly from their browser, with no app download required.

## Features

- Browse a collection of lighting products
- View products in 3D from all angles
- Use AR to see how products look in your space
- No app download needed - works directly in the browser

## Supabase Backend Setup

This application uses Supabase as its backend service. Follow these steps to set up Supabase for this project:

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't already have one
2. Create a new Supabase project
3. Once your project is created, go to Settings > API in the Supabase dashboard
4. Copy the "Project URL" and "anon public" key
5. Update your `.env.local` file with these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

6. Set up the database schema in Supabase:
   - Go to the SQL Editor in your Supabase dashboard
   - Create a "products" table with the following SQL:

   ```sql
   CREATE TABLE products (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     model_path TEXT NOT NULL,
     images TEXT[] NOT NULL,
     features TEXT[] NOT NULL,
     specs JSONB NOT NULL
   );
   ```

7. Create the necessary Postgres functions for the initialization script:
   - Go to the SQL Editor and run:

   ```sql
   CREATE OR REPLACE FUNCTION check_table_exists(table_name TEXT)
   RETURNS BOOLEAN AS $$
   BEGIN
     RETURN EXISTS (
       SELECT FROM information_schema.tables 
       WHERE table_schema = 'public'
       AND table_name = $1
     );
   END;
   $$ LANGUAGE plpgsql;

   CREATE OR REPLACE FUNCTION create_products_table()
   RETURNS VOID AS $$
   BEGIN
     CREATE TABLE IF NOT EXISTS products (
       id TEXT PRIMARY KEY,
       name TEXT NOT NULL,
       description TEXT NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       modelPath TEXT NOT NULL,
       images TEXT[] NOT NULL,
       features TEXT[] NOT NULL,
       specs JSONB NOT NULL
     );
   END;
   $$ LANGUAGE plpgsql;
   ```

8. Install the necessary npm packages:
   ```
   npm install dotenv
   ```

9. Run the initialization script to populate the database:
   ```
   # Make sure to run the .js file, not .ts
   node scripts/init-db.js
   ```

10. Upload your 3D models to Supabase Storage:
    - Go to Storage in your Supabase dashboard
    - Create a new bucket called "models"
    - Upload your .glb files to the bucket
    - Update the modelPath in your products table to point to the Supabase storage URLs

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Using the AR Feature

To use the AR feature:

1. Navigate to a product page
2. Click "View in AR"
3. Scan the QR code with your smartphone
4. When prompted, grant camera permission
5. Point your camera at a flat surface
6. The 3D model will appear in your space

# 3D Model Loading System

This system loads 3D models from a backend API with fallback to open source models if there are any issues.

## Setup

1. Install dependencies:
```
npm install three node-fetch form-data
```

2. Download some open source 3D models (GLB/GLTF format) and place them in a `fallback-models` directory

3. Edit the backend API URL in:
   - `services/modelService.js`
   - `scripts/uploadFallbackModels.js`

## Usage

1. Upload fallback models to the backend:
```
node scripts/uploadFallbackModels.js
```

2. Use the ModelViewer component in your application:
```jsx
import ModelViewer from './components/ModelViewer';

function App() {
  return <ModelViewer modelId="car" />;
}
```

## Supported Models

The system includes fallback models for:
- car
- house
- character

Add more as needed in the `fallbackModels` object in `services/modelService.js` and in the `modelsToUpload` array in `scripts/uploadFallbackModels.js`.