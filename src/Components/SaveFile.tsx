import { Game } from "../game";

export type SaveFile = {
    name: string;
    date: Date;
    game: Game;
};

export type SaveFileData = {
    name: string;
    date: Date;
    game: string;
}