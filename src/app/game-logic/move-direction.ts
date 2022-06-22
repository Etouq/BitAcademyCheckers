// defined in clockwise direction such that (direction + 2) % 4 will yield the opposite direction
export const enum MoveDirection {
  LEFT_UP,
  RIGHT_UP,
  RIGHT_DOWN,
  LEFT_DOWN
}

export const moveDirections = [MoveDirection.LEFT_UP, MoveDirection.RIGHT_UP, MoveDirection.RIGHT_DOWN, MoveDirection.LEFT_DOWN];
