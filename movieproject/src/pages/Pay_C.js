import React from "react";
import TicketItem from "../components/PlanItem";
import "./Ticket_C.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Pay_C = () => {
  const [customer_id, setCId] = useState("");
  const [txs, setTxs] = useState(null);
  const [id, setId] = useState(""); //결제방법
  const [pw, setPw] = useState(""); //카드번호
  const [mn, setMn] = useState(""); //포인트 사용 얼마나?

  const saveInputId = (e) => {
    setId(e.target.value);
  };
  const saveInputPw = (e) => {
    setPw(e.target.value);
  };
  const saveInputPh = (e) => {
    setMn(e.target.value);
  };

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
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
            setCId(res1.data.customers[i].id);
            break;
          }
        } // 토큰 저장하기
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get(
          "/customers/" + customer_id + "/orders"
        );
        let filteredTxs = [];
        for (let i = 0; i < response.data.orders[0].tickets.length; i++) {
          filteredTxs.push(response.data.orders[0].tickets[i]);
          console.log(response.data.orders[0].tickets[i]);
          console.log(response.data.orders[0].tickets[i].id);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function onClickPay(e) {
    fetch("/customers/" + customer_id + "/orders", {
      //put으로 바꾸기
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: id,
        status: "발권",
        approval_number: pw,
        original_price: 12000, //합하는 함수 만들기
        amount: 10000, //합하는 함수 만들기
        paid_at: "05/21", // 오늘 나타내는 메서드
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage";
        alert("수정되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="Ticket">
      <div className="PageName">
        <h1>티켓 예매</h1>
      </div>
      <div className="Bar"></div>
      {/*
      <ul className="TxList">
        {txs.map((txs) => (
          <TicketItem txs={txs} key={txs.id} />
        ))}
      </ul>
        */}
      <form onSubmit={onClickPay}>
        결제방법
        <input id="id" type="text" value={id} onChange={saveInputId} />
        카드번호{" ('-'없이)"}
        <input
          id="password"
          type="password"
          value={pw}
          onChange={saveInputPw}
        />
        포인트 사용 여부
        <input id="phonenumber" type="text" value={mn} onChange={saveInputPh} />
        <button className="pay" type="submit">
          결제하기
        </button>
      </form>
    </div>
  );
};

export default Pay_C;
