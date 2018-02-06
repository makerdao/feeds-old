import React from 'react'

const Link = (props) => {
  return (
    <a
      href={props.href}
      title={props.title || props.text || ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.text || props.href}
    </a>
  )
}

export default Link
