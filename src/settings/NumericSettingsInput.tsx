import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type NumericSettingsInputProps = {
  label: string;
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min?: number;
  max?: number;
};

export function NumericSettingsInput({ label, name, value, setValue, min = 1, max = 5 }: NumericSettingsInputProps) {

  const setValueMinMax = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (newValue < min) {
      setValue(min);
    } else if (newValue > max) {
      setValue(max);
    } else {
      setValue(newValue);
    }
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label} ({min} to {max})</label>
      <input
        value={value}
        onChange={setValueMinMax}
        pattern={"[0-9]*"}
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
      />
    </div>
  );
}