import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Visualization({features}) {

     if (!features) {
    return <p>Loading feature visualization...</p>;
  }

  const labels = Object.keys(features);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feature Values",
        data: Object.values(features),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  return (

    <div style={{width:"700px", margin:"40px auto"}}>
      <h3>Speech Feature Analysis</h3>
      <Bar data={data}/>
    </div>

  );
}

export default Visualization;