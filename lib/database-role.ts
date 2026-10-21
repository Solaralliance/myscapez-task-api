const ownerLogins = new Set(["postgres", "root", "admin", "neondb_owner"])

/** Empty means no database is configured. A set address must be a limited Postgres login. */
export function databaseRoleProblem(url: string | undefined) {
  const value = url?.trim()
  if (!value) return null
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return "The database address is not usable."
  }
  if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") {
    return "The database address must be Postgres."
  }
  const user = decodeURIComponent(parsed.username).toLowerCase()
  if (!user || ownerLogins.has(user)) {
    return "The database login is an owner account. Use a limited application login."
  }
  if (!parsed.password) return "The database login is missing its password."
  return null
}
