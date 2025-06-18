import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../store/auth-provider';

const calculateCartTotal = (
  items: { price: number; quantity: number }[]
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const formatNumber = (number_: number): string => {
  return number_.toLocaleString('en-US');
};

const removeDuplicates = <T,>(array: T[]): T[] => {
  return [...new Set(array)];
};

describe('AuthProvider Component', () => {
  it('should provide auth context', () => {
    render(
      <AuthProvider>
        <div>Auth Content</div>
      </AuthProvider>
    );
    expect(screen.getByText('Auth Content')).toBeTruthy();
  });
});

describe('LocalStorage Utils', () => {
  it('should set and get item from localStorage', () => {
    const testKey = 'testKey';
    const testValue = 'testValue';

    localStorage.setItem(testKey, testValue);
    expect(localStorage.getItem(testKey)).toBe(testValue);
  });
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

describe('Price Formatting', () => {
  it('should format price correctly', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
    expect(formatPrice(99.99)).toBe('$99.99');
  });
});

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

describe('Email Validation', () => {
  it('should validate email addresses correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });
});

describe('Product Array Operations', () => {
  it('should filter products by category', () => {
    const products = [
      { id: 1, category: 'electronics' },
      { id: 2, category: 'clothing' },
      { id: 3, category: 'electronics' },
    ];

    const filteredProducts = products.filter(
      (p) => p.category === 'electronics'
    );
    expect(filteredProducts).toHaveLength(2);
  });
});

describe('Date Operations', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-03-20');
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    expect(formattedDate).toBe('March 20, 2024');
  });
});

describe('Object Operations', () => {
  it('should merge objects correctly', () => {
    const object1 = { a: 1, b: 2 };
    const object2 = { c: 3, d: 4 };
    const merged = { ...object1, ...object2 };

    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
});

const capitalize = (string_: string): string => {
  return string_.charAt(0).toUpperCase() + string_.slice(1);
};

describe('String Operations', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });
});

const calculateTotal = (price: number, taxRate: number): number => {
  return price + price * taxRate;
};

describe('Number Operations', () => {
  it('should calculate total with tax', () => {
    expect(calculateTotal(100, 0.1)).toBe(110);
    expect(calculateTotal(50, 0.2)).toBe(60);
  });
});

describe('Cart Operations', () => {
  it('should calculate cart total correctly', () => {
    const cartItems = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 },
      { price: 75, quantity: 1 },
    ];

    expect(calculateCartTotal(cartItems)).toBe(425);
  });
});

describe('Number Formatting', () => {
  it('should format numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1_000_000)).toBe('1,000,000');
    expect(formatNumber(123)).toBe('123');
  });
});

describe('Array Operations', () => {
  it('should remove duplicates from array', () => {
    const numbers = [1, 2, 2, 3, 3, 4, 5, 5];
    expect(removeDuplicates(numbers)).toEqual([1, 2, 3, 4, 5]);

    const strings = ['apple', 'banana', 'apple', 'cherry', 'banana'];
    expect(removeDuplicates(strings)).toEqual(['apple', 'banana', 'cherry']);
  });
});

describe('Date Operations Extended', () => {
  it('should calculate date difference in days', () => {
    const calculateDaysDifference = (date1: Date, date2: Date): number => {
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const date1 = new Date('2024-03-20');
    const date2 = new Date('2024-03-25');
    expect(calculateDaysDifference(date1, date2)).toBe(5);
  });
});
