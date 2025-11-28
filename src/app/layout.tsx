import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skyrim Achievement Tracker',
  description: 'Track your legendary journey across the lands of Skyrim',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
