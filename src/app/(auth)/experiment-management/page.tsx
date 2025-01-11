"use client";
import { Table, Card, Button, Space, Tag } from 'antd';
import { PlusOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useState } from 'react';
import mockData from '../../mock/experimentData.json';
import { useRouteNavigate } from '@/app/hooks/useRouteNavigate';

const ExperimentManagementPage = () => {
  const { navigate } = useRouteNavigate();
  const [loading] = useState(false);
  const { experiments } = mockData;

  const columns = [
    {
      title: '实验编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '实验名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '实验类型',
      dataIndex: 'type',
      key: 'type',
      width: 160,
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '主要研究者',
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
    },
    {
      title: '实验周期',
      dataIndex: 'period',
      key: 'period',
      width: 200,
      ellipsis: true,
    },
    {
      title: '目标样本量',
      dataIndex: 'sampleSize',
      key: 'sampleSize',
      width: 100,
    },
    {
      title: '当前进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      ellipsis: true,
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
      fixed: 'right',
      width: 200,
      render: () => (
        <Space size="middle">
          <Button type="link">查看详情</Button>
          <Button type="link">数据采集</Button>
          <Button type="link">编辑</Button>
        </Space>
      ),
    },
  ];

  const handleNewExperiment = () => {
    navigate('/experiment-management/create/');
  };

  return (
    <Card
      title={
        <Space>
          <ExperimentOutlined />
          研究实验管理
        </Space>
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNewExperiment}>
          新建实验
        </Button>
      }
      bodyStyle={{ padding: '12px 24px' }}
    >
      <Table
        // @ts-expect-error fixed type no problem
        columns={columns}
        dataSource={experiments}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={{
          total: experiments.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        style={{
          marginTop: 8,
          minHeight: 'calc(100vh - 280px)',
        }}
      />
    </Card>
  );
};

export default ExperimentManagementPage;
