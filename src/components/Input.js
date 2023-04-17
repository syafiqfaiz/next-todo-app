
const Input = ({registerBuilder, placeholder, label, type, inputName, error}) => {
  return (
    <div className="m-2">
      {label && (
        <label >{label}</label>
      )}
      <input
        className={`p-2 rounded border-2  w-full ${error ? 'border-red-400' : 'border-gray-200'} `}
        {...registerBuilder} 
        placeholder={placeholder}
        type={type || 'text'}
      />
      {error && <span className='text-red-400'>{label || inputName} is required</span>}
    </div>
  )
}

export default Input
