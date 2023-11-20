import { useCallback, useState} from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggleValue = useCallback(() => setValue(prev => !prev), [value]);

  return [value, toggleValue];
};

export default useToggle;
