This is an application made with **nodejs**,**docker** and **graphql**.  
Test is using **mocha/chai**.  
This application is made for to answer a test.  

Run script below to clone the application (**make sure git is installed**)
```
git clone https://github.com/ridwan85/inscale-adform-test.git
```
**OR** 

download from <https://github.com/ridwan85/inscale-adform-test/archive/master.zip> 


Upon download/cloning please run the bash file 
```
./run.sh
```
Make sure to run 
```
chmod u+x run.sh
```
To make the script **executable**  

Go to <http://localhost:4000/graphql> to test the application.  

Checkout the docs section on how to use the api.  

Based on the test question :>  

**TO LIST OWNERS**
```
query {
  owners {
    name,
    address,
    email,
    id,
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