import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Verse - Your Personalized Reading Experience',
  description: 'Discover and track your favorite books with AI-driven recommendations tailored just for you.',
  keywords: 'books, reading, recommendations, AI, personalized, book tracking',
  author: 'Your Name or Company',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Verse - Your Personalized Reading Experience',
    description: 'Find your next favorite book with AI-driven recommendations.',
    type: 'website',
    url: 'https://yourwebsite.com',
    image: 'https://yourwebsite.com/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YourTwitterHandle',
    title: 'Verse - Your Personalized Reading Experience',
    description: 'Discover and track your favorite books with AI-driven recommendations tailored just for you.',
    image: 'https://yourwebsite.com/twitter-image.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content={metadata.viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}