import { Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)
function BurnDownChart({data}) {
  return (
    <div className="App">
      <h1>GEEKSFORGEEKS BAR CHART REACTJS</h1>
      <div style={{ maxWidth: '650px' }}>
        <Bar
          data={data}
          options={{plugins: {
            labels: {
              fontColor: 'red'
            }
          }}}
          // Height of graph
          height={400}
        />
      </div>
    </div>
  );
}

export default BurnDownChart;
