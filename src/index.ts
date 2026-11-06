function utcCalendarDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}
export function dateRange(start: string, end: string): string[] {
  const parse = (s: string) => {
    if (typeof s !== 'string') throw new TypeError('Expected date text');
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) throw new RangeError('Expected YYYY-MM-DD');
    const y = Number(m[1]),
      mo = Number(m[2]),
      d = Number(m[3]),
      date = utcCalendarDate(y, mo, d);
    if (
      y < 1 ||
      date.getUTCFullYear() !== y ||
      date.getUTCMonth() !== mo - 1 ||
      date.getUTCDate() !== d
    )
      throw new RangeError('Invalid date');
    return date;
  };
  const from = parse(start),
    to = parse(end);
  if (from > to) throw new RangeError('Start must not follow end');
  const count = (to.getTime() - from.getTime()) / 86400000 + 1;
  if (count > 10000) throw new RangeError('Date range exceeds 10000 days');
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(from);
    date.setUTCDate(date.getUTCDate() + i);
    return date.toISOString().slice(0, 10);
  });
}
