'use client';
import { useState, useRef } from 'react'; // Tambah useRef
import { useRouter } from 'next/navigation';
import { books } from '../../../data/books';
import Link from 'next/link';

export default function KuisPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const book = books.find((b) => b.id === params.id);
  
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Referensi untuk Audio
  const audioCorrectRef = useRef<HTMLAudioElement | null>(null);
  const audioWrongRef = useRef<HTMLAudioElement | null>(null);

  if (!book || !book.quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-bold text-cyan-900 bg-cyan-50">
        <p className="mb-4">Kuis belum tersedia.</p>
        <button onClick={() => router.push('/')} className="px-6 py-2 bg-cyan-600 text-white rounded-full">Kembali</button>
      </div>
    );
  }

  const handleAnswer = (option: string) => {
    // Mencegah klik ulang kalau sudah menjawab benar
    if (isCorrect === true) return;

    setSelected(option);
    
    if (option === book.quiz.answer) {
      setIsCorrect(true);
      // Mainkan suara Benar
      if (audioCorrectRef.current) {
        audioCorrectRef.current.currentTime = 0;
        audioCorrectRef.current.play();
      }
    } else {
      setIsCorrect(false);
      // Mainkan suara Salah
      if (audioWrongRef.current) {
        audioWrongRef.current.currentTime = 0;
        audioWrongRef.current.play();
      }
      // Reset status salah setelah animasi selesai agar bisa klik lagi
      setTimeout(() => {
        if (isCorrect === false) {
           setSelected(null);
           setIsCorrect(null);
        }
      }, 600); // Sesuaikan dengan durasi animasi shake di CSS
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 p-6 relative overflow-hidden">
      
      {/* Elemen Audio Tersembunyi */}
      <audio ref={audioCorrectRef} src="/sounds/correct.mp3" preload="auto" />
      <audio ref={audioWrongRef} src="/sounds/wrong.mp3" preload="auto" />

      <div className="z-10 w-full max-w-lg bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-cyan-100 text-center relative">
        
        <button onClick={() => router.push('/')} className="absolute top-4 right-5 text-cyan-400 hover:text-cyan-700 text-2xl font-bold">&times;</button>

        <span className="inline-block px-4 py-1 bg-amber-100 text-amber-600 font-bold rounded-full text-sm mb-6 shadow-sm border border-amber-200">
          Kuis Detektif Cilik 🔍
        </span>
        
        <h1 className="text-xl md:text-2xl font-extrabold text-cyan-950 mb-8 leading-tight">
          {book.quiz.question}
        </h1>

        <div className="flex flex-col gap-4">
          {book.quiz.options.map((option, index) => {
            let buttonStyle = "bg-cyan-50 border-cyan-200 text-cyan-800 hover:bg-cyan-100";
            let animationClass = ""; // Variabel untuk menampung animasi
            
            if (selected === option) {
              if (isCorrect === true) {
                // Style & Animasi Benar (Bounce Hijau)
                buttonStyle = "bg-green-500 border-green-600 text-white shadow-lg";
                animationClass = "animate-bounce"; 
              } else if (isCorrect === false) {
                // Style & Animasi Salah (Shake Merah)
                buttonStyle = "bg-red-500 border-red-600 text-white";
                animationClass = "animate-shake";
              }
            }

            return (
              <button 
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isCorrect === true}
                className={`w-full p-4 rounded-2xl border-2 font-bold text-sm md:text-base transition-all duration-300 ${buttonStyle} ${animationClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isCorrect && (
          <div className="mt-8 p-5 bg-green-50 border-2 border-green-200 rounded-3xl shadow-inner relative overflow-hidden">
            {/* Confetti Emoji melayang */}
            <span className="absolute top-2 left-3 text-2xl opacity-60">🎉</span>
            <span className="absolute bottom-2 right-3 text-2xl opacity-60">✨</span>
            
            <h2 className="text-xl md:text-2xl font-extrabold text-green-600">Hore! Kamu Hebat!</h2>
            <p className="text-green-700 text-sm mt-1">Pesan baik dari cerita berhasil kamu pelajari!</p>
            <Link href="/" className="inline-block mt-5 px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 shadow-md transition-all transform hover:scale-105 text-sm md:text-base">
              Pilih Cerita Lainnya &rarr;
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}