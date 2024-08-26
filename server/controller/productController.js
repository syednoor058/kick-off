
export const createProductController = async (req, res) => {
    try {
        const product = await productsModelModel
    } catch (err) {
        console.log(`Error occured creating product, ${err}`);
        res.status(500).send({
            success: false,
            message: 'Error in creating new product.'
        })
    }
};