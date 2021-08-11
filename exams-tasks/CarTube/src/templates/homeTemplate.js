import {html} from '../../node_modules/lit-html/lit-html.js';

 const home = (viewModel) => html`
    <section id="main">
        <div id="welcome-container">
            <h1>Welcome To Car Tube</h1>
            <img class="hero" src="/images/car-png.webp" alt="carIntro">
            <h2>To see all the listings click the link below:</h2>
            <div>
                <a href="/allRecords" class="button">Listings</a>
            </div>
        </div>
    </section>
`;

export default {
    home
}
//<section id="home">
//     <article class="hero layout">
//         <img src="./assets/team.png" class="left-col pad-med">
//         <div class="pad-med tm-hero-col">
//             <h2>Welcome to Team Manager!</h2>
//             <p>Want to organize your peers? Create and manage a team for free.</p>
//             <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
//             ${viewModel.isLoggedIn
//     ? html`<a href="/browse-teams" class="action cta">Browse Teams</a>`
//     : html`<a href="/register" class="action cta">Sign Up Now</a>`
// }
//         </div>
//     </article>
// </section>`

////import { getTemplatingFunc } from '../litTemplater/litTemplater.js';
// import { html } from './../../node_modules/lit-html/lit-html.js';
//
// //function doesn't need to be called html, we just get highlighting from the VSC extension, if it has that name
// const homeTemplate = (html => (viewModel) => html`
//     <section id="welcome">
//         <div id="welcome-container">
//             <h1>Welcome To Meme Lounge</h1>
//             <img src="./../../images/welcome-meme.jpg" alt="meme">
//             <h2>Login to see our memes right away!</h2>
//             <div id="button-div">
//                 <a href="#" class="button">Login</a>
//                 <a href="#" class="button">Register</a>
//             </div>
//         </div>
//     </section>`)(getTemplatingFunc());
//
// export default{
//     welcomeTemplate: homeTemplate
// }
// //<section id="home">
// //     <article class="hero layout">
// //         <img src="./assets/team.png" class="left-col pad-med">
// //         <div class="pad-med tm-hero-col">
// //             <h2>Welcome to Team Manager!</h2>
// //             <p>Want to organize your peers? Create and manage a team for free.</p>
// //             <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
// //             ${viewModel.isLoggedIn
// //     ? html`<a href="/browse-teams" class="action cta">Browse Teams</a>`
// //     : html`<a href="/register" class="action cta">Sign Up Now</a>`
// // }
// //         </div>
// //     </article>
// // </section>`