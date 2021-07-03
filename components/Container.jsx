import { cloneElement } from 'react'

export default ({ renderer, children = <div />, styles = {} }) => {
  return cloneElement(renderer, {
    style: Object.assign({}, styles, {
      width: '100%',
      maxWidth: '1200px',
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    children,
  })
}
