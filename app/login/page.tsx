'use client';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, get, set, child } from 'firebase/database';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (isRegister) {
        // Mode Daftar Baru
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        // Simpan data: isPremium false, isApproved false (Menunggu ACC)
        await set(ref(db, `users/${user.uid}`), {
          email: user.email,
          isPremium: false,
          isApproved: false 
        });

        // Langsung paksa logout karena belum di ACC
        await signOut(auth);
        setSuccessMsg('Akun berhasil didaftarkan! Silakan tunggu Admin (Ayah) menyetujuinya.');
        setIsRegister(false); // Balikin ke form login
        setEmail('');
        setPassword('');
      } else {
        // Mode Login
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Cek ke Database apakah akunnya sudah di-ACC (isApproved: true)
        const dbRef = ref(db);
        const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
        
        if (userSnapshot.exists() && userSnapshot.val().isApproved === true) {
          router.push('/');
        } else {
          // Kalau belum di-ACC, paksa keluar dan kasih notif
          await signOut(auth);
          setErrorMsg('Akun Anda belum disetujui. Hubungi Admin.');
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') setErrorMsg('Email atau password salah.');
      else if (error.code === 'auth/email-already-in-use') setErrorMsg('Email ini sudah terdaftar.');
      else setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      
      {/* Background Gambar dengan Opacity 25% */}
      <div className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

      <div className="z-10 bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl text-center w-[90%] max-w-sm border border-cyan-100">
        <img src="/images/Logo BluBook.png" alt="BluBook Logo" className="w-28 mx-auto mb-4 drop-shadow-md" />
        <h1 className="text-2xl font-bold text-cyan-900 mb-1">{isRegister ? 'Buat Akun Baru' : 'Selamat Datang!'}</h1>
        
        {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{errorMsg}</div>}
        {successMsg && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-xl">{successMsg}</div>}

        <form onSubmit={handleAuth} className="flex flex-col gap-4 mt-4">
          <input type="email" placeholder="Alamat Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-500 bg-cyan-50/50" />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-500 bg-cyan-50/50" />
          <button type="submit" disabled={isLoading} className="w-full py-3 mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition-all shadow-lg">{isLoading ? 'Memproses...' : (isRegister ? 'Daftar Sekarang' : 'Masuk')}</button>
        </form>

        <p className="mt-6 text-sm text-cyan-700">
          {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
          <button onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); setSuccessMsg(''); }} className="font-bold text-cyan-600 hover:underline">
            {isRegister ? 'Login di sini' : 'Daftar di sini'}
          </button>
        </p>
      </div>
      <img src="/images/maskot1.png" alt="Maskot" className="absolute -bottom-5 -left-5 w-48 md:w-64 opacity-90 drop-shadow-xl z-10" />
    </main>
  );
}