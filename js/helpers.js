function applyStyles(el, styles) {
  for (let style in styles) {
    el.style[style] = styles[style];
  }
}

export {
  applyStyles
}