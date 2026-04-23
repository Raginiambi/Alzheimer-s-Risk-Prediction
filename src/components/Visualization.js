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

function Visualization({ features }) {

  if (!features) {
    return <p className="screenText">Loading feature visualization...</p>;
  }

  const labels = Object.keys(features);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feature Values",
        data: Object.values(features),
        backgroundColor: "rgba(140,100,255,0.8)"
      }
    ]
  };

  return (

    <div className="chartBox">

      <h3 className="chartTitle">
        Speech Feature Analysis
      </h3>

      <Bar data={data} />

    </div>

  );

}

export default Visualization;