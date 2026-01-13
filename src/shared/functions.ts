export const withUrlImages = (id: string) => {
  return `https://resto-mate.ru/images/api/v1/images?fileName=${id}`;
}

export function formatDate(line: string): string {
  const date = new Date(line);
  return date.toLocaleString('ru-RU');
}