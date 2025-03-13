export type Rgb = [number, number, number];

export type Rgba = [number, number, number, number];

type CellData = {
  lineColor: Rgba;
  lineWidth: number;
  cellDim: number;
};

export type GraphsheetData = {
  majorCell: CellData;
  minorCell: CellData;
};
