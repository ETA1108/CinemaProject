import React from "react";
import "./Mypage.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderItem_C from "../components/OrderItem_C";
import { Link } from "react-router-dom";

const Mypage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [rn, setRn] = useState("");
  const [ad, setAd] = useState("");
  const [pt, setPt] = useState("");
  const [mn, setMn] = useState("");
  const [customer_id, setCId] = useState("");
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
    };
    fetchData();
  }, 500);

  useInterval(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/customers/" + customer_id);
        setId(response.data.user_id);
        setPw(
          response.data.encrypted_password.substring(
            0,
            response.data.encrypted_password.length - 10
          )
        );
        setRn(response.data.resident_registration_number);
        setAd(response.data.is_verified_adult);
        setPt(response.data.point);
        setMn(response.data.mobile_number);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  useInterval(() => {
    const fetchData = async () => {
      try {
        let filteredTxs = [];
        const response = await axios.get(
          "/customers/" + customer_id + "/orders"
        );
        for (let i = 0; i < response.data.orders.length; i++) {
          filteredTxs.push(response.data.orders[i]);
        }
        filteredTxs.sort((a, b) => (a.id < b.id ? -1 : 1));
        setTxs(filteredTxs);
        console.log(txs);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  return (
    <div className="Mypage">
      <h1>마이 페이지</h1>
      <form>
        ID
        <input disabled={true} id="id" type="text" value={id} />
        비밀번호
        <input disabled={true} id="password" type="text" value={pw} />
        전화번호{" ('-'없이)"}
        <input disabled={true} id="phonenumber" type="text" value={mn} />
        주민등록번호{" ('-'없이)"}
        <input disabled={true} id="renumber" type="text" value={rn} />
        성인 여부{" (만 19세 이상 여부)"}
        <div>
          <input
            disabled={true}
            type="radio"
            id="isadult"
            value={true}
            checked={ad === true ? true : false}
          ></input>
          <div className="text">예</div>
          <input
            disabled={true}
            type="radio"
            id="isadult"
            value={false}
            checked={ad === false ? true : false}
          ></input>
          <div className="text">아니오</div>
        </div>
        보유 포인트
        <input disabled={true} id="point" type="text" value={pt} />
        <Link to="/mypage_ud">
          <button className="gotoupdate">개인정보 수정하기</button>
        </Link>
      </form>
      <div className="Bar"></div>
      <div className="PageName">
        <h2>주문 내역</h2>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs && txs.map((txs) => <OrderItem_C txs={txs} key={txs.id} />)}
      </ul>
    </div>
  );
};

export default Mypage;
