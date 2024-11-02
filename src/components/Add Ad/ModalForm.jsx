import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAdd } from "../../store/slices/addAddSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getPositions } from "../../store/slices/PositionSlice";
import axios from "axios";
const ModalForm = ({ title, onClose, positionId,position }) => {
  console.log({position})
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false); // New loading state for image upload
  const user = useSelector((state) => state.auth);
  const token = user.jwtToken;
  const [positions, setPositions] = useState([]);
  

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
  const fetchPositions = async () => {
    try {
        const response = await axios.get('http://localhost:8890/news/dashboard/calendar/positions', {
            headers: {
                'x-meebuddy-token': token
            }
        });
        setPositions(response.data); // Set the fetched positions to state
        setLoading(false);
    } catch (err) {
        console.log("Error fetching positions: " + err.message);
        setLoading(false);
    }
};

useEffect(() => {
     console.log("Called")
    fetchPositions();
    
}, []);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1]; // Extract base64 data
        const img = new Image();
  
        img.onload = async () => {
          const { width, height } = img;
          console.log({width})
          console.log({height})
          console.log(position.dimension.width)
          console.log(position.dimension.height)
          
          if (position.dimension.width != width || position.dimension.height != height) {
            toast.error("Image Dimesions are not matching.");
            return; 
          }
  
          setImageLoading(true); // Start loading for image upload
          const response = await fetch("http://localhost:8890/news/dashboard/calendar/upload-image", {
            method: "POST",
            headers: {
              "x-meebuddy-token": token, // Replace with your actual token
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: `data:image/${file.type};base64,${base64Data}` }),
          });
  
          const result = await response.json();
          setImageLoading(false); // Stop loading after the upload completes
          if (result.success) {
            setPhotoUrl(result.imageUrl);
          } else {
            toast.error("Image upload failed Please Try Again: " + result.message);
          }
        };
  
        img.src = reader.result; // Trigger image load
      };
      reader.readAsDataURL(file);
      setPhotoFile(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!photoUrl) {
      toast.error("Please upload an image before submitting the form.");
      setLoading(false);
      return; 
    }
    
    const data = {
      positionId,
      month: selectedMonths,
      level,
      ownerDetails: {
        name,
        phone: mobile,
        address,
      },
      photo: photoUrl, // Use the photo URL obtained from the upload
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
        toast.error("Failed to book slot. Please try again." + response.error.message);
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
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
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
        disabled={loading || imageLoading} // Disable if either is loading
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ModalForm;
