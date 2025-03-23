import { Validator } from "#nuxt-server-utils";
import BoardSchemas from "~/schemas/Board.schemas";
import { Board } from "~/server/models/board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const body = await readBody(event);
  Validator.validateSchema(BoardSchemas.partial(), body);

  const boardId = getRouterParam(event, "boardId");
  const board = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owener: user._id,
    },
    {
      $set: body,
    }
  );

  return board;
});
