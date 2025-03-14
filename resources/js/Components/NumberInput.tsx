import {
    forwardRef,
    InputHTMLAttributes,
    useImperativeHandle,
    useRef
} from 'react';

export default forwardRef(function NumberInput(
    {
        min = 1,
        value,
        onChange,
        className = '',
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { min?: number, value: number, onChange: (value: number) => void },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    const increment = () => {
        const newValue = value + 1;
        onChange(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(value - 1, min);
        onChange(newValue);
    };

    return (
        <div className={`mt-2 ${className}`}>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={decrement}
                    className="border border-gray-300 rounded-l px-4 py-2 bg-gray-200"
                >
                    -
                </button>
                <input
                    type="number"
                    ref={localRef}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...props}
                    className="border-t border-b border-gray-300 text-center w-16"
                />
                <button
                    type="button"
                    onClick={increment}
                    className="border border-gray-300 rounded-r px-4 py-2 bg-gray-200"
                >
                    +
                </button>
            </div>
        </div>
    );
});