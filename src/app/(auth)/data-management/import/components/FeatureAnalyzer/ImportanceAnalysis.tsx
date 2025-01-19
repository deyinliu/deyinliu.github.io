import { Card, Alert, Space, Table, Tag, Progress, Select } from 'antd';
import { Column } from '@ant-design/plots';
import { usePreprocessStore } from '../../store/usePreprocessStore';
import { useMemo, useState } from 'react';
import { calculateCorrelation } from '../../utils/correlation';

// 计算重要性水平
const getImportanceLevel = (importance: number) => {
  if (importance >= 0.5) return { text: '高', color: 'red' };
  if (importance >= 0.2) return { text: '中', color: 'orange' };
  return { text: '低', color: 'green' };
};

export const ImportanceAnalysis: React.FC = () => {
  const {
    processedData,
    featureAnalysis
  } = usePreprocessStore();

  const [selectedVars, setSelectedVars] = useState<string[]>(featureAnalysis.independentVariables);

  const importanceData = useMemo(() => {
    if (!featureAnalysis.dependentVariable || !selectedVars?.length || !processedData?.length) {
      return [];
    }

    return selectedVars
      .map(variable => {
        try {
          // 计算相关系数
          const correlation = calculateCorrelation(
            processedData,
            featureAnalysis.dependentVariable, // 使用 featureAnalysis.dependentVariable
            variable
          );
          // 计算重要性得分 (R²)
          const importance = correlation ? Math.pow(correlation, 2) : 0;

          return {
            variable,
            importance: Number.isFinite(importance) ? Number(importance.toFixed(4)) : 0,
            correlation: Number.isFinite(correlation) ? Number(correlation.toFixed(4)) : 0
          };
        } catch (error) {
          console.error(`Error calculating importance for ${variable}:`, error);
          return {
            variable,
            importance: 0,
            correlation: 0
          };
        }
      })
      .sort((a, b) => b.importance - a.importance);
  }, [processedData, featureAnalysis.dependentVariable, selectedVars]);

  const columns = [
    {
      title: '变量名称',
      dataIndex: 'variable',
      key: 'variable',
    },
    {
      title: '重要性得分 (R²)',
      dataIndex: 'importance',
      key: 'importance',
      render: (value: number) => (
        <Space>
          <Progress
            percent={value * 100}
            size="small"
            format={percent => `${percent?.toFixed(1)}%`}
            status={value > 0 ? 'normal' : 'exception'}
            strokeColor={getImportanceLevel(value).color}
          />
        </Space>
      ),
      sorter: (a, b) => b.importance - a.importance,
    },
    {
      title: '重要性水平',
      key: 'level',
      render: (_, record) => {
        const level = getImportanceLevel(record.importance);
        return <Tag color={level.color}>{level.text}</Tag>;
      }
    },
    {
      title: '相关系数',
      dataIndex: 'correlation',
      key: 'correlation',
      render: (value: number) => (
        <span>{value > 0 ? '+' : ''}{value?.toFixed(3)}</span>
      )
    }
  ];

  const chartConfig = {
    data: importanceData.length > 0 ? importanceData : [{ variable: '无数据', importance: 0 }],
    xField: 'variable',
    yField: 'importance',
    meta: {
      variable: {
        alias: '变量名称'
      },
      importance: {
        alias: '重要性得分',
        min: 0,
        max: 1
      }
    },
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 0.8,
      },
      formatter: (datum: any) => {
        if (!datum?.importance && datum?.importance !== 0) return '';
        return `${(datum.importance * 100).toFixed(1)}%`;
      }
    },
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: true,
        autoEllipsis: true
      }
    },
    yAxis: {
      label: {
        formatter: (v: string) => {
          const value = parseFloat(v);
          if (!Number.isFinite(value)) return '0%';
          return `${(value * 100).toFixed(1)}%`;
        }
      },
      max: 1,
      min: 0,
    },
    tooltip: {
      formatter: (datum: any) => {
        const value = datum?.importance;
        if (!Number.isFinite(value)) return { name: '重要性得分', value: '0%' };
        return {
          name: '重要性得分',
          value: `${(value * 100).toFixed(1)}%`
        };
      }
    },
    columnStyle: {
      fill: (datum: any) => {
        const value = datum?.importance || 0;
        const level = getImportanceLevel(value);
        return level.color;
      },
      radius: [4, 4, 0, 0]
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="变量重要性分析">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="重要性分析说明"
            description={
              <div>
                <p>• 重要性得分基于R²决定系数计算，范围：0-100%</p>
                <p>• 得分越高表示该变量对因变量的影响越大</p>
                <p>• 重要性水平：高(≥50%) 中(20-50%) 低(&lt;20%)</p>
              </div>
            }
            type="info"
            showIcon
          />

          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={selectedVars}
            onChange={setSelectedVars}
            options={featureAnalysis.independentVariables.map(v => ({ label: v, value: v }))}
            placeholder="选择要分析的自变量（可多选）"
            allowClear
          />

          {importanceData.length > 0 ? (
            <div style={{ height: 300 }}>
              <Column {...chartConfig} />
            </div>
          ) : (
            <Alert
              message="暂无数据"
              description="请选择要分析的变量"
              type="info"
              showIcon
            />
          )}

          <Table
            dataSource={importanceData}
            columns={columns}
            size="small"
            pagination={false}
            rowKey="variable"
          />

          <Card size="small" title="变量选择建议">
            <ul>
              {importanceData.map(item => (
                <li key={item.variable} style={{
                  color: getImportanceLevel(item.importance).color,
                  marginBottom: 8
                }}>
                  {item.importance >= 0.5 ? '✨ ' : item.importance >= 0.2 ? '👉 ' : '⚠️ '}
                  {`变量 "${item.variable}"`}
                  {
                    item.importance >= 0.5 ? '对因变量有很强的解释力，建议保留' :
                      item.importance >= 0.2 ? '对因变量有一定解释力，可以考虑保留' :
                        '对因变量的解释力较弱，建议考虑删除'
                  }
                </li>
              ))}
            </ul>
          </Card>
        </Space>
      </Card>
    </Space>
  );
};
