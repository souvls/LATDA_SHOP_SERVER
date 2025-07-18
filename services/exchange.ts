import Exchange from "../models/exchang";

export const _getExchange = async () => {
    try {
        const rate: any = await Exchange.findByPk(1);
        return rate.rate
    } catch (error) {
        throw error;
    }
}
export const _updateExchange = async (rate: number) => {
    try {
        await Exchange.update({
            rate: rate
        },
            {
                where: {
                    id: 1
                }
            }
        )
        return rate
    } catch (error) {
        throw error;
    }
}