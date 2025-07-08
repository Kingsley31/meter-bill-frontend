'use client';
import { AsyncPaginate } from 'react-select-async-paginate';
import type { GroupBase } from 'react-select';
import type { AsyncPaginateProps } from 'react-select-async-paginate';
import { useState } from 'react';

export type OptionType = {
  value: string;
  label: string;
};

export type Additional = {
  page: number;
};

export type SetFormValue = (option: OptionType | null) => void;

export type LoadOptions = AsyncPaginateProps<OptionType, GroupBase<OptionType>, Additional, false>['loadOptions'];

type PaginatedAsyncSelectProps = {
  setFormValue: SetFormValue;
  loadOptions: LoadOptions;
  placeholder?: string;
  defaultValue?: OptionType;
};

const PaginatedAsyncSelect = ({setFormValue, loadOptions, defaultValue ,placeholder}:PaginatedAsyncSelectProps) => {
  const [value, setValue] = useState<OptionType | null>(defaultValue??null);

  return (
    <AsyncPaginate<OptionType, GroupBase<OptionType>, Additional>
      value={value}
      loadOptions={loadOptions}
      onChange={(newValue) => { setValue(newValue); setFormValue(newValue); }}
      additional={{ page: 1 }}
      debounceTimeout={300}
      placeholder={placeholder || "Select an option..."}
    />
  );
};
export default PaginatedAsyncSelect;