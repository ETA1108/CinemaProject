import React, { useState, useEffect, useRef } from "react";
import PlanItem from "../components/PlanItem";
import "./Plan.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Plan_C = () => {
  const location = useLocation();

  const movieid = location.state.id;
  const moviename = location.state.name;

  const category = [
    // 날짜 조회
    { id: 0, name: "전체", state: null },
    { id: 1, name: "방전", state: "NONE" },
    { id: 2, name: "충전", state: "CHAR" },
    { id: 3, name: "대기", state: "WAIT" },
    { id: 4, name: "저전압", state: "ERROR" },
  ];

  const [categoryItem, setCategoryItem] = useState(category[0]);
  const [toggle, setToggle] = useState(false);
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

  const onClick = () => {
    setToggle(!toggle);
  };

  const onChange = (id) => {
    setCategoryItem(category[id]);
    setToggle(!toggle);
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
          if (categoryItem.state === null)
            filteredTxs.push(response.data.screening_schedules[i]);
          else if (response.data[i].state + 1 === categoryItem.id)
            filteredTxs.push(response.data[i]);
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
        <div className="Filter" onClick={onClick}>
          <div className="Category">&nbsp; {categoryItem.name}</div>
          {(() => {
            if (!toggle) return <MdExpandMore />;
            else return <MdExpandLess />;
          })()}
        </div>
        <div></div>
        <div></div>
        {toggle && (
          <div className="select-dropdown">
            {category.map((cate) => (
              <div
                className={(() => {
                  if (cate.name === categoryItem.name)
                    return "select-item selected";
                  else return "select-item";
                })()}
                key={cate.id}
                onClick={() => onChange(cate.id)}
              >
                &nbsp; {cate.name}
              </div>
            ))}
          </div>
        )}
        {txs.map((txs) => (
          <PlanItem txs={txs} key={txs.id} />
        ))}
      </ul>
    </div>
  );
};
export default Plan_C;
