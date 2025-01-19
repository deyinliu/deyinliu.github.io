import { Card, Select, Space, Button } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { usePreprocessStore } from '../../store/usePreprocessStore';

export const VariableSelector: React.FC<{ onAnalyze?: () => void }> = ({ onAnalyze }) => {
  const {
    selectedColumns,
    featureAnalysis,
    setFeatureAnalysisVariables
  } = usePreprocessStore();

  const handleDependentChange = (value: string) => {
    setFeatureAnalysisVariables(
      value,
      featureAnalysis.independentVariables.filter(v => v !== value)
    );
  };

  const handleIndependentChange = (values: string[]) => {
    setFeatureAnalysisVariables(
      featureAnalysis.dependentVariable,
      values.filter(v => v !== featureAnalysis.dependentVariable)
    );
  };

  return (
    <Card title="变量选择">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          placeholder="选择因变量"
          style={{ width: '100%' }}
          options={selectedColumns.map(col => ({ label: col, value: col }))}
          value={featureAnalysis.dependentVariable}
          onChange={handleDependentChange}
        />
        <Select
          mode="multiple"
          placeholder="选择自变量"
          style={{ width: '100%' }}
          options={selectedColumns.map(col => ({ label: col, value: col }))}
          value={featureAnalysis.independentVariables}
          onChange={handleIndependentChange}
        />
        <Button
          type="primary"
          icon={<LineChartOutlined />}
          onClick={onAnalyze}
          disabled={!featureAnalysis.dependentVariable || featureAnalysis.independentVariables.length === 0}
        >
          开始分析
        </Button>
      </Space>
    </Card>
  );
};