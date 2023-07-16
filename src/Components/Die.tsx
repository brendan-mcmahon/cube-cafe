import React from "react";

type DieProps = {
  color: string;
  onClick: () => void;
};

export function Die(props: DieProps) {
  return (
    <div className={`die`}>
      <div onClick={props.onClick} className={`dot ${props.color}`}></div>
    </div>
  );
}
