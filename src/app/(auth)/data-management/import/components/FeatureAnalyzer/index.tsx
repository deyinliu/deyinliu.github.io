import { Space, Alert, Card, Radio, Button, message } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { usePreprocessStore } from '../../store/usePreprocessStore';
import { VariableSelector } from './VariableSelector';
import { CorrelationAnalysis } from './CorrelationAnalysis';
import { ImportanceAnalysis } from './ImportanceAnalysis';

export const FeatureAnalyzer: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const { featureAnalysis, processedData } = usePreprocessStore();
  const [analysisStep, setAnalysisStep] = useState<'correlation' | 'importance'>('correlation');
  const [showResults, setShowResults] = useState(false);

  const handleStartAnalysis = () => {
    const { dependentVariable, independentVariables } = featureAnalysis;

    if (!dependentVariable || !independentVariables?.length || !processedData?.length) {
      message.error('数据不完整，请检查变量选择和数据');
      return;
    }

    // 验证数据有效性
    try {
      const validData = processedData.filter(row => row && typeof row === 'object');

      if (!validData.length) {
        message.error('没有有效的数据行');
        return;
      }

      const hasInvalidVariable = [dependentVariable, ...independentVariables].some(variable => {
        const validValues = validData
          .map(row => Number(row[variable]))
          .filter(v => Number.isFinite(v));
        return validValues.length < 2;
      });

      if (hasInvalidVariable) {
        message.error('部分变量数据无效或数据点不足');
        return;
      }

      setShowResults(true);
    } catch (error) {
      console.error('Analysis error:', error);
      message.error('分析过程中出现错误，请检查数据');
    }
  };

  if (!featureAnalysis.dependentVariable && featureAnalysis.independentVariables.length === 0) {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <VariableSelector onAnalyze={handleStartAnalysis} />
        <Alert message="请选择变量并点击开始分析" type="info" showIcon />
      </Space>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <VariableSelector onAnalyze={handleStartAnalysis} />

      {showResults && (
        <>
          <Card size="small">
            <Radio.Group
              value={analysisStep}
              onChange={e => setAnalysisStep(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="correlation">相关性分析</Radio.Button>
              <Radio.Button value="importance">重要性分析</Radio.Button>
            </Radio.Group>
          </Card>

          {analysisStep === 'correlation' ? (
            <CorrelationAnalysis />
          ) : (
            <ImportanceAnalysis />
          )}

          <Button
            type="primary"
            icon={<RightCircleOutlined />}
            onClick={onNext}
            style={{ marginTop: 16 }}
          >
            继续分布检验
          </Button>
        </>
      )}
    </Space>
  );
};
