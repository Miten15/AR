
"use client";

import { useEffect } from 'react';

let modelViewerImported = false;

export default function ModelViewerLoader() {
  useEffect(() => {
    if (!modelViewerImported && typeof window !== 'undefined') {
      import('@google/model-viewer')
        .then(() => {
          modelViewerImported = true;
          console.log('Model Viewer registered globally');
        })
        .catch(error => console.error("Failed to load model-viewer globally", error));
    }
  }, []);

  return null; // This component doesn't render anything
}
