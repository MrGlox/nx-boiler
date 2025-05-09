import { eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
// import { FieldError } from 'react-hook-form';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

import { cn } from '@repo/utils';

interface DatePickerProps {
  date: Date | undefined;
  // error?: FieldError;
  setDate: (date: Date | undefined) => void;
  endYear?: number;
  error?: boolean;
}

export function DatePicker({ date, setDate, endYear, error }: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(
    date ? date.getMonth() : new Date().getMonth(),
  );
  const [year, setYear] = React.useState<number>(
    date ? date.getFullYear() : new Date().getFullYear(),
  );

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const finalEndYear = endYear ?? currentYear; // Use endYear prop or fallback to current year
    return Array.from(
      { length: finalEndYear - 1950 + 1 },
      (_, i) => finalEndYear - i,
    );
  }, [endYear]);

  const months = React.useMemo(() => {
    if (year) {
      return eachMonthOfInterval({
        start: startOfYear(new Date(year, 0, 1)),
        end: endOfYear(new Date(year, 0, 1)),
      });
    }
    return [];
  }, [year]);

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  const handleYearChange = (selectedYear: string) => {
    const newYear = Number.parseInt(selectedYear, 10);
    setYear(newYear);
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(newYear);
      setDate(newDate);
    }
  };

  const handleMonthChange = (selectedMonth: string) => {
    const newMonth = Number.parseInt(selectedMonth, 10);
    setMonth(newMonth);
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newMonth);
      setDate(newDate);
    } else {
      setDate(new Date(year, newMonth, 1));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            error && 'border-destructive border-2',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-stretch pt-2 px-2 space-x-2">
          <Select onValueChange={handleMonthChange} value={month.toString()}>
            <SelectTrigger className="basis-1/2">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem
                  key={`month-${i}-${format(m, 'MMMM')}`}
                  value={i.toString()}
                >
                  {format(m, 'MMMM')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={year.toString()}>
            <SelectTrigger className="basis-1/2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          className="px-3 pt-0 pb-1"
          classNames={{
            caption: 'hidden',
            table: 'w-full border-collapse !mt-0',
            nav: 'hidden',
            head: 'hidden',
          }}
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(newMonth.getMonth());
            setYear(newMonth.getFullYear());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
