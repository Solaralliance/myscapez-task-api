import { noteAbuse, reportCode } from "./incident.ts"

const lines: string[] = []
const original = console.error
console.error = (value?: unknown) => {
  lines.push(String(value ?? ""))
}

const failures: string[] = []
function check(name: string, condition: boolean) {
  if (!condition) failures.push(name)
}

check("email refused", reportCode("ada@example.com secret") === "")
check("coded", reportCode("form-error") === "myscapez form-error")
check("quiet", noteAbuse("one") === "" && noteAbuse("one") === "")
check("third", noteAbuse("one") === "myscapez form-abuse")
check("once", noteAbuse("one") === "")
check("no key", lines.every((line) => !line.includes("one") && !line.includes("ada@")))

console.error = original
if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log("incident checks passed")
