export default function InputWithDataList({
  optionsArray = [],
  value,
  onChange,
  disabled,
}) {
  const dataListId = value || "add";
  return (
    <>
      <input
        list={dataListId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />

      <datalist id={dataListId}>
        {optionsArray.map((opt, index) => {
          return <option key={`data-opt-${index}`} value={opt} />;
        })}
      </datalist>
    </>
  );
}
