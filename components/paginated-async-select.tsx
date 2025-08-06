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

export type SetFormValue<OpType extends OptionType> = (option: OpType | null) => void;

export type LoadOptions<OpType extends OptionType> = AsyncPaginateProps<OpType, GroupBase<OpType>, Additional, false>['loadOptions'];

type PaginatedAsyncSelectProps<OpType extends OptionType> = {
  setFormValue: SetFormValue<OpType>;
  loadOptions: LoadOptions<OpType>;
  clearCacheOnMenuClose?: boolean;
  placeholder?: string;
  defaultValue?: OpType;
  disabled?: boolean;
  name?: string;
};

const PaginatedAsyncSelect = <OpType extends OptionType>({setFormValue, loadOptions, defaultValue ,placeholder,disabled,name,clearCacheOnMenuClose}:PaginatedAsyncSelectProps<OpType>) => {
  const [value, setValue] = useState<OpType | null>(defaultValue??null);

  return (
    <AsyncPaginate<OpType, GroupBase<OpType>, Additional>
      value={value}
      loadOptions={loadOptions}
      onChange={(newValue) => { setValue(newValue); setFormValue(newValue); }}
      additional={{ page: 1 }}
      debounceTimeout={300}
      name={name}
      clearCacheOnMenuClose={clearCacheOnMenuClose}
      isDisabled={disabled}
      placeholder={placeholder || "Select an option..."}
    />
  );
};
export default PaginatedAsyncSelect;