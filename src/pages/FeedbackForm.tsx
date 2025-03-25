import React from "react";
import { JOB_STATUS } from "../constants/jobStatus";
import PhoneInput from "../components/PhoneInput";
import EmailInput from "../components/EmailInput";
import { useToastStore } from "../store/notifications/toastStore";

const FeedbackForm: React.FC = () => {
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    showToast("Thanks for submitting the form.", "success");
  }
  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Complete the Form</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="Enter name"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <PhoneInput/>
        </div>

        <div>
          <EmailInput/>
        </div>

        <div>
          <label htmlFor="status" className="block mb-1 font-medium">Job Status</label>
          <select
            required
            id="status"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>-- Select status --</option>
            {Object.entries(JOB_STATUS).map(([key, value]) => (
              <option key={key} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Submit
        </button>
      </form>

      
    </div>
  );
};

export default FeedbackForm;
