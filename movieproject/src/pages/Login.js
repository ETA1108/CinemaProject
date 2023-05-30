import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const saveInputId = (e) => {
    setInputId(e.target.value);
    console.log(e.target.value);
  };

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
    console.log(e.target.value);
  };

  function onClickLogin(e) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: inputId,
        password: inputPw,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          sessionStorage.setItem("user_id", inputId);
          document.location.href = "/movie_c";
        } else {
          alert("다시 로그인해주세요.");
        }
      })
      .catch(() => {});
    e.preventDefault();
  }

  const check = (id, pw) => {
    if (id === "master" && pw === "master") {
      document.location.href = "/movie";
    }
  };

  return (
    <div className="login">
      <h1>서울 시네마</h1>
      <form onSubmit={onClickLogin}>
        <input
          id="id"
          type="text"
          placeholder="ID"
          value={inputId}
          onChange={saveInputId}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={inputPw}
          onChange={saveInputPw}
        />
        <button type="submit">로그인</button>
      </form>
      <button className="join" onClick={check(inputId, inputPw)}>
        관리자 로그인
      </button>
      <Link to="/join">
        <button className="join">회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
