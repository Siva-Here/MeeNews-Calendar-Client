import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getPositions } from '../../store/slices/PositionSlice';
import { MegaphoneIcon, CalendarIcon, NewspaperIcon, CircleFadingPlus } from 'lucide-react';
import './Layout.css';
import Table from '../Table/Table';
import { addAdd } from '../../store/slices/addAddSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import LoadingAnimation from './LoadingAnimation.jsx';

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

const ModalForm = ({ title, onClose, positionId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false); 

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (month) => {
    if (month === 'All') {
      if (selectedMonths.includes('All')) {
        setSelectedMonths([]); 
      } else {
        setSelectedMonths(months.filter((m) => m !== 'All'));
      }
    } else {
      setSelectedMonths((prev) =>
        prev.includes(month)
          ? prev.filter((m) => m !== month) 
          : [...prev.filter((m) => m !== 'All'), month] 
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
      mandal: '5ffde92b6563fd34c467ede5',
    };
  
    try {
      const response = await dispatch(addAdd(data));
  
      
      if (addAdd.fulfilled.match(response)) {
        toast.success("Slot booked for the specified months!");
        setTimeout(()=>{
          window.location.reload();
        },2000)
      } else {
        console.log(response);
        toast.error("Failed to book slot. Please try again."+response.error.message);
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
              checked={level === 'Constituency'}
              onChange={(e) => setLevel(e.target.value)}
            />
            Constituency
          </label>
          <label className="ms-4">
            <input
              className="me-2"
              type="radio"
              value="Mandal"
              checked={level === 'Mandal'}
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
        className={`bg-[#9b59b6] text-white rounded-md p-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {/* <button type="button" onClick={onClose} className="mt-2">Close</button> */}
    </form>
  );
};



const Layout = () => {
  const dispatch = useDispatch();
  const { positions, status } = useSelector((state) => state.positions);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentPositionId, setCurrentPositionId] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPositions());
    }
  }, [dispatch]);

  const openModal = (title, positionId) => {
    setModalTitle(title);
    setCurrentPositionId(positionId);
    setModalOpen(true);
  };

  if (status === 'pending') {
    return <div><LoadingAnimation/></div>;

  }

  return (
    <>
      <div className="layout">
        <div className="container">
          <h1 className="title">Choose Slot</h1>

          <div className="grid grid-3">
            <Card className="col-span-2">
              <img src="/header.png" alt="" className="h-auto w-auto" />
            </Card>
            <Card>
              <h2>Header Right {positions.find(pos => pos.name === 'headerRight')?.null}</h2>
              <Button onClick={() => openModal('Header Right', positions.find(pos => pos.name === 'headerRight')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
          </div>

          <div className="grid grid-10">
            <Card className="col-span-6">
              <MegaphoneIcon className="icon" />
              <h2>Ad Part 1 {positions.find(pos => pos.name === 'adPart1')?.null}</h2>
              <Button onClick={() => openModal('Ad Part 1', positions.find(pos => pos.name === 'adPart1')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
            <Card className="col-span-4">
              <MegaphoneIcon className="icon" />
              <h2>Ad Part 2 {positions.find(pos => pos.name === 'adPart2')?.null}</h2>
              <Button onClick={() => openModal('Ad Part 2', positions.find(pos => pos.name === 'adPart2')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
          </div>

          <div className="grid grid-4">
            <Card className="col-span-3">
              <img src="/calendar.png" alt="" className="h-80 w-full md:h-full" />
            </Card>

            <div className="ad-section sm:h-[250px]">
              <div className="adSection1">
                <Card className="adSection1">
                  <div className="md:mt-[100%]">
                    <h2>Ad Section 1 - {positions.find(pos => pos.name === 'adSection1')?.null}</h2>
                    <Button onClick={() => openModal('Ad Section 1', positions.find(pos => pos.name === 'adSection1')?._id)}>
                      <CircleFadingPlus />
                    </Button>
                  </div>
                </Card>
              </div>
              <div className="adSection2">
                <Card className="adSection2">
                  <div className="md:mt-[100%]">
                    <h2>Ad Section 2 {positions.find(pos => pos.name === 'adSection2')?.null}</h2>
                    <Button onClick={() => openModal('Ad Section 2', positions.find(pos => pos.name === 'adSection2')?._id)}>
                      <CircleFadingPlus />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid grid-10 mb-[500px]">
            <Card className="col-span-4 w-16 sm:w-auto responsive-div">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 1 {positions.find(pos => pos.name === 'footerAd1')?.null}</h2>
              <Button onClick={() => openModal('Footer Ad 1', positions.find(pos => pos.name === 'footerAd1')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
            <Card className="col-span-2 w-20 sm:w-auto">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 2 {positions.find(pos => pos.name === 'footerAd2')?.null}</h2>
              <Button onClick={() => openModal('Footer Ad 2', positions.find(pos => pos.name === 'footerAd2')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
            <Card className="col-span-4">
              <NewspaperIcon className="icon" />
              <h2>Footer Ad 3 {positions.find(pos => pos.name === 'footerAd3')?.null}</h2>
              <Button onClick={() => openModal('Footer Ad 3', positions.find(pos => pos.name === 'footerAd3')?._id)}>
                <CircleFadingPlus />
              </Button>
            </Card>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
            <ModalForm title={modalTitle} onClose={() => setModalOpen(false)} positionId={currentPositionId} />
          </Modal>
          <Table mandalId={`5ffde92b6563fd34c467ede5`}/>
        </div>
      </div>
    </>
  );
};

export default Layout;

