import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../css/owner/gymregist.css";
import { useEffect,useState } from "react";
import axios from "axios";
import PassList from "../../components/owner/PassList";
import PassListModify from "../../components/owner/PassListModify";
import { useNavigate } from "react-router";
function OwnerModify(props){
    // sessionStorage.setItem("ownerNo", "1000000001");
    const ownerNo = sessionStorage.getItem("ownerNo");
    const [fileState, setFileState] = useState({
        refFile: "",
        previewUrl: ""
    })

    const [gymInfo, setGymInfo] = useState({
       ownerNo: sessionStorage.getItem("ownerNo"),
        phoneNo: "",
        name: "",
        zipcode: "",
        addr: sessionStorage.getItem("addr"),
        addrDetail: sessionStorage.getItem("addrDetail"),
        introduce: "",
        notice: "",
        program: "",
        etc: "",
        startHour: "00",
        startMinute: "00",
        endHour: "00",
        endMinute: "00",
        gymImg: ""
        
    })
    const [passes, setPasses] = useState([]);

  
   //조회 
    const getGymInfo = () => {
        const url = "http://localhost:9999/passgym/gym/modify/" + ownerNo;
        axios
        .put(url)
        .then(function (res) {
            setGymInfo(res.data);
            let countArr = [...passes]
            res.data.passes.forEach(function(pass, index){
                countArr[index] = pass;
            });
            setPasses(countArr);
        })
        .catch(function (error) {
            alert(error.response.status);
        });
       // setPasses([{passNo:10, passName:"n10"}, {passNo:11, passName:"n11"}])
    };

    useEffect(() => {
        getGymInfo();
    }, []);

    // const onSubmit = (event) =>{ //일반적인 방법으로는 console에서 formData를 확인할 수 없음
    //     console.log(JSON.stringify(passes));
    //     event.preventDefault();
    // }
    const changeValue = (e) => {
        setGymInfo({
        ...gymInfo,
        [e.target.name]: e.target.value,
        });
    };

    const changePass = (e) =>{
        let nextPasses = [...passes];
        const index = e.target.parentNode.parentNode.getAttributeNode("class").value;
        const { name, value } = e.target;  
        nextPasses[index][name] = value;
        setPasses(nextPasses);
    }

    const [countList, setCountList] = useState([]);

    const formData = new FormData();
    

    const onChange = (event) => {
        const {name, value} = event.target;
        let nextGymValue = {
            ...gymInfo,
            [name] : value
        }
        setGymInfo(nextGymValue);
        event.preventDefault();
    }
    const navigate = useNavigate();
    const onSubmit = (event) =>{ //일반적인 방법으로는 console에서 formData를 확인할 수 없음
        let uploadRefFile = fileState.refFile;
        console.log("메인 이미지", uploadRefFile);
        console.log("상세이미지", fileState.detailImg0);    

        formData.append("refFile", fileState.refFile); //메인 이미지
        formData.append("detailImg0", fileState.detailImg0); //상세이미지 
        formData.append("gymInfo", JSON.stringify(gymInfo));
        console.log(JSON.stringify(gymInfo));
      //formData.append("passes", JSON.stringify(countList)); 
      //console.log(JSON.stringify(countList));
       let submitUrl = "http://localhost:9999/passgym/gym/gymSaveModify";
       axios.post(submitUrl, formData, {
           headers: {
               "Content-Type": "multipart/form-data"
           }
       }).then((response) => {
            event.preventDefault();
            console.log("Test:===", response.data);
            
            navigate("/owner/home");  
       }).catch((error) => {
            alert(error.response.status);
       });
        event.preventDefault();
    }
    
 

    
 
    const onRefFileChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setFileState({
                refFile: file,
                previewUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    const onDetailFileChange = (event) => {
        let fileData = event.target.files;
        let file = null;
        let name = "";
        let newValues = {...fileState};
        for(let i = 0; i < fileData.length; i++){
            file = fileData[i];
            name = "detailImg" + i;
            newValues = {
                ...newValues,
                [name] : file
            }
            setFileState(newValues);
        }
    }
  
    const RenderRepImg = () => {
        let profilePreview = null;
        if(fileState.refFile !== ""){
            profilePreview = <img className="profile__preview" src={fileState.previewUrl}></img>
        }
        return(
            <div className="profile__preview">{profilePreview}</div>
        );
    }
 
    const TimeStartHour = () => {
        let hourHtml = "";
        for(let i = 0; i <= 9; i++){
            hourHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 23; i++){
            hourHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select name="startHour"
                            onChange={changeValue}
                            className="gym__operationtimes-start-hour" 
                            aria-label="Default select example" 
                            value={gymInfo.startHour}
                            dangerouslySetInnerHTML={{__html: hourHtml}}>
                </Form.Select>);
    }

    const TimeStartMinute = () => {
        let minuteHtml = "";
        for(let i = 0; i <= 1; i++){
            minuteHtml += `<option value=${i*5}>0${i*5}</option>`;
        }
        for(let i = 2; i <= 11; i++){
            minuteHtml += `<option value=${i*5}>${i*5}</option>`;
        }
        return (<Form.Select name="startMinute"
                            onChange={changeValue}
                            className="gym__operationtime-start-minute" 
                            aria-label="Default select example" 
                            value={gymInfo.startMinute}
                            dangerouslySetInnerHTML={{__html: minuteHtml}} >
                </Form.Select>);
    }

    const TimeEndHour = () => {
        let hourHtml = "";
        for(let i = 0; i <= 9; i++){
            hourHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 23; i++){
            hourHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select name="endHour" 
                            onChange={changeValue}
                            className="gym__operationtimes-end-hour" 
                            aria-label="Default select example" 
                            value={gymInfo.endHour}
                            dangerouslySetInnerHTML={{__html: hourHtml}}
                            >
                              
                </Form.Select>);
    }

    const TimeEndMinute = () => {
        let minuteHtml = "";
        for(let i = 0; i <= 1; i++){
            minuteHtml += `<option value=${i*5}>0${i*5}</option>`;
        }
        for(let i = 2; i <= 11; i++){
            minuteHtml += `<option value=${i*5}>${i*5}</option>`;
        }
        return (<Form.Select name="endMinute"
                            onChange={changeValue}
                            className="gym__operationtime-end-minute" 
                            aria-label="Default select example" 
                            value={gymInfo.endMinute}
                            dangerouslySetInnerHTML={{__html: minuteHtml}}>
                </Form.Select>);

    }
   
    //회원권 증가
    const passComponentPlus = () => {
        let countArr = [...passes]
        let idx = countArr.length;
        let data = {
                    passNo: 0, 
                    passName: "",
                    passPrice: 0, 
                    passDate: "", 
                    passMonth: 0, 
                    pauseCount: 0, 
                    pauseDate: 0
                    }; 
        countArr[idx] = data;
        setPasses(countArr);
    }
    const passComponentMinus = () => {
        let countArr = [...passes]
        let idx = countArr.length;
        idx--;
        countArr.pop(idx);
        setPasses(countArr);
        
    }


    //회원 탈퇴 
    const deleteInfo = () => {
    fetch('http://localhost:9999/passgym/gym/ownerInfo' + ownerNo, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          props.history.push('/');
        } else {
          alert('탈퇴 되지 않았습니다. 다시 확인해주세요.');
        }
      });
  };
 
    return(
       <div>
        <Form.Label className="title">헬스장 정보  </Form.Label>
      <div className="gym__regist">
        <Form className="gym__regist-form">
          <Form.Label
            style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}
          >
            대표사진 등록
          </Form.Label >
 	            {fileState.previewUrl == "" ? 
                <img src={`data:image/jpeg;base64,${gymInfo.gymImg}`}/> :
                <img src={fileState.previewUrl}  
                variant="top"
                width="286px"
                height="180px"
            style={{ objectFit: "cover", overflow: "hidden" }}/>  } 
          <Form.Group className="gym__regist-represent-img" >
                <Form.Control type="file" 
                className="gym__regist-represent-img-upload" 
                onChange={onRefFileChange}
                />
            </Form.Group>


             <Form.Label
             style={{
                fontSize: "15px",
                marginLeft: "5px",
                fontWeight: "bold",
                marginBottom: "3px",
            }}>대표 번호</Form.Label>
            <Form.Group className="gym__regist-detail-img">
                <Form.Control type="file" 
                className="gym__regist-detail-img"
                 onChange={onDetailFileChange} 
                 multiple
                 
                 />
            </Form.Group> 

            {/*  */}
            <br/>
            <Form.Label
             style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}
                >헬스장 대표번호
            </Form.Label>
            <Form.Control 
                name="phoneNo" 
                onChange={changeValue} 
                className="gym__regist-phone-no" 
                placeholder="전화번호" 
                value={gymInfo.phoneNo}
                />   
            {/*  */}
            <Form.Label
             style={{
              fontSize: "15px",
              marginLeft: "5px",
              marginBottom: "3px",
            }}>주소</Form.Label>    
            <Form.Control name="addr" 
              onChange={changeValue} 
              className="gym__addr" 
              value={sessionStorage.getItem("addr")} 
              required readOnly/>       
            <Form.Control
              name="addrDetail"
                onChange={changeValue} 
                className="gym__addr-detail" 
                value={sessionStorage.getItem("addrDetail")}
                required readOnly/>        
            <br/>
            <Form.Label
             style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}>사업장명</Form.Label>
            <Form.Control 
                name="name" 
                onChange={changeValue} 
                className="gym__name"
                as="textarea" row={2}
                placeholder="업체 이름" 
                 value={gymInfo.name}
                required />
            {/*  */}
            <br/>
            <Form.Label 
             style={{
              fontSize: "15px",
               fontWeight: "bold",
              marginLeft: "5px",
              marginBottom: "3px",
            }}> 소개글</Form.Label>
            <Form.Control 
                name="introduce" 
                onChange={changeValue} 
                className="gym__info" 
                as="textarea" row={2} 
                placeholder="업체 소개" 
                value={gymInfo.introduce}
                required />
            {/*  */}
            <br/>
            <Form.Label 
             style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}>공지사항</Form.Label>
            <Form.Control 
                name="notice" 
                onChange={changeValue} 
                className="gym__notice" 
                as="textarea" row={2} 
                placeholder="공지 사항"
                value={gymInfo.notice}
                />
                <Form.Label
                style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                    marginBottom: "3px",
                    }}
                ></Form.Label>
            {/*  */}
            
            <br/>
            <Form.Label 
             style={{
              fontSize: "15px",
              marginLeft: "5px",
              marginBottom: "3px",
            }}>회원권 입력</Form.Label>            
            
             <PassListModify 
                // key= {gymInfo.passes}
                // gymInfo = {gymInfo}  
                passes={passes}
                changePass={changePass}
                />
                <Button className="pass__plus" 
                        onClick={passComponentPlus}>+</Button>
                <Button className="pass__minus"
                        onClick={passComponentMinus}>-</Button>
            {/*  */}

            <Form.Group className="gym__operating-time">
                <Form.Label 
                style={{
                fontSize: "15px",
                marginLeft: "5px",
                 fontWeight: "bold",
                marginBottom: "3px",
            }}>운영시간</Form.Label>
                <Row>
                    <Col><TimeStartHour /></Col>:<Col><TimeStartMinute/></Col>
                    ~
                    <Col><TimeEndHour /></Col>:<Col><TimeEndMinute/></Col>
                </Row>
            </Form.Group>
            {/*  */}
            <Form.Label  style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}>운영 프로그램</Form.Label>
            <Form.Control 
                name="program"
                onChange={changeValue}
                className="gym__operating-program" 
                as="textarea"
                row={2} placeholder="운영 프로그램"
                value={gymInfo.program}
                />
            {/*  */}
            <Form.Label  style={{
              fontSize: "15px",
              marginLeft: "5px",
               fontWeight: "bold",
              marginBottom: "3px",
            }}>기타 사항</Form.Label>
            <Form.Control 
                name="etc" 
                onChange={changeValue}
                className="gym__etc"
                placeholder="기타 사항" 
                value={gymInfo.etc}
                />   
            {/*  */}
            <Button  variant="success"  class="form-row float-right" className="gym__submit-btn" 
             onClick={onSubmit}
                type="submit"  
                // style={{position: 'absolute', right: 720}}
                > 저장
            </Button>
            {' '}
            <Button variant="danger" onClick={deleteInfo} >
                탈퇴
            </Button>
            </Form>
            </div>
        </div>
     

     
    )
}
export default OwnerModify;