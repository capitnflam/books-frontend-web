import { useEffect, useState } from 'react'

interface Props {
  readonly paragraphCount?: number
}

export function LoremIpsum({ paragraphCount = 5 }: Props) {
  const [data, setData] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(
      `https://baconipsum.com/api/?type=meat-and-filler&paras=${paragraphCount}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }
        return response.json()
      })
      .then((responseData: string[] | null) => {
        setData(responseData)
        setError(null)
      })
      .catch((error_: Error) => {
        setError(error_)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [paragraphCount])

  if (loading || error) {
    return <div></div>
  }

  if (data) {
    return (
      <div>
        {data.map((element, index) => (
          <p key={`lorem-${index}`}>{element}</p>
        ))}
      </div>
    )
  }

  return <div></div>
}
