import React, { useState } from 'react';
import { MegaphoneIcon, CalendarIcon, NewspaperIcon } from 'lucide-react';
import './Preview.css';

const Preview = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  // Image URLs for each month
  const images = {
    January: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    February: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    March: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    April: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    May: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    June: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    July: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    August: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    September: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    October: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    November: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    December: [
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1729218621503-b4a57a7ab7a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
};


  return (
    <div className="Preview">
      <div className="container">
        <h1 className="title">Choose Month</h1>

        <div className="dropdown">
          <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
            {Object.keys(images).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-3">
          <div className="card col-span-2">
            <img src={images[selectedMonth][0]} alt="Header Left" className="img-responsive object-cover" />
          </div>
          <div className="card">
            <img src={images[selectedMonth][1]} alt="Header Right" className="img-responsive object-cover" />
          </div>
        </div>

        <div className="grid grid-10">
          <div className="card col-span-6">
            <img src={images[selectedMonth][2]} alt="Ad Part 1" className="img-responsive object-cover" />
          </div>
          <div className="card col-span-4">
            <img src={images[selectedMonth][2]} alt="Ad Part 2" className="img-responsive object-cover" />
          </div>
        </div>

        <div className="grid grid-4">
          <div className="card col-span-3">
            <h2><CalendarIcon className="icon" /> Calendar</h2>
          </div>

          <div className="ad-section">
            <div className="card">
              <img src={images[selectedMonth][1]} alt="Ad Section 1" className="img-responsive object-cover" />
            </div>
            <div className="card">
              <img src={images[selectedMonth][0]} alt="Ad Section 2" className="img-responsive object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-10 footer">
          <div className="card col-span-4">
            <img src={images[selectedMonth][0]} alt="Footer Ad 1" className="img-responsive object-cover" />
          </div>
          <div className="card col-span-2 w-auto sm:w-18">
            <img src={images[selectedMonth][1]} alt="Footer Ad 2" className="img-responsive object-cover" />
          </div>
          <div className="card col-span-4">
            <img src={images[selectedMonth][2]} alt="Footer Ad 3" className="img-responsive object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
