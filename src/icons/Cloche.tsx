import React from "react";

type PanProps = {
  number: number;
};

function Pan(props: PanProps) {
  return (
    <svg width="64" height="80" x="0px" y="0px" viewBox="0 0 64 64">
      <path
        d="M42.343,52.02c1.319,0,2.608-0.535,3.539-1.467l8.687-8.703c0.743-0.744,1.126-1.773,1.052-2.822  c-0.075-1.05-0.602-2.013-1.442-2.644c-1.283-0.962-3.073-0.962-4.354,0L43.667,41h-0.018c-0.564-1.178-1.758-2-3.149-2h-6.197  l-2.243-1.496C31.565,37.174,30.99,37,30.395,37H23.74c-0.716,0-1.409,0.256-1.952,0.722l-5.736,4.916l-1.345-1.345  c-0.391-0.391-1.023-0.391-1.414,0l-6,6c-0.391,0.391-0.391,1.023,0,1.414l13,13C20.488,61.902,20.744,62,21,62  s0.512-0.098,0.707-0.293l6-6c0.391-0.391,0.391-1.023,0-1.414L26.414,53l0.706-0.706c0.189-0.189,0.44-0.293,0.708-0.293  c0,0,0,0,0.001,0l14.508,0.019C42.339,52.02,42.341,52.02,42.343,52.02z M21,59.586L9.414,48L14,43.414L25.586,55L21,59.586z   M27.828,50.001c-0.802,0-1.556,0.312-2.122,0.879L25,51.586l-7.53-7.53l5.618-4.816C23.271,39.085,23.502,39,23.74,39h6.654  c0.198,0,0.39,0.058,0.555,0.168l2.496,1.664C33.609,40.941,33.803,41,34,41h6.5c0.827,0,1.499,0.672,1.5,1.498  c0,0.021-0.005,0.041-0.006,0.062c-0.003,0.081-0.008,0.161-0.024,0.239C41.834,43.484,41.148,44,40.371,44H31v2h9.371H40.5  c1.049,0,1.98-0.473,2.622-1.206c0.006-0.007,0.012-0.015,0.018-0.022c0.117-0.136,0.227-0.277,0.323-0.43  c0.045-0.07,0.08-0.147,0.12-0.221c0.055-0.104,0.114-0.204,0.158-0.314c0.061-0.149,0.105-0.307,0.145-0.466  c0.013-0.051,0.034-0.099,0.044-0.151c0.001-0.005,0.003-0.01,0.004-0.015c0.012-0.059,0.021-0.117,0.03-0.176H44  c0.217,0,0.427-0.07,0.6-0.2l6.424-4.817c0.574-0.432,1.378-0.432,1.954,0c0.378,0.283,0.613,0.715,0.647,1.187  c0.033,0.471-0.139,0.933-0.473,1.267l-8.687,8.703c-0.558,0.559-1.331,0.88-2.123,0.88c-0.001,0-0.002,0-0.004,0l-14.508-0.019  C27.83,50.001,27.829,50.001,27.828,50.001z" />
      <path d="M44,18v2c3.859,0,7,3.14,7,7h2C53,22.038,48.963,18,44,18z" />
      <path
        d="M61.587,29.212C59.547,17.419,49.745,9.474,36,8.188V5c0-1.654-1.346-3-3-3h-2c-1.654,0-3,1.346-3,3v3.188  C14.255,9.474,4.453,17.419,2.413,29.212C2.169,29.394,2,29.672,2,30v4c0,0.552,0.447,1,1,1h58c0.553,0,1-0.448,1-1v-4  C62,29.672,61.831,29.394,61.587,29.212z M30,8.047V5c0-0.551,0.448-1,1-1h2c0.552,0,1,0.449,1,1v3.047  c-0.046-0.002-0.093-0.001-0.139-0.003C33.247,8.018,32.628,8,32,8s-1.247,0.018-1.861,0.044C30.093,8.046,30.046,8.045,30,8.047z   M29.148,10.103c1.885-0.133,3.82-0.133,5.705,0C47.942,11.011,57.379,18.188,59.521,29H4.479  C6.621,18.188,16.058,11.011,29.148,10.103z M60,33H4v-2h56V33z" />

      <text x="33" y="28" textAnchor="middle" fill="black" fontSize="24px" fontFamily="sans-serif">
        {props.number}
      </text>
    </svg>
  );
}
export default Pan;
