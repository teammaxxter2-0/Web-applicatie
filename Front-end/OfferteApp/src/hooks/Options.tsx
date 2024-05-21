import {Material} from "../types/Materiaalsoort.ts";
import {useEffect, useState} from "react";

function useOptions() {
    const [data, setData] = useState<Material[]>([]);
    useEffect(() => {
        fetch("/api/Options")
            .then(res => {
                res.json()
                    .then(data => {
                        setData(data);
                    })
            });
    }, []);
    return data;
}

export default useOptions;