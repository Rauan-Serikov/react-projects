export interface Runtime {
    runtime: number | undefined;
}

export const formatRuntime = (runtime: number | undefined): string => {
    if (runtime === undefined) {
        return "Длительность неизвестна";
    }

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours} ч ${minutes} мин`;
};
