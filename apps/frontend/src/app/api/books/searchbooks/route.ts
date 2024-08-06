import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const searchCategory = searchParams.get('category') || 'name';
  
  let formattedQuery = query;
  if (searchCategory === 'authors') {
    formattedQuery = `inauthor:${query}`;
  } else if (searchCategory === 'genres') {
    formattedQuery = `subject:${query}`;
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const apiResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&maxResults=12&key=${apiKey}`);
  const data = await apiResponse.json();

  return NextResponse.json(data);
}