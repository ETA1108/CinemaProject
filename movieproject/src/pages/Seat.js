import React, { useState, useEffect, useRef } from "react";
import SeatItem from "../components/RoomItem";
import "./Seat.scss";
import axios from "axios";

const Seat = () => {
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
        const response = await axios.get("/theaters");
        let filteredTxs = [];
        for (let i = 0; i < response.data.theaters.length; i++) {
          filteredTxs.push(response.data.theaters[i]);
          console.log(response.data.theaters[i].id);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Seat">
      <ul className="TxList">
        {txs.map((txs) => (
          <SeatItem txs={txs} key={txs.id} />
        ))}
      </ul>
    </div>
  );
};
export default Seat;

// seat_per로 보내기
