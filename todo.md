# TODO Items
## Game Functionality
* add drive-thru to the game
  * Add section to the ui
  * Add car to the dishwasher
  * Add "feed car" option to the player actions
  * Add drive-thru rewards settings (plus all the related workflows)
* setting to allow the wrong food / undercooked food to be served
  * Just add the grill items to the available food when serving (also -1 to the customer?) and make them clickable
* Add recipe cards for the dishwasher (for points I guess?)
* Feature toggles?
* Start the wheel at a random spot instead of always red on top
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
* Add counter sections in settings
* Manager Action Ideas: 
  * +1 to each table
  * Change plate color
  * +1 point?
  
## UI Improvements
* hover over components to see why they're disabled?
* Maybe a button to confirm your dishwasher selections? It can just be a little jarring.
* Can we make the manager track look better? Like loop it through the tables? Probably not.
* Pick new colors (ChatGPT recommends Blue, Red, Green, Yellow, Black but maybe swap out Red or Green for colorblind people?)
* Have a Statistics modal that shows the stats for the game (use Endgame or refactor)
  * Maybe not a modal, but something hidable that shows up on the side
* Add a "reset game" button to the settings

## Data Collection Features
* Save all of the rolls so you can play the exact same game again?
* We're not using the file we're "auto-saving" on its own. We only allow you to load manually saved files. This would allow a "continue last game?" button.
  * This can operate in tandem with the auto-saving to AWS. We can just look for a file in local storage when the app loads. If there is a game that's not finished, we can ask the user if they want to continue it.
  * We should delete the local file when the game is finished.
* Remove Save Button and replace with auto-saving
  * ~~When you start a game, give it a few random words for a name + a uuid for an id~~
  * ~~Change the structure of the dynamodb table to have a partition key of id and a sort key of name~~
  * ~~When you save a game, update the record instead of creating a new one (including allowing the user to change the name)~~
  * Make your name editable in settings
  * Add a toast for the saving stuff
  * Add a popup when the page loads to tell the user what data is being saved. When they dismiss it, set a value in local storage so it doesn't show again
  * Should the user be able to change his/her name in the settings? - No, it's the sort key on the dynamodb table

## Bugs
* Selecting 2 plates for the dishwasher at the same time was buggy. It let me do 3 for some reason.
* +2 to one customer skipped the customer selection. May have broken that when messing with dishwasher.

## Tech Debt