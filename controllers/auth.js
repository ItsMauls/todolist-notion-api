import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
let userEmail
export const auth = async() => {
    rl.question('Masukkan email Anda: ', (email) => {
        userEmail = email;
        console.log(email)
        rl.question('Masukkan kata sandi Anda: ', (password) => {
      
          console.log('Anda berhasil login dengan email:', userEmail);
          rl.close();
        });
      });
}

/*
------------------- 
|UPCOMING FEATURE||
-------------------
*/
