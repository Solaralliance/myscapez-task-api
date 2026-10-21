import { photoKind, uploadAttempt } from "./quote-photos.ts"

const failures: string[] = []
function check(name: string, condition: boolean) {
  if (!condition) failures.push(name)
}

const jpeg = new Uint8Array(12)
jpeg.set([0xff, 0xd8, 0xff])
const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0, 0, 0, 0, 0])
const webp = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50])
const svg = new TextEncoder().encode("<svg></svg>")
check("jpeg", photoKind(jpeg) === "jpeg")
check("png", photoKind(png) === "png")
check("webp", photoKind(webp) === "webp")
check("svg", photoKind(svg) === null)
check("file key", uploadAttempt({ photos: ["lawn.jpg"] }) === true)
check("data url", uploadAttempt({ note: "data:image/png;base64,aaaa" }) === true)
check("plain job", uploadAttempt({ photoCount: 2, suburb: "North Lakes" }) === false)
check("street", uploadAttempt({ street: "1 Private Street" }) === true)

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log("quote-photo checks passed")
