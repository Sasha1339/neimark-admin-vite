import { useEffect, useState } from 'react';

export function useMediaQuery(queryForMobile: string) {
  const [isMobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryForPhone = window.matchMedia(queryForMobile);
    setMobile(mediaQueryForPhone.matches);
    // Установка начального значения

    const handleChangeForPhone = (event: any) => {
      setMobile(event.matches);
    };

    // Современный API
    mediaQueryForPhone.addEventListener('change', handleChangeForPhone);
    // Для совместимости: mediaQuery.addListener(handleChange);

  }, [queryForMobile]);

  return { isMobile };
}
