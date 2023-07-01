export function SettingsInput({ label, name, value, setValue, type = "number", min = 1, max = 5 }) {
  const setValueWithType = (e) => {
    if (type === "number") {
      setValue(parseInt(e.target.value));
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input value={value} onChange={setValueWithType} type={type} id={name} name={name} min={min} max={max} />
    </div>
  );
}
