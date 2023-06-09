import React, { useState, useEffect, useRef } from "react";
import PlanItem from "../components/PlanItem";
import "./Plan.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Plan = () => {
  const category = [
    // 장르, 등급 조회
    { id: 0, name: "전체", state: null },
    { id: 1, name: "1관", state: "1관" },
    { id: 2, name: "2관", state: "2관" },
    { id: 3, name: "3관", state: "3관" },
    { id: 4, name: "4관", state: "4관" },
    { id: 4, name: "5관", state: "5관" },
    { id: 5, name: "6관", state: "애6관" },
  ];

  const [categoryItem, setCategoryItem] = useState(category[0]);
  const onChange = (id) => {
    setCategoryItem(category[id]);
  };

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

  function add(dict, key, value) {
    dict[key] = value;
    return { ...dict, [key]: value };
  }

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get(
          "/movies/" + movieid + "/screening-schedules"
        );
        let filteredTxs = [];
        let finalTxs = [];
        for (let i = 0; i < response.data.screening_schedules.length; i++) {
          filteredTxs.push(response.data.screening_schedules[i]);
        }
        filteredTxs.sort((a, b) =>
          a.screening_started_at < b.screening_started_at ? -1 : 1
        );
        for (let i = 0; i < filteredTxs.length; i++) {
          finalTxs.push(add(filteredTxs[i], "num", i + 1));
        }
        setTxs(finalTxs);
        console.log(txs);
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
          <PlanItem txs={txs} key={txs.id} />
        ))}
      </ul>
      <Link to="/plan_create" state={{ name: moviename, id: movieid }}>
        <button className="plancreate">일정 등록하기</button>
      </Link>
      <Link to="/planall">
        <button className="gotoplanall">전체 상영일정 조회</button>
      </Link>
    </div>
  );
};
export default Plan;
