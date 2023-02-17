[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
# Panela's Frontend

This is the frontend for the Panela project, where you can manage recipes and calculate their costs based on the ingredients.

## About The Project

[![Panela Screen Shot][product-screenshot]](https://panela.app)

Build using React, React Router and Redux Toolkit, components made using Chakra UI and forms using Formik. This project uses Auth0 to provide an authentication pipeline and connects to a MongoDB database using a RestFUL API designed from scratch. It's deployed to a droplet on DigitalOcean, along with a CD/CI pipeline.

This project is a complete app, build from the ground up, from conception to design and implementation. Some challenges faced during implementation have been adapting the Auth0 and making it play nice with React Router V6. Another interesting takeaway was using Chakra UI and Formik for more complex forms, like the add recipe, where you can search an ingredient and if not present, add a new one. Had to extend the build-in components to use Formik, and a bit of trial and error figuring out how to properly display error messages on more complex components.

You can see a live demo at https://panela.app

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To set up this project you must have npm and install the project dependencies.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Zenb0t/frontend-recipes.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file with the below entries:
   ```env
   REACT_APP_API_URL=https://panela-server-0-gmmv3.ondigitalocean.app/
   REACT_APP_AUTH0_DOMAIN=zenbot.us.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=uwcRPx0Hu0g7B30z37ZRsVxTaEGdW7Tp
   REACT_APP_AUTH0_CALLBACK_URL=[YourLocalhost]/dashboard/callback
   REACT_APP_AUTH0_AUDIENCE=https://panela.app/api
   ```


## Contact

Felipe Ribeiro -  zazen.coding@gmail.com

Check also the backend here: [https://github.com/Zenb0t/panela-server](https://github.com/Zenb0t/panela-server)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/Zenb0t/frontend-recipes.svg?style=for-the-badge
[issues-url]: https://github.com/Zenb0t/frontend-recipes/issues
[license-shield]: https://img.shields.io/github/license/Zenb0t/frontend-recipes.svg?style=for-the-badge
[license-url]: https://github.com/Zenb0t/frontend-recipes/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/felipe-ribeiro-245a37192/
[product-screenshot]: https://feliperibeiro.ca/static/media/panela.3155b4af686073f76807.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

