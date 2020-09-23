import React, { useState } from 'react'
import { Card, Layout, Menu, Row } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Chart } from 'primereact/chart';
function Statistics() {
    const basicData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Number of Students',
                data: [23, 78, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5'
            }
        ]
    };
    const basicOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }]
        }
    };
    return (
        <div className="card">
            <Card title="Number of Students in the week" style={{ width: 1000, padding: '10px 0px 20px 0px' }}>
                <Chart type="line" data={basicData} options={basicOptions} />
            </Card>

        </div>
    )
}

export default Statistics
