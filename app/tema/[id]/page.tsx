'use client';
import { useRouter } from 'next/navigation';
import { books, themes } from '../../../data/books';
import Link from 'next/link';

export default function TemaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Cari data tema berdasarkan URL (misal: "adab")
  const theme = themes.find(t => t.id === params.id);
  
  // Saring buku yang cuma masuk ke tema ini
  const themeBooks = books.filter(b => b.themeId === params.id);

  if (!theme) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Tema tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 py-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background 25% biar konsisten */}
      <div className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Tombol Kembali ke Rak */}
        <button onClick={() => router.push('/')} className="mb-8 px-5 py-2.5 bg-white/70 hover:bg-white backdrop-blur-md rounded-full text-cyan-900 font-bold transition-all shadow-sm flex items-center gap-2">
          <span>&larr;</span> Kembali ke Rak Folder
        </button>

        <div className="flex items-center gap-4 mb-10">
          <img src={theme.cover} alt={theme.title} className="w-20 h-20 object-contain drop-shadow-md" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-cyan-950 drop-shadow-sm">{theme.title}</h1>
        </div>

        {/* Grid Buku */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {themeBooks.length === 0 ? (
            <div className="col-span-full p-10 bg-white/50 backdrop-blur-sm rounded-3xl text-center text-cyan-800 font-medium border border-cyan-100">
              Belum ada buku di dalam folder ini. Tunggu *update* selanjutnya ya!
            </div>
          ) : (
            themeBooks.map((book) => (
              <Link href={`/baca/${book.id}`} key={book.id}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-3 md:p-4 shadow-lg border border-cyan-100 hover:-translate-y-2 hover:shadow-cyan-300/40 transition-all cursor-pointer group">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    className="w-full aspect-[2/3] object-cover rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform"
                  />
                  <h2 className="font-bold text-cyan-900 text-center text-sm md:text-base leading-tight group-hover:text-cyan-600">
                    {book.title}
                  </h2>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </main>
  );
}