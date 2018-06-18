window.onload = function() {
  chartDraw();
};

var urlBtcUsd = "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&?format=json";
var urlEthUsd = "https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&?format=json";
var urlLtcUsd = "https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&?format=json";
var dateFrom, dateTo;
var deletePreviousChart = false;

var getJsonBtcUsd = $.getJSON(urlBtcUsd, function(data) {
  jsonBtcUsd = data;
});

var getJsonEthUsd = $.getJSON(urlEthUsd, function(data) {
  jsonEthUsd = data;
});

var getJsonLtcUsd = $.getJSON(urlLtcUsd, function(data) {
  jsonLtcUsd = data;
});

function chartDraw(dateFrom, dateTo, deletePreviousChart, hideTrendline) {
	$.when(getJsonBtcUsd, getJsonEthUsd, getJsonLtcUsd)
	.then(function() {

    var valAllBtcFromTo = [];
    var valAllEthFromTo = [];
    var valAllLtcFromTo = [];

		labelsXAxe = jsonLtcUsd.map(function(item) {
		  return item.time.substr(0, 10);
		});

		dataBtcUsd = jsonBtcUsd.map(function(item) {
			return item.average;
		});

		dataEthUsd = jsonEthUsd.map(function(item) {
			return item.average;
		});

		dataLtcUsd = jsonLtcUsd.map(function(item) {
			return item.average;
		});

    // DRAW TREND LINES
    if (deletePreviousChart === true) {
      arrayBtcUsd = jsonBtcUsd.map(function(item) {
        return [item.time.substr(0,10), item.average];
      });

      arrayEthUsd = jsonEthUsd.map(function(item) {
        return [item.time.substr(0,10), item.average];
      });

      arrayLtcUsd = jsonLtcUsd.map(function(item) {
        return [item.time.substr(0,10), item.average];
      });

      var valBtcFrom, valBtcTo;
      var valEthFrom, valEthTo;
      var valLtcFrom, valLtcTo;
      var differenceBtc, differenceEth;

      for (i = 0; i < arrayBtcUsd.length; i++) {
        if (arrayBtcUsd[i][0] === dateFrom) {
          valBtcFrom = arrayBtcUsd[i][1];
        };
      };
      for (j = 0; j < arrayBtcUsd.length; j++) {
        if (arrayBtcUsd[j][0] === dateTo) {
          valBtcTo = arrayBtcUsd[j][1];
        };
      };

      for (i = 0; i < arrayEthUsd.length; i++) {
        if (arrayEthUsd[i][0] === dateFrom) {
          valEthFrom = arrayEthUsd[i][1];
        };
      };
      for (j = 0; j < arrayEthUsd.length; j++) {
        if (arrayEthUsd[j][0] === dateTo) {
          valEthTo = arrayEthUsd[j][1];
        };
      };

      for (i = 0; i < arrayLtcUsd.length; i++) {
        if (arrayLtcUsd[i][0] === dateFrom) {
          valLtcFrom = arrayLtcUsd[i][1];
        };
      };
      for (j = 0; j < arrayLtcUsd.length; j++) {
        if (arrayLtcUsd[j][0] === dateTo) {
          valLtcTo = arrayLtcUsd[j][1];
        };
      };

      differenceBtc = valBtcTo - valBtcFrom;
      differenceEth = valEthTo - valEthFrom;
      differenceLtc = valLtcTo - valLtcFrom;

      var trendLineColorBtc, trendLineColorEth, trendLineColorLtc;

      if (differenceBtc > 0) {
        trendLineColorBtc = 'rgb(40, 167, 69)';    // GREEN
      } else {
        trendLineColorBtc = 'rgb(0, 88, 232)';     // BLUE
      };

      if (differenceEth > 0) {
        trendLineColorEth = 'rgb(40, 167, 69)';    // GREEN
      } else {
        trendLineColorEth = 'rgb(0, 88, 232)';     // BLUE
      };

      if (differenceLtc > 0) {
        trendLineColorLtc = 'rgb(40, 167, 69)';    // GREEN
      } else {
        trendLineColorLtc = 'rgb(0, 88, 232)';     // BLUE
      };

      var annotations;

      if (hideTrendline === true) {
        annotation = null;
      } else {
        annotations = {
          annotations: [{
            type: 'line',
            id: 'btc-trend-line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: valBtcTo,
            endValue: valBtcFrom,
            borderColor: trendLineColorBtc,
            borderWidth: 1.5,
            label: {
              enabled: true,
              content: 'BTC trend line',
              yAdjust: 16,
            }
          },
          {
            type: 'line',
            id: 'eth-trend-line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: valEthTo,
            endValue: valEthFrom,
            borderColor: trendLineColorEth,
            borderWidth: 1.5,
            label: {
              enabled: true,
              content: 'ETH trend line',
              yAdjust: -16,
            }
          },
          {
            type: 'line',
            id: 'ltc-trend-line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: valLtcTo,
            endValue: valLtcFrom,
            borderColor: trendLineColorLtc,
            borderWidth: 1.5,
            label: {
              enabled: true,
              content: 'LTC trend line',
              yAdjust: -16,
            }
          }]
        };
      }


      // Loop Add to array all BTC values from inputs range - FROM / TO DATE
      for (i = 0; i < arrayBtcUsd.length; i++) {
        if ((arrayBtcUsd[i][0] >= dateFrom) && (arrayBtcUsd[i][0] <= dateTo)) {
          valAllBtcFromTo.push(arrayBtcUsd[i][1]);
        };
      };

      // Loop Add to array all ETH values from inputs range - FROM / TO DATE
      for (i = 0; i < arrayEthUsd.length; i++) {
        if ((arrayEthUsd[i][0] >= dateFrom) && (arrayEthUsd[i][0] <= dateTo)) {
          valAllEthFromTo.push(arrayEthUsd[i][1]);
        };
      };

      // Loop Add to array all LTC values from inputs range - FROM / TO DATE
      for (i = 0; i < arrayLtcUsd.length; i++) {
        if ((arrayLtcUsd[i][0] >= dateFrom) && (arrayLtcUsd[i][0] <= dateTo)) {
          valAllLtcFromTo.push(arrayLtcUsd[i][1]);
        };
      };

    };

    var pointRadius;
    if (deletePreviousChart === true) {
      pointRadius = 2;
    } else {
      pointRadius = 1;
    }

		var data = {
				labels: labelsXAxe,
				datasets: [{
					label: "BTCUSD",
					fill: false,
					lineTension: 0,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(75,192,192,0.4)",
					pointHoverBorderWidth: 2,
					pointRadius: pointRadius,
					pointHitRadius: 10,
					data: dataBtcUsd,
				},
				{
					label: "ETHUSD",
					fill: false,
					lineTension: 0,
					backgroundColor: "rgba(100,12,200,0.4)",
					borderColor: "rgba(100,12,200,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(100,12,200,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(100,12,200,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: pointRadius,
					pointHitRadius: 10,
					data: dataEthUsd,
				},
				{
					label: "LTCUSD",
					fill: false,
					lineTension: 0,
					backgroundColor: "rgba(40,12,40,0.4)",
					borderColor: "rgba(40,12,40,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(40,12,40,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(40,12,40,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: pointRadius,
					pointHitRadius: 10,
					data: dataLtcUsd,
				}]
		};

    var maxValFromBtc = Math.max.apply(null, valAllBtcFromTo);
    var minValFromBtc = Math.min.apply(null, valAllBtcFromTo);
    var maxValFromEth = Math.max.apply(null, valAllEthFromTo);
    var minValFromEth = Math.min.apply(null, valAllEthFromTo);
    var maxValFromLtc = Math.max.apply(null, valAllLtcFromTo);
    var minValFromLtc = Math.min.apply(null, valAllLtcFromTo);

    var maxYscaleValue, minYscaleValue;

    if (deletePreviousChart === true) {
      var maxYscaleValue_temp = Math.ceil(Math.max(maxValFromBtc, maxValFromEth, maxValFromLtc));
      maxYscaleValue = Math.ceil(maxYscaleValue_temp * 1.5);
      var minYscaleValue_temp = Math.floor(Math.min(minValFromBtc, minValFromEth, minValFromLtc));
      minYscaleValue = Math.floor(minYscaleValue_temp * 0.9);
    } else {
      minYscaleValue = 3;
    };

		var options = {
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
				title: {
					display: true,
          text: 'Cryptocurrency rates',
					position: 'top',
					fontSize: 18,
					padding: 10,
				},
				scales: {
					yAxes: [{
							type: 'logarithmic',
              position: 'right',
							ticks: {
								callback: function(value, index, values) {
												return '$' + value;
								},
                max: maxYscaleValue,
								min: minYscaleValue,
							}
					}],
					xAxes: [{
							display: true,
							position: 'botton',
							ticks: {
								max: dateFrom,
								min: dateTo,
							},
					}],
				},
				tooltips: {
					enabled: true,
					mode: 'index',
					position: 'nearest',
				},
				legend: {
          display: true,
					position: 'bottom',
          labels: {
              padding: 5,
          }
        },
        annotation: annotations,
		};

    var config = {
			type: 'line',
			data:  data,
			options: options,
		}

    // This condition fix chartjs bug with making new canvas objects
    // without deleting previous
    if (deletePreviousChart === true) {
      $('#lineChart').remove();
      $('#graph-container').append('<canvas id="lineChart"><canvas>');
      canvas = document.querySelector('#lineChart');
      ctx = canvas.getContext('2d');
      ctx.canvas.width = $('#lineChart').width();
      ctx.canvas.height = $('#lineChart').height();
      var x = canvas.width/2;
      var y = canvas.height/2;
      ctx.font = '10pt Verdana';
      ctx.textAlign = 'center';
      ctx.fillText('This text is centered on the canvas', x, y);
    }

	  var ctx = document.getElementById('lineChart').getContext("2d");
		var lineChart = new Chart(ctx, config);

	});
};

// argument (hide) -> 'true' - hide Trend lines / 'false' - show Trend lines
function hideShowTrend(hide) {
  dateFrom = document.getElementById('setDateFrom').value;
  dateTo = document.getElementById('setDateTo').value;
  chartDraw(dateFrom, dateTo, true, hide);
  showCoinVal(dateFrom, dateTo);
};

function setDate() {
	dateFrom = document.getElementById('setDateFrom').value;
	dateTo = document.getElementById('setDateTo').value;
	chartDraw(dateFrom, dateTo, true, false);
  showCoinVal(dateFrom, dateTo);
};

// Show values from arrays after set from/to date inputs
function showCoinVal(dateFrom, dateTo) {
  $.when(getJsonBtcUsd, getJsonEthUsd, getJsonLtcUsd)
  .then(function() {
    arrayBtcUsd = jsonBtcUsd.map(function(item) {
      return [item.time.substr(0,10), item.average];
    });

    arrayEthUsd = jsonEthUsd.map(function(item) {
      return [item.time.substr(0,10), item.average];
    });

    arrayLtcUsd = jsonLtcUsd.map(function(item) {
      return [item.time.substr(0,10), item.average];
    });

    var valBtcFrom, valBtcTo;
    var valEthFrom, valEthTo;
    var valLtcFrom, valLtcTo;
    var differenceBtc, differenceEth, differenceLtc;
    var alert1, alert2, alert3;

    for (i = 0; i < arrayBtcUsd.length; i++) {
      if (arrayBtcUsd[i][0] === dateFrom) {
        valBtcFrom = arrayBtcUsd[i][1];
      };
    };
    for (j = 0; j < arrayBtcUsd.length; j++) {
      if (arrayBtcUsd[j][0] === dateTo) {
        valBtcTo = arrayBtcUsd[j][1];
      };
    };

    for (i = 0; i < arrayEthUsd.length; i++) {
      if (arrayEthUsd[i][0] === dateFrom) {
        valEthFrom = arrayEthUsd[i][1];
      };
    };
    for (j = 0; j < arrayEthUsd.length; j++) {
      if (arrayEthUsd[j][0] === dateTo) {
        valEthTo = arrayEthUsd[j][1];
      };
    };

    for (i = 0; i < arrayLtcUsd.length; i++) {
      if (arrayLtcUsd[i][0] === dateFrom) {
        valLtcFrom = arrayLtcUsd[i][1];
      };
    };
    for (j = 0; j < arrayLtcUsd.length; j++) {
      if (arrayLtcUsd[j][0] === dateTo) {
        valLtcTo = arrayLtcUsd[j][1];
      };
    };

    differenceBtc = valBtcTo - valBtcFrom;
    differenceEth = valEthTo - valEthFrom;
    differenceLtc = valLtcTo - valLtcFrom;

    // 1 Box
    if ((differenceBtc > 0) && (differenceEth > 0) && (differenceLtc > 0)) {
      alert1 = 'BTCUSD Growth -> ETHUSD and LTCUSD started to grow just after BTCUSD';
      document.getElementById('date1').innerHTML = dateFrom;
      document.getElementById('alert1').innerHTML = alert1;
      document.getElementById('arrow1').src = "img/arrowupgreen.svg";
      // GREEN
    } else if ((differenceBtc < 0) && (differenceEth < 0) && (differenceLtc < 0)) {
      alert1 = 'BTCUSD Drop -> ETHUSD and LTCUSD started to drop just after BTCUSD';
      document.getElementById('date1').innerHTML = dateFrom;
      document.getElementById('alert1').innerHTML = alert1;
      document.getElementById('arrow1').src = "img/arrowdownred.svg";
      // RED
    } else {
      alert1 = '';
      document.getElementById('date1').innerHTML = '';
      document.getElementById('alert1').innerHTML = '';
      document.getElementById('arrow1').src = "";
      //NOTHING
    };

    // 2 Box
    if ((differenceBtc > 0) && (differenceEth > 0)) {
      alert2 = 'BTCUSD Growth -> ETHUSD started to grow just after BTCUSD';
      document.getElementById('date2').innerHTML = dateFrom;
      document.getElementById('alert2').innerHTML = alert2;
      document.getElementById('arrow2').src = "img/arrowupgreen.svg";
      //GREEN
    } else if ((differenceBtc < 0) && (differenceEth < 0)) {
      alert2 = 'BTCUSD Drop -> ETHUSD started to drop just after BTCUSD';
      document.getElementById('date2').innerHTML = dateFrom;
      document.getElementById('alert2').innerHTML = alert2;
      document.getElementById('arrow2').src = "img/arrowdownred.svg";
      //RED
    } else {
      alert2 = '';
      document.getElementById('date2').innerHTML = '';
      document.getElementById('alert2').innerHTML = '';
      document.getElementById('arrow2').src = "";
      //NOTHING
    };

    // 3 Box
    if ((differenceBtc > 0) && (differenceLtc > 0)) {
      alert3 = 'BTCUSD Growth -> LTCUSD started to grow just after BTCUSD';
      document.getElementById('date3').innerHTML = dateFrom;
      document.getElementById('alert3').innerHTML = alert3;
      document.getElementById('arrow3').src = "img/arrowupgreen.svg";
      //GREEN
    } else if ((differenceBtc < 0) && (differenceLtc < 0)) {
      alert3 = 'BTCUSD Drop -> LTCUSD started to drop just after BTCUSD';
      document.getElementById('date3').innerHTML = dateFrom;
      document.getElementById('alert3').innerHTML = alert3;
      document.getElementById('arrow3').src = "img/arrowdownred.svg";
      //RED
    } else {
      alert3 = '';
      document.getElementById('date3').innerHTML = '';
      document.getElementById('alert3').innerHTML = '';
      document.getElementById('arrow3').src = "";
      //NOTHING
    };
  });
};
