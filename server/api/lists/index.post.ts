import { Validator } from "#nuxt-server-utils";
import ListSchemas from "~/schemas/List.schemas";
import { Board } from "~/server/models/board.model";
import { List } from "~/server/models/List.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  Validator.validateSchema(ListSchemas, body);
  
  const user = event.context.user;

  const list = await List.create({
    ...body,
    owner: user._id,
  });

  if (!list) {
    throw createError({
      statusCode: 400,
      message: "Failed to create list",
    });
  }
  await Board.findOneAndUpdate(
    {
      _id: body.board,
      owner: user._id,
    },
    {
      $push: {
        lists: list.id,
      },
    },
    {
      new: true,
    }
  );

  return list;
});
