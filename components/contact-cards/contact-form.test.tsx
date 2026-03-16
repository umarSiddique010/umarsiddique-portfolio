import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import ContactForm from './contact-form';

// Mock: server action import
vi.mock('@/lib/action', () => ({
  submitContactForm: vi.fn(),
}));

// Mock: shadcn Button
vi.mock('@/components/ui/button', () => {
  type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    size?: string;
  };

  return {
    Button: ({ children, ...props }: Props) => (
      <button {...props}>{children}</button>
    ),
  };
});

// Mock: React useActionState
const useActionStateMock = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useActionState: (...args: unknown[]) => useActionStateMock(...args),
  };
});

type StateShape = {
  errors?: Partial<
    Record<'name' | 'email' | 'intent' | 'otherIntent' | 'message', string[]>
  >;
  message?: string | null;
  success?: boolean;
  fields?: Partial<
    Record<'name' | 'email' | 'intent' | 'otherIntent' | 'message', string>
  >;
};

const baseState: StateShape = {
  errors: {},
  message: null,
  success: false,
  fields: { name: '', email: '', intent: '', otherIntent: '', message: '' },
};

const makeHookReturn = (state: StateShape, pending = false) => {
  const formAction = vi.fn();
  useActionStateMock.mockReturnValue([state, formAction, pending]);
  return { formAction };
};

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setup = () => render(<ContactForm />);

  it('renders core fields and intent select', () => {
    makeHookReturn(baseState, false);
    setup();

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Intent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Submit Message/i }),
    ).toBeInTheDocument();
  });

  it('shows "Please Specify" input when intent is set to other', () => {
    makeHookReturn(baseState, false);
    setup();

    expect(screen.queryByLabelText(/Please Specify/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Intent/i), {
      target: { value: 'other' },
    });

    expect(screen.getByLabelText(/Please Specify/i)).toBeInTheDocument();
  });

  it('disables inputs and button while pending and shows Sending...', () => {
    makeHookReturn(baseState, true);
    setup();

    expect(screen.getByLabelText(/Full Name/i)).toBeDisabled();
    expect(screen.getByLabelText(/Email Address/i)).toBeDisabled();
    expect(screen.getByLabelText(/Intent/i)).toBeDisabled();
    expect(screen.getByLabelText(/Message/i)).toBeDisabled();

    const btn = screen.getByRole('button', { name: /Sending/i });
    expect(btn).toBeDisabled();
  });

  it('renders field errors under inputs', () => {
    const stateWithErrors: StateShape = {
      ...baseState,
      errors: {
        name: ['Name is too short'],
        email: ['Invalid email address'],
        intent: ['Please select an intent'],
        message: ['Message must be at least 10 characters'],
      },
    };

    makeHookReturn(stateWithErrors, false);
    setup();

    expect(screen.getByText(/Name is too short/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select an intent/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Message must be at least 10 characters/i),
    ).toBeInTheDocument();
  });
});
