import { Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)
function BurnDownChart({data}) {
  return (
    <div className="App">
      <h1>Burn Down Chart</h1>
      <div style={{ maxWidth: '350px' }}>
        <Bar
          data={data}
          // Height of graph
          height={400}
        />
      </div>
    </div>
  );
}

export default BurnDownChart;
