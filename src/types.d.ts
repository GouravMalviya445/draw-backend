type ShapeStyle = {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

// selected shape by user
type SelectedShape =
  | "rectangle"
  | "ellipse"
  | "arrow"
  | "line"
  | "pencil"
  | "text"
  | "selection"
  | "panning";

type BaseShape<T extends SelectedShape, P = {}> = {
  type: T;
} & ShapeStyle &
  P;

// interface for creating rectangle shape
type RectShape = {
  w: number;
  h: number;
  x: number;
  y: number;
  bRadius?: number;
} & ShapeStyle;

// interface for creating Circle shape
type EllipseShape = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
  startAngle?: number;
  endAngle?: number;
} & ShapeStyle;

type LineShape = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} & ShapeStyle;

type ArrowShape = {
  arrowSize?: number;
} & LineParams;

type TextShape = {
  text: string[];
  x: number;
  y: number;
  maxWidth?: number;
} & ShapeStyle;

type PencilShape = {
  path: [number, number][];
} & ShapeStyle;

type Rect = BaseShape<"rectangle", RectParams>;
type Ellipse = BaseShape<"ellipse", EllipseParams>;
type Line = BaseShape<"line", LineParams>;
type Arrow = BaseShape<"arrow", ArrowParams>;
type TextShape = BaseShape<"text", TextParams>;
type Pencil = BaseShape<"pencil", PencilParams>;

type Shape = Rect | Ellipse | Line | Arrow | TextShape | Pencil;

