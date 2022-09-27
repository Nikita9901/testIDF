import { message, Steps, Modal } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Header,
  Footer,
  FormSignUp,
  FormPersonalInfo,
  DoneBlock,
} from "../components";
import styles from "./App.module.css";
import { useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from "../utils/localStorage";
import { useSelector } from "react-redux";

const { Step } = Steps;

function App() {
  const [login, setLogin] = useState(getLocalStorage("logined"));
  const [current, setCurrent] = useState(login ? 2 : 0);
  const steps = [
    {
      icon: <UserOutlined />,
      title: "Sign Up Info",
      content: (
        <div className={styles.content}>
          <FormSignUp nextForm={() => next()} />
        </div>
      ),
    },
    {
      icon: <SolutionOutlined />,
      title: "Personal Info",
      content: (
        <div className={styles.content}>
          <FormPersonalInfo
            prev={() => prev()}
            done={() => {
              showModal();
            }}
          />
        </div>
      ),
    },
    {
      icon: <SmileOutlined />,
      title: "Done",
      content: (
        <div className={styles.content}>
          <DoneBlock
            modal={() => {
              showModal();
            }}
            back={() => {
              setLocalStorage("logined", false);
              setLogin(false);
              delLocalStorage("infoPersonal");
              delLocalStorage("infoSignUp");
              setCurrent(0);
            }}
          />
        </div>
      ),
    },
  ];
  let storeSignUpData = useSelector((state) => state.dataSignUpReducer);
  if (login) storeSignUpData = getLocalStorage("infoSignUp");
  let storePersonalData = useSelector((state) => state.dataPersonalReducer);
  if (login) storePersonalData = getLocalStorage("infoPersonal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (login) return;
    else {
      message.success({
        content: "Complete!",
        duration: 5,
        style: {
          color: "green",
        },
      });
      setLocalStorage("logined", true);
      setLocalStorage("infoSignUp", storeSignUpData);
      setLocalStorage("infoPersonal", storePersonalData);
      next();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const next = () => {
    if (current !== 2) setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div className="App">
      <Header />
      <div className={styles.layout}>
        <div className={styles.wrapper}>
          <Steps current={current} size={"small"}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <Modal
              title="Info"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              closable={false}
            >
              <p>Phone: {storeSignUpData["phone"]}</p>
              <p>Email: {storeSignUpData["email"]}</p>
              <p>Password: {storeSignUpData["password"]}</p>
              <p>First name: {storePersonalData["first-name"]}</p>
              <p>Last name: {storePersonalData["last-name"]}</p>
              <p>Sex: {storePersonalData["sex"]}</p>
              <p>
                Birthday: {storePersonalData["birthday"]}.
                {storePersonalData["birthmonth"]}.
                {storePersonalData["birthyear"]}
              </p>
              <p>Ocean: {storePersonalData["ocean"]}</p>
              <p>
                Hobbies:{" "}
                {storePersonalData["hobby"]
                  ? storePersonalData["hobby"].map((el, index) =>
                      index === storePersonalData["hobby"].length - 1
                        ? `${el}.`
                        : `${el}, `
                    )
                  : null}
              </p>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
