const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
  options,
}) => {
  const baseClass =
    'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100';

  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-500"> *</span> : null}
      </span>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={baseClass}
        />
      ) : options ? (
        <select name={name} value={value} onChange={onChange} required={required} className={baseClass}>
          <option value="">Select {label}</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </label>
  );
};

export default FormInput;

