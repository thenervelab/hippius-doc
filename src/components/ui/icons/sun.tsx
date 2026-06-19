import { IconComponent } from "@site/src/types/icon-component";

export const Sun: IconComponent = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 13.75C12.0711 13.75 13.75 12.0711 13.75 10C13.75 7.92893 12.0711 6.25 10 6.25C7.92893 6.25 6.25 7.92893 6.25 10C6.25 12.0711 7.92893 13.75 10 13.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 1.66663V2.91663M10 17.0833V18.3333M3.51666 3.51663L4.40416 4.40413M15.5958 15.5958L16.4833 16.4833M1.66666 9.99996H2.91666M17.0833 9.99996H18.3333M3.51666 16.4833L4.40416 15.5958M15.5958 4.40413L16.4833 3.51663"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Sun;
