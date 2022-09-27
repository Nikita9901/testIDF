import PropTypes from "prop-types";
import styles from "./FormPersonalInfo.module.css";
import {
  Button,
  Form,
  Input,
  message,
  Radio,
  Select,
  Checkbox,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { setPersonPersonalInfo } from "../../store/actions";
import { JSONSchema } from "../../JSONSchema";

const FormPersonalInfo = ({ prev, done }) => {
  const dispatch = useDispatch();
  const dispatchInfo = (value) => {
    dispatch(setPersonPersonalInfo(value));
  };
  const error = (text) => {
    message.error(text);
  };
  const onFinish = (values) => {
    const d = new Date(
      values["birthyear"],
      values["birthmonth"] - 1,
      values["birthday"]
    );
    if (
      values["first-name"].length < JSONSchema.firstName.minLength ||
      values["first-name"].length > JSONSchema.firstName.maxLength
    ) {
      error(
        `Имя должно иметь от ${JSONSchema.firstName.minLength} до ${JSONSchema.firstName.maxLength} букв!`
      );
      return;
    }
    if (
      values["last-name"].length < JSONSchema.lastName.minLength ||
      values["last-name"].length > JSONSchema.lastName.maxLength
    ) {
      error(
        `Фамилия должно иметь от ${JSONSchema.lastName.minLength} до ${JSONSchema.lastName.maxLength} букв!`
      );
      return;
    }
    if (
      (Date.now() - d) / 1000 / 60 / 60 / 24 / 365.25 <
        JSONSchema.birthday.minAge ||
      (Date.now() - values["birthday"]) / 1000 / 60 / 60 / 24 / 365.25 >
        JSONSchema.birthday.maxAge
    ) {
      error(
        `Вам должно быть от ${JSONSchema.birthday.minAge} до ${JSONSchema.birthday.maxAge} лет!`
      );
      return;
    }
    dispatchInfo(values);
    done();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        size={"small"}
        name="basic"
        labelCol={{
          span: 11,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First name"
          name="first-name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="last-name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[
            {
              required: JSONSchema.sex.required,
              message: "Please choose your sex!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male"> Male</Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          labelCol={{
            span: 8,
          }}
          label="Birthday"
          rules={[
            {
              required: JSONSchema.birthday.required,
              message: "Please select you birthday!",
            },
          ]}
        >
          <div className={styles.inputs}>
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: JSONSchema.birthday.required,
                },
              ]}
            >
              <Input placeholder={"dd"} className={styles.input} />
            </Form.Item>
            <p className={styles.slash}>/</p>
            <Form.Item
              name="birthmonth"
              rules={[
                {
                  required: JSONSchema.birthday.required,
                },
              ]}
            >
              <Input placeholder={"mm"} />
            </Form.Item>
            <p className={styles.slash}>/</p>
            <Form.Item
              name="birthyear"
              rules={[
                {
                  required: JSONSchema.birthday.required,
                },
              ]}
            >
              <Input placeholder={"yyyy"} />
            </Form.Item>
          </div>

          {/*<DatePicker />*/}
        </Form.Item>
        <Form.Item
          label="Your Favorite Ocean"
          name="ocean"
          rules={[
            {
              required: JSONSchema.ocean.required,
              message: "Please select favourite ocean!",
            },
          ]}
        >
          <Select>
            {JSONSchema.ocean.oneOf.map((el) => {
              return (
                <Select.Option value={`${el.toLowerCase()}`} key={el}>
                  {el}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="hobby"
          label="Hobbies"
          rules={[
            {
              required: JSONSchema.hobby.required,
              message: "Please select hobbies!",
            },
          ]}
        >
          <Checkbox.Group>
            <Row>
              {JSONSchema.hobby.anyOf.map((el) => {
                return (
                  <Col span={10} key={el}>
                    <Checkbox
                      value={`${el.toLowerCase()}`}
                      style={{ lineHeight: "32px" }}
                    >
                      {el}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 5 }}
          wrapperCol={{
            offset: 0,
            span: 0,
          }}
        >
          <Button type="primary" htmlType="submit" block={true} size={"middle"}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 5 }}
          wrapperCol={{
            offset: 0,
            span: 0,
          }}
        >
          <Button htmlType="submit" onClick={prev} block={true} size={"middle"}>
            Previous
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

FormPersonalInfo.propTypes = {
  prev: PropTypes.func,
  done: PropTypes.func,
};

export default FormPersonalInfo;
