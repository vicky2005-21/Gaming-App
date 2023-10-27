import React from "react";

export const useCountDown = (initialValue = 10) => {
  const [countDown, setCountDown] = React.useState(initialValue);
  const countDownrRef = React.useRef(countDown);

  React.useEffect(() => {
    const countDownrId = setInterval(() => {
      countDownrRef.current -= 1;
      if (countDownrRef.current < 0) {
        clearInterval(countDownrId);
      } else {
        setCountDown(countDownrRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(countDownrId);
    };
  }, []);
  return { countDown };
};
