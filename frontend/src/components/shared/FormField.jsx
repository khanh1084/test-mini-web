import React from "react";

function FormField({
  type = "text",
  label,
  name,
  value,
  onChange,
  options = [], // For select: [{ value: "val", label: "Label" }]
  required = false,
  placeholder,
  min,
  ...props
}) {
  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        >
          <option value="">
            {placeholder || `Chọn ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        {...props}
      />
    );
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      {renderInput()}
    </div>
  );
}

export default FormField;
