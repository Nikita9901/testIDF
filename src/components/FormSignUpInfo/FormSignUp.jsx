import { JSONSchema } from "../../JSONSchema";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { setPersonSignUpInfo } from "../../store/actions";

import { Button, Form, Input, message } from "antd";
import MaskedInput from "react-maskedinput";

import PropTypes from "prop-types";
import styles from "./FormSignUp.module.css";

const FormSignUp = ({ nextForm }) => {
  // Управляемый инпут, дл проверки на корректность
  const [email, setEmail] = useState("");

  // Функция диспатч
  const dispatch = useDispatch();
  const dispatchInfo = (value) => {
    dispatch(setPersonSignUpInfo(value));
  };

  // Сообщения сверху
  const error = (text) => {
    message.error(text);
  };

  // Обработка отправки формы: проверка значений, диспатчим информацию
  const onFinish = (values) => {
    if (values["password"] !== values["passwordr"]) {
      error("Пароли не совпадают");
      return;
    }
    if (
      values["password"].length < JSONSchema.password.minLength ||
      values["password"].length > JSONSchema.password.maxLength
    ) {
      error(
        `Пароль должен включать от ${JSONSchema.password.minLength} до ${JSONSchema.password.maxLength} символов`
      );
      return;
    }
    const email_arr = email.split("");
    if (!email_arr.includes("@")) {
      error(`Введите действительный Email`);
      return;
    }
    dispatchInfo(values);
    nextForm();
  };

  // Если отправка не удалась
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className={styles.form}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: JSONSchema.mobilePhone.required,
                message: "Please input your phone number!",
              },
            ]}
          >
            <MaskedInput
              type="tel"
              className={"ant-input"}
              mask={"+375 (11) 111-11-11"}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: JSONSchema.email.required,
                message: "Please input your username!",
              },
            ]}
          >
            <input
              className={"ant-input"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: JSONSchema.password.required,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Repeat password"
            name="passwordr"
            rules={[
              {
                required: JSONSchema.password.required,
                message: "Please repeat your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 0,
          }}
        >
          <Button type="primary" htmlType="submit" block={true}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

FormSignUp.propTypes = {
  nextForm: PropTypes.func,
};

export default FormSignUp;
