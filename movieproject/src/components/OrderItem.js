import React, { useState, useEffect, useRef } from "react";
import "./OrderItem.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const OrderItem = ({ txs }) => {
  const orderid = txs.id;

  const location = useLocation();

  const customerid = location.state.id;
  const [schedules, setSchedules] = useState(null);
  const paystatus = txs.payment.status;

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
        const response = await axios.get("/screening-schedules");
        let filteredTxs = [];
        for (let i = 0; i < response.data.screening_schedules.length; i++) {
          filteredTxs.push(response.data.screening_schedules[i].id);
        }
        setSchedules(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function onClickDelete(e) {
    axios
      .delete("/customers/" + customerid + "/orders/" + orderid, {
        data: {
          customer_id: customerid,
          order_id: orderid,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        alert("해당 티켓은 예매 취소되었고, 결제 금액은 환불됩니다.");
        document.location.href = "/customer";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <li className="OrderListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">표준 가격: {txs.payment.original_price}</div>
      {(() => {
        if (txs.payment.status === "결제완료")
          return (
            <>
              <div className="info1">결제 방법: {txs.payment.method}</div>
              <div className="info1">
                카드 번호: {txs.payment.approval_number}
              </div>
              <div className="info1">판매 가격: {txs.payment.amount}</div>
            </>
          );
      })()}
      <div className="info1">
        {(() => {
          if (txs.payment.status === "미결제") return "예매 일시";
          else if (txs.payment.status === "결제완료") return "결제 일시";
        })()}
        : {txs.payment.paid_at}
      </div>
      <Link
        to="/orderabout"
        state={{
          orderid: orderid,
          customerid: customerid,
          schedules: schedules,
        }}
      >
        <button className="gotoplan">자세히 보기</button>
      </Link>
      <button className="ticketdelete" onClick={onClickDelete}>
        {(() => {
          if (txs.payment.status === "미결제") return "티켓 취소하기";
        })()}
      </button>
    </li>
  );
};

export default OrderItem;
