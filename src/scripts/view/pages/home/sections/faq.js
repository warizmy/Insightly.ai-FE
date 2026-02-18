class FaqSection {
  render() {
    const section = document.createElement('section');
    section.className = 'd-flex mt-5 py-5 flex-column align-items-center justify-content-center';

    section.innerHTML = `
        <div class="section-2">
          <h4 class="text-start fw-bold m-0">FAQ
              <span class="text-warning">
                    's
              </span>
          </h4>
          <p class="text-muted">
            Temukan Jawaban Dari Pertanyaan Anda
          </p>
          <div class="py-4 w-100">
            <div id="faq" class="d-flex flex-column gap-3 align-items-start justify-content-center">
              <div class="border-bottom w-100 d-flex flex-column gap-3 pb-3">
                <button class="btn p-0 text-start" data-bs-toggle="collapse" data-bs-target="#q1" aria-expanded="false" aria-controls="q1">
                    Apakah aplikasi ini bisa mengenali semua makanan?
                </button>
                <div id="q1" class="collapse" data-bs-parent="#faq">
                    <p>
                        Untuk saat ini, AI kami fokus pada 
                        <strong>
                          13 jenis masakan Indonesia
                        </strong> populer seperti Rendang, Nasi Goreng, dan lainnya. 
                        Anda bisa melihat daftar lengkapnya di menu "Daftar Menu".
                    </p>
                </div>
              </div>
              <div class="border-bottom w-100 d-flex flex-column gap-3 pb-3"">
                <button class="btn p-0 text-start" data-bs-toggle="collapse" data-bs-target="#q2" aria-expanded="false" aria-controls="q2">
                    Dari mana resep tersebut berasal?
                </button>
                <div id="q2" class="collapse" data-bs-parent="#faq">
                  <p>
                    Resep dihasilkan secara otomatis oleh 
                    <strong>
                      Gemini AI (Large Language Model)
                    </strong> 
                      yang dilatih untuk memberikan instruksi memasak layaknya koki profesional.
                  </p>
                </div>
              </div>
              <div class="border-bottom w-100 d-flex flex-column gap-3 pb-3"">
                <button class="btn p-0 text-start" data-bs-toggle="collapse" data-bs-target="#q3" aria-expanded="false" aria-controls="q3">
                  Kenapa hasil klasifikasi kadang salah?
                </button>
                <div id="q3" class="collapse" data-bs-parent="#faq">
                  <p>
                    Akurasi tergantung pada pencahayaan dan sudut pengambilan foto. Pastikan makanan terlihat jelas dan berada di tengah frame untuk hasil terbaik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    return section;
  }
}

export default FaqSection;
