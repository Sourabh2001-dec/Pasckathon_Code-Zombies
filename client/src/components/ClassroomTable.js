import React from 'react'
import { Table, Button, Space } from 'antd';
import { Popconfirm } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
function ClassroomTable() {
    const dataSource = [
        {
            key: '1',
            name: 'A203',
            capacity: '30',
        },
        {
            key: '2',
            name: 'C201',
            capacity: '50',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>

                    <Popconfirm
                        title="Are you sure？"
                        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    // onConfirm={(e) => onClick(e, text, record)}
                    >
                        <Button type="primary" danger>
                            Delete
                  </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={dataSource} />,
        </div>
    )
}

export default ClassroomTable
