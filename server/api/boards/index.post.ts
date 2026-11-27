import { Validator } from "#nuxt-server-utils";
import BoardSchemas from "~/schemas/Board.schemas";
import { Board } from "~/server/models/board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const body = await readBody(event);
  Validator.validateSchema(BoardSchemas, body);

  const board = await Board.create({
    ...body,
    owner: user._id,
  });
  

  return board;
});
