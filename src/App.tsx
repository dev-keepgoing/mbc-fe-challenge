import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DatasetUploadPage from "./pages/DatasetUploadPage";
import JobsPage from "./pages/JobsPage";
import Navbar from "./components/navBar";
import FeedbackForm from "./pages/FeedbackForm";
import ToastNotification from "./components/ToastNotification";


function App() {
  return (
    <Router>
      <Navbar />
      <ToastNotification/>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DatasetUploadPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/feedback" element={<FeedbackForm/>}/>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
