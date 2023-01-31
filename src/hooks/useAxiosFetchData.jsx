import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetchData = (urlData) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        let sourse = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const resp = await axios.get(url, {
                    cancelToken: sourse.token,
                });
                if (isMounted) {
                    setData(resp.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData(urlData);

        return () => {
            isMounted = false;
            sourse.cancel();
        };
    }, [urlData]);

    return { data, isLoading, fetchError };
};

export default useAxiosFetchData;
