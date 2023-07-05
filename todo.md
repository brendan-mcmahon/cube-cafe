# TODO Items
## Game Functionality
* add drive-thru to the game
  * Add section to the ui
  * Add car to the dishwasher
  * Add "feed car" option to the player actions
  * Add drive-thru rewards settings (plus all the related workflows)
* setting to allow the wrong food / undercooked food to be served
  * Just add the grill items to the available food when serving (also -1 to the customer?) and make them clickable
* Add a way to change the dice in the settings
* Add recipe cards for the dishwasher (for points I guess?)
* Feature toggles?
* Add freezer
* Start the wheel at a random spot instead of always red on top
* Manager Track ideas:
  * +1 to customer sitting at table X
  * Free cube of X color
* Diswasher ideas:
  * +1 manager
* Add counter sections in settings
  
## UI Improvements
* hover over components to see why they're disabled?
* Maybe a button to confirm your dishwasher selections? It can just be a little jarring.
* Can we make the manager track look better? Like loop it through the tables? Probably not.
* Pick new colors (ChatGPT recommends Blue, Red, Green, Yellow, Black but maybe swap out Red or Green for colorblind people?)
* Have a Statistics modal that shows the stats for the game (use Endgame or refactor)
  * Maybe not a modal, but something hidable that shows up on the side
* In mobile, have the undo button with the others and skip the History list
* Add a "reset game" button to the settings
* 

## Data Collection Features
* Save all of the rolls so you can play the exact same game again?
* Statistic Ideas:
* We're not using the file we're "auto-saving" on its own. We only allow you to load manually saved files. This would allow a "continue last game?" button.


## Bugs
* Selecting 2 plates for the dishwasher at the same time was buggy. It let me do 3 for some reason.

## Tech Debt