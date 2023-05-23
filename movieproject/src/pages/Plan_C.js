import React, { useState, useEffect, useRef } from "react";
import PlanItem_C from "../components/PlanItem_C";
import "./Plan.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Plan_C = () => {
  const location = useLocation();

  const movieid = location.state.id;
  const moviename = location.state.name;

  const [txs, setTxs] = useState(null);
  //  const [loading, setLoading] = useState(false);

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
        const response = await axios.get(
          "/movies/" + movieid + "/screening-schedules"
        );
        let filteredTxs = [];
        for (let i = 0; i < response.data.screening_schedules.length; i++) {
          filteredTxs.push(response.data.screening_schedules[i]);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Plan">
      <div className="PageName">
        <h1>
          상영일정 - {"<"}
          {moviename}
          {">"}
        </h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs.map((txs) => (
          <PlanItem_C txs={txs} key={txs.id} />
        ))}
      </ul>
    </div>
  );
};
export default Plan_C;
