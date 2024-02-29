import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface IProps<FormValues extends FieldValues>
  extends UseControllerProps<FormValues> {
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function FormInput<FormValues extends FieldValues>({
  label,
  inputProps,
  ...props
}: IProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div className="flex flex-col gap-[6px]">
      {!!label && (
        <label className="text-ccBlack font-medium text-sm">{label}</label>
      )}
      <input
        {...field}
        {...inputProps}
        className={`bg-ccFormBg text-xs text-ccBlack py-4 px-2 rounded-[10px] ${!!fieldState.error ? "border-red-600 border-[1px]" : ""} ${
          inputProps?.className ?? ""
        }`}
      />
      {!!fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
    </div>
  );
}
