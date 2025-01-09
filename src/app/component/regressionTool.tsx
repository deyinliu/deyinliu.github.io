"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { UploadOutlined, LineChartOutlined, TableOutlined, ControlOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Select, Button, Row, Col, Typography, Table, message, Tooltip } from 'antd';
// import RegressionAnalysisCharts from './visual/RegressionAnalysisCharts';
// import { RegressionChartData } from '@/interface';
import { RegressionDisplayData } from '../types/regressionTypes';
import MultipleRegression from '../utils/spss/multiRegression';
import { transformRegressionResults } from '../utils/spss/transformRegressionResult';
import { RegressionResults } from './spss/regressionResult';
const { Option } = Select;
const { Title, Text } = Typography;

const RegressionTool: React.FC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dependentVariable, setDependentVariable] = useState<string>('');
  const [independentVariables, setIndependentVariables] = useState<string[]>([]);
  // const [regressionChartData, setRegressionChartData] = useState<RegressionChartData | null>(null);
  const [regressionTFChartData, setRegressionTFChartData] = useState<RegressionDisplayData>();
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFileName(file.name);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          messageApi.error('文件解析失败，请检查文件格式。');
          return;
        }

        // 从 results.meta.fields 获取表头
        const headers = results.meta.fields || [];
        setHeaders(headers);

        // 将数据转换为二维数组
        const parsedData = results.data.map((row) =>
          headers.map((header) => row[header])
        );
        setData(parsedData);

        messageApi.success('文件上传成功！');
      },
      error: () => {
        messageApi.error('文件解析失败，请检查文件格式。');
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDependentVariableChange = (value: string) => {
    if (independentVariables.includes(value)) {
      messageApi.warning(`"${value}" 已被选为自变量，不能同时作为因变量！`);
      return;
    }
    setDependentVariable(value);
  };

  const handleIndependentVariablesChange = (values: string[]) => {
    if (values.includes(dependentVariable)) {
      messageApi.warning(`"${dependentVariable}" 已被选为因变量，不能同时作为自变量！`);
      return;
    }
    setIndependentVariables(values);
  };

  const performRegression = () => {
    if (!dependentVariable || independentVariables.length === 0) {
      messageApi.warning('请选择因变量和至少一个自变量！');
      return;
    }

    // 获取因变量和自变量的索引
    const dependentVariableIndex = headers.indexOf(dependentVariable);
    const independentVariableIndices = independentVariables.map((variable) =>
      headers.indexOf(variable)
    );

    // 提取自变量和因变量
    const x = data.map((row) => independentVariableIndices.map((index) => row[index]));
    const y = data.map((row) => row[dependentVariableIndex]);

    // 执行多元线性回归
    // const regressionResult = multipleRegression(x, y);
    // const regressionChartData = serializeRegressionForCharts(independentVariables, regressionResult);
    // const scatterMatrixData = generateScatterMatrixData(x, y, independentVariables, dependentVariable);
    // regressionChartData.scatterMatrixData = scatterMatrixData
    // // const a = multipleRegressionSpss(x, y, independentVariables, dependentVariable)
    // setRegressionChartData(regressionChartData);

    const regressionResult = MultipleRegression.analyze(x, y, independentVariables);
    const regressionChartData = transformRegressionResults(regressionResult, independentVariables, dependentVariable, x, y);
    setRegressionTFChartData(regressionChartData);
  };

  // 预览前100条数据
  const previewData = data.slice(0, 100).map((row, index) => {
    const record = { key: index };
    headers.forEach((header, i) => {
      record[header] = row[i];
    });
    return record;
  });

  return (
    <div className="analysis-content">
      {contextHolder}
      <div className="analysis-section">
        <Title level={4} className="section-title">
          <UploadOutlined className="section-icon" />
          数据导入
        </Title>
        <div
          {...getRootProps()}
          className="upload-zone"
          style={{
            borderColor: uploadedFileName ? '#52c41a' : '#1890ff',
            background: isDragActive ? '#e6f7ff' : uploadedFileName ? '#f6ffed' : '#fafafa',
          }}
        >
          <input {...getInputProps()} />
          <p style={{ margin: 0 }}>
            {uploadedFileName
              ? `当前文件: ${uploadedFileName}`
              : isDragActive
                ? '释放文件以上传'
                : '拖拽CSV文件到此处或点击上传'}
          </p>
        </div>
      </div>

      {headers.length > 0 && (
        <>
          <div className="analysis-section">
            <Title level={4} className="section-title">
              <TableOutlined className="section-icon" />
              数据预览
            </Title>
            <Table
              dataSource={previewData}
              columns={headers.map(header => ({
                title: header,
                dataIndex: header,
                key: header,
              }))}
              pagination={{ pageSize: 5 }}
              size="small"
              scroll={{ x: true }}
              className="preview-table"
            />
          </div>

          <div className="analysis-section">
            <Title level={4} className="section-title">
              <ControlOutlined className="section-icon" />
              变量选择
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>因变量:</Text>
                <Select
                  placeholder="选择因变量"
                  style={{ width: '100%', marginTop: '8px' }}
                  value={dependentVariable}
                  onChange={handleDependentVariableChange}
                >
                  {headers.map((header) => (
                    <Option
                      key={header}
                      value={header}
                      disabled={independentVariables.includes(header)}
                    >
                      <Tooltip
                        title={
                          independentVariables.includes(header)
                            ? `"${header}" 已被选为自变量，不能同时作为因变量！`
                            : null
                        }
                      >
                        {header}
                      </Tooltip>
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Text strong>自变量:</Text>
                <Select
                  mode="multiple"
                  placeholder="选择自变量"
                  style={{ width: '100%', marginTop: '8px' }}
                  value={independentVariables}
                  onChange={handleIndependentVariablesChange}
                >
                  {headers.map((header) => (
                    <Option
                      key={header}
                      value={header}
                      disabled={header === dependentVariable}
                    >
                      <Tooltip
                        title={
                          header === dependentVariable
                            ? `"${header}" 已被选为因变量，不能同时作为自变量！`
                            : null
                        }
                      >
                        {header}
                      </Tooltip>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Button
              type="primary"
              onClick={performRegression}
              style={{ marginTop: '16px' }}
              icon={<LineChartOutlined />}
            >
              执行回归分析
            </Button>
          </div>
        </>
      )}

      {regressionTFChartData && (
        <div className="analysis-section">
          <Title level={4} className="section-title">
            <AreaChartOutlined className="section-icon" />
            分析结果
          </Title>
          <RegressionResults data={regressionTFChartData} />
        </div>
      )}
    </div>
  );
};

export default RegressionTool;