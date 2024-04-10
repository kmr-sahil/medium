import { ChangeEvent } from 'react'

interface InputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function Input({label, placeholder, onChange, type}: InputType) {
  return (
    <div className='flex flex-col gap-[0.25rem]'>
        <label className='pl-[0.25rem]' htmlFor={placeholder}>{label}</label>
        <input className='border rounded-[4px] p-[0.5rem]' onChange={onChange} type={type || "text"} name="" id={placeholder} placeholder={placeholder} />
    </div>
  )
}

export default Input