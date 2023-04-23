type HamburgerProps = {
  color: string,
}

export const Hamburger = ({ color }: HamburgerProps) => {
  return (
    <svg
      width="30"
      height="20"
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      data-svg="navbar-toggle-icon">
      <rect y="9" width="30" height="2" fill={color}></rect>
      <rect y="3" width="30" height="2" fill={color}></rect>
      <rect y="15" width="30" height="2" fill={color}></rect>
    </svg>
  );
};
