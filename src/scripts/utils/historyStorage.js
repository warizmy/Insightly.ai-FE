const STORAGE_KEY = 'FOOD_CLASSIFICATION_HISTORY';

const HistoryStorage = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(item) {
    const histories = this.getAll();

    histories.unshift(item);

    // limit history (20)
    if (histories.length > 20) {
      histories.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default HistoryStorage;
