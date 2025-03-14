import Exchange from "../models/exchang";

export const _getExchange = async () => {
    try {
        const rate: any = await Exchange.findByPk(1);
        return rate.rate
    } catch (error) {
        throw error;
    }
}