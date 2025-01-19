import { create } from 'zustand';

interface DataRecord {
  id: string;
  type: string;
  department: string;
  recordTime: string;
  size: string;
  status: string;
  data: any[];
}

interface DataStore {
  dataList: DataRecord[];
  addData: (data: any[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  dataList: [],
  addData: (data) => set((state) => ({
    dataList: [
      {
        id: `DAT${new Date().getTime()}`,
        type: '处理后数据',
        department: '数据分析',
        recordTime: new Date().toLocaleString(),
        size: `${(JSON.stringify(data).length / 1024).toFixed(1)}KB`,
        status: '已验证',
        data
      },
      ...state.dataList
    ]
  }))
}));
