import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Pagination } from './pagination'

describe('Pagination', () => {
  it('should render the pagination', () => {
    const onChange = vi.fn()
    const { queryByText } = render(
      <Pagination total={10} page={1} onChange={onChange} />,
    )
    expect(queryByText('1')).toBeDefined()
    expect(queryByText('2')).toBeDefined()
    expect(queryByText('9')).toBeDefined()
    expect(queryByText('10')).toBeDefined()
    expect(queryByText('Next')).toBeDefined()
    expect(queryByText('Previous')).toBeNull()
  })

  it('should go to the next page', async () => {
    const onChange = vi.fn()
    const { queryByText, getByText } = render(
      <Pagination total={10} page={1} onChange={onChange} />,
    )
    await userEvent.click(getByText('Next'))
    expect(queryByText('3')).toBeDefined()
    expect(queryByText('Previous')).toBeDefined()
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
