This is an application made with **nodejs**,**express**,**docker** and **graphql**.  
Testing is done using **mocha/chai**.  
This application is made for the purpose of answering a **test**.  

Run script below to clone the application (**make sure git is installed**)
```
git clone https://github.com/ridwan85/simple-docker-graphql-nodejs.git
```
**OR** 

download from <https://github.com/ridwan85/simple-docker-graphql-nodejs/archive/master.zip> 

_________________________________________________________________________________________________
*PREREQUISITE*  
Please make sure **DOCKER** and **NODEJS** is **INSTALLED** before running the script

-------------------------------------------------------------------------------------------------
Please make sure to change the PORT in the .env file to your desired port.  
```
PORT=4000
```  

Upon download/cloning please run the bash file 
```
./run.sh
```
Make sure to run script below (**if you're in a *nix environment**)  
To make the script **executable**  
```
chmod u+x run.sh 
```

Go to <http://localhost:4000/graphql> to test the application. (*after the script run finished*).


Based on the test question :=>  

**TO LIST OWNERS** (example)
```
query {
  owners {
    id,
    name,
    address,
    email,
    phone,
    pet {
        name,
        age,
        colour,
        breed,
        animal{
            name
        }
    }
  }
}
```
**TO ADD A PET** (example)
```
mutation {
  addPet(
    name : "Hachiko"
    breed : "Labrador",
    age : 4,
    colour:"white",
    ownerId:"3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz",
    animalId:"nN5rd03PprEfPMdKesVeWQLgrraSu0Zu"
  ) {
    id
  }
}
```
**TO EDIT A PET** (example)
```
mutation {
  updatePet(
    id:"SmUFe4UIkVLAthohhWVeaFpkRWsknwHM",
    name : "Jiju"
    breed : "Labrador",
    age : 3,
    colour:"white",
    ownerId:"3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz",
    animalId:"nN5rd03PprEfPMdKesVeWQLgrraSu0Zu"
  ) {
    id
  }
}
```
**RETRIEVE AN OWNER AND THEIR PETS** (example)
```
query {
  owner(id:"3QDFxuWPSuNQ6JmxIy54U2SJdKeqzrWz") {
    name,
    address,
    email,
    phone,
    pet{
      name,
      breed,
      age,
      colour
      animal{
        name
      }
    }
  }
}
```

Checkout the rest of the docs section on how to use the graphql api.  
