import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // 🔹 Import the logo image

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          <img src={logo} alt="MBC Logo" className="h-10 w-10 object-contain" /> 
          <h1 className="text-lg font-semibold leading-none flex items-center h-10">Frontend Engineering Challenge</h1>
        </div>

        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-300">Upload Datasets</Link>
          <Link to="/jobs" className="hover:text-gray-300">Run Jobs</Link>
          <Link to="/feedback" className="hover:text-gray-300">Feedback</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
