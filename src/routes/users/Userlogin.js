import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../css/Userlogin.css";
import { KAKAO_AUTH_URL } from "./Oauth";
import HorizonLine from "./../common/HorizonLine";
import imageCompression from "browser-image-compression";
import kakao from "../../images/kakao.png";
import naver from "../../images/naver.png";

function Userlogin() {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [error, setErrors] = React.useState({});

  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("1");

  const radios = [
    { name: "사용자", value: "1" },
    { name: "사업자", value: "2" },
  ];

  function onIdHandler(event) {
    setId(event.target.value);
  }

  function onPwdHandler(event) {
    setPwd(event.target.value);
  }
  //테스트
  let response = {
    id: "id1@naver.com",
    pwd: "p1",
  };

  function onSubmitHandler(event) {
    console.log("login button clicked");
    const submitInfo = Object.assign(id, pwd);
    let userSubmitUrl = "http://localhost:3000/userlogin/login";
    let ownerSubmitUrl = "http://localhost:3000/ownerlogin/login";
    if (radios.value == 1) {
      axios
        .post(userSubmitUrl, submitInfo)
        .then((res) => console.Console.log(res))
        .catch();
      event.preventDefault();
      console.log(radios.value, radios.name, submitInfo);
    } else if (radios.value == 2) {
      axios
        .post(ownerSubmitUrl, submitInfo)
        .then((res) => console.Console.log(res))
        .catch();
    } else {
      alert("로그인에 실패하였습니다.");
      event.preventDefault();
    }
  }

  return (
    <div>
      <div className="userlogin">
        <Form className="userlogin__form">
          <>
            <ButtonGroup className="radioBtn">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-dark" : "outline-dark"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br />
          </>
          <div className="userlogin__input">
            <Form.Group className="userlogin__id" controlId="userlogin__id">
              <Form.Control
                name="id"
                onChange={onIdHandler}
                value={id}
                type="email"
                placeholder="아이디(이메일)"
                required
              />
              {/* <div className="msg">{idChkMsg.msg}</div> */}
              {/* <div className="msg">{idChkResult.resultMsg}</div> */}
            </Form.Group>
            <Form.Group className="userlogin__pwd" controlId="userlogin__pwd">
              <Form.Control
                name="pwd"
                onChange={onPwdHandler}
                value={pwd}
                type="password"
                placeholder="비밀번호"
                required
              />
            </Form.Group>
            <Button
              className="userlogin__submitBtn"
              variant="outline-dark"
              type="submit"
              onSubmit={onSubmitHandler}
            >
              로그인
            </Button>
            <Button className="userlogin__findBtn" variant="link">
              이메일/비밀번호 찾기
            </Button>
            <HorizonLine text="SNS 로그인"></HorizonLine>
            <Button href={KAKAO_AUTH_URL} className="snsBtn" variant="link">
              <img src={kakao} />
            </Button>
            <Button className="snsBtn" variant="link">
              <img src={naver} />
            </Button>
            <HorizonLine text="회원가입"></HorizonLine>
            <Button className="userlogin__usersignupBtn" variant="outline-dark">
              사용자 회원가입
            </Button>
            <Button
              className="userlogin__ownersignupBtn"
              variant="outline-dark"
            >
              사업자 회원가입
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Userlogin;
