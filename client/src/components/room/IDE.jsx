import React from 'react'
import Editor from '@monaco-editor/react'

export default function IDE() {
  return (
    <div className=''>
        <div className='h-92'>
            <Editor
                height="100%"
                theme='vs-dark'
                language='javascript'
                defaultValue='// Start Coding...'
             />
        </div>
        <div className='secondary-bg h-56 primary-text'>
            <div className=' px-4 py-2'>
                <p>Terminal Output</p>
            </div>
        </div>
    
    </div>
  )
}
