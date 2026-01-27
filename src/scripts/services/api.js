const BASE_URL = process.env.API_BASE_URL;

const Api = {
  async predictFood(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Prediction failed');
    }

    return response.json();
  },
};

export default Api;
