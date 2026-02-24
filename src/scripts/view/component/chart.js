class SentimentChart {
  static render(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const existingChart = Chart.getChart(canvasId);
    if (existingChart) existingChart.destroy();

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
          {
            data,
            backgroundColor: ['#10b981', '#ef4444', '#94a3b8'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '80%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }
}

export default SentimentChart;
