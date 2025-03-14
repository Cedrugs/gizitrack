import {
    forwardRef,
    InputHTMLAttributes,
    useImperativeHandle,
} from 'react';

interface RadioInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void; // Custom onChange function
}

export default forwardRef(function RadioInput(
    {
        label = '',
        options,
        value,
        onChange,
        className = '',
        ...props
    }: RadioInputProps,
    ref,
) {
    useImperativeHandle(ref, () => ({
        focus: () => {
            const radio = document.querySelector(`input[name="${props.name}"]`) as HTMLInputElement | null;
            radio?.focus();
        },
    }));

    return (
        <div className={`mt-2 ${className}`}>
            <div className="flex items-center space-x-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            name={props.name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)} // Notify parent on change
                            {...props}
                            className="mr-2"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
});