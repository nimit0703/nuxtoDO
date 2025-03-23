import { Document, Schema, model } from "mongoose";
export interface BoardDocument extends Document{
    name: string;
    lists: string[];
    owener: string;
    coverImage: string;
}

const boardSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        lists: [
            {
                type: Schema.Types.ObjectId,
                ref: "List"
            }
        ],
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        coverImage:{
            type: String,
            default: null,
        }
    },{
        timestamps: true
    }
);

export const Board =  model<BoardDocument>("Board", boardSchema);