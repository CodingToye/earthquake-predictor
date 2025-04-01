import Earthquakes from "@/components/Earthquakes";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <main className="m-auto p-4 grid grid-cols-1 gap-4">
      <Earthquakes />
    </main>
  );
}

export default App;
