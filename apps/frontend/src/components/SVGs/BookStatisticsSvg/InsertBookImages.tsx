"use client";
import React, { useEffect } from 'react';

interface BookImage {
  id: string;  // Unique identifier for the book image.
  x: number;  // X coordinate for placing the image in the SVG.
  y: number;  // Y coordinate for placing the image in the SVG.
  width: number;
  height: number;
  href: string;  // Source URL or path for the book image.
}

interface Props {
  books: BookImage[];  // Array of BookImage objects to render in the SVG.
}

// Inserts book images into an SVG element, updating the display based on the provided book data.
const InsertBookImages: React.FC<Props> = ({ books = [] }) => {
  useEffect(() => {
    const svg = document.querySelector('svg');  // Selects the SVG element in the document.
    
    if (svg) {
      svg.querySelectorAll('image.book-image').forEach(img => img.remove());  // Removes any existing book images.

      books.forEach(book => {
        if (book) {
          const imgElement = document.createElementNS("http://www.w3.org/2000/svg", "image");  // Creates a new SVG image element.
          imgElement.setAttributeNS(null, "x", book.x.toString());  // Sets X coordinate.
          imgElement.setAttributeNS(null, "y", book.y.toString());  // Sets Y coordinate.
          imgElement.setAttributeNS(null, "width", book.width.toString());  // Sets width.
          imgElement.setAttributeNS(null, "height", book.height.toString());  // Sets height.
          imgElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", book.href);  // Sets image source.
          imgElement.classList.add('book-image');  // Adds a class to the image element.
          svg.appendChild(imgElement);  // Appends the image to the SVG.
        }
      });
    }
  }, [books]);  // Re-runs effect whenever the books data changes.

  return null;  // Component returns null as it directly manipulates the DOM.
};

export default InsertBookImages;