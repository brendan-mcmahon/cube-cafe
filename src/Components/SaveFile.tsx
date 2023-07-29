import { Game } from "../models/game";

export type SaveFile = {
    id: string;
    user: string;
    name: string;
    date: Date;
    game: Game;
};

export type SaveFileData = {
    id: string;
    user: string;
    name: string;
    date: Date;
    game: string;
}