import React, { useState, useEffect, useRef } from "react";
import "./Seat.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Seat = () => {
  const location = useLocation();

  const planid = location.state.id;

  const [txs, setTxs] = useState(null);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current();
      };

      const timerId = setInterval(executeCallback, delay);

      return () => clearInterval(timerId);
    }, []);
  };

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get("/screening-schedules/" + planid);
        let filteredTxs = [];
        for (let i = 0; i < Object.keys(response.data.seat_map).length; i++) {
          filteredTxs.push(Object.keys(response.data.seat_map)[i]);
        }
        setTxs(filteredTxs.sort());
        console.log(txs);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  function SeatItem(txs) {
    let seat = [];
    for (let i = 0; i < txs.length; i++) {
      seat.push(
        <button className="TxListItem">
          <div className="TxID">{txs[i]}</div>
        </button>
      );
    }
    return seat;
  }

  return (
    <div className="Seat">
      <div className="Screen">SCREEN</div>
      <div className="SeatItem">{SeatItem(txs)}</div>
    </div>
  );
};
export default Seat;
