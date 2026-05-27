'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // SENSOR PINTAR: Bunyi setiap kali pindah halaman/rute URL
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset durasi ke awal
      audioRef.current.play().catch((err) => {
        // Mencegah error bawaan browser jika belum ada interaksi klik pertama
        console.log("Menunggu klik pertama dari user untuk mengizinkan audio.");
      });
    }
  }, [pathname]); // <--- Efek ini otomatis jalan setiap kali pathname (URL) berubah

  return (
    <html lang="id">
      <body>
        
        {/* Konten Utama Aplikasi */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Pemutar Audio Tersembunyi */}
        <audio ref={audioRef} src="/sounds/blubuk.mp3" preload="auto" />

        {/* Style CSS Gelembung Latar Belakang (Tetap ada sebagai pemanis lautan) */}
        <style>{`
          .bubble-container {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 50;
            overflow: hidden;
          }
          .bubble {
            position: absolute;
            bottom: -50px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            animation: flyup 12s infinite ease-in;
          }
          @keyframes flyup {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            100% { transform: translateY(-120vh) scale(1.4); opacity: 0; }
          }
          .bubble:nth-child(1) { left: 15%; width: 30px; height: 30px; animation-duration: 9s; }
          .bubble:nth-child(2) { left: 35%; width: 15px; height: 15px; animation-duration: 14s; animation-delay: 2s; }
          .bubble:nth-child(3) { left: 55%; width: 45px; height: 45px; animation-duration: 8s; animation-delay: 4s; }
          .bubble:nth-child(4) { left: 75%; width: 25px; height: 25px; animation-duration: 16s; animation-delay: 1s; }
          .bubble:nth-child(5) { left: 85%; width: 15px; height: 15px; animation-duration: 11s; animation-delay: 3s; }
        `}</style>

        {/* Merender Gelembung */}
        <div className="bubble-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

      </body>
    </html>
  );
}