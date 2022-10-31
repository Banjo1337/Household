export function newDateInClientTimezone(): Date {
  const now: number = new Date().getTime();
  return new Date(now - new Date().getTimezoneOffset() * 60000);
}
