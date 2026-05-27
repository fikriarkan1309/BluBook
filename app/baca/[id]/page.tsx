import { books } from '../../../data/books';
import Link from 'next/link';

export default function BacaBuku({ params }: { params: { id: string } }) {
  // 1. Cari data buku berdasarkan ID yang ada di URL
  const book = books.find((b) => b.id === params.id);

  // 2. Kalau bukunya nggak ada di data/books.ts, tampilkan pesan error
  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Waduh, bukunya nggak ketemu nih!
        </h1>
        <Link
          href="/"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
        >
          Kembali ke Rak Buku
        </Link>
      </div>
    );
  }

  // 3. Kalau bukunya ada, tampilkan iframe Heyzine secara Fullscreen
  return (
    <main className="w-screen h-screen bg-[#1a1a1a] overflow-hidden relative">
      {/* Tombol Back Melayang di Kiri Atas */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 bg-black/40 hover:bg-black/70 text-white px-5 py-2.5 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg text-sm font-medium flex items-center gap-2"
      >
        <span>&larr;</span> Kembali
      </Link>

      {/* Iframe Flipbook Heyzine */}
      <iframe
        src={book.iframeUrl}
        className="w-full h-full border-none"
        allowFullScreen
        scrolling="no"
      ></iframe>
      {/* Tombol Selesai & Kuis Melayang di Kanan Bawah */}
      <Link 
        href={`/kuis/${book.id}`} 
        className="absolute bottom-6 right-6 z-50 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-extrabold shadow-[0_10px_25px_rgba(6,182,212,0.5)] border-2 border-white transition-all transform hover:scale-105 animate-bounce flex items-center gap-2"
      >
        Selesai & Main Kuis 🏆
      </Link>
    </main>
  );
}
