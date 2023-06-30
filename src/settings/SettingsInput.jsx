export function SettingsInput({ label, name, value, setValue, type = "number", min = 1, max = 5 }) {
  return (
    <>
      <div className="form-input">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          id={name}
          name={name}
          min={min}
          max={max}
        />
      </div>
      {/* <hr /> */}
    </>
  );
}
