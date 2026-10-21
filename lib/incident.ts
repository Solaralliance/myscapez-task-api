const refusals = new Map<string, number>()

const codes = new Set(["form-error", "form-abuse"])

/** One fixed line. Callers must not pass request text, an address, or a key. */
export function reportCode(code: string) {
  if (!codes.has(code)) return ""
  const line = `myscapez ${code}`
  console.error(line)
  return line
}

/** The third refusal from the same key on this server writes one abuse line. The key is not written. */
export function noteAbuse(key: string) {
  const count = (refusals.get(key) ?? 0) + 1
  refusals.set(key, count)
  if (count === 3) return reportCode("form-abuse")
  return ""
}
