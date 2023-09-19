import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      navigate('/')
    }
  }, [])

  return (
    <div className='layout p-1'>
      <div className='header flex items-center justify-between p-2 bg-white'>
        <h2 className='cursor-pointer' onClick={() => navigate('/')}>
          <strong className='text-blue-500'>SHEY</strong>
          <strong className='text-purple-500'> HEALTHY</strong>
        </h2>

        {user && (
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <h4
                className='text-blue-800 underline uppercase cursor-pointer'
                onClick={() => {
                  if (user.role === 'admin') navigate('/admin')
                  else navigate('/profile')
                }}
              >
                {user.firstName} {user.lastName}
              </h4>
            </div>

            <button
              className='p-2 text-white bg-blue-800 rounded-lg'
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}
            >
              Signout
            </button>
          </div>
        )}
      </div>
      <div className='content my-1'>{children}</div>
    </div>
  )
}

export default ProtectedRoute
