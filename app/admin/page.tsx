'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase';
import { ref, get, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

interface UserType {
  uid: string;
  email: string;
  isApproved: boolean;
  isPremium: boolean;
  name?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Proteksi Ketat: Hanya email ini yang bisa masuk panel admin
      if (!user || user.email !== 'admin@blubook.com') {
        router.push('/'); // Lempar ke halaman utama kalau bukan admin
      } else {
        fetchUsers();
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fungsi Ambil Semua User dari Firebase Realtime Database
  const fetchUsers = async () => {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersList = Object.keys(data).map((key) => ({
          uid: key,
          ...data[key],
        }));
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Gagal mengambil data user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Toggle ACC (isApproved)
  const toggleApprove = async (uid: string, currentStatus: boolean) => {
    try {
      await update(ref(db, `users/${uid}`), {
        isApproved: !currentStatus,
      });
      fetchUsers(); // Refresh data
    } catch (error) {
      alert('Gagal mengubah status persetujuan');
    }
  };

  // Fungsi Toggle Premium (isPremium)
  const togglePremium = async (uid: string, currentStatus: boolean) => {
    try {
      await update(ref(db, `users/${uid}`), {
        isPremium: !currentStatus,
      });
      fetchUsers(); // Refresh data
    } catch (error) {
      alert('Gagal mengubah status premium');
    }
  };

  if (loading) return <div className="min-h-screen bg-cyan-50 flex items-center justify-center text-cyan-800 font-bold">Membuka Gerbang Kendali Lautan...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100 py-12 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-cyan-200 relative z-10">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-cyan-100 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👑</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-950">Kemudi Kendali BluBook</h1>
              <p className="text-cyan-700 text-sm">Kelola akses pembaca dan langganan premium</p>
            </div>
          </div>
          <button onClick={() => router.push('/')} className="px-5 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-bold rounded-full transition-colors text-sm border border-cyan-200">
            &larr; Kembali ke Rak
          </button>
        </div>

        {/* Tabel User List */}
        <div className="overflow-x-auto rounded-2xl border border-cyan-100 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-cyan-600 text-white text-sm font-bold">
                <th className="p-4">Email Pengguna</th>
                <th className="p-4 text-center">Status ACC (Akses)</th>
                <th className="p-4 text-center">Status Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-50 text-cyan-900 text-sm">
              {users.map((u) => (
                <tr key={u.uid} className="hover:bg-sky-50/50 transition-colors">
                  <td className="p-4 font-medium break-all">{u.email}</td>
                  
                  {/* Kolom Toggle Approved */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleApprove(u.uid, u.isApproved)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                        u.isApproved 
                          ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200'
                      }`}
                    >
                      {u.isApproved ? '✅ Di-ACC' : '⏳ Menunggu'}
                    </button>
                  </td>

                  {/* Kolom Toggle Premium */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => togglePremium(u.uid, u.isPremium)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                        u.isPremium 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                          : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {u.isPremium ? '💎 Premium' : 'Free Member'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}