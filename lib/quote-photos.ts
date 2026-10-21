export const MAX_QUOTE_PHOTOS = 6
export const MAX_QUOTE_PHOTO_BYTES = 5_000_000

const fileKeys = new Set(["photo", "photos", "file", "files", "image", "images", "dataUrl", "blob", "address", "street", "streetAddress"])

export function photoKind(bytes: Uint8Array) {
  if (bytes.length < 12) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg"
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png"
  const webp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46
    && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  return webp ? "webp" : null
}

export async function acceptedPhotoCount(files: File[]) {
  let count = 0
  for (const file of files.slice(0, MAX_QUOTE_PHOTOS)) {
    if (file.size < 12 || file.size > MAX_QUOTE_PHOTO_BYTES) continue
    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    if (photoKind(header)) count += 1
  }
  return { count, rejected: files.length - count }
}

/** A JSON body must not carry a photo, a file, or a data URL. */
export function uploadAttempt(value: Record<string, unknown>) {
  for (const [key, item] of Object.entries(value)) {
    if (fileKeys.has(key)) return true
    if (typeof item === "string" && /data:[^,]*;base64,/i.test(item)) return true
  }
  return false
}
