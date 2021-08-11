import detailsTemplate from './detailsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let specificsService = undefined;
let deleteFunc = undefined;
let buyFunc = undefined;

const init = (router, render, service1, service2, service3, callbackDel, callbackLike) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    specificsService = service3;
    deleteFunc = callbackDel;
    buyFunc = callbackLike;
};

const getView = async (context) => {
    const idRecord = context.params.id;
    try {
        let data = await subjectService.getRecord(idRecord);
        const isOwner = Boolean(data._ownerId === authService.getUserId());

        let isAlreadyBoughtIt = 0;
        let totalBuyers = '';
        try {
            totalBuyers  = await specificsService.getProductTotalBuyers(data._id);

            let userPurchases = await specificsService.getUserBoughtProduct(authService.getUserId(), data._id);
            isAlreadyBoughtIt =  userPurchases.length > 0
        }catch(err){
           console.log(`No buyers`)
        }



        viewModel = {
            isOwner,
            deleteRecord: deleteFunc,
            title: data.title,
            price: data.price,
            description: data.description,
            img: data.img,
            _id: data._id,
            data,
            totalBuyers: totalBuyers.length,
            currEmail: authService.getEmail(),
            isAlreadyBoughtIt: isAlreadyBoughtIt,
            buyRecord: buyFunc,

        };

    } catch ( err ) {
        console.log(err);
    }

    let currTemplate = detailsTemplate.getTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
