export function cx(...parts: Array<string | false | 0 | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
