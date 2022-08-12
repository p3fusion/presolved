import React, { useEffect, useState } from 'react';
import { Card, Typography, Form, Input, Row, Col, Divider, Button, Select, notification, Steps, Result, Tabs, Switch, Modal } from 'antd';
import SimpleLineIcon from 'react-simple-line-icons';
import { useSelector, useDispatch } from 'react-redux';

import '../assets/style/dispute-rules.less'

const CreateDisputeRules = () => {

    const dispatch = useDispatch()
    const [form2] = Form.useForm();
    const user = useSelector((store) => store.user)
    const [state, setState] = useState({
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
                criteria: null,
                evaluatorType: null,
            }
        ]
    })

    const removeFilter = (index) => {
        let { userFilters } = state
        if (confirm("Are you sure want to remove this filter !") == true) {
            userFilters.splice(index, 1)
            setState({ ...state, userFilters })
        }
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

        if (label === 'properties') {
            let evaluatorType = state.filerProps.allowed_properties.filter((props) => props.name === value)
            SelectedRow.evaluatorType = evaluatorType[0].type
        }
        SelectedRow[label] = value
        setState({ ...state, userFilters })
        form2.setFieldsValue({
            filters: state.userFilters
        })
    }


    useEffect(() => { }, [user])

    const onFinishThirdScreen = (e) => {
        console.log({ e });
    }

    return (
        <section className='content'>
            <section className='filters'>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={4}>Add Automatic action to your dispues</Typography.Title>
                        <Divider />
                    </Col>
                </Row>
                <Form size='large'  autoComplete="off" form={form2} layout="vertical" onFinish={onFinishThirdScreen}>
                    <Row align='middle'>
                        <Col span={10}>
                            <Form.Item label="Rule Name" name="name" rules={[
                                {
                                    required: true,
                                    message: 'Please Add rule name',
                                }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        {state.userFilters.length < 4 &&
                            <Col span={2} offset={2}>
                                <Button shape='round' type='primary' onClick={() => addFilters()} ><SimpleLineIcon name="plus" /> ADD Filters</Button>
                            </Col>
                        }
                    </Row>
                    <Row align='middle'>
                        <Col span={24}>
                            {state.userFilters.map((filt, index) =>
                                <Card bordered={false} className='filter-items' key={index} style={{ marginBottom: 5 }} >
                                    <Row align='middle' gutter={[16, 24]}>
                                        <Col span={6}>
                                            <Form.Item   required label="Properties" name={["filters", index, "properties"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose properties',
                                                    },
                                                ]}
                                            >
                                                <Select  onChange={(e) => updateFilterItem("properties", e, index)}>
                                                    {state.filerProps.allowed_properties.map((props) =>
                                                        <Select.Option key={props.name} value={props.name}>{props.name}</Select.Option>
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {
                                            filt.properties &&
                                            <Col span={6}>
                                                <Form.Item required label="Condition" name={["filters", index, "evaluators"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please choose condition',
                                                        },
                                                    ]}
                                                >
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
                                        }
                                        {
                                            filt.properties && filt.evaluatorType !== "Boolean" &&
                                            <Col span={6}>
                                                <Form.Item required label="Criteria" name={["filters", index, "criteria"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please add criteria',
                                                        },
                                                    ]}
                                                >
                                                    <Input onChange={(e) => updateFilterItem("criteria", e.target.value, index)} />
                                                </Form.Item>
                                            </Col>
                                        }
                                        {filt.properties &&
                                            <Col span={2}>
                                                <Switch size='default' title='AND' checkedChildren={<div>AND</div>} unCheckedChildren={<div>OR</div>} />
                                            </Col>
                                        }
                                        {filt.properties && index !== 0 &&
                                            <Col span={2}>
                                                <Button type='primary' danger shape='circle' onClick={() => removeFilter(index)} icon={<SimpleLineIcon name="close" />} />
                                            </Col>
                                        }
                                     
                                    </Row>
                                </Card>
                            )}
                        </Col>
                    </Row>
                    <Row align='middle' style={{marginTop:20}} >
                        <Col span={24}>
                            <Card bordered>
                                <Row align='middle'>
                                    <Col span={10}>
                                        <Form.Item label="Rule Outcome" name="result" rules={[
                                            {
                                                required: true,
                                                message: 'Please choose rule outcome',
                                            }]}>
                                            <Select>
                                                {state.filerProps.allowed_actions.map((act) =>
                                                    <Select.Option key={act} value={act}>{act}</Select.Option>
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} offset={2}><Button htmlType='submit' size='large' type='primary' >Save</Button></Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                </Form>
            </section>

        </section >
    )
}

export default CreateDisputeRules