// 1. Data Tema (Folder)
export const themes = [
  { id: "adab", title: "Seri Adab & Kebaikan", cover: "/images/cover tema adab.png", isPremium: false },
  { id: "disiplin", title: "Seri Kemandirian", cover: "/images/cover tema disiplin.png", isPremium: false },
  { id: "sholeh", title: "Seri Anak Sholeh", cover: "/images/cover tema anak sholeh.png", isPremium: false },
  { id: "emosi", title: "Seri Kelola Emosi", cover: "/images/cover tema emosi.png", isPremium: false },
  { id: "eksplorasi", title: "Seri Pengetahuan", cover: "/images/cover tema eksplorasi.png", isPremium: false },
  { id: "premium1", title: "Seri Petualangan Luar Angkasa", cover: "/images/cover tema angkasa.png", isPremium: true },
];

// 2. Data Buku
export const books = [
  {
    id: "piko-selendang-biru",
    title: "Petualangan Piko",
    coverUrl: "/images/cover buku adab 1.jpg", 
    themeId: "adab", 
    iframeUrl: "https://heyzine.com/flip-book/513e1e0c4a.html", // Ingat ganti pakai link asli Heyzine lo
    quiz: {
      question: "Di cerita tadi, kenapa Piko akhirnya mau membagikan buah berinya kepada teman-teman?",
      options: [
        "Karena perut Piko sudah terlalu kenyang", 
        "Karena berbagi dengan teman membuat hati jadi senang", 
        "Karena Piko sebenarnya tidak suka buah beri"
      ],
      answer: "Karena berbagi dengan teman membuat hati jadi senang"
    }
  },

  {
    id: "maafkan-aku-owi", // ID unik, pakai huruf kecil dan strip
    title: "Maafkan Aku, Owi",
    coverUrl: "/images/cover buku adab 2.jpg", // Sesuaikan dengan nama file gambar cover di langkah 1
    themeId: "adab", // Masih masuk ke folder "Seri Adab & Kebaikan"
    iframeUrl: "https://heyzine.com/flip-book/b738fda7be.html", // Paste link Heyzine buku Owi di sini
    quiz: {
      question: "Apa yang dilakukan Piko setelah tahu ia berbuat salah kepada Owi?",
      options: [
        "Piko lari bersembunyi ketakutan",
        "Piko berani dan jujur untuk meminta maaf",
        "Piko pura-pura tidak tahu"
      ],
      answer: "Piko berani dan jujur untuk meminta maaf"
    }
  }
];