import { useState } from 'react'
import { WarningIcon } from '@phosphor-icons/react'

export type InputProps = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  inputRef?: React.Ref<HTMLInputElement>
  className?: string
  prefix: string
  errorMessage?: string
}

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  prefix,
  inputRef,
  onBlur,
}: InputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleFocus = () => {
    setIsInputFocused(true)
  }

  // console.log(errorMessage);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor=""
        className={`font-semibold ${isInputFocused ? 'text-blue-base' : 'text-gray-500'}`}
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={isInputFocused ? '' : placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-[15px] text-gray-600 focus-within:border-blue-base focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-base transition-colors placeholder:text-gray-400"
        value={value}
        onChange={e => {
          const inputValue = e.target.value
          if (
            inputValue.startsWith(prefix) &&
            inputValue.length > prefix.length
          ) {
            onChange(e)
          } else if (
            inputValue.startsWith(prefix) &&
            inputValue.length === prefix.length
          ) {
            // Create a synthetic event with empty value
            const syntheticEvent = {
              ...e,
              target: {
                ...e.target,
                value: '',
              },
            }
            onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
          } else if (!inputValue.startsWith(prefix)) {
            // Create a synthetic event with prefixed value
            const syntheticEvent = {
              ...e,
              target: {
                ...e.target,
                value: `${prefix}${inputValue}`,
              },
            }
            onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
          }
        }}
        onFocus={handleFocus}
        onBlur={e => {
          setIsInputFocused(false)
          onBlur && onBlur()
        }}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label={label}
      />
      {errorMessage && (
        <div className="flex flex-row gap-2 items-center">
          <WarningIcon size={16} color="#B12C4D" />
          <span className="text-gray-500">{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
