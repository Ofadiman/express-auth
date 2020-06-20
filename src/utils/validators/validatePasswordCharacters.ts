export const validatePasswordCharacters = (password: string): boolean => {
  if (!password.match(/[a-z]/)) return false
  if (!password.match(/[A-Z]/)) return false
  if (!password.match(/[0-9]/)) return false
  return true
}
