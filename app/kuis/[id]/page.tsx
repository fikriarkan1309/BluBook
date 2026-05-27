'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { books } from '../../../data/books';
import Link from 'next/link';

export default function KuisPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Mencari data buku dan kuisnya berdasarkan URL
  const book = books.find((b) => b.id === params.id);
  
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Kalau data kuisnya belum ada di books.ts, tampilkan ini
  if (!book || !book.quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-bold text-cyan-900 bg-cyan-50">
        <p className="mb-4">Kuis untuk buku ini belum tersedia.</p>
        <button onClick={() => router.push('/')} className="px-6 py-2 bg-cyan-600 text-white rounded-full">Kembali ke Rak</button>
      </div>
    );
  }

  // Fungsi saat tombol jawaban diklik
  const handleAnswer = (option: string) => {
    setSelected(option);
    if (option === book.quiz.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 p-6 relative overflow-hidden">
      
      <div className="z-10 w-full max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-cyan-100 text-center relative">
        
        {/* Tombol Silang buat kembali ke rak */}
        <button onClick={() => router.push('/')} className="absolute top-4 right-5 text-cyan-400 hover:text-cyan-700 text-2xl font-bold">&times;</button>

        <span className="inline-block px-4 py-1 bg-amber-100 text-amber-600 font-bold rounded-full text-sm mb-6 shadow-sm border border-amber-200">
          Kuis Detektif Cilik 🔍
        </span>
        
        {/* Pertanyaan Kuis */}
        <h1 className="text-xl md:text-2xl font-extrabold text-cyan-950 mb-8 leading-tight">
          {book.quiz.question}
        </h1>

        {/* Pilihan Jawaban */}
        <div className="flex flex-col gap-4">
          {book.quiz.options.map((option, index) => {
            let buttonStyle = "bg-cyan-50 border-cyan-200 text-cyan-800 hover:bg-cyan-100";
            
            // Perubahan warna kalau diklik (Benar = Hijau, Salah = Merah)
            if (selected === option) {
              buttonStyle = isCorrect ? "bg-green-500 border-green-600 text-white scale-105 shadow-lg" : "bg-red-500 border-red-600 text-white";
            }

            return (
              <button 
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isCorrect === true} // Kunci tombol kalau jawaban udah benar
                className={`w-full p-4 rounded-2xl border-2 font-bold text-sm md:text-base transition-all duration-300 ${buttonStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Pesan Sukses muncul kalau jawaban benar */}
        {isCorrect && (
          <div className="mt-8 p-4 bg-green-50 border-2 border-green-200 rounded-2xl animate-bounce">
            <h2 className="text-xl font-extrabold text-green-600">Hore! Jawabanmu Benar! 🎉</h2>
            <p className="text-green-700 text-sm mt-1">Pesan moralnya berhasil kamu pahami!</p>
            <Link href="/" className="inline-block mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 shadow-sm transition-colors">
              Pilih Cerita Lainnya
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}