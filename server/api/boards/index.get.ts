import { Board } from "~/server/models/board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  
  const boards = await  Board.find({ owner: user._id });
  const allBoards = await Board.find();
  
  return boards;
})
