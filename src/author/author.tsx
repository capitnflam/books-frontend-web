import { useParams } from 'react-router-dom'

type ParametersKey = 'id'

export function Author() {
  const { id } = useParams<ParametersKey>()
  return <div>Author: {id}</div>
}
