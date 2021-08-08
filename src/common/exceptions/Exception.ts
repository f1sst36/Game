export class Exception {
    public static throwExceptionWithCrush = (message: string): void => {
        const node = document.createElement('div');
        node.innerHTML = message;
        document.body.innerHTML = '';
        document.body.appendChild(node);
        window.game.stop();
        throw new Error(message);
    };
}
