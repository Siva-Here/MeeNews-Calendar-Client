import React, { useState } from 'react';
import { MegaphoneIcon, CalendarIcon, NewspaperIcon, CircleFadingPlus } from 'lucide-react';
import './Layout.css';

const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className, type = 'button' }) => (
  <button className={`button ${className}`} onClick={onClick} type={type}>
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const ModalForm = ({ title, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (month) => {
    if (month === 'All') {
      if (selectedMonths.includes('All')) {
        setSelectedMonths([]); // Unselect all
      } else {
        setSelectedMonths(months.filter((m) => m !== 'All')); // Select all except "All"
      }
    } else {
      setSelectedMonths((prev) =>
        prev.includes(month)
          ? prev.filter((m) => m !== month) // Remove month if already selected
          : [...prev.filter((m) => m !== 'All'), month] // Add month and remove "All" if selected
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, mobile, selectedMonths });
    onClose();
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

const Layout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <>
      {/* <h1 className="title">Choose Slot</h1> */}
      <div className="layout">
        <div className="container">

          <div className="grid grid-3">
            <Card className="col-span-2">
              <h2>Header Left</h2>
              <Button onClick={() => openModal('Header Left')}><CircleFadingPlus /></Button>
            </Card>
            <Card>
              <h2>Header Right</h2>
              <Button onClick={() => openModal('Header Right')}><CircleFadingPlus /></Button>
            </Card>
          </div>

          <div className="grid grid-10">
            <Card className="col-span-6">
              <MegaphoneIcon className="icon" />
              <h2>Ad Part 1</h2>
              <Button onClick={() => openModal('Ad Part 1')}><CircleFadingPlus /></Button>
            </Card>
            <Card className="col-span-4 ">
              <MegaphoneIcon className="icon" />
              <h2>Ad Part 2</h2>
              <Button onClick={() => openModal('Ad Part 2')}><CircleFadingPlus /></Button>
            </Card>
          </div>

          <div className="grid grid-4">
            <Card className="col-span-3">
              <h2><CalendarIcon className="icon" /> Calendar</h2>
              {/* <Button onClick={() => openModal('Calendar')}>Open</Button> */}
            </Card>

            <div className="ad-section">
              <Card>
                <h2>Ad Section 1</h2>
                <Button onClick={() => openModal('Ad Section 1')}><CircleFadingPlus /></Button>
              </Card>
              <Card>
                <h2>Ad Section 2</h2>
                <Button onClick={() => openModal('Ad Section 2')}><CircleFadingPlus /></Button>
              </Card>
            </div>
          </div>

          <div className="grid grid-10 mb-[500px]">
            <Card className="col-span-4 w-16 sm:w-auto responsive-div">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 1</h2>
              <Button onClick={() => openModal('Footer Ad 1')}><CircleFadingPlus /></Button>
            </Card>
            <Card className="col-span-2 w-20 sm:w-auto">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 2</h2>
              <span className='text-xs'><Button onClick={() => openModal('Footer Ad 2')}><span className='text-center'><CircleFadingPlus /></span></Button></span>
            </Card>
            <Card className="col-span-4">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 3</h2>
              <Button onClick={() => openModal('Footer Ad 3')}><CircleFadingPlus /></Button>
            </Card>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
            <ModalForm title={modalTitle} onClose={() => setModalOpen(false)} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Layout;
