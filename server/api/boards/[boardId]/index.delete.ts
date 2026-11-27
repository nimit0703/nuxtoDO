import { Board } from "~/server/models/board.model";
import { List } from "~/server/models/List.model";
import { Card } from "~/server/models/Card.model";

export default defineEventHandler(async (event) => {
  const boardId = getRouterParam(event, "boardId");
  const user = event.context.user;

  const deletedBoard = await Board.findOneAndDelete({
    _id: boardId,
    owner: user._id,
  });

  if (!deletedBoard) {
    throw createError({
      statusCode: 404,
      message: "Board not found",
    });
  }

  // Delete the board's lists and their cards
  await Card.deleteMany({ list: { $in: deletedBoard.lists }, owner: user._id });
  await List.deleteMany({
    board: deletedBoard._id,
    owner: user._id,
  });

  event.node.res.statusCode = 204;

  return true;
});