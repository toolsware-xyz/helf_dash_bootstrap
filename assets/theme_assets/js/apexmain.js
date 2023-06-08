
/* Donut Chart */
function donutChart(idName,series, width, height) {
  var optionDonut = {
    chart: {
      type: 'donut',
      width: width,
      height: height,
      stacked: true,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    },
    colors: ['#00AAFF', '#01B81A', '#FA8B0C','#5840FF','#00E4EC'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '35%',
        },
        offsetY: 15,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: ['#fff'],
      width: 1,
      dashArray: 0,
    },
    series: series,
    labels: ['Data Base','Documentation','Dashboard','Theme','Other'],
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      offsetY: 0,
      fontSize: '16px',
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      offsetY:0,
      labels: {
        colors: '#525768',
      },
      markers: {
        width: 8,
        height: 8,
        radius: 20,
        offsetX: -4,
        offsetY:-2,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 3
      }
    },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: "100%",
            height:300,
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY:10,
          },
        },
      },
    ],
  }
  if ($(idName).length > 0) {
    new ApexCharts(document.querySelector(idName), optionDonut).render();
  }
}

donutChart('#apexDonutChart',[30,20,20,10,20],'100%',400);
