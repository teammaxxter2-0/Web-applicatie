import {Material} from "../interfaces/Materiaalsoort.ts";
import {useEffect, useState} from "react";

function useOptions(): Material[];
function useOptions(id: string): Material;
function useOptions(id?: string): Material | Material[] {
    const [data, setData] = useState<Material | Material[]>(id ? {} as Material : []);

    useEffect(() => {
        const url = id ? `/api/Options/${id}` : "/api/Options";
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data));
    }, [id]);

    return data;
}

export default useOptions;