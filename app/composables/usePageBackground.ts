export function usePageBackground() {
  const bgImage = useState<string>('pageBackground', () => '')
  const bgKey = useState<string>('pageBackgroundKey', () => '')
  const bgTransform = useState<string>('pageBackgroundTransform', () => '')

  function setBackground(image: string, key: string, transform = '') {
    bgImage.value = image
    bgKey.value = key
    bgTransform.value = transform
  }

  function clearBackground() {
    bgImage.value = ''
    bgKey.value = ''
    bgTransform.value = ''
  }

  return { bgImage, bgKey, bgTransform, setBackground, clearBackground }
}
