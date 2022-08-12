import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Layout, PageHeader, Typography, Row, Space, Divider } from 'antd';
import SimpleLineIcon from 'react-simple-line-icons';
import { useSelector } from 'react-redux';

const BlankPage = () => {

    const user = useSelector((store) => store.user)
    const config = useSelector((store) => store.config)

    const [state, setState] = useState({

    })

    useEffect(() => {

    }, [user])

    return (
        <section className='content'>

            <Row style={{ marginTop: 25 }} gutter={[24, 24]} >
                <Col span={12}>
                    <Row style={{ marginBottom: 20 }}>
                        <Col span={24}>
                            <Card >
                                <Typography.Title level={4} style={{ margin: 0 }}>Available Balance</Typography.Title>
                                <Typography.Title level={1} style={{ margin: 0 }}>$2,500.00</Typography.Title>
                                <p>You have 1 action item</p>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Col span={24}>
                            <Typography.Title level={5}>Quick Links</Typography.Title>

                            <Row gutter={[24, 24]}>
                                <Col span={6}>
                                    <Card.Grid hoverable style={{ width: "100%", textAlign: 'center' }} bordered className='boxshadow border-radius' >
                                        <SimpleLineIcon name="compass" size="Large" />
                                        <Typography.Title level={5}>Transactions</Typography.Title>
                                    </Card.Grid>
                                </Col>
                                <Col span={6}>
                                    <Card.Grid hoverable style={{ width: "100%", textAlign: 'center' }} bordered className='boxshadow border-radius' >
                                        <SimpleLineIcon name="organization" size="Large" />
                                        <Typography.Title level={5}>Disputes</Typography.Title>
                                    </Card.Grid>
                                </Col>
                                <Col span={6}>
                                    <Card.Grid hoverable style={{ width: "100%", textAlign: 'center' }} bordered className='boxshadow border-radius' >
                                        <SimpleLineIcon name="speedometer" size="Large" />
                                        <Typography.Title level={5}>Add Payment</Typography.Title>
                                    </Card.Grid>
                                </Col>
                                <Col span={6}>
                                    <Card.Grid hoverable style={{ width: "100%", textAlign: 'center' }} bordered className='boxshadow border-radius' >
                                        <SimpleLineIcon name="energy" size="Large" />
                                        <Typography.Title level={5}>Replies</Typography.Title>
                                    </Card.Grid>
                                </Col>
                            </Row>
                        </Col>
                    </Row>





                </Col>
                <Col span={8} >
                    <Card bordered title="Active Payment Aggregator">                     
                        {user.aggregators &&
                            <Row>
                                {user.aggregators.map((agg) => {

                                    return (
                                        <Col span={12}>
                                            <img src={config.aggregators[agg.aggregator].logo} height={35} />
                                        </Col>
                                    )
                                }
                                )}
                            </Row>
                        }
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default BlankPage