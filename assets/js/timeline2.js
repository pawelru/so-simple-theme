  Chart.defaults.timeline = Chart.defaults.horizontalBar;
  Chart.controllers.timeline = Chart.controllers.horizontalBar.extend({
    initialize: function() {
      return Chart.controllers.bar.prototype.initialize.apply(this, arguments);
    }
  });

  Chart.pluginService.register({
    beforeInit: function(chart) {
      if (chart.config.type === 'timeline') {
      	var config = chart.config;
        
        var data = config.data.datasets[0].data;
        
        var min = new Date(data[0][0].getFullYear(), data[0][0].getMonth(), data[0][0].getDate());
        var max = new Date(data[data.length-1][1].getFullYear(), data[data.length-1][1].getMonth(), data[data.length-1][1].getDate() + 1);

        function toDate(date) {
          var date = new Date(min.getTime() + date);
		  return (date.getUTCMonth()+1) + "/" + date.getUTCFullYear();
        }
        
        config.options.scales.xAxes[0].ticks.callback = toDate;
        config.options.scales.xAxes[0].ticks.minRotation = 90
        
        // create a dummy dataset with background color transparent ending at the start time
        config.data.datasets.unshift({
          backgroundColor: 'rgba(0, 0, 0, 0)',
          data: data.map(function(e) {
            return e[0]-min;
          })
        });

        config.data.datasets[1].data = data.map(function(e) {
          return e[1] - e[0];
        });
		
      }
    }
  });