import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';
import {createSingleRecord,noRecords} from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0 ? noRecords('No movies...')
        :  viewModel.data.map(record=> createSingleRecord(record))
};

const allRecords = (viewModel) => {
    return html`
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
            <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
                 class="img-fluid" alt="Responsive image">
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div>
       
        ${viewModel.isLoggedIn ? html`
            <h1 class="text-center">Movies</h1>
            <section>
                <a href=/create class="btn btn-warning ">Add Movie</a>
                <form class="search float-right" @submit=${(e) => viewModel.findRecord(e)}>
                    <label>Search: </label>
                    <input type="text" name="searchField">
                    <input type="submit" class="btn btn-info" value="Search">
                </form>
            </section>
            <div class=" mt-3 ">
                <div class="row d-flex d-wrap">

                    <div class="card-deck d-flex justify-content-center">
                        ${getHtml(viewModel)}
                    </div>
                </div>
            </div>
        ` : nothing} `;
};

export default {
    allRecords
};
/*
 
        
        

        
        <div class=" mt-3 ">
            <div class="row d-flex d-wrap">
        
                <div class="card-deck d-flex justify-content-center">
        

        
                    <div class="card mb-4">
                        <img class="card-img-top" src="https://i.pinimg.com/originals/f2/a4/58/f2a458048757bc6914d559c9e4dc962a.jpg" alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">Top Gun 2</h4>
                        </div>
                        <div class="card-footer">
                            <a href="#/details/CUtL9j4qI0XVhn9kTUsx"><button type="button" class="btn btn-info">Details</button></a>
                        </div>
        
                    </div>
        
                    <div class="card mb-4">
                        <img class="card-img-top" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg" alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">Black Widow</h4>
                        </div>
                        <div class="card-footer">
                            <a href="#/details/krPgQD6SWf39bM4x00co"><button type="button" class="btn btn-info">Details</button></a>
                        </div>
        
                    </div>
        
                </div>
            </div>
        </div>
 */