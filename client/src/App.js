import { Col, Row } from "antd";
import styles from "./components/styles.module.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import HeaderMenu from "./components/HeaderMenu";

const data = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Leo",
      last: "Holmes",
    },
    email: "leo.holmes@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/39.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg",
    },
    nat: "GB",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Leo",
      last: "Holmes",
    },
    email: "leo.holmes@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/39.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg",
    },
    nat: "GB",
  },
];
function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Row justify="center">
          <Col span={14}>
            <HeaderMenu />
            <div className={styles.content}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<NewPost />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
