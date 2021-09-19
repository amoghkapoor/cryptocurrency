import React, {useState} from 'react'
import {Select, Typography, Card, Row, Col, Avatar} from "antd"
import moment from 'moment'
import { useGetNewsQuery } from '../services/newsApi'
import {useGetCryptosQuery} from "../services/cryptoApi"
import DemoImage from "../images/demo.jpeg"
import { Loader } from '.'

const {Text, Title} = Typography
const {Option} = Select

const News = ({simplified}) => {
    const {data, isFetching} = useGetCryptosQuery(100)
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
    const {data: news} = useGetNewsQuery({newsCategory, count: simplified ? 6 : 20})
    if(!news?.value) return <Loader/>
    if(isFetching) return <Loader/>

    return (
        <>

            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency, i) => <Option key={i} value={currency.name}>{currency.name}</Option>)}
                    </Select>
                    </Col>
                )}
                {news.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card 
                            hoverable
                            className="news-card"    
                        >
                            <a href={news.url} target="_blank" rel="noreferrer" >
                                <div className="news-image-container">
                                <Title level={5} className="news-title">{news.name}</Title>
                                    <img src={news?.image?.thumbnail?.contentUrl || DemoImage} alt="News" className="news-image"/>

                                </div>
                                <p>
                                    {news.description.length > 100
                                    ? `${news.description.substring(0,100)}...` 
                                    : `${news.description}`}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl} alt="News Provider"/>
                                        <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}

            </Row>
        </>
    )
}

export default News
