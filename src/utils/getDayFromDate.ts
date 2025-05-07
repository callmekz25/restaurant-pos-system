function getDayFromDate(dateStr: string): number | null {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  const day = parseInt(parts[2], 10);
  return isNaN(day) ? null : day;
}
export default getDayFromDate;
