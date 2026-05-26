'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebase';
import { ref, get, child } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Tambah signOut
import { themes } from '../data/books';

export default function Home() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [randomMascot, setRandomMascot] = useState(1);

  useEffect(() => {
    setRandomMascot(Math.floor(Math.random() * 6) + 1);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login'); 
      } else {
        const dbRef = ref(db);
        const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          // Proteksi ekstra: kalau isApproved false, tendang ke login
          if (userData.isApproved !== true) {
            await signOut(auth);
            router.push('/login');
            return;
          }
          setIsPremium(userData.isPremium);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen bg-cyan-50 flex items-center justify-center text-cyan-800 font-bold">Memuat Lautan Cerita...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 py-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Gambar dengan Opacity 25% */}
      <div className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Tombol Navigasi di Pojok Kanan Atas */}
        <div className="absolute top-0 right-0 flex gap-2">
          {/* Tombol Panel Admin - Hanya muncul untuk email admin */}
          {auth.currentUser?.email === 'admin@blubook.com' && (
            <button 
              onClick={() => router.push('/admin')} 
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-colors text-sm shadow-sm"
            >
              ⚙️ Panel Admin
            </button>
          )}
          
          <button 
            onClick={handleLogout} 
            className="px-5 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-full transition-colors text-sm shadow-sm border border-red-200"
          >
            Keluar
          </button>
        </div>

        <header className="mb-14 flex flex-col items-center text-center mt-8 md:mt-0">
          <img src="/images/Logo BluBook.png" alt="BluBook" className="w-48 mb-4 drop-shadow-lg hover:scale-105 transition-transform" />
          <p className="text-cyan-800 text-lg md:text-xl font-medium max-w-xl bg-white/60 px-6 py-2 rounded-full backdrop-blur-sm border border-white">
            Pilih folder tema petualanganmu hari ini!
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {themes.map((theme) => {
            const isLocked = theme.isPremium && !isPremium; 
            return (
              <div key={theme.id} onClick={() => !isLocked ? router.push(`/tema/${theme.id}`) : alert("Wah, tema ini terkunci!")} className={`relative flex flex-col items-center group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${isLocked ? 'opacity-70 grayscale' : ''}`}>
                <div className="w-full aspect-square bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-cyan-100 flex items-center justify-center overflow-hidden p-4 group-hover:shadow-cyan-300/50 group-hover:border-cyan-300">
                  <img src={theme.cover} alt={theme.title} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  {isLocked && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><span className="text-4xl">🔒</span></div>}
                </div>
                <h2 className="mt-4 font-bold text-cyan-900 text-center text-sm md:text-base group-hover:text-cyan-600">{theme.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <img src={`/images/maskot${randomMascot}.png`} alt="Maskot BluBook" className="fixed bottom-[-20px] right-[-20px] w-48 md:w-64 z-20 drop-shadow-2xl hover:translate-y-[-20px] transition-transform duration-500 cursor-pointer" />
    </main>
  );
}