// require the discord.js module
const Discord = require('discord.js');

const fs = require('fs');

const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});

//Khepri Jokes
var jokes = ["What did the iceberg say to the sun? You crack me up. Ha! Hahahahaha!", "I lost the sun for a second, but then it dawned on me.", "The sun enjoys reading, you know. Just so that it may get brighter.", "Why don't lobsters share their food? Because they're shellfish!", "What happened when the crustacean was late to work? She lobster job! Hahahahahaha!", "I'm no feeder! Well okay, I'm a bottom-feeder, but I fight to win!"];

client.on('message', async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "hello") {
        message.channel.send('Greetings, friend!');
    }

    if (command === "f") {
        message.channel.send('[F] for respect');
        message.delete().catch(O_o => { });
    }

    if (command === "joke") {
        var ran = getRndInteger(1, jokes.length);
        message.channel.send(jokes[ran - 1]);
        message.delete().catch(O_o => { });
    }

    if (command === "check") {
        let member = message.mentions.members.first();
        if (!member) return;
        let num = getTheKhepris(member.user.discriminator);
        message.channel.send(member.user.username + " Has " + num + " Khepris!");
    }

    if (command === "give") {
        let member = message.mentions.members.first();
        if (!member) return;
        if (parseInt(args[0], 10) < 6 && parseInt(args[0], 10) > 0) {
            let num = saveTheKhepris(member.user.discriminator, parseInt(args[0], 10));
            message.channel.send(member.user.username + " Now Has " + num + " Khepris!");
        }else{
            message.channel.send(message.author.username + " you must give Khepris within the range 1 to 5");
        }
    }

    if (command === "take") {
        let member = message.mentions.members.first();
        if (!member) return;
        if (parseInt(args[0], 10) < 0 && parseInt(args[0], 10) > -6) {
            let num = saveTheKhepris(member.user.discriminator, parseInt(args[0], 10));
            message.channel.send(member.user.username + " Now Has " + num + " Khepris!");
        }else{
            message.channel.send(message.author.username + " you must take Khepris within the range -5 to -1");
        }
    }

    if (command === "adduser") {
        let member = message.mentions.members.first();
        if (!member) return;
        addUser(member.user.discriminator);
    }

    if(command === "allCounts"){
        let tempArray = getBankArray();
        
    }

    if (command === "test") {
        let member = message.mentions.members.first();
        if (!member) return;
        console.log(member.user.discriminator);
    }
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addUser(userDiscrim){
    var bankArray = fs.readFileSync('./khepriStorage.txt', 'utf-8').split(',');
    for (let x = 0; x < bankArray.length; x++) {
        bankArray[x] = bankArray[x].trim();
    }
    if (bankArray.includes(userDiscrim.trim())) {
        console.log("User Already In System");
    }else{
        bankArray.push(userDiscrim.trim(),"0");
    }
    fs.writeFileSync('./khepriStorage.txt', bankArray.toString());

}

function getTheKhepris(userDiscrim) {
    var bankArray = fs.readFileSync('./khepriStorage.txt', 'utf-8').split(',');
    for (let x = 0; x < bankArray.length; x++) {
        bankArray[x] = bankArray[x].trim();
    }

    if (bankArray.includes(userDiscrim.trim())) {
        return bankArray[(bankArray.indexOf(userDiscrim.trim())) + 1];
    } else {
        return -420;
    }

}

function getBankArray(){
    var bankArray = fs.readFileSync('./khepriStorage.txt', 'utf-8').split(',');
    for (let x = 0; x < bankArray.length; x++) {
        bankArray[x] = bankArray[x].trim();
    }

    return bankArray;
}

function saveTheKhepris(userDiscrim, pointsToChange) {
    var bankArray = fs.readFileSync('./khepriStorage.txt', 'utf-8').split(',');
    for (let x = 0; x < bankArray.length; x++) {
        bankArray[x] = bankArray[x].trim();
    }
    if (bankArray.includes(userDiscrim.trim())) {
        let temp = bankArray[(bankArray.indexOf(userDiscrim.trim())) + 1];
        let tempInt = parseInt(temp, 10);
        tempInt += pointsToChange;
        bankArray[(bankArray.indexOf(userDiscrim.trim())) + 1] = tempInt.toString();
    }
    fs.writeFileSync('./khepriStorage.txt', bankArray.toString());
    return bankArray[(bankArray.indexOf(userDiscrim.trim())) + 1];
}

// login to Discord with your app's token
client.login(token);