import { databaseRoleProblem } from "./database-role.ts"

const failures: string[] = []
function check(name: string, condition: boolean) {
  if (!condition) failures.push(name)
}

check("unset is allowed", databaseRoleProblem(undefined) === null)
check("blank is allowed", databaseRoleProblem("  ") === null)
const owner = databaseRoleProblem("postgresql://neondb_owner:secret-value@ep.example/neondb")
check("owner login is refused", owner === "The database login is an owner account. Use a limited application login.")
check("owner error hides the secret", owner !== null && !owner.includes("secret-value"))
check("postgres login is refused", databaseRoleProblem("postgres://postgres:pw@localhost/app") !== null)
check("mysql is refused", databaseRoleProblem("mysql://app:pw@localhost/app") === "The database address must be Postgres.")
check("limited login is allowed", databaseRoleProblem("postgresql://myscapez_app:pw@ep.example/neondb") === null)
check("missing password is refused", databaseRoleProblem("postgresql://myscapez_app@ep.example/neondb") !== null)

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log("database-role checks passed")
