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
import ModalForm from './ModalForm.jsx'

import "./Layout.css";
import Table from "../Table/Table";
import { addAdd } from "../../store/slices/addAddSlice.js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LoadingAnimation from "./LoadingAnimation.jsx";

const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className, type = "button" }) => (
  <button className={`button ${className}`} onClick={onClick} type={type}>
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};



const Layout = () => {
  const dispatch = useDispatch();
  const { positions, status } = useSelector((state) => state.positions);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentPositionId, setCurrentPositionId] = useState("");
  const [currentPos, setcurrentPos] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPositions());
    }
  }, [dispatch]);

  const openModal = (title, positionId,posi) => {
    setModalTitle(title);
    setCurrentPositionId(positionId);
    setcurrentPos(posi)
    console.log({posi})
    setModalOpen(true);
  };

  if (status === "pending") {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
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
              <h2>
                Header Right{" "}
                {positions.find((pos) => pos.name === "headerRight")?.null}
              </h2>
              {positions.find((pos) => pos.name === "headerRight")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"></CircleX>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Header Right",
                      positions.find((pos) => pos.name === "headerRight")?._id,
                      positions.find((pos) => pos.name === "headerRight")
                      
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>
          </div>

          <div className="grid grid-10">
            <Card className="col-span-6">
              <MegaphoneIcon className="icon" />
              <h2>
                Ad Part 1{" "}
                {positions.find((pos) => pos.name === "adPart1")?.null}
              </h2>
              {positions.find((pos) => pos.name === "adPart1")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"/>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Ad Part 1",
                      positions.find((pos) => pos.name === "adPart1")?._id,
                      positions.find((pos) => pos.name === "adPart1")
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>
            <Card className="col-span-4">
              <MegaphoneIcon className="icon" />
              <h2>
                Ad Part 2{" "}
                {positions.find((pos) => pos.name === "adPart2")?.null}
              </h2>
              {positions.find((pos) => pos.name === "adPart2")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"/>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Ad Part 2",
                      positions.find((pos) => pos.name === "adPart2")?._id,
                      positions.find((pos) => pos.name === "adPart2")
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>
          </div>

          <div className="grid grid-4">
            <Card className="col-span-3">
              <img
                src="/calendar.png"
                alt=""
                className="h-80 w-full md:h-full"
              />
            </Card>

            <div className="ad-section sm:h-[250px]">
              <div className="adSection1">
                <Card className="adSection1">
                  <div className="md:mt-[100%]">
                    <h2>
                      Ad Section 1 -{" "}
                      {positions.find((pos) => pos.name === "adSection1")?.null}
                    </h2>
                    {positions.find((pos) => pos.name === "adSection1")
                      ?.status === "Closed" ? (
                      <div className="blocked-container">
                       <CircleX className="blocked-icon"/>
                        <p className="blocked-text">Blocked</p>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          openModal(
                            "Ad Section 1",
                            positions.find((pos) => pos.name === "adSection1")
                              ?._id,
                              positions.find((pos) => pos.name === "adSection1")
                          )
                        }
                      >
                        <CircleFadingPlus />
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

              <div className="adSection2">
                <Card className="adSection2">
                  <div className="md:mt-[100%]">
                    <h2>
                      Ad Section 2{" "}
                      {positions.find((pos) => pos.name === "adSection2")?.null}
                    </h2>
                    {positions.find((pos) => pos.name === "adSection2")
                      ?.status === "Closed" ? (
                      <div className="blocked-container">
                       <CircleX className="blocked-icon"/>
                        <p className="blocked-text">Blocked</p>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          openModal(
                            "Ad Section 2",
                            positions.find((pos) => pos.name === "adSection2")
                              ?._id,
                              positions.find((pos) => pos.name === "adSection2")
                          )
                        }
                      >
                        <CircleFadingPlus />
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid grid-10 mb-[500px]">
            <Card className="col-span-4 w-16 sm:w-auto responsive-div">
              <NewspaperIcon className="icon" />
              <h2>
                Footer Ad 1{" "}
                {positions.find((pos) => pos.name === "footerAd1")?.null}
              </h2>
              {positions.find((pos) => pos.name === "footerAd1")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"/>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Footer Ad 1",
                      positions.find((pos) => pos.name === "footerAd1")?._id,
                      positions.find((pos) => pos.name === "footerAd1")
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>

            <Card className="col-span-2 w-20 sm:w-auto">
              <NewspaperIcon className="icon" />
              <h2>
                Footer Ad 2{" "}
                {positions.find((pos) => pos.name === "footerAd2")?.null}
              </h2>
              {positions.find((pos) => pos.name === "footerAd2")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"/>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Footer Ad 2",
                      positions.find((pos) => pos.name === "footerAd2")?._id,
                      positions.find((pos) => pos.name === "footerAd2")
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>

            <Card className="col-span-4">
              <NewspaperIcon className="icon" />
              <h2>
                Footer Ad 3{" "}
                {positions.find((pos) => pos.name === "footerAd3")?.null}
              </h2>
              {positions.find((pos) => pos.name === "footerAd3")?.status ===
              "Closed" ? (
                <div className="blocked-container">
                 <CircleX className="blocked-icon"/>
                  <p className="blocked-text">Blocked</p>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    openModal(
                      "Footer Ad 3",
                      positions.find((pos) => pos.name === "footerAd3")?._id,
                      positions.find((pos) => pos.name === "footerAd3")
                    )
                  }
                >
                  <CircleFadingPlus />
                </Button>
              )}
            </Card>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
          >
            <ModalForm
              title={modalTitle}
              onClose={() => setModalOpen(false)}
              positionId={currentPositionId}
              position={currentPos}
            />
          </Modal>
          <Table mandalId={`5ffde92b6563fd34c467ede5`} />
        </div>
      </div>
    </>
  );
};

export default Layout;
