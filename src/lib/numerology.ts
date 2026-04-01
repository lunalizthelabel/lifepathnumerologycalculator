export function reduceToSingleDigit(n: number): number {
  if ([11, 22, 33].includes(n)) return n;
  while (n > 9) {
    n = n
      .toString()
      .split('')
      .reduce((sum, d) => sum + parseInt(d), 0);
    if ([11, 22, 33].includes(n)) return n;
  }
  return n;
}

export function calculateLifePath(birthDate: string): number {
  // birthDate: YYYY-MM-DD
  // Sum ALL digits of the full date string (no separators)
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  return reduceToSingleDigit(digits.reduce((a, b) => a + b, 0));
}

export function calculatePersonalYear(birthDate: string): number {
  const [, month, day] = birthDate.split('-');
  const currentYear = new Date().getFullYear().toString();
  const digits = (day + month + currentYear).split('').map(Number);
  return reduceToSingleDigit(digits.reduce((a, b) => a + b, 0));
}

export function formatBirthDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}
