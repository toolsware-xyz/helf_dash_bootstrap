/* ======= Custom Tooltip ====== */
const customTooltips = function (context) {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, i) {
      const colors = tooltipModel.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });
    innerHtml += '</tbody>';

    let tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const toolTip = document.querySelector('.chartjs-tooltip');
  const position = context.chart.canvas.getBoundingClientRect();
  const toolTipHeight = toolTip.clientHeight;
  const rtl = document.querySelector('html[dir="rtl"]');


  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
  tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY-(tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}

/* Index Page */

/* line chart */
function chartjsSupport(selector, height = "125", dataCur, labels, dataBwidth) {
  let delayed;
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = window.innerWidth <= 1599 ? 147 : height;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          data: dataCur,
          borderColor: '#599700',
          borderWidth: dataBwidth,
          label: "Ticket",
          pointStyle: "circle",
          pointRadius: "0",
          hoverRadius: "5",
          pointBorderColor: "#599700",
          pointBackgroundColor: "#599700",
          hoverBorderWidth: 1,
          tension: 0.35,
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label}%</span>`;
              }
            },
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 200 + context.datasetIndex * 50;
            }
            return delay;
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            stacked: false,
            grid: {
              display: true,
              color: "#485e9029",
              tickMarkLength: 1,
              borderDash: [3, 3],
              drawTicks: false,
              drawBorder: false,
              zeroLineWidth: 3,
              borderWidth: 0,
            },
            ticks: {
              beginAtZero: false,
              color: "#8C90A4",
              font: {
                size: 14,
              },
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 25,
              min: 0,
              padding: 15,
              callback: function (label, index, labels) {
                return label + "%";
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: false,
              drawTicks: true,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: false,
              color: "#8C90A4",
              font: {
                size: 14,
              },
              display: true,
            },
          },
        },
        layout: {
          padding: {
            left: -10
          }
        },
      },
    });
  }
}
chartjsSupport(
  "supportTicket",
  "89",
  (data = [10, 55, 35,70, 40, 70, 25, 100, 35, 40, 26, 58]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
);
chartjsSupport(
  "lineChartBasic",
  "100",
  (data = [10, 55, 35,70, 40, 70, 25, 100, 35, 40, 26, 58]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
);



/* Bar chart */
function chartjsResponse(selector, height = "125", dataCur, labels, dataBwidth) {
  let delayed;
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 250 : height;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels:labels,
        datasets: [{
            data: dataCur,
            backgroundColor: "rgba(88, 150,0, 0.50)",
            hoverBackgroundColor: "#599700",
            label: "Hours",
            borderRadius: 2,
            barPercentage: 0.63,
          }
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
          mode: 'index',
        },
        plugins: {
          legend: {
            display:false,
          },
          tooltip: {
            usePointStyle: true,
            enabled: false,
            external: customTooltips,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return `<span class="data-label">${label} hr</span>`;
              }
            },
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 200 + context.datasetIndex * 50;
            }
            return delay;
          },
        },
        layout: {
          padding: {
            left: -10,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          y: {
            stacked: true,
            grid: {
              display: true,
              color: "#485e9029",
              tickMarkLength: 1,
              borderDash: [3, 3],
              drawTicks: false,
              drawBorder: false,
              zeroLineWidth: 3,
              borderWidth: 0,
            },
            ticks: {
              beginAtZero: true,
              font: {
                size: 14,
              },
              color: "#8C90A4",
              padding: 15,
              max: 7,
              min:1,
              stepSize: 1,
              callback(value, index, values) {
                return `${value}hr`;
              },
            },
          },
          x: {
            stacked: true,
            grid: {
              display: false,
              drawTicks: true,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: false,
              color: "#8C90A4",
              font: {
                size: 14,
              },
              display: true,
            },
          },
        },
      },
    });
  }
}
chartjsResponse(
  "responsTime",
  "195",
  (data = [2.10,4,0.50,3.50, 2.60, 4.50, 3.50]),
  labels = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
  ],
);

chartjsResponse(
  "barChartVertical",
  "100",
  (data = [2.10,4,0.50,3.50, 2.60, 4.50, 3.50]),
  labels = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
  ],
);

