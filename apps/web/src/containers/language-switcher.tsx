import { useMemo } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';

import {
  getLocale,
  setLocale,
  locales,
  type Locale,
} from '@/paraglide/runtime.js';

// Hardcoded languages for demo purposes.
export const langs = [
  { label: '🇺🇸 English', value: 'en' },
  { label: '🇫🇷 Français', value: 'fr' },
];

export function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocale = getLocale();

  const pathname = location.pathname.replace(/\/$/, '');

  const { currentLanguage, resolvedLanguage } = useMemo(() => {
    return {
      currentLanguage: langs.filter(({ value }) => value === currentLocale)[0],
      resolvedLanguage: currentLocale,
    };
  }, [currentLocale]);

  return (
    <Select
      onValueChange={(value) => {
        setLocale(value as Locale);
        navigate({ to: location.pathname, search: { lng: value } });
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue
          key={resolvedLanguage}
          placeholder={currentLanguage.label}
        />
      </SelectTrigger>
      <SelectContent>
        {langs.map(({ label, value }) => (
          <SelectItem
            key={value}
            {...{ value }}
            className={currentLanguage.value === value ? 'hidden' : ''}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
