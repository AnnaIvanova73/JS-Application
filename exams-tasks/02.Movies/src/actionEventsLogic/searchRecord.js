import {ifIsInvalidThrow} from "../utils/verifications.js";

let currRouter = undefined;
let specificsService = undefined;

const init = (router,service1) => {
    currRouter = router;
    specificsService = service1;
};

const findRecord = async (paramSearch,e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let currForm = new FormData(form);

    try {
        ifIsInvalidThrow([currForm.get('searchField')]);
        const searchField = currForm.get('searchField');
        let currMovie = await specificsService.searchCaseInsensitive(paramSearch,searchField.trim());
        const currId = currMovie[0]._id;
        currRouter.redirect(`/details/${currId}`);
    } catch (err) {
        alert(`Your search: ${currForm.get('searchField')} record. Doesn't' exist!`);
    } finally {
        form.reset();
    }
};

export default {
    init,findRecord
};