import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitBtn = () => {

    const {pending} = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit">
        {pending ? 'Submitting...' : 'Save'}
    </button>
  )
}

export default SubmitBtn