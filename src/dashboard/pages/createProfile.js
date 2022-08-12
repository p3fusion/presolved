
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Card, Typography, Form, Input, Row, Col, Divider, Button, Space, notification, Steps, Result, Tabs, Switch, Modal } from 'antd';
import SimpleLineIcon from 'react-simple-line-icons';
import { DataStore } from '@aws-amplify/datastore';
import { updateProfile } from '../../store/reducers/user';
import { useDispatch } from 'react-redux';
import { MerchantsProfile, PaymentAggregators } from '../../models/';
import { navigate } from '@reach/router';
import { API, Auth } from 'aws-amplify'

import '../assets/style/aggregators.less'
import moment from 'moment-timezone';

const { Title } = Typography
const { Step } = Steps;
const { TabPane } = Tabs;

const CreateUserProfile = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [ppform] = Form.useForm();
    const [sqform] = Form.useForm()
    const [form2] = Form.useForm();

    const user = useSelector((state) => state.user)
    const initialState = {
        screen: 0,
        isModalVisible:false,
        selected: [],
        verifiedaggreGators: [],
        aggreGators: [
            {
                form: ppform,
                id: 0,
                name: "PayPal",
                fields: [
                    {
                        label: "PayPal Secret ID",
                        name: "secret_id"
                    },
                    {
                        label: "PayPal Secret Key",
                        name: "secret_key"
                    }
                ],
                validated: false,
                logo: "https://1.bp.blogspot.com/-ro2dP_igRy4/YCAQM0M3GlI/AAAAAAAAJVg/Hz6jyEIBHzMqj3Hlsg9j6eE18Cz_24nQACLcBGAsYHQ/w400-h155/paypal-logo.png"
            },
            {
                id: 1,
                form: sqform,
                name: "Stripe",
                validated: false,
                fields: [
                    {
                        label: "Stripe Secret ID",
                        name: "secret_id"
                    },
                    {
                        label: "Stripe Secret Key",
                        name: "secret_key"
                    }
                ],
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
            },
        ],
        filerProps: {
            "allowed_actions": [
                "ACCEPT",
                "CONTEST",
                "CREATE_DISPUTE",
                "REFUND",
                "REPLACEMENT",
                "REFUND_WITH_ITEM_RETURN"
            ],
            "allowed_properties": [{
                "name": "DisputeAmount",
                "type": "Number"
            },
            {
                "name": "Reason",
                "type": "String"
            },
            {
                "name": "TransactionAmount",
                "type": "Number"
            },
            {
                "name": "IsService",
                "type": "Boolean"
            }

            ],
            "allowed_evaluators": [{
                "type": "String",
                "evaluator": ["="]
            },
            {
                "type": "Boolean",
                "evaluator": ["true", "false"]
            },
            {
                "type": "Number",
                "evaluator": ["=", "<", ">", "<=", ">="]
            }
            ]
        },
        userFilters: [
            {
                properties: null,
                evaluators: null,
                evaluatorType: null,
            }
        ]
    }
    const [state, setState] = useState({ ...initialState })




    useEffect(() => {
        if (user.isLoggedin) {
            form.setFieldsValue({ ...user })
        }
        //callLocal().then((res) => console.log({ res }));
        /* if(user.isProfileCreated){
            navigate("/dashboard")
        } */
    }, [user])

    const onChange = (value) => {
        console.log('onChange:', value);
        setState({ ...state, screen: value })

    };

    const onFinishScreenOne = async (e) => {
        if (user?.profile?.length > 0) {
            console.log(":: Profile page: Updated existing profile data :: ", user);
            const previousProfile = await DataStore.query(MerchantsProfile, user.id);
            await DataStore.save(
                MerchantsProfile.copyOf(previousProfile, item => {
                    item.company = e.company
                    item.name = e.name
                    setState({ ...state, screen: 1 })
                })
            )
        } else {
            console.log(":: Profile page: New profile created :: ", user);
            const profileData = {
                created_at: moment().format("YYYY-MM-DD"),
                auth_id: user.authID,
                company: e.company,
                email: e.email,
                name: e.name
            }
            const newUserProfile = new MerchantsProfile(profileData)
            DataStore.save(newUserProfile).then((insid) => {
                dispatch(updateProfile({ profile: [profileData], id: insid.id }))
                setState({ ...state, screen: 1 })
            }).catch((ex) => {
                notification.error({
                    message: ex.message
                })
            })
        }
    }
    /* screen2 related scripts */
    const onFinishScreenTwo = (e) => {

        if (e.aggregator === 'PayPal') {
            const init = {
                body: {
                    "event_type": "validate",
                    "client_secret": e.secret_key,
                    "client_id": e.secret_id,
                }
            }
            API.post("aggregatorBridgeApi", "/events", init).then((result) => {
                if (result.access_token) {
                    let verifiedaggreGators = state.verifiedaggreGators
                    verifiedaggreGators.push(e.aggregator)

                    const newAggregator = new PaymentAggregators({
                        aggregator: e.aggregator,
                        merchant_id: user.id,
                        client_id: e.secret_id,
                        secret_key: e.secret_key,
                    })
                    DataStore.save(newAggregator).then((insid) => {
                        setState({
                            ...state,
                            verifiedaggreGators,
                            screen: 2
                        })
                        notification.success({
                            message: "PayPal Payments verified"
                        })
                    })
                }
            })

        }



    }

    const ChooseAggeregator = (aggregator) => {
        let { selected } = state
        let checkExist = selected.indexOf(aggregator)
        if (checkExist > -1) {
            selected.splice(checkExist, 1);
        } else {
            selected.push(aggregator)
        }
        setState({ ...state, selected })
    }
    const handleOk=()=>{
        setState({...state, isModalVisible:true})
        setTimeout(() => {
            Auth.signOut().then(()=>navigate("/signin"))
        }, 2500);
    }

    /* screen3 related scripts */
    const getEvaluators = (props, index) => {
        let { userFilters } = state

        let SelectedRow = userFilters[index]
        let evaluators = state.filerProps.allowed_properties.filter((fprops) => fprops.name === props)
        SelectedRow.evaluatorType = evaluators[0].type
        setState({ ...state, userFilters })
    }

    const onFinishThirdScreen = (e) => {
        console.log({ e });
    }

    const addFilters = () => {
        let currentFilters = state.userFilters
        currentFilters.push({
            properties: null,
            evaluators: null,
            criteria: null,
            evaluatorType: null
        })
        setState({ ...state, userFilters: currentFilters })
    }

    const updateFilterItem = (label, value, index) => {
        let { userFilters } = state
        let SelectedRow = userFilters[index]
        console.log({
            index,
            label: label,
            field: SelectedRow[label],
            value
        });
        SelectedRow[label] = value
        setState({ ...state, userFilters })
        form2.setFieldsValue(state.userFilters)
    }

    return (
        <section className='content profile'>
            <Row>
                <Col span={24}>
                    <section className='wizard'>
                        <Steps current={state.screen} /* onChange={onChange} */>
                            <Step title="Profile Setup" description="Company Details." icon={<SimpleLineIcon name="user" />} />
                            <Step title="Aggregater Setup" description="Payment Gateways." icon={<SimpleLineIcon name="envelope-letter" />} />
                            <Step title="Filters Setup" description="Define Rules." icon={<SimpleLineIcon name="basket-loaded" />} />
                        </Steps>
                    </section>
                    {/* <Card bordered>
                          <Title level={3} >Hi {user.name}, Please choose payments gateway's</Title>                         
                    </Card> */}

                </Col>
            </Row>

            {
                state.screen == 0 &&
                <Row>
                    <Col span={24}>
                        <Title level={5} >Hi {user.name}, Please update the below form to setup your account</Title>
                        <Card >
                            <Form form={form} layout="vertical" size="large" onFinish={onFinishScreenOne}>
                                <Form.Item name="name" label="Your Full Name" required tooltip="This is a required field">
                                    <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item name="company" label="Your Company Name" required tooltip="This is a required field">
                                    <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item name="email" label="E-mail" required tooltip="This is a required field">
                                    <Input placeholder="E-mail" />
                                </Form.Item>
                                <Divider />
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" size='large' htmlType='submit'><SimpleLineIcon name="user" /> Next  </Button>
                                        <Button type="default" size='large' htmlType='reset'><SimpleLineIcon name="refresh" /> Reset</Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            }
            {
                state.screen == 1 &&
                <section >
                    {/* <Typography.Title level={5}>Please choose payments gateway's</Typography.Title> */}
                    <Row style={{ marginTop: 24 }}>

                        <Col span={24}>

                            <section className='aggreGators-grid'>
                                {
                                    state.aggreGators.map((agg) =>
                                        <div key={agg.name} className="items"  >
                                            <img src={agg.logo} height={50} />
                                            <div className={state.selected.indexOf(agg.name) > -1 ? "button selected" : "button"} >
                                                <Button onClick={() => ChooseAggeregator(agg.name)} block type='default' size='large' ><SimpleLineIcon name="check" size="large" /></Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </section>
                        </Col>
                    </Row>
                    {
                        state.selected.length > 0 ?
                            <Row style={{ marginTop: 50 }}>
                                <Col span={24}>
                                    <Card bordered className='bordered box-shadow'>
                                        <Tabs>
                                            {state.selected.map((agg) => {
                                                const sel = state.aggreGators.filter((e) => e.name === agg)
                                                const selected = sel[0]
                                                return (
                                                    <TabPane tab={<span><img height={30} src={selected.logo} /></span>} key={agg}>
                                                        <Typography.Title level={5}>Please add <u><em>{agg}</em></u> Details to proceed further</Typography.Title>
                                                        <Typography.Paragraph  > Please be ensured that your credential informations are stored securly   </Typography.Paragraph>
                                                        <Form onFinish={onFinishScreenTwo} layout="vertical" size="large" form={selected.form} >
                                                            {
                                                                selected.fields.map((field) =>
                                                                    <Form.Item key={field.name} name={field.name} label={field.label} required tooltip="This is a required field">
                                                                        <Input placeholder={field.label} />
                                                                    </Form.Item>
                                                                )
                                                            }
                                                            <Divider />
                                                            <Form.Item>
                                                                <Space>
                                                                    <Button type="primary" size='large' htmlType='submit'><SimpleLineIcon name="user" /> Next </Button>
                                                                    <Button type="default" size='large' htmlType='reset'><SimpleLineIcon name="refresh" /> Reset</Button>
                                                                </Space>
                                                            </Form.Item>
                                                            <Form.Item initialValue={agg} name="aggregator">
                                                                <Input type="hidden" value={agg} />
                                                            </Form.Item>
                                                        </Form>
                                                    </TabPane>
                                                )
                                            })}

                                        </Tabs>
                                    </Card>

                                </Col>

                            </Row>
                            :
                            <Row style={{ marginTop: 50 }}>
                                <Col span={24}>
                                    <Result title="Please choose any 1 Payment gateway to proceed further" status='404' />
                                </Col>
                            </Row>
                    }
                </section>
            }
            {
                state.screen == 2 &&
                <section className='services'>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={24}>
                            <Typography.Title level={4}>Please Choose the services you are intrested</Typography.Title>
                            <Divider />
                        </Col>
                    </Row>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={20}>Enable All services or choose from below services</Col>
                        <Col span={4}><Switch defaultChecked /></Col>
                    </Row>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={20}>Conversational AI to resolve your customer issues</Col>
                        <Col span={4}><Switch defaultChecked /></Col>
                    </Row>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={20}>24/7 monitoring and notification of potential chargebacks</Col>
                        <Col span={4}><Switch defaultChecked /></Col>
                    </Row>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={20}>Robust workflow  - AI Recommendation for merchant to accept or contest disputes</Col>
                        <Col span={4}><Switch defaultChecked /></Col>
                    </Row>
                    <Row style={{ margin: "20px 0" }}>
                        <Col span={20}>Automate  dispute response</Col>
                        <Col span={4}><Switch defaultChecked /></Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginTop: 30 }}>

                        <Col span={4} offset={20}>
                            <Button type='primary' block size='large' onClick={()=>handleOk()} >Save</Button>
                        </Col>
                    </Row>

                    <Modal title="Setup Completed" visible={state.isModalVisible} onOk={handleOk} onCancel={handleOk}>
                        <p> Congrats, You have completed the profile setup</p>
                        <p>You may need to login agin to reflect the changes. This page will redirect in 10 seconds</p>                        
                    </Modal>
                </section>


            }
        </section>
    )

}

export default CreateUserProfile



/* 

<section className='filters'>
                    <Row>
                        <Col span={24}>
                            <Typography.Title level={4}>Add Automatic action to your dispues</Typography.Title>
                            <Divider />
                        </Col>
                        <Col span={24}>
                            <Form form={form2} size="large" onFinish={onFinishThirdScreen}>
                                {state.userFilters.map((filt, index) =>
                                    <Card bordered key={index} style={{ marginBottom: 30 }} >
                                        <Row align='top' gutter={[16, 24]}>
                                            <Col span={6}>
                                                <Form.Item label="Properties" name={["filters", index, "properties"]} >
                                                    <Select onChange={(e) => { console.log({ props: getEvaluators(e, index) }) }}>
                                                        {state.filerProps.allowed_properties.map((props) =>
                                                            <Select.Option value={props.name}>{props.name}</Select.Option>
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="Condition" name={["filters", index, "evaluators"]}>
                                                    {
                                                        filt.evaluatorType === "String" &&
                                                        <Select onChange={(e) => updateFilterItem("evaluators", e, index)}>
                                                            <Select.Option value="=">"=" Equals</Select.Option>
                                                            <Select.Option value="==">"==" Contains</Select.Option>
                                                        </Select>
                                                    }
                                                    {
                                                        filt.evaluatorType === "Boolean" &&
                                                        <Select onChange={(e) => updateFilterItem("evaluators", e, index)}>
                                                            <Select.Option value={true}>True</Select.Option>
                                                            <Select.Option value={false}>False</Select.Option>
                                                        </Select>
                                                    }
                                                    {
                                                        filt.evaluatorType === "Number" &&
                                                        <Select onChange={(e) => updateFilterItem("evaluators", e, index)}>
                                                            <Select.Option value="=">Equals</Select.Option>
                                                            <Select.Option value="<">Lesser</Select.Option>
                                                            <Select.Option value="<=">Lesser And Equal to</Select.Option>
                                                            <Select.Option value=">">Greater</Select.Option>
                                                            <Select.Option value=">=">Greater And Equal to</Select.Option>
                                                        </Select>
                                                    }
                                                    {filt.properties == '' && <Select ></Select>}
                                                </Form.Item>
                                            </Col>
                                            {
                                                filt.evaluatorType !== "Boolean" &&
                                                <Col span={6}>
                                                    <Form.Item label="Criteria" name={["filters", index, "criteria"]}>
                                                        <Input onChange={(e) => updateFilterItem("criteria", e, index)} />
                                                    </Form.Item>
                                                </Col>
                                            }
                                        </Row>
                                    </Card>
                                )}

                                <Row gutter={[16, 16]}>
                                    <Col span={2}> <Button type='dashed' onClick={() => addFilters()} >ADD Filters</Button> </Col>
                                    <Col span={2}><Button htmlType='submit' type='primary' >Save</Button></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </section>


*/