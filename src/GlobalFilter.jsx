import {useState} from 'react'
import { useAsyncDebounce } from 'react-table';

const TWO_HUNDRED_MS = 200;

export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, TWO_HUNDRED_MS);

    return (
        <input
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`Search`}
            className="p-2 border border-gray-300"
        />
    )
}