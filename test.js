import test from "ava";
import split from ".";

test("Exports a function", t => {
  t.is(typeof split, "function");
});

test("Return an array", t => {
  const res = split("test", 0);
  t.true(Array.isArray(res));
});

test("Split it in parts of given sizes", t => {
  const res = split("testa", 2);
  t.deepEqual(res, ["te", "sta"]);
});

test("Accepts multiple fields", t => {
  const res = split("testa", [2, 2]);
  t.deepEqual(res, ["te", "st", "a"]);
});

test("Accepts single fields as array", t => {
  const res = split("testa", [2]);
  t.deepEqual(res, ["te", "sta"]);
});

test("Last field could be oversized", t => {
  const res = split("testa", [2, 20]);
  t.deepEqual(res, ["te", "sta"]);
});

test("Could contains more sizes than string length is - additional fields are empty strings", t => {
  const res = split("testa", [2, 3, 12, 13]);
  t.deepEqual(res, ["te", "sta", "", ""]);
});

test("Could use a size for a separator char between all fields", t => {
  const res = split("te-ta", [2, 2], { separatorSize: 1 });
  t.deepEqual(res, ["te", "ta"]);
});

test("Could contains more sizes than string length is - additional fields are empty strings", t => {
  const [day, month, year, hour, minute, second] = split(
    "05/06/2017 06:00:00",
    [2, 2, 4, 2, 2, 2],
    { separatorSize: 1 }
  );
  t.deepEqual(
    [day, month, year, hour, minute, second],
    ["05", "06", "2017", "06", "00", "00"]
  );
});
