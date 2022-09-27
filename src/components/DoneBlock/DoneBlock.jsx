import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import styles from "./DoneBlock.module.css";

const DoneBlock = ({ modal, back }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Result
          icon={<SmileOutlined spin={true} />}
          title="Thanks for information!"
          extra={[
            <Button
              onClick={modal}
              type={"primary"}
              style={{ marginRight: 10 }}
              size={"large"}
            >
              Open modal
            </Button>,
            <Button onClick={back} size={"large"}>
              Create new info
            </Button>,
          ]}
        />
        <div></div>
      </div>
    </>
  );
};

DoneBlock.propTypes = {};

export default DoneBlock;
