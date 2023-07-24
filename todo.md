# TODO Items
## Game Functionality
* Food should leave the counter after +0
* Restrict refills to 1 per customer per turn
  * Would be cool to add a drink icon to the table
* Allow user the option between any cube and a point from the manager track
  * Need to add a modal to select the color instead of giving a wild
* When the player cooks a wild, it should stay a wild
  * This means we need to add a "wild" to the food and allow it to satisfy the customer's order
* Update the Dishwasher rewards
  * Copy is going to be a pain in the ass
* add VIPs to the game


## UI Improvements
* Have a Statistics modal that shows the stats for the game (use Endgame or refactor)
  * Maybe not a modal, but something hidable that shows up on the side
* Add a "reset game" button to the settings
* We don't need most of the settings we have. Need to cut them down quite a bit.

## Data Collection Features
* Data View with all of the games data aggregated and assessed
* Save all of the rolls so you can play the exact same game again
* We're not using the file we're "auto-saving" on its own. We only allow you to load manually saved files. This would allow a "continue last game?" button.
  * This can operate in tandem with the auto-saving to AWS. We can just look for a file in local storage when the app loads. If there is a game that's not finished, we can ask the user if they want to continue it.
  * We should delete the local file when the game is finished.
* Remove Save Button and replace with auto-saving
  * ~~When you start a game, give it a few random words for a name + a uuid for an id~~
  * ~~Change the structure of the dynamodb table to have a partition key of id and a sort key of name~~
  * ~~When you save a game, update the record instead of creating a new one (including allowing the user to change the name)~~
  * ~~Make your name editable in settings~~
  * Add a toast for the saving stuff
  * Add a popup when the page loads to tell the user what data is being saved. When they dismiss it, set a value in local storage so it doesn't show again
  * Track the max number of simultaneous food cooking
  * For the points, we should show what the score would have been 

## Bugs
* Selecting 2 plates for the dishwasher at the same time was buggy. It let me do 3 for some reason.

## Tech Debt


## Icebox (Deprecated Ideas)
* Create a new manager track just for upgrades
* Setting to allow the wrong food / undercooked food to be served
  * Just add the grill items to the available food when serving (also -1 to the customer?) and make them clickable
* Add recipe cards for the dishwasher (for points I guess?)
* Manager Track ideas:
  * +1 to customer sitting at table X
  * Free cube of X color
* Diswasher ideas:
  * Upgrades:
    * +1 manager
    * extra die
    * extra cube
    * bonus manager movement
    * drive-thru
    * upgraded table
    * salad bar/buffet
    * add grill top
  * one-time rewards
    * seat a VIP
* Manager Action Ideas: 
  * +1 to each table
  * Change plate color
  * +1 point?
* Can we make the manager track look better? Like loop it through the tables? Probably not.