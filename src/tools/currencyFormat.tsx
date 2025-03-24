export const formatCurrency = (symbol: string, number: number) => {
    return `${
      `${symbol} ` + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }`;
  };