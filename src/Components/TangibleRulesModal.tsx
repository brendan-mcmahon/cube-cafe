import React, { FormEvent } from "react";
import { Modal } from "../Modal";
import "./styles/RulesModal.scss";
import { IModalProps } from "./IModalProps";
import Meeple from "../icons/Meeple";
import Clipboard from "../icons/Clipboard";
import Pan from "../icons/Pan";
import Cloche from "../icons/Cloche";
import Refill from "../icons/Refill";
import SimpleCar from "../icons/SimpleCar";

export default function TangibleRulesModal(props: IModalProps) {

  return (
    <Modal title="How to Play" show={props.show} setShow={props.setShow}>
      <div id="RulesModal">

        <div className="overview">
          <h2>Overview</h2>
          <p>A game of Cube Café is played over the course of 8 rounds.</p>
          <p>Your goal is to provide the most efficient and pleasant service to your customers in that time. You'll do that in each round following the same structure:</p>
          <ol style={{ textAlign: "left" }}>
            <li>Roll the dice</li>
            <li>Perform actions</li>
            <li>Prepare for the next round
              <ol style={{ listStyle: "none" }}>
                <li>Customers Eat (you collect points)</li>
                <li>Customers become impatient</li>
                <li>The restaurant operations continue</li>
              </ol>
            </li>
          </ol>
          <p>The player with the most money at the end of the game wins!</p>
          <p>Keep scrolling to see more details about each round</p>
        </div>

        <div className="details">
          <h1>Step 1: Roll the dice</h1>
          <p>
            Roll the six Action Dice. Each player gathers the six resource cubes designated by the dice. Wild die results are represented by black cubes.
          </p>

          <h1>Step 2: Take Actions</h1>
          <p>
            This is the heart of the game where players manage their resources to provide the most efficient service to their customers. To earn points, a player must move a customer through the four actions of the dining experience (in order):
          </p>
          <p>Seat 🡪 Order 🡪 Cook 🡪 Serve</p>
          <p>Note: For improved service, players may also carry out the optional Refill action at any time after a customer is seated.</p>
          <p>To perform a particular action on the Action Wheel, a player must spend a cube matching the associated color. Players may also spend any cube to rotate the Action Wheel one step in either direction.</p>
          <p>Players continue performing actions until they run out of resources and/or free actions.</p>
          <h4>On the Action Wheel</h4>
          <ul className="action-wheel">
            <li className="description">
              <Meeple number={0} /><h5>Seat</h5>
              <p>
                A new customer arrives and is seated at the first available table. Place the customer on the seat with the number "3" to start. Your meeple will move around the table as play continues. The number on the customers seat will correlate to the points/money you recieve after the meeple leaves. <span className="note">A table is available if it is empty of other customers or dirty plates</span>
              </p>
            </li>
            <li className="description">
              <Clipboard number={1} /><h5>Order</h5>
              <p>Choose a table whose order you'd like to take. Draw a plate out of the plate bag to represent the customer's order (which is just a color! Meeples have simple tastes) and place it on that customer's table.</p>
            </li>
            <li className="description">
              <Pan number={2} /><h5>Cook</h5>
              Place a cube on the grill to cook it up! Move <em>the resource you spent</em> to the grill. This means if you spend a Red resource, you will be cooking a red resource. Don't, for instance, use a Blue resource to cook for a customer who ordered Red!</li>
            <li className="description">
              <Cloche number={3} /><h5>Serve</h5>
              Choose a table you'd like to serve, and then choose the food item from your countertop that you'd like to serve them. In some cases, you'll have more than one cube/food that applies to a table. If you manage to serve the customer while the food is hot and fresh (ie. on the left side of the countertop), your customer will move one seat clockwise at the table! If you let the food sit there too long (more than 2 rounds), it becomes inedible and must be thrown away.</li>
            <li className="description">
              <Refill number={4} /><h5>Refill</h5>
              Choose a table you'd like to provide with exemplary customer service. Their drink will be refilled and they will move one space clockwise around the table! <span className="note">You can only do this once per round</span></li>
            <li className="description">
              <SimpleCar number={5} /><h5>Drive-thru</h5>
              After the 4th round, your drive-thru opens up and starts taking in cars! You'll get one car per turn. If you manage to serve the car in the first (top) position, you'll be rewarded with 3 points. The second position gives you 2 points. Serving a car work similarly to cooking in that you'll need to use the resource that corresponds to the car's color to be able to serve them. If you don't serve a car after two rounds, it just leaves, probably pretty annoyed.</li>
          </ul>
          <h4>Other actions you can take</h4>
          <ul className="no-dot">
            <li className="description"><h5>Rotate the action wheel</h5> spend a cube to rotate the inner color wheel one space either direction</li>
            <li className="description"><h5>Move the manager</h5> Any good restaurant will have a roaming manager, making patrons feel uncomfortable.
              You may have noticed that each action on the action wheel also contains a number.
              These numbers correspond to how many spaces you can move the manager by spending the corresponding resource.
              For example, if Red is at the third position on the wheel (corresponding to the "Cook" action), you can choose to move the manager two spaces on his track instead of cooking!
              Once the manager lands on or passes a bonus space, collect the corresponding bonus (the first is a free cube of any color, the second is a choice between a free cube of any color or a free point, the third is a choice between a wild cube and 2 free points)
              The manager continues in a cycle, so you can collect the same bonuses more than once!</li>
            <li className="description"><h5>Clear a table</h5> As a free action, at any time, you can clear a table. After Meeples leave the restaurant, they leave their garbage behind.
              You can't seat a customer at a dirty table, so you'll need to clear it before you're able to seat someone.
              After clearing, you need to put the plate in the dishwasher, which is great news!
              Each spot in the dishwasher provides a bonus (but can only be used once per game).
              To do this, just click on a table that has a plate but no meeple, and then click on whatever space on the dishwasher you'd like to get the bonus!</li>
          </ul>
          <h4>Dishwasher bonuses</h4>
          <ul>
            <li className="description"><h5>Manager</h5> Selecting this will move the manager three spaces on his track</li>
            <li className="description"><h5>Copy Cube</h5> Select this and then select a cube you already have (spent or not spent) and you will get a copy of it</li>
            <li className="description"><h5>Cube of any color</h5> Select one of the spaces with a cube and get a cube of that color!</li>
            <li className="description"><h5>Refill</h5> Select this and then select a table you'd like to refill</li>
            <li className="description"><h5>Free Rotation</h5> Rotate the action wheel into any position</li>
          </ul>

          <h1>Step 3: Resolve</h1>
          <p>
            After all players have finished performing actions, the round ends. Players must now prepare for the next round by performing the following steps:
          </p>
          <ul>
            <li>
              Any customers who have their food finish eating. Remove them from the board and collect the amount of money that corresponds to the seat they were sitting in.
            </li>
            <li>
              Any customers who don't have their food rotate one seat counter-clockwise.
            </li>
            <li>
              Any cars in the drive thru with their food drive away. Collect the amount of money that corresponds to the spot they were in.
            </li>
            <li>
              Any cars without food move one space down. If they were at the bottom, they drive away.
            </li>
            <li>
              Food that was on the "cold" spot on the counter is thrown out.
            </li>
            <li>
              Food that was in the "hot" spot moves to the "cold" spot on the counter.
            </li>
            <li>
              Food on the grill finishes cooking and moves to the "hot" spot on the counter.
            </li>
            <li>
              Draw a new car card and place it in the top position in the drive thru.
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
