export default function buyNowInput(iFrame: HTMLIFrameElement) {
  const buyNowInput = document
    .querySelectorAll('.price-filter')[3]
    .getElementsByTagName('input')[0]

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
}
