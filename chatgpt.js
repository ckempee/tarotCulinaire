const axios=require('axios');
const chatgptText=document.querySelector('.resultat');
require('dotenv').config();

const apiKey=process.env.MY_SECRET_KEY;

const client= axios.create({
    headers:{
        Authorization:'Bearer '+apiKey
    },

});

const params={
    prompt:'peux tu me generer un texte divinatoire culinaire si l utilsateur a choisis 3 cartes: l amoureux, le soleil et le monde',
    model:'text-davinci-003',
    max_tokens:1000,
    temperature:0,
}

client
.post("https://api.openai.com/v1/completions", params)
  .then((result) => {
    chatgptText.innerText=result.data.choices[0].text;
  })
  .catch((err) => {
    console.log(err);
  });

