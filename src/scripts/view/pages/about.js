class About {
  _render() {
    const section = document.createElement('section');
    section.innerHTML = `
     <div class="container">
          <div class="inner-container py-5 my-5 d-flex flex-column justify-content-center gap-3">
               <div class="mt-5">
                    <h1 class="fw-bolder text-center">Tentang IndoFood.<span class="text-warning">ai</span></h1>
                    <p class="text-muted fs-5 text-center">
                         Kami menggabungkan kekuatan Computer Vision dan Generative AI untuk menghadirkan pengalaman kuliner yang cerdas
                    </p>
               </div>
               <div class="card-container"> 
                    <div class="card-about p-4 d-flex flex-column gap-1 align-items-start">
                         <div class="text-warning">
                              <i class="bi bi-eye-fill fs-1"></i>
                         </div>
                         <h4 class="fw-bold">Computer Vision</h4>
                         <h6 class="text-muted pb-3 small">MobileNetV2 Architecture</h6>
                         <p class="card-text text-secondary text-start">
                              Model ini telah dilatih menggunakan ribuan data gambar masakan Indonesia. MobileNetV2 dipilih karena kemampuannya yang efisien dalam mengenali pola visual (warna, tekstur, bentuk) secara cepat tanpa membebani performa server.
                         </p>
                    </div>
                    <div class="card-about p-4 d-flex flex-column gap-1 align-items-start">
                         <div class="text-warning">
                              <i class="bi bi-cpu-fill fs-1"></i>
                         </div>
                         <h4 class="fw-bold">Generative AI</h4>
                         <h6 class="text-muted pb-3 small">Google Gemini Pro</h6>
                         <p class="card-text text-secondary">
                              Setelah identifikasi berhasil, nama makanan dikirim ke Gemini AI. Sebagai model bahasa besar (LLM), Gemini merangkai resep yang mencakup instruksi untuk Anda.
                         </p>
                    </div>
               </div>
          </div>
          <div class="pb-4">
               <h3 class="fw-bold text-start">Alur Proses Identifikasi</h3>
               <hr>
               <div class="flow-container gap-5 py-4">
                    <div class="flow-card d-flex flex-column gap-1 align-items-center py-3 px-2 rounded-4">
                         <h2 class="text-warning fw-bold">01</h2>
                         <p class="fw-bold mb-1">Pre-processing</p>
                         <small class="text-muted text-center">
                              Gambar disesuaikan ke resolusi 224x224 px.
                         </small>
                    </div>
                    <div class="flow-card d-flex flex-column gap-2 align-items-center py-3 px-2 rounded-4">
                         <h2 class="text-warning fw-bold">02</h2>
                         <p class="fw-bold mb-1">Feature Extraction</p>
                         <small class="text-muted text-center">
                              AI mencari pola unik dalam bumbu dan tekstur.
                         </small>
                    </div>
                    <div class="flow-card d-flex flex-column gap-2 align-items-center py-3 px-2 rounded-4">
                         <h2 class="text-warning fw-bold">03</h2>
                         <p class="fw-bold mb-1">Classification</p>
                         <small class="text-muted text-center">
                              Mencocokkan data dengan 13 kategori makanan.
                         </small>
                    </div>
                    <div class="flow-card d-flex flex-column gap-2 align-items-center py-3 px-2 rounded-4">
                         <h2 class="text-warning fw-bold">04</h2>
                         <p class="fw-bold mb-1">Recipe Crafting</p>
                         <small class="text-muted text-center">
                              Gemini AI menyusun resep secara real-time.
                         </small>
                    </div>
               </div>
          </div>
          <div class="py-5 d-flex flex-column">
               <div class="bg-body-tertiary px-3 py-2 border-start border-warning border-5 rounded-10">
                    <h4 class="fw-semibold">Catatan</h4>
                    <p class="text-secondary">
                         Akurasi klasifikasi sangat bergantung pada kualitas pencahayaan dan fokus objek.
                         Resep yang dihasilkan AI disarankan untuk ditinjau kemabli sesuai selera masing-masing. 
                    </p>
               </div>
          </div>
     </div>`;
    return section;
  }
}

export default About;
