import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  message,
  Select,
  Divider,
} from "antd";
const { Option } = Select;

function StudentForm() {
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 26,
        },
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not validate email!",
            number: "${label} is not a validate number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const onChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = () => {
        console.log(user);
    };

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        classroom: "",
        rollnumber: "",
        state: "",
        country: "",
        admin: "null",
        aoi: [],
    });
    const {
        name,
        email,
        password,
        classroom,
        rollnumber,
        state,
        country,
        aoi,
    } = user;
    return (
        <div>
            <Row>
                <Col lg={8} md={2} sm={1} />
                <Col lg={8} md={10} sm={12}>
                    <Card title="Add Student" className="register-card">
                        <br></br>
                        <Form
                            name="login"
                            {...layout}
                            initialValues={{
                                remember: true,
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name="name-item"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <Input name="name" value={name} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                name="email id"
                                label="E-mail ID"
                                rules={[
                                    {
                                        type: "email",
                                        required: true,
                                        message: "Please input your Email ID!",
                                    },
                                ]}
                            >
                                <Input name="email" value={email} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                name="pass"
                                label="Password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm your password!",
                                    },
                                    () => ({
                                        validator(rule, value) {
                                            if (!value || password === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                "The two passwords that you entered do not match!"
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                name="room"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Class!",
                                    },
                                ]}
                                label="Class"
                            >
                                <Input
                                    name="Class"
                                    value={classroom}
                                    onChange={onChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="roll"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Roll Number!",
                                    },
                                ]}
                                label="Roll Number"
                            >
                                <Input
                                    name="Roll_Number"
                                    value={rollnumber}
                                    onChange={onChange}
                                />
                            </Form.Item>
                        </Form>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-form-button"
                            onClick={onSubmit}
                        >
                            Register
          </Button>

                        {/* <center>
            <Divider plain>OR</Divider>
            Already have an account?
            <a> Sign In</a>
          </center> */}
                    </Card>
                </Col>
                <Col lg={8} md={2} sm={1} />
            </Row>
        </div>
    )
}

export default StudentForm
