const imageSources = [
  'https://picsum.photos/id/1015/100/100',
  'https://picsum.photos/id/1025/100/100',
  'https://picsum.photos/id/1035/100/100',
  'https://picsum.photos/id/1045/100/100',
  'https://picsum.photos/id/1055/100/100'
];


    let selectedImages = [];

    const container = document.getElementById('image-container');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const para = document.getElementById('para');

    function getShuffledImages() {
      let images = [...imageSources];
      const duplicate = images[Math.floor(Math.random() * images.length)];
      images.push(duplicate);

      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }

      return images;
    }

    function renderImages() {
      container.innerHTML = '';
      para.textContent = '';
      selectedImages = [];
      resetBtn.style.display = 'none';
      verifyBtn.style.display = 'none';

      const shuffled = getShuffledImages();

      shuffled.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('tile');
        img.dataset.src = src;
        img.addEventListener('click', () => handleImageClick(img));
        container.appendChild(img);
      });
    }

    function handleImageClick(img) {
      if (selectedImages.length === 2 || selectedImages.includes(img)) return;

      img.classList.add('selected');
      selectedImages.push(img);

      if (selectedImages.length === 1) {
        resetBtn.style.display = 'inline-block';
      }

      if (selectedImages.length === 2) {
        verifyBtn.style.display = 'inline-block';
      }
    }

    resetBtn.addEventListener('click', () => {
      selectedImages.forEach(img => img.classList.remove('selected'));
      selectedImages = [];
      resetBtn.style.display = 'none';
      verifyBtn.style.display = 'none';
      para.textContent = '';
    });

    verifyBtn.addEventListener('click', () => {
      if (selectedImages.length !== 2) return;

      const [img1, img2] = selectedImages;
      const result = img1.dataset.src === img2.dataset.src;

      para.textContent = result
        ? 'You are a human. Congratulations!'
        : "We can't verify you as a human. You selected the non-identical tiles.";

      verifyBtn.style.display = 'none';
    });

    window.onload = renderImages;