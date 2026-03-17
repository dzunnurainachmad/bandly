import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '@/components/ui/Select'

const options = [
  { value: '1', label: 'Jakarta' },
  { value: '2', label: 'Bandung' },
  { value: '3', label: 'Surabaya' },
]

describe('Select', () => {
  it('renders placeholder when no value selected', () => {
    render(<Select options={options} value="" onChange={() => {}} placeholder="Pilih kota" />)
    expect(screen.getByText('Pilih kota')).toBeInTheDocument()
  })

  it('renders selected option label', () => {
    render(<Select options={options} value="2" onChange={() => {}} />)
    expect(screen.getByText('Bandung')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Select options={options} value="" onChange={() => {}} label="Kota" />)
    expect(screen.getByText('Kota')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<Select options={options} value="" onChange={() => {}} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Jakarta')).toBeInTheDocument()
    expect(screen.getByText('Bandung')).toBeInTheDocument()
    expect(screen.getByText('Surabaya')).toBeInTheDocument()
  })

  it('calls onChange when option is selected', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} value="" onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Jakarta'))
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('deselects when clicking the already selected option', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={options} value="1" onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    // "Jakarta" appears in both the trigger and the dropdown, use getAllByText
    const matches = screen.getAllByText('Jakarta')
    await user.click(matches[matches.length - 1]) // click the one in the dropdown
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Select options={options} value="" onChange={() => {}} disabled />)
    await user.click(screen.getByRole('button'))
    expect(screen.queryByText('Jakarta')).not.toBeInTheDocument()
  })

  it('filters options when searchable', async () => {
    const user = userEvent.setup()
    render(<Select options={options} value="" onChange={() => {}} searchable />)
    await user.click(screen.getByRole('button'))
    const searchInput = screen.getByPlaceholderText('Cari...')
    await user.type(searchInput, 'ban')
    expect(screen.getByText('Bandung')).toBeInTheDocument()
    expect(screen.queryByText('Jakarta')).not.toBeInTheDocument()
    expect(screen.queryByText('Surabaya')).not.toBeInTheDocument()
  })
})
