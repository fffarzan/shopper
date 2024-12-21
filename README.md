# A Random Ecommerce Project.

Awesome for using as a boilerplate to build your dream project!

## Installing dependencies

`pnpm install`

## Developing

`pnpm dev`

## Building

`pnpm build` and `pnpm serve`

Enjoy!

# FEATURES

- Product list
    - USER STORY 1: User can see a list of products.
    - USER STORY 2: User can click on each product and visit detail.
- Product details
    - USER STORY 3: User can see the details of a product.
    - USER STORY 4: User can choose the product and add it to shopping cart.
- Shopping cart
    - USER STORY 5: User can see his list.
    - USER STORY 6: User can remove a product from the list.
- Improve performance
    - USER STORY 7: Reduce waiting time of user to get some data.

# Sprint Backlog 0

Preparing structure of the project inclduing: Vue / SSR / CICD and Dockerizing / Service worker / Linters / Git linters

# Sprint Backlog 1

- user stories: 1, 2, 3
- ACs:
    1.  There is a list of products in the home page.
    2.  Some details of product is availble like name, image, and price.
    3.  Products are clickable and will redirected to its own page.
    4.  Details of a product should be shown in its specific page with more details, (including description).
- sprint time: 1h
- sprint goal: Creating first deployable iteration of the project.

# Sprint Backlog 2

- user stories: 4, 5
- ACs
    1.  There is a button to add the product to the cart list.
    2.  There is a shopping cart that lists products with some brief details.
    3.  The list must be persisted during refreshing page.
- sprint time: 1h
- sprint goal: A deployable app with shopping cart and the ability to add products to it

# Sprint Backlog 3

- user stories: 6, 7
- ACs:
    1.  There is a delete button in shopping list page that remove selected product from the list.
    2.  Add caching strategies to the project, one for assets and and another for image urls
- sprint time: 1h
- sprint goal: A deployable app with fully functional shopping cart list and optimized in caching.
