export const exportToCsv = (data: any[], filename: string) => {
  if (!data?.length) {
    console.error('No data to export');
    return;
  }

  try {
    // 获取所有列名
    const headers = Object.keys(data[0]);

    // 创建CSV内容
    const csvContent = [
      headers.join(','), // 表头
      ...data.map(row =>
        headers.map(header => {
          const cellData = row[header];
          // 处理特殊字符
          if (cellData == null) return '';
          if (typeof cellData === 'string') {
            // 如果包含特殊字符，用引号包裹并处理引号
            return /[,"\n\r]/.test(cellData)
              ? `"${cellData.replace(/"/g, '""')}"`
              : cellData;
          }
          return String(cellData);
        }).join(',')
      )
    ].join('\n');

    // 添加 BOM 以支持中文
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Export CSV error:', error);
    throw error;
  }
};
