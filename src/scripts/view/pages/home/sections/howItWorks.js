import uploadIcon from '../../../../../public/images/upload.svg';
import aiTechIcon from '../../../../../public/images/ai-technology.svg';
import recipeIcon from '../../../../../public/images/recipe-book.svg';

class HowItWorksSection {
  render() {
    const section = document.createElement('section');
    section.className = 'how-it-works d-flex my-4 py-4 flex-column align-items-center jusify-content-center';

    section.innerHTML = `
     <div class="section-1">
          <div class="py-3">
               <h4 class="text-start fw-bold m-0">Cara Kerja
                    <span class="text-warning">IndoFood.ai<span class="text-black">?</span>
                    </span>
               </h4>
               <p class="text-secondary fs-6">Cek Makanan Dengan tiga Langkah</p>
          </div>
          <div class="d-flex flex-row gap-4 align-items-center justify-content-between">
               <span class="card d-flex flex-column align-items-start justify-content-center">
                    <img src="${uploadIcon}" alt="upload">
                    <h5>Unggah Gambar</h5>
                    <p class="text-muted">Unggah foto masakan Indonesia dari kamera atau galeri.</p>
               </span>
               <span class="card d-flex flex-column align-items-start justify-content-center">
                    <img src="${aiTechIcon}" alt="aiTech">
                    <h5>Analisis AI</h5>
                    <p class="text-muted">MobileNetV2 menganalisis gambar untuk mengenali nama makanan.</p>
               </span>
               <span class="card d-flex flex-column align-items-start justify-content-center">
                    <img src="${recipeIcon}" alt="recipe">
                    <h5>Dapatkan Resep</h5>
                    <p class="text-muted">Gemini AI otomatis menghasilkan resep berdasarkan identifikasi.</p>
               </span>
               </div>
          </div>`;
    return section;
  }
}

export default HowItWorksSection;
