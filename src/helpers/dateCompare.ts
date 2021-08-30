import DateFnsAdapter from '@date-io/date-fns';

const { isSameDay, isSameMonth, isSameYear } = new DateFnsAdapter();

export default function compareDates(value: Date, comparing: Date): boolean {
  return (
    isSameYear(value, comparing) &&
    isSameMonth(value, comparing) &&
    isSameDay(value, comparing)
  );
}
