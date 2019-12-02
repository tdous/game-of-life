// prettier-ignore
const presets: { [key: string]: any } = {
  glider: [
    [ , ,1],
    [1, ,1],
    [ ,1,1]
  ],
  lightweight: [
    [ ,1,1],
    [1,1,1,1],
    [1,1, ,1,1],
    [ , ,1,1]
  ],
  mediumweight: [
    [ ,1,1,1],
    [1,1,1,1,1],
    [1,1,1, ,1,1],
    [ , , ,1,1]
  ],
  heavyweight: [
    [ ,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1, ,1,1],
    [ , , , ,1,1]
  ],
  pulsar: [
    [, ,1,1,1, , , ,1,1,1],
    [],
    [1, , , , ,1, ,1, , , , ,1],
    [1, , , , ,1, ,1, , , , ,1],
    [1, , , , ,1, ,1, , , , ,1],
    [ , ,1,1,1, , , ,1,1,1],
    [],
    [, ,1,1,1, , , ,1,1,1],
    [1, , , , ,1, ,1, , , , ,1],
    [1, , , , ,1, ,1, , , , ,1],
    [1, , , , ,1, ,1, , , , ,1],
    [],
    [, ,1,1,1, , , ,1,1,1]
  ],
  rpentomino: [
    [ ,1,1],
    [1,1],
    [ ,1]
  ],
  gospargun: [
    [ , , , , , , , , , , , , , , , , , , , , , , , ,1],
    [ , , , , , , , , , , , , , , , , , , , , , ,1, ,1],
    [ , , , , , , , , , , , ,1,1, , , , , , ,1,1, , , , , , , , , , , , ,1,1],
    [ , , , , , , , , , , ,1, , , ,1, , , , ,1,1, , , , , , , , , , , , ,1,1],
    [1,1, , , , , , , , ,1, , , , , ,1, , , ,1,1,],
    [1,1, , , , , , , , ,1, , , ,1, ,1,1, , , , ,1, ,1],
    [ , , , , , , , , , ,1, , , , , ,1, , , , , , , ,1],
    [ , , , , , , , , , , ,1, , , ,1],
    [ , , , , , , , , , , , ,1,1],
  ]
};

// Pad the left and top of a preset by n rows/cols
const padPreset = (preset: [], n: number) => {
  let output: any = [];
  let finalLength = n + preset.length;

  for (let i = 0; i < finalLength; i++) {
    let row: any = [];
    row.length = n;
    let presetRow: any = preset[i - n];

    output =
      i < n ? output.concat([row]) : output.concat([row.concat(preset[i - n])]);
  }

  return output;
};

// Get a specified preset, optionally padding it
export const getPreset = (id: string, padding?: number | null) => {
  return padding ? padPreset(presets[id], padding) : presets[id];
};
