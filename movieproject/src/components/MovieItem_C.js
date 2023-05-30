import React from "react";
import "./MovieItem.scss";
import { Link } from "react-router-dom";
import noimage from "./images/noimage.png";

const MovieItem_C = ({ txs }) => {
  const name = txs.name;
  const id = txs.id;
  return (
    <li className="MovieListItem">
      <div className="image">
        <img src={noimage} />
      </div>
      <div className="name">{txs.name}</div>
      <div className="info1">
        {txs.genre} | {txs.running_time}분 | {txs.release_date} 개봉
      </div>
      <div className="info1">{"영화소개"}</div>
      <div className="info2">배급사: {txs.distributor_name} 등</div>
      <div className="info2">감독: {txs.director_name}</div>
      <div className="info2">배우: {"배우이름"} 등</div>
      <div className="info2">가격: {"가격"}</div>
      <div className="info2">별점: {txs.rating}</div>
      <Link to="/plan_c" state={{ name: name, id: id }}>
        <button className="gotoplan">상영일정 보러가기</button>
      </Link>
    </li>
  );
};

export default MovieItem_C;
