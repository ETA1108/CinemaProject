import React from "react";
import "./CustomerItem.scss";
import { Link } from "react-router-dom";

const CustomerItem = ({ txs }) => {
  const isadult = txs.is_verified_adult ? "예" : "아니오";

  return (
    <li className="CustomerListItem">
      <div className="id">고유 번호: {txs.id}</div>
      <div className="info1">아이디: {txs.user_id}</div>
      <div className="info1">
        주민등록번호: {txs.resident_registration_number}
      </div>
      <div className="info1">성인 여부: {isadult}</div>
      <div className="info1">포인트: {txs.point}</div>
    </li>
  );
};

export default CustomerItem;