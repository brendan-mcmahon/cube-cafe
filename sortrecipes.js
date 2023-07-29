let tuples = [
  ["white", "white", "white"],
  ["white", "white", "blue"],
  ["white", "white", "red"],
  ["white", "white", "yellow"],
  ["white", "white", "purple"],
  ["white", "blue", "white"],
  ["white", "blue", "blue"],
  ["white", "blue", "red"],
  ["white", "blue", "yellow"],
  ["white", "blue", "purple"],
  ["white", "red", "white"],
  ["white", "red", "blue"],
  ["white", "red", "red"],
  ["white", "red", "yellow"],
  ["white", "red", "purple"],
  ["white", "yellow", "white"],
  ["white", "yellow", "blue"],
  ["white", "yellow", "red"],
  ["white", "yellow", "yellow"],
  ["white", "yellow", "purple"],
  ["white", "purple", "white"],
  ["white", "purple", "blue"],
  ["white", "purple", "red"],
  ["white", "purple", "yellow"],
  ["white", "purple", "purple"],
  ["blue", "white", "white"],
  ["blue", "white", "blue"],
  ["blue", "white", "red"],
  ["blue", "white", "yellow"],
  ["blue", "white", "purple"],
  ["blue", "blue", "white"],
  ["blue", "blue", "blue"],
  ["blue", "blue", "red"],
  ["blue", "blue", "yellow"],
  ["blue", "blue", "purple"],
  ["blue", "red", "white"],
  ["blue", "red", "blue"],
  ["blue", "red", "red"],
  ["blue", "red", "yellow"],
  ["blue", "red", "purple"],
  ["blue", "yellow", "white"],
  ["blue", "yellow", "blue"],
  ["blue", "yellow", "red"],
  ["blue", "yellow", "yellow"],
  ["blue", "yellow", "purple"],
  ["blue", "purple", "white"],
  ["blue", "purple", "blue"],
  ["blue", "purple", "red"],
  ["blue", "purple", "yellow"],
  ["blue", "purple", "purple"],
  ["red", "white", "white"],
  ["red", "white", "blue"],
  ["red", "white", "red"],
  ["red", "white", "yellow"],
  ["red", "white", "purple"],
  ["red", "blue", "white"],
  ["red", "blue", "blue"],
  ["red", "blue", "red"],
  ["red", "blue", "yellow"],
  ["red", "blue", "purple"],
  ["red", "red", "white"],
  ["red", "red", "blue"],
  ["red", "red", "red"],
  ["red", "red", "yellow"],
  ["red", "red", "purple"],
  ["red", "yellow", "white"],
  ["red", "yellow", "blue"],
  ["red", "yellow", "red"],
  ["red", "yellow", "yellow"],
  ["red", "yellow", "purple"],
  ["red", "purple", "white"],
  ["red", "purple", "blue"],
  ["red", "purple", "red"],
  ["red", "purple", "yellow"],
  ["red", "purple", "purple"],
  ["yellow", "white", "white"],
  ["yellow", "white", "blue"],
  ["yellow", "white", "red"],
  ["yellow", "white", "yellow"],
  ["yellow", "white", "purple"],
  ["yellow", "blue", "white"],
  ["yellow", "blue", "blue"],
  ["yellow", "blue", "red"],
  ["yellow", "blue", "yellow"],
  ["yellow", "blue", "purple"],
  ["yellow", "red", "white"],
  ["yellow", "red", "blue"],
  ["yellow", "red", "red"],
  ["yellow", "red", "yellow"],
  ["yellow", "red", "purple"],
  ["yellow", "yellow", "white"],
  ["yellow", "yellow", "blue"],
  ["yellow", "yellow", "red"],
  ["yellow", "yellow", "yellow"],
  ["yellow", "yellow", "purple"],
  ["yellow", "purple", "white"],
  ["yellow", "purple", "blue"],
  ["yellow", "purple", "red"],
  ["yellow", "purple", "yellow"],
  ["yellow", "purple", "purple"],
  ["purple", "white", "white"],
  ["purple", "white", "blue"],
  ["purple", "white", "red"],
  ["purple", "white", "yellow"],
  ["purple", "white", "purple"],
  ["purple", "blue", "white"],
  ["purple", "blue", "blue"],
  ["purple", "blue", "red"],
  ["purple", "blue", "yellow"],
  ["purple", "blue", "purple"],
  ["purple", "red", "white"],
  ["purple", "red", "blue"],
  ["purple", "red", "red"],
  ["purple", "red", "yellow"],
  ["purple", "red", "purple"],
  ["purple", "yellow", "white"],
  ["purple", "yellow", "blue"],
  ["purple", "yellow", "red"],
  ["purple", "yellow", "yellow"],
  ["purple", "yellow", "purple"],
  ["purple", "purple", "white"],
  ["purple", "purple", "blue"],
  ["purple", "purple", "red"],
  ["purple", "purple", "yellow"],
  ["purple", "purple", "purple"],
];

function sortAndStringify(array) {
  return JSON.stringify(array.sort());
}

let uniqueTuples = tuples.filter((tuple, index, self) => {
  return (
    index ===
    self.findIndex((t) => {
      return sortAndStringify(t) === sortAndStringify(tuple);
    })
  );
});

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

  return d;
}
