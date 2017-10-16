import arrify from "arrify";

export default function split(string, fieldsSize, { separatorSize = 0 } = {}) {
  let runningTotal = 0;
  const sizes = arrify(fieldsSize);
  const fields = sizes.map(size => {
    const part = string.slice(runningTotal, runningTotal + size);
    runningTotal += size + separatorSize;
    return part;
  });

  if (runningTotal >= string.length) {
    return fields;
  }

  const tail = string.slice(runningTotal);

  return fields.concat(tail);
}
