"use client";
import React, { useEffect } from 'react';

interface BookImage {
  id: string;  // Origin: Image property; unique identifier for the book.
  x: number;  // Origin: SVG positioning; X coordinate where the book image will be placed.
  y: number;  // Origin: SVG positioning; Y coordinate where the book image will be placed.
  width: number;
  height: number;
  href: string;  // Origin: URL or local path; source of the book image.
}

interface Props {
  books: BookImage[];  // Origin: List of BookImage objects; the book images to render.
}

// Origin: React functional component; defines the InsertBookImages component.
// Functionality: Inserts book images into an SVG based on provided coordinates and dimensions.
// Purpose: To display book covers in an SVG format within the application.
const InsertBookImages: React.FC<Props> = ({ books = [] }) => {
  // Origin: React Hook; useEffect is used to execute code when the component mounts or when dependencies change.
  // Functionality: Manages the insertion of image elements into an SVG and updates them when the book data changes.
  // Purpose: Ensures that the SVG images are updated based on the latest book data.
  useEffect(() => {
    // Origin: DOM manipulation; selects an SVG element in the document.
    const svg = document.querySelector('svg');
    
    // Functionality: Checks if the SVG exists before proceeding.
    if (svg) {
      // Functionality: Removes all previous images to avoid duplication.
      svg.querySelectorAll('image.book-image').forEach(img => img.remove());

      // Functionality: Iterates over each book provided in the props.
      books.forEach(book => {
        if (book) {  // Functionality: Ensures the book object is not null or undefined.
          // Origin: SVG API; creates a new image element within the SVG.
          const imgElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
          // Functionality: Sets the X and Y coordinates, width, and height of the image element.
          imgElement.setAttributeNS(null, "x", book.x.toString());
          imgElement.setAttributeNS(null, "y", book.y.toString());
          imgElement.setAttributeNS(null, "width", book.width.toString());
          imgElement.setAttributeNS(null, "height", book.height.toString());
          // Functionality: Sets the URL or path of the image as the source of the element.
          imgElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", book.href);
          // Purpose: Adds a class to identify the added image elements.
          imgElement.classList.add('book-image');
          // Functionality: Appends the image element to the SVG.
          svg.appendChild(imgElement);
        }
      });
    }
  }, [books]);  // Origin: Effect dependencies; re-runs the effect whenever the book data changes.

  return null;  // Purpose: This component does not render anything visible, it only manipulates the SVG.
};

export default InsertBookImages;