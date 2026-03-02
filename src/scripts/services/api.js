const BASE_URL = process.env.API_BASE_URL;

const Api = {
  async predict(text) {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async analyzeBatch(texts) {
    const response = await fetch(`${BASE_URL}/analyze-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(texts),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async analyzeUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${BASE_URL}/analyze-upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

export default Api;
