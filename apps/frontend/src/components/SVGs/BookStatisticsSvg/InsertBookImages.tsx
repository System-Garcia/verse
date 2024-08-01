"use client"
import React, { useEffect } from 'react';

interface BookImage {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  href: string;
}

const books: BookImage[] = [
  { id: "book1", x: 225, y: 267, width: 54, height: 81.43, href: "/images/books/1984.svg" },
  { id: "book2", x: 33, y: 34, width: 54, height: 81.43, href: "/images/books/bird_chronicle.svg" },
  { id: "book3", x: 132, y: 151, width: 54, height: 81.43, href: "/images/books/casa_de_espiritus.svg" },
  { id: "book4", x: 32, y: 377, width: 54, height: 81.43, href: "/images/books/cien_anos.svg" },
  { id: "book5", x: 129, y: 34, width: 54, height: 81.43, href: "/images/books/crime_and_punishment.svg" },
  { id: "book6", x: 225, y: 151, width: 54, height: 81.43, href: "/images/books/el_alquimista.svg" },
  { id: "book7", x: 225, y: 377, width: 54, height: 81.43, href: "/images/books/el_principito.svg" },
  { id: "book8", x: 225, y: 34, width: 54, height: 81.43, href: "/images/books/harry_potter.svg" },
  { id: "book9", x: 32, y: 267, width: 54, height: 81.43, href: "/images/books/homo_deus.svg" },
  { id: "book10", x: 132, y: 267, width: 54, height: 81.43, href: "/images/books/pride_and_prejudice.svg" },
  { id: "book11", x: 36, y: 151, width: 54, height: 81.43, href: "/images/books/senor_anillos.svg" },
  { id: "book12", x: 132, y: 377, width: 54, height: 81.43, href: "/images/books/tokill_a_mockingbird.svg" }
];

const InsertBookImages: React.FC = () => {
  useEffect(() => {
    const svg = document.querySelector('svg');
    books.forEach(book => {
      const imgElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
      imgElement.setAttributeNS(null, "x", book.x.toString());
      imgElement.setAttributeNS(null, "y", book.y.toString());
      imgElement.setAttributeNS(null, "width", book.width.toString());
      imgElement.setAttributeNS(null, "height", book.height.toString());
      imgElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", book.href);
      svg?.appendChild(imgElement);
    });
  }, []);

  return null;
};

export default InsertBookImages;