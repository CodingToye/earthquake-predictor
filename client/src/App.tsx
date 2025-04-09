// App.tsx

import Earthquakes from "@/components/Earthquakes";

import "@/styles/App.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <main className="m-auto grid grid-cols-1 gap-4">
      <Earthquakes />
    </main>
  );
}

export default App;
