//Loadin State Helper Function
export const removeLoadingState = (loading: string[], type: string): string[] => {
  return loading.filter(l => !l.includes(type));
};

interface IsActiveArgs {
  currentPath: string;
  linkPath: string;
}
export const isActive = ({ currentPath, linkPath }: IsActiveArgs): boolean => {
  if (currentPath === linkPath) return true;
  return false;
};
