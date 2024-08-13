import { getBggSearch, getBggThing, getBggHot } from 'bgg-xml-api-client'



export const searchBoardGame = async (req, res) => {
    
    const { query } = req.body;

    try {
        const response = await getBggSearch({ query: query, type: "boardgame" }, { timeout: 5000 });
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    
    
    
}

export const getBoardGame = async (req, res) => {
    
    const { id } = req.body;

    try {
        const response = await getBggThing({ id: id}, { timeout: 5000 });
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    
    
    
}


export const getHotGames = async (req, res) => {

    try {
        const response = await getBggHot({ type: 'boardgame'}, { timeout: 5000 });
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }

}