import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Rock</Badge>)
    expect(screen.getByText('Rock')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Badge>Default</Badge>)
    const el = screen.getByText('Default')
    expect(el.className).toContain('bg-amber-100')
    expect(el.className).toContain('text-amber-800')
  })

  it('applies outline variant styles', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const el = screen.getByText('Outline')
    expect(el.className).toContain('border-stone-300')
    expect(el.className).toContain('text-stone-600')
  })

  it('applies green variant styles', () => {
    render(<Badge variant="green">Open</Badge>)
    const el = screen.getByText('Open')
    expect(el.className).toContain('bg-emerald-100')
    expect(el.className).toContain('text-emerald-800')
  })

  it('merges custom className', () => {
    render(<Badge className="mt-4">Custom</Badge>)
    const el = screen.getByText('Custom')
    expect(el.className).toContain('mt-4')
  })
})
