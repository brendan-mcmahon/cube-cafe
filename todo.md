# TODO Items
## Game Functionality
* Restrict refills to 1 per customer per turn
  - [x] Add a "refill" state to the customer: "full," "empty
  - [x] Add the functionality to set the refill state
  - [x] Add to the action filter to check the refill state
  - [x] Add the functionality to reset the refill state on roundTearDown
  - [x] Add something in the UI to show the refill state
  - [x] Add a toggle for this in settings
* Allow player the option between any cube and a point from the manager track
  - [x] Add a modal to select any color cube or a point
  - [x] Remove the current settings for the manager track
* When the player cooks a wild, it should stay a wild
  - [x] Add a setting to allow this
  - [x] Allow the wild to pass through onto the grill
  - [x] Update the action filter for serving to allow wilds to anyone
  - [x] Update the tables to allow user to click any customer if there's a wild on the counter
  - [x] Update the counter to allow user to click a wild no matter what
* Update the Dishwasher functionality
  - [x] Use tables instead of "customers" in the game
  - [x] tables should have a nullable "customer" property and a nullable "plate" property
  - [x] Add customers to tables instead of keeping a list with possible nulls
  - [x] In the actionfilter, check the tables for customers instead of nulls in the customer list
  - [x] When seating a customer, add them to the table instead of the customer list
  - [x] When taking an order, update the customer's status and the table's "plate" property
  - [x] In the round tear down, just remove the customer, not the plate
  - [x] If there is no meeple at the table, the plate becomes selectable
  - [x] Make a new dishwasher with the new options
    - [x] Move manager
    - [x] Collect resource
    - [x] Copy resource
  - [x] Upon selecting the plate, the player can choose where to place it in the dishwasher
  - [x] The dishwasher will immediately resolve the action selected
  - [x] If there is a plate at a table, the player cannot seat a new customer there
  - [x] Cancel out of dishwasher selection in case the player accidentally clicks a plate
* add VIPs to the game
  * Oh man... that could be rough.
* Make Customers leave after dropping to 1
  - [x] Update Round Tear Down to remove customers with 1 cube (might be done already)
  - [x] Add a setting to toggle this feature (roundTearDown > tickDownCustomers)
  - [x] For now, just track these lost customers in stats while we figure out what the penalty should be
* Make 3 tables by default
  - [x] Remove the setting
  - [x] Get rid of the triangular shape, I think. Just put them in a row. It's causing more layout issues than it's worth
* Make the app look a lot nicer. CHALK.
  - [ ] Add a "how to play" modal
  - [x] Table highlighting is broken
  - [x] Chalkify Action Disk
  - [x] Chalkify the background
  - [x] Chalkify the buttons
  - [x] Use a better font
  - [x] End Round button is weird.
  - [x] Concentric circles on the grill (I know, this makes it look more like a stove, but whatever)
  - [x] Chalkify the Cars
  - [x] Make the action icon glow better and try to scale them
  - [ ] Chalkify/improve the manager track
  - [ ] Chalkify the tables

## UI Improvements
- [ ] Have a Statistics modal that shows the stats for the game (use Endgame or refactor)
  - [ ] Maybe not a modal, but something hidable that shows up on the side
- [ ] Add a "reset game" button to the settings
- [ ] Confirm button for "quitting" maybe? Or does it auto save anyway? Idk.
- [ ] Have a button to turn off auto-saving (mainly for me when I'm testing the app not the game)
- [ ] Tutorial Level
  - [ ] Make rolls predefined at the beginning of the game
    - [x] Add diceRolls to the state
    - [x] Edit gameContext to set the rolls when the game starts
    - [x] Edit the "roll dice" function to use the predefined rolls
  - [x] Set the rolls for the tutorial level to be what we need
  - [ ] 

## Settings to add:

## Data Collection Features
- [ ] Data View with all of the games data aggregated and assessed
  - [ ] Create a lambda function that will aggregate the data
- [ ] Save all of the rolls so you can play the exact same game again
  - [ ] Save rolls and car draws to the statistics every time a new round starts
  - [ ] Predetermine the order of the plates at the start of every game so we can just re-use it instead of drawing them individually in real time
    * Can we just do this with the rolls and cars too? Why does any of it have to be done in real time? In theory, you could cheat, but I don't care?
  - [ ] Add a "play this game again" button to the end game screen
- [ ] Auto-save to localstorage
  - [x] Delete the local file when the game is finished
  - [x] Delete the local file when the player quits
  - [x] Save the game to local storage when the game is started
  - [x] Save the game to local storage as the game is played
  - [x] If the user lands on the home page, load the game from local storage if it exists
  - [x] Add a popup when the page loads to tell the user what data is being saved. When they dismiss it, set a value in local storage so it doesn't show again

## Bugs
- [x] Clicking out of a modal behaves weirdly. It should act like the undo button maybe? Need to check all of these.
- [x] Cars are not disabled right (not functionally broken, just weird)
- [x] Clicking a resource a second time should deselect it probably
- [x] You can't undo the last action of a round
- [x] Undoing things at the table is messed up:
  - [x] serving (select food)
  - [x] taking order - can't do, dummy
  - [x] serving cars
  - [x] refilling
  - [x] clearing table
  - [x] seating
  - [x] round tear down
  - [x] round set up
- [x] Food that is cooking has a higher z-index than the modals

## Rules questions
* If a person leaves the table, does the plate go with them?
  * No, not thematically. This is weird, but I don't think it hurts the game at all?
  * Actually, maybe thematically, they wouldn't have a plate yet? Right?
* Cars with a thing on them should go away, right? - maybe, maybe not?
  * I think not. I like that they have to move in time and order. This also keeps the components in the gameplay longer
* Is there a penalty for losing customers? We never figured that out.

## Tech Debt
- [ ] Don't nest buttons

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