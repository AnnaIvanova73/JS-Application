import {html} from  '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No cars in database.')

        :  viewModel.data.map(record=> templates.createSingleRecord(record))
};

const allRecords = (viewModelJs,viewModelCsSharp,viewModelJAVA,viewModelPython) => {
    return html`
        <div class="content">
            
            <section class="js">
                <h2>JavaScript</h2>
                <div class="articles">
                    ${getHtml(viewModelJs)}
                </div>
            </section>
            
            <section class="CSharp">
                <h2>C#</h2>
                <div class="articles">
                    ${getHtml(viewModelCsSharp)}
                </div>
            </section>
            
            <section class="Java">
                <h2>Java</h2>
                <div class="articles">
                    ${getHtml(viewModelJAVA)}
                </div>
            </section>
            
            <section class="Pyton">
                <h2>Python</h2>
                <div class="articles">
                    ${getHtml(viewModelPython)}
                </div>
            </section>
        </div>
    `;
};

export default {
    allRecords
};
