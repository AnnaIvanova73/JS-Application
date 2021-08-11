let currRouter = undefined;
let specificsService = undefined;


const init = (router, service1) => {
    currRouter = router;
    specificsService = service1;
};
const buyProduct = async (idRecord,data) => {
    try {
        await specificsService.buyRecord({productId: idRecord});
        currRouter.redirect(`/details/${idRecord}`);
    } catch ( err ) {
        console.log(err)
    }
};

export default {
    init, buyProduct
};