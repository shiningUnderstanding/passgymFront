import { Col, Container, Row, Spinner, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Profile({ userNo, id, name, zipcode, addr, addrDetail, userImg }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container fluid="true">
          <Row>
            <Col>
              <h3 style={{ textAlign: "center" }}>Profile</h3>
            </Col>
          </Row>
          <Row
            lg={6}
            md={8}
            style={{
              width: "1000px",
              maxWidth: "90vw",
              border: "1px solid",
              padding: "40px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col
              lg={{ span: 2 }}
              md={{ span: 2 }}
              style={{ width: "150px", height: "150px" }}
            >{userImg == null ? <></> 
              : <Image
              fluid
              style={{
                objectFit: "cover",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              src={`data:image/jpeg;base64,${userImg}`}
            ></Image>} 
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }}>
              <Row>이름 : {name}</Row>
              <Row>이메일 : {id}</Row>
              <Row>
                주소 : {addr} ({zipcode})
              </Row>
              <Row>상세주소 : {addrDetail}</Row>
            </Col>
            <Col md={{ span: 2 }}>
              <Link to="/useredit">
                <Button>수정하기</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Profile;
