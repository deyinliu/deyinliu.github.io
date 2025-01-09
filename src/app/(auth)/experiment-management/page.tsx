"use client";
import { Table, Card, Button, Space, Tag, message } from 'antd';
import { PlusOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ExperimentManagementPage = () => {
  const [loading] = useState(false);

  const columns = [
    {
      title: '实验编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '实验名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '实验类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={type === '临床试验' ? 'blue' : 'green'}>{type}</Tag>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '进行中' ? 'processing' : status === '已完成' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">查看</Button>
          <Button type="link">编辑</Button>
        </Space>
      ),
    },
  ];

  const mockData = [
    {
      id: 'EXP001',
      name: '新型药物临床试验A阶段',
      type: '临床试验',
      owner: '张医生',
      startDate: '2024-01-15',
      status: '进行中',
    },
    {
      id: 'EXP002',
      name: '医疗设备测试实验',
      type: '设备测试',
      owner: '李工程师',
      startDate: '2024-01-10',
      status: '已完成',
    },
  ];

  const handleNewExperiment = () => {
    message.info('新建实验功能开发中...');
  };

  return (
    <div>
      <Card
        title={
          <Space>
            <ExperimentOutlined />
            实验管理
          </Space>
        }
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleNewExperiment}>
            新建实验
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={mockData}
          loading={loading}
          rowKey="id"
          pagination={{
            total: mockData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default ExperimentManagementPage;
