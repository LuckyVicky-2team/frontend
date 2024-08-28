// eslint-disable-next-line no-unused-vars
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
  // eslint-disable-next-line no-unused-vars
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line no-unused-vars
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    // eslint-disable-next-line no-unused-vars
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
