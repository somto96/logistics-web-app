//Loadin State Helper Function
export const removeLoadingState = (loading: string[], type: string): string[] => {
  return loading.filter(l => !l.includes(type));
};
