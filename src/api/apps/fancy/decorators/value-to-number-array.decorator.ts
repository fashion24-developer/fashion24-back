import { Transform } from 'class-transformer';

export function TransformValueToNumberArray() {
  return Transform(({ value }) => (Array.isArray(value) ? value.map((x) => +x) : [+value]));
}
