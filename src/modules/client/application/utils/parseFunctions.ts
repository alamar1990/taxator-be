export function parseName(line) {
  const name = line
    .split(' ')
    .filter((s) => s !== '')
    .join(' ')
  return name
}
