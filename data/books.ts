// data/books.ts

// 1. Data Tema (Folder)
export const themes = [
  { id: "adab", title: "Seri Adab & Kebaikan", cover: "/images/cover tema adab.png", isPremium: false },
  { id: "disiplin", title: "Seri Kemandirian", cover: "/images/cover tema disiplin.png", isPremium: false },
  { id: "sholeh", title: "Seri Anak Sholeh", cover: "/images/cover tema anak sholeh.png", isPremium: false },
  { id: "emosi", title: "Seri Kelola Emosi", cover: "/images/cover tema emosi.png", isPremium: false },
  { id: "eksplorasi", title: "Seri Pengetahuan", cover: "/images/cover tema eksplorasi.png", isPremium: false },
  // Contoh tema berbayar (Paywall)
  { id: "premium1", title: "Seri Petualangan Luar Angkasa", cover: "/images/cover tema angkasa.png", isPremium: true },
];

// 2. Data Buku
export const books = [
  {
    id: "piko-selendang-biru",
    title: "Petualangan Piko",
    coverUrl: "/images/cover buku adab 1.jpg", // Pakai cover baru
    themeId: "adab", // Nyambung ke folder Adab
    iframeUrl: "https://heyzine.com/flip-book/513e1e0c4a.html" 
  }
];