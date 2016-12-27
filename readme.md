8bit Inventory Redux
====================
A simple and easy to use inventory management/search system

Usage
-----
*Inventory Management*
* Add new items to inventory by entering the name, choosing the color and size, and clicking the '+'
    * All attributes are required to successfully create an item
* Add new colors or sizes to the options by entering them and clicking the '+'
* Remove existing items, colors, or sizes by selecting them from the appropriate dropdowns and clicking '-'
* *Inventory management can be reached by clicking 'Go to admin' on the search (default) screen*
![admin](/images/admin.png "Admin Page")

*Inventory Search*
* Search for an item matching the selected color, size, partial name, or any combination of these
    * Leaving all fields blank will display a full list of the items in inventory
![search](/images/search.png "Search Page")

Build
-----
* Clone the repository and `npm install`
* A local postgres instance on port 5432 with a database named `inventory` *or* a valid postgres database specified with the env variable `DATABASE_URL` is required
    * Run the `CREATE TABLE` statments in `databaseSetup.sql` with your preferred postgres management solution
* Execute `npm start` to start the server on localhost:3000 or the port specified in the `PORT` env variable

Technologies
------------
Built with:
* Node.js
* Express.js
* jQuery
* PostgreSQL
