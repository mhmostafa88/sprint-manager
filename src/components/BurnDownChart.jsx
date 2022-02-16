
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function BurnDownChart({data}) {
  return (
    <div className="App">
      <h1>Burn Down Chart</h1>
      <div style={{ maxWidth: '350px' }}>
        <Chart
        type='bar'
          data={data}
          height={400}
        />
      </div>
    </div>
  );
}

export default BurnDownChart;
