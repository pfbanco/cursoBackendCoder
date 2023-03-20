/*import { Router } from "express";

const products = []
const router = Router()

router.get("/", (req , res)=>{
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json({ products });
    }
});

router.get("/:idProduct", async(req, res)=>{
    const { idProduct } = req.params;
    const product = await productManager.getProductById(+idProduct);
    res.json({ product });
});


router.post()

router.put()

router.delete()

export default  router*/