import { Validator } from "#nuxt-server-utils";
import { List } from "~/server/models/List.model";
import ListSchemas from "~/schemas/List.schemas";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const body = await readBody(event);
  const user = event.context.user;

  Validator.validateSchema(ListSchemas.partial(), body);

  const updatedList = await List.findOneAndUpdate(
    {
      _id: listId,
      owner: user._id,
    },
    {
      $set: body,
    },
    {
      new: true,
    }
  );

  if (!updatedList) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    })
  }
  return updatedList;
});
