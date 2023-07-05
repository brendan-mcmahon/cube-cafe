import React from "react";

type StarProps = {
  text: string | number;
};

export default function Star(props: StarProps) {
  return (
    <div className="star">
      <svg x="0px" y="0px" viewBox="0 0 28 26.83">
        <path
          fill="yellow"
          d="M 5.7881 17.3272 L 4.5781 24.3804 C 4.4414 25.1729 4.7607 25.9585 5.4111 26.4317 S 6.9082 26.9654 7.6201 26.5918 L 13.9551 23.2612 H 14.0449 L 20.3809 26.5918 C 20.6904 26.7544 21.0244 26.835 21.3584 26.835 C 21.791 26.8345 22.2217 26.6987 22.5889 26.4317 C 23.2393 25.9585 23.5586 25.1729 23.4219 24.3814 L 22.2402 17.2417 L 27.3662 12.2456 C 27.9414 11.6841 28.1445 10.8604 27.8955 10.0962 C 27.6475 9.3316 26.999 8.7847 26.2031 8.669 L 19.0479 7.5869 L 15.8799 1.1685 C 15.5244 0.4478 14.8037 0 14 0 S 12.4756 0.4478 12.1201 1.1685 L 8.8799 7.6397 L 1.7969 8.669 C 1.001 8.7847 0.3525 9.3316 0.1045 10.0962 C -0.1445 10.8604 0.0586 11.6841 0.6338 12.2461 L 5.7881 17.3272 Z"
        />
      </svg>
      <span className="star-text">{props.text}</span>
    </div>
  );
}
