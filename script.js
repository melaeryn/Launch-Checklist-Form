//load in the page before doing anything.
window.addEventListener("load", function() {

   //call the elements needed for submit.
   let button = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   

   //choosesz a random number to populate a planet for our destination.
   let randomPlanet = Math.floor(Math.random() * Math.floor(6));

   //generates the Mission Destination.
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         console.log(json[randomPlanet].image);
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomPlanet].name}</li>
            <li>Diameter: ${json[randomPlanet].diameter}</li>
            <li>Star: ${json[randomPlanet].star}</li>
            <li>Distance from Earth: ${json[randomPlanet].distance}</li>
            <li>Number of Moons: ${json[randomPlanet].moons}</li>
         </ol>
         <img src="${json[randomPlanet].image}">`;
      });
   } );


   //validation step: submit checks to make sure that everything has been entered and that it is correct value type.
   button.addEventListener("submit", function(event){
      //if they didn't enter a value for something, inform them all fields are required.
      if(pilotName.value === "" || copilotName.value === "" || fuelLevel === "" || cargoMass === "" ){
         alert("All inputs are required!");
         event.preventDefault();
      }

      //if something they entered isn't a valid input, tell them that valid inputs are required.
     else if(typeof(pilotName.value) != "string" || typeof(copilotName.value) != "string" 
      || isNaN(fuelLevel.value) || isNaN(cargoMass.value) || !isNaN(pilotName.value) || !isNaN(copilotName.value) ){
         alert("valid inputs only!");
         event.preventDefault();
      } 
      
      event.preventDefault();
         //update pilot names in the list of messed up items.
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready.`;
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotName.value} is ready.`;
        
          //used to keep track of if shuttle is ready for takeoff or not.
      let badFlag = false;
        
          //check fuel status. If too low, update faultyItems list to reflect that.
      if(Number(fuelLevel.value) < 10000){
         let fuelStatus = document.getElementById("fuelStatus");
         fuelStatus.innerHTML = "Not enough fuel for the journey.";
         badFlag = true;
      }
      else{
         let fuelStatus = document.getElementById("fuelStatus");
         fuelStatus.innerHTML = "There is enough fuel for takeoff.";
      }
        
             //check cargo mass. if too heavy, update Faulty items.
      if(Number(cargoMass.value) > 10000){
         let cargoStatus = document.getElementById("cargoStatus");
         cargoStatus.innerHTML = "Too much mass for takeoff.";
         badFlag = true;
      }
        
      else{
         let cargoStatus = document.getElementById("cargoStatus");
         cargoStatus.innerHTML = "Cargo mass low enough for launch.";
      }
        
           //checks to see if flag got raised. if did, change shuttle status to not ready. if not, make green.
      if (badFlag === true){
         let launchStatus = document.getElementById("launchStatus");
         launchStatus.innerHTML = "Shuttle not ready for launch!";
         document.getElementById("faultyItems").style.visibility = "visible";
         launchStatus.style.color = "red";
      }
      else{
         let launchStatus = document.getElementById("launchStatus");
         launchStatus.innerHTML = "Shuttle ready for takeoff!";
         launchStatus.style.color = "green";
         document.getElementById("faultyItems").style.visibility = "hidden";
      }     
   });
});

