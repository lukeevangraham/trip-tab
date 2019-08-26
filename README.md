# TripTab

## Overview

Deployed at: https://ayadav-triptab.herokuapp.com/

Spending money while traveling in groups can get complicated.  TripTab is an application that helps users **track** shared travel expenses.  Users can keep track of money they owe others and others owe them.  TripTab is designed for use on mobile phones to make logging expenses easy on-the-go. 

## Views

### Home
The home page allows users to create an account on the site or login with an existing account.  All that's required is a username and password.  As an example account use:
* username: luke
* password: 1234567890

After logging in the home page displays balances of monies owed to others and to the user.

![Home](./readmeImages/triptab.png?raw=true "Home Page")

The home page also shows three buttons
* Create event
* Payoff event
* View ledger


### Create event

Displays a form where users can enter a shared travel expense.  

![Create Event Page](./readmeImages/createEvent.png?raw=true "Create Event Page")

* Event Name (can include location or additional details)
* Payer First Name (indicates who paid for the expense)
* Amount (indicates how much money was spent)
* Participant First Name (indicates who expense is shared with, include the payer)

### Payoff event

![Payoff Event Page](./readmeImages/payoffEvent.png?raw=true "Payoff Event Page")

Displays a form where users who owe money for an event can indicate payoff is complete

* Event name (select event from list of events user participated in)
* Payer Name: (automatically populates current user's name)
* Amount: (automatically populates based on event information)
* Payees name (automatically populates based on event information)

### Ledger

![Ledger](./readmeImages/ledger.png?raw=true "Ledger")

The Ledger page shows which events the user has not yet paid for.  Users can indicate payment is complete by clicking the Pay button.  It also shows which events others owe the user money for.





 Built on React, Mongo, Express, Node
