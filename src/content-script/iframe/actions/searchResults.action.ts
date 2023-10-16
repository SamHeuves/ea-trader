import click from '../actions/click.action'

export default function searchResults(results: number, searching: boolean) {

  return new Promise<number | void>(function (resolve, reject) {
    switch (true) {
      case results == 0:
        setTimeout(() => {

          click('.ut-navigation-button-control').then(() => {
            reject(searching)
          })
        }, 1000)
        break
      case results > 10:
        searching = false
        reject(searching)
        break
      default:
        resolve()
    }

  })
}
