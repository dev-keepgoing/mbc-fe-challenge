import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DatasetUploadPage from "./pages/DatasetUploadPage";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/navBar";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DatasetUploadPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
