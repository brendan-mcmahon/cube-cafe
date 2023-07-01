import { Game } from "../game";

export type SaveFile = {
    saveName: string;
    date: Date;
    game: Game;
};
