export class StopRenderer {
    public static stopWithKeyDown = (key: string) => {
        document.addEventListener('keyup', (e: Event | any) => {
            if (e.key === key) window.game.stop();
        });
    };
}
