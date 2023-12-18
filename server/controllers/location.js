


export const searchLocation = async (req, res) => {
    
    const { query } = req.body;

    

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=AIzaSyCFaowESX6lWHECWxwnIghwoRKKy73YZmE`,
        {
            params : { input: query}
        });
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    
    
    
}