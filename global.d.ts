import { Game } from "./src/common/Game";

declare global {
    interface Window {
        game: Game;
    }
}
export {};
