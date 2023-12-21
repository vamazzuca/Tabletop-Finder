
export const searchLocation = async (req, res) => {
    
    const { query } = req.body;

    const options = {
        method: 'GET'
    }
    

    try {
       
        
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.API_KEY}&q=${query}`, options).then((response) => response.json())
        res.status(200).json({ result: response });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
    
    
    
}