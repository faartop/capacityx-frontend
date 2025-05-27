
const validaStatus = (date1: string | Date, date2?: string | Date): boolean => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  if (!d1 || isNaN(d1.getTime()) || d1 > hoje) {
    return false;
  }

  if (!date2) {
    return true;
  }

  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return !d2 || isNaN(d2.getTime()) || d2 >= hoje;
};

