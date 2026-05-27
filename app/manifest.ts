import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BluBook: Pustaka Interaktif Anak',
    short_name: 'BluBook',
    description: 'Menyelam ke dalam lautan cerita yang seru bersama si kecil.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ecfeff', // cyan-50
    theme_color: '#0891b2', // cyan-600
    icons: [
      {
        src: '/icon.png', // Next.js otomatis generate ini dari file di folder app
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}