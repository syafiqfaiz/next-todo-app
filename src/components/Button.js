const Button = ({label, colourType, onClick}) => {

  let colourTypeClass

  switch (colourType) {
    case 'warning':
      colourTypeClass = "text-red-500 border-red-500 hover:text-white hover:bg-red-500"
      break;
  
    case 'success':
      colourTypeClass = "hover:text-white text-green-500 border-green-500 hover:bg-green-500"
      break;
    
    case 'info':
      colourTypeClass = "text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500"
      break;

    default:
      colourTypeClass = "hover:text-white text-black border-black-500 hover:bg-black"
      break;
  }

  return (
    <button
      className={`flex-no-shrink p-2 ml-2 border-2 rounded ${colourTypeClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
