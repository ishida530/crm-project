import { useState } from 'react';

const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const setLoader = (isLoading) => {
        setLoading(isLoading);  // Ustawienie statusu ładowania
    };

    return {
        loading,
        setLoader
    };
};

export default useLoading;
