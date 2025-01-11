import React from 'react';
import { Card, Upload, Button, Radio, Table, Space, message } from 'antd';
import { UploadOutlined, DatabaseOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';

interface DataSelectorProps {
  onDataSelect: (type: string, data: any) => void;
  onDataParse?: (headers: string[], data: any[][]) => void;
}

const DataSelector: React.FC<DataSelectorProps> = ({ onDataSelect, onDataParse }) => {
  const [dataSource, setDataSource] = React.useState('system'); // 默认选择系统数据

  const systemDataColumns = [
    { title: '数据集名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '记录数', dataIndex: 'count', key: 'count' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  ];

  const systemData = [
    {
      key: '1',
      name: '麻醉数据集2023',
      description: '全麻手术患者生命体征数据',
      count: 1200,
      updateTime: '2023-12-01'
    },
    {
      key: '2',
      name: '术后随访数据',
      description: '术后疼痛评分数据',
      count: 850,
      updateTime: '2023-11-15'
    }
  ];

  const handleUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      message.error('只支持上传 CSV 文件！');
      return false;
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          message.error('文件解析失败，请检查文件格式。');
          return;
        }

        const headers = results.meta.fields || [];
        const parsedData = results.data.map((row) =>
          headers.map((header) => row[header])
        );

        onDataParse?.(headers, parsedData);
        message.success('文件解析成功！');
      },
      error: () => {
        message.error('文件解析失败，请检查文件格式。');
      },
    });

    return false;
  };

  return (
    <Card size="small" title="选择数据来源" bordered={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Radio.Group
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
        >
          <Radio.Button value="system">
            <DatabaseOutlined /> 系统数据
          </Radio.Button>
          <Radio.Button value="upload">
            <UploadOutlined /> 上传数据
          </Radio.Button>
        </Radio.Group>

        {dataSource === 'upload' ? (
          <div style={{ padding: '16px 0' }}>
            <Upload
              accept=".csv"
              beforeUpload={handleUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>上传CSV文件</Button>
            </Upload>
          </div>
        ) : (
          <Table
            columns={systemDataColumns}
            dataSource={systemData}
            size="small"
            pagination={false}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys) => onDataSelect('system', selectedRowKeys[0])
            }}
          />
        )}
      </Space>
    </Card>
  );
};

export default DataSelector;
