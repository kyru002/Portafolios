export function useTilt() {
  function updateTilt(element, event) {
    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const rotateY = (x - 0.5) * 10
    const rotateX = (0.5 - y) * 10

    element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    element.style.setProperty('--glow-x', `${(x * 100).toFixed(2)}%`)
    element.style.setProperty('--glow-y', `${(y * 100).toFixed(2)}%`)
  }

  function resetTilt(element) {
    element.style.setProperty('--tilt-x', '0deg')
    element.style.setProperty('--tilt-y', '0deg')
    element.style.setProperty('--glow-x', '50%')
    element.style.setProperty('--glow-y', '50%')
  }

  return { updateTilt, resetTilt }
}
