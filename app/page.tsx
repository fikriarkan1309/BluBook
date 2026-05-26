import Link from 'next/link';
import { books } from '../data/books';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Pustaka Digital
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Koleksi buku cerita interaktif untuk waktu membaca yang lebih
            menyenangkan.
          </p>
        </header>

        {/* Grid Rak Buku */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {books.map((book) => (
            <Link href={`/baca/${book.id}`} key={book.id}>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full group">
                {/* Area Cover Buku */}
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                  {/* Teks sementara kalau gambar belum diload */}
                  <span className="text-gray-400 text-sm font-medium z-10 group-hover:hidden transition-opacity">
                    Cover: {book.title}
                  </span>

                  {/* Hapus tanda komentar (//) di bawah ini kalau gambar cover udah ada di folder public/images */}
                  {/* <img src={book.coverUrl} alt={book.title} className="absolute inset-0 w-full h-full object-cover" /> */}
                </div>

                {/* Info Buku (Judul & Tema) */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      {book.theme}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
