"use client";
import { Table, Card, Button, Space, Tag, Input, Tabs, DatePicker, message } from 'antd';
import { DatabaseOutlined, UploadOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';

const DataManagementPage = () => {
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const columns = [
    {
      title: '数据编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: [
        { text: '患者数据', value: '患者数据' },
        { text: '检验数据', value: '检验数据' },
        { text: '影像数据', value: '影像数据' }
      ],
      render: (type: string) => {
        const colorMap = {
          '患者数据': 'blue',
          '检验数据': 'green',
          '影像数据': 'purple'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: '来源科室',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '记录时间',
      dataIndex: 'recordTime',
      key: 'recordTime',
      width: 180,
      sorter: (a, b) => new Date(a.recordTime).getTime() - new Date(b.recordTime).getTime()
    },
    {
      title: '数据大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: '已验证', value: '已验证' },
        { text: '待验证', value: '待验证' },
        { text: '已归档', value: '已归档' }
      ],
      render: (status: string) => {
        const colorMap = {
          '已验证': 'success',
          '待验证': 'warning',
          '已归档': 'default'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => handleView(record)}>
            查看
          </Button>
          <Button type="link" size="small" onClick={() => handleExport(record)}>
            导出
          </Button>
          <Button type="link" size="small" danger onClick={() => handleArchive(record)}>
            归档
          </Button>
        </Space>
      )
    }
  ];

  const mockData = [
    {
      id: 'DAT20240101',
      type: '患者数据',
      department: '内科门诊',
      recordTime: '2024-01-15 08:30:00',
      size: '2.5MB',
      status: '已验证'
    },
    {
      id: 'DAT20240102',
      type: '检验数据',
      department: '检验科',
      recordTime: '2024-01-15 09:15:00',
      size: '1.8MB',
      status: '待验证'
    },
    {
      id: 'DAT20240103',
      type: '影像数据',
      department: '放射科',
      recordTime: '2024-01-15 10:00:00',
      size: '15.2MB',
      status: '已归档'
    }
  ];

  const handleView = (record) => {
    message.info(`查看数据: ${record.id}`);
  };

  const handleExport = (record) => {
    message.success(`开始导出数据: ${record.id}`);
  };

  const handleArchive = (record) => {
    message.warning(`归档数据: ${record.id}`);
  };

  const handleImport = () => {
    message.info('导入功能开发中...');
  };

  const items = [
    {
      key: '1',
      label: '全部数据',
      children: (
        <>
          <Space style={{ marginBottom: 16 }} size="middle">
            <Input.Search
              placeholder="搜索数据编号/类型"
              style={{ width: 200 }}
              onSearch={(value) => console.log(value)}
            />
            <DatePicker.RangePicker
              style={{ width: 300 }}
              placeholder={['开始日期', '结束日期']}
            />
            <Button type="primary" icon={<UploadOutlined />} onClick={handleImport}>
              导入数据
            </Button>
            <Button icon={<FilterOutlined />}>
              高级筛选
            </Button>
          </Space>
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
              showTotal: (total) => `共 ${total} 条数据`
            }}
          />
        </>
      )
    },
    {
      key: '2',
      label: '待验证数据',
      children: '待验证数据内容'
    },
    {
      key: '3',
      label: '数据统计',
      children: '数据统计内容'
    }
  ];

  return (
    <Card
      title={
        <Space>
          <DatabaseOutlined />
          <span>数据管理中心</span>
        </Space>
      }
      extra={
        <Space>
          <span>最后更新时间：{new Date().toLocaleString()}</span>
        </Space>
      }
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        type="card"
      />
    </Card>
  );
};

export default DataManagementPage;
