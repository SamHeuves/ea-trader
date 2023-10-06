export default function (searching: boolean) {
  return new Promise<void>(function (resolve, reject) {
    if (searching) {
      resolve()
    } else {
      reject()
    }
  })
}
