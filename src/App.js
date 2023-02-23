import BarChart from "./components/BarChart";
import CostResultArea from "./components/CostResultArea";
import FormArea from "./components/FormArea";
import LogoArea from "./components/LogoArea";
import { useGlobalContext } from "./context";

function App() {
  const { chartData } = useGlobalContext();

  return (
    <>
      <LogoArea />
      <FormArea />
      <CostResultArea />
      <BarChart chartData={chartData} />
    </>
  );
}

export default App;
