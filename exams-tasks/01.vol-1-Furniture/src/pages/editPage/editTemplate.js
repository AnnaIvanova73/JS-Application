import {html} from '../../../node_modules/lit-html/lit-html.js';
import {ifDefined} from '../../../node_modules/lit-html/directives/if-defined.js';
/*

 */
/*
invalidFields
class="form-control${form.invalidFields.model ? ' is-invalid' : ' is-valid'}"
//viewModel.controlClassesInputFields.isValidNumberCount() ? html`class="is-valid"`
//                                        :  html`is-invalid`
hasClass
class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}
 */
//viewModel.controlClassesInputFields.isValidNumberCount
const getFlag = (e,func,funcParam=undefined,funcParam2=undefined) => {
    let val =  e.target.value.trim();
    if(func(val,funcParam,funcParam2)) {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    }else{
        e.target.classList.remove('is-valid');
        e.target.classList.add('is-invalid');
    }
};
const edit = (viewModel) => {
    console.log(viewModel);
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${(e)=> {
            viewModel.createRecord(e,viewModel._id)
        }}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" .value=${viewModel.make}
                               @change=${(e) => getFlag(e,viewModel.controlClassesInputFields.isValidNumberCount,viewModel.makeModelLimit)}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" .value=${viewModel.model}
                               @change=${(e) => getFlag(e,viewModel.controlClassesInputFields.isValidNumberCount,viewModel.makeModelLimit)}
                        >
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" .value=${viewModel.year}
                               @change=${(e) => getFlag(e,viewModel.
                                       controlClassesInputFields.
                                       isBetweenTwoNumbersIncluded,viewModel.startYear,viewModel.endYear)}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description"
                               .value=${viewModel.description}   @change=${(e) => getFlag(e,viewModel.
                                controlClassesInputFields.isValidNumberCount,viewModel.descrLimit)}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" .value=${viewModel.price}
                               @change=${(e) => getFlag(e,viewModel.controlClassesInputFields.isPositive)}
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" .value=${viewModel.img}
                               @change=${(e) => getFlag(e,viewModel.controlClassesInputFields.isNotEmpty)}
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value=${viewModel.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit"/>
                </div>
            </div>
        </form>
    `;
};

export default {
    edit
};
/*

 */