import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useRegisterCaseModal } from '../context/RegisterCaseContext'

/** Opens the register modal then replaces URL with `/cases` (legacy `/cases/new` links). */
export function OpenRegisterThenCases() {
  const { openRegister } = useRegisterCaseModal()

  useEffect(() => {
    openRegister()
  }, [openRegister])

  return <Navigate to="/cases" replace />
}
