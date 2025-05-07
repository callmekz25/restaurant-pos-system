const getDaysByMonthYear = (month: number, year: number) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Satur"];
  const result = [];

  // Tính số ngày trong tháng
  const daysInMonth = new Date(year, month, 0).getDate(); // tháng truyền vào dạng 1–12

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month - 1, i); // JS tháng từ 0-11
    const weekday = weekdays[date.getDay()];
    result.push({ day: i, weekday });
  }

  return result;
};
export default getDaysByMonthYear;
