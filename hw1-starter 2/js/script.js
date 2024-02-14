// 1. create an array of 3 images
let pictures = [];

pictures.push("media/images/bubble.jpeg");
pictures.push("media/images/kitty1.jpg");
pictures.push("media/images/kitty2.jpg");


// 2. create an event listener for the button

document.getElementById("clickButton").addEventListener("click", displayImage);



// 3. create a function that will display a random image

function displayImage(){

    let randomInt = Math.floor(Math.random() * 3);
    document.getElementById("randomPicture");

}

// function functionName() {
    //HINT: You will be using the randomly generated number to plug into the array index


//}

