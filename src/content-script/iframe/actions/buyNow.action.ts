export default function buyNowInput(iFrame: HTMLIFrameElement) {
  const buyNowInput = document
    .querySelectorAll('.price-filter')[3]
    .querySelectorAll('input')[0]

  const buttons = document
    .querySelectorAll('.price-filter')[3]
    .querySelectorAll('button')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (iFrame.contentWindow) {
        iFrame.contentWindow.postMessage(
          {
            action: 'buyNowChanged',
            value: buyNowInput.value.replaceAll(',', '').replaceAll('.', ''),
          },
          '*'
        )
      }
    })
  })

  buyNowInput.addEventListener('blur', () => {
    if (iFrame.contentWindow) {
      iFrame.contentWindow.postMessage(
        {
          action: 'buyNowChanged',
          value: buyNowInput.value.replaceAll(',', '').replaceAll('.', ''),
        },
        '*'
      )
    }
  })

  buyNowInput.addEventListener('change', () => {
    if (iFrame.contentWindow) {
      iFrame.contentWindow.postMessage(
        {
          action: 'buyNowChanged',
          value: buyNowInput.value.replaceAll(',', '').replaceAll('.', ''),
        },
        '*'
      )
    }
  })
}
