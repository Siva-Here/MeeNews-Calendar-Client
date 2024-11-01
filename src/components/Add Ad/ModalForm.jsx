import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPositions } from "../../store/slices/PositionSlice";
import {
  MegaphoneIcon,
  CalendarIcon,
  NewspaperIcon,
  CircleFadingPlus,
  CircleX
} from "lucide-react";


import "./Layout.css";
import Table from "../Table/Table";
import { addAdd } from "../../store/slices/addAddSlice.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoadingAnimation from "./LoadingAnimation.jsx";
import { Modal } from "flowbite-react";
const ModalForm = ({ title, onClose, positionId }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState("");
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [level, setLevel] = useState("");
    const [loading, setLoading] = useState(false);
  
    const months = [
      "All",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const handleMonthChange = (month) => {
      if (month === "All") {
        if (selectedMonths.includes("All")) {
          setSelectedMonths([]);
        } else {
          setSelectedMonths(months.filter((m) => m !== "All"));
        }
      } else {
        setSelectedMonths((prev) =>
          prev.includes(month)
            ? prev.filter((m) => m !== month)
            : [...prev.filter((m) => m !== "All"), month]
        );
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const data = {
        positionId,
        month: selectedMonths,
        level,
        ownerDetails: {
          name,
          phone: mobile,
          address,
        },
        photo,
        mandal: "5ffde92b6563fd34c467ede5",
      };
  
      try {
        const response = await dispatch(addAdd(data));
  
        if (addAdd.fulfilled.match(response)) {
          toast.success("Slot booked for the specified months!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.log(response);
          toast.error(
            "Failed to book slot. Please try again." + response.error.message
          );
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
        onClose();
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="modal-form">
        {/* <h2>{title}</h2> */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
        />
  
        <div className="level-selection">
          <label>Select Level:</label>
          <div className="flex">
            <label className="block">
              <input
                className="mx-3"
                type="radio"
                value="Constituency"
                checked={level === "Constituency"}
                onChange={(e) => setLevel(e.target.value)}
              />
              Constituency
            </label>
            <label className="ms-4">
              <input
                className="me-2"
                type="radio"
                value="Mandal"
                checked={level === "Mandal"}
                onChange={(e) => setLevel(e.target.value)}
              />
              Mandal
            </label>
          </div>
        </div>
  
        <div className="month-selection">
          <label>Select Months:</label>
          <label key="all">
            <input
              type="checkbox"
              value="All"
              checked={selectedMonths.includes("All")}
              onChange={() => handleMonthChange("All")}
            />
            All
          </label>
          <div className="checkbox-group">
            {months.slice(1).map((month) => (
              <label key={month}>
                <input
                  type="checkbox"
                  value={month}
                  checked={selectedMonths.includes(month)}
                  onChange={() => handleMonthChange(month)}
                />
                {month}
              </label>
            ))}
          </div>
        </div>
  
        <button
          type="submit"
          className={`bg-[#9b59b6] text-white rounded-md p-1 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {/* <button type="button" onClick={onClose} className="mt-2">Close</button> */}
      </form>
    );
  };

export default ModalForm